# Plan — Google Sheets 作為 Prototype Database

將睡眠與運動紀錄寫入 Google Sheet，取代目前僅存在記憶體的 `PaceState`，讓 demo 時資料可以跨 session 保留、也方便設計與 PM 直接看 raw data。

- **範圍**：Sleep 紀錄、Exercise 紀錄（其他維度先不動）
- **原則**：prototype 等級，fire-and-forget、不做 error handling、不做 loading state
- **技術選型**：Google Apps Script Web App（免 API key、免 OAuth、免後端）

---

## 架構

```
SleepScreens / ExerciseScreens
        │
        │  appendRow(sheet, record)
        ▼
   src/data/db.ts  ──────────►  Apps Script Web App  ──────────►  Google Sheet
        ▲                                                              │
        │  fetchRows(sheet)                                            │
        └──────────────────────────────────────────────────────────────┘
```

- 寫入：使用者完成紀錄 → 直接 POST（不 await，不擋 UI）
- 讀取：需要歷史資料時才 fetch（如 HomeScreen 進入、InsightsScreen）

---

## Schema

Google Sheet 名稱：`Pace DB`

### Sheet `sleep`

| Column    | Type    | 說明                      |
|-----------|---------|-------------------------|
| timestamp | string  | ISO 8601，`new Date().toISOString()` |
| date      | string  | `YYYY-MM-DD`（方便分組）      |
| hours     | number  | 睡眠時數                    |
| feel      | number  | 0–4，對應 `MOOD_SCALE` 索引  |
| note      | string  | 預留備註欄位（目前空字串）           |

### Sheet `exercise`

| Column    | Type    | 說明                          |
|-----------|---------|-----------------------------|
| timestamp | string  | ISO 8601                    |
| date      | string  | `YYYY-MM-DD`                |
| type      | string  | `walk` / `run` / `yoga` 等 key |
| duration  | number  | 分鐘                          |
| intensity | number  | 0–4                         |
| mood      | number  | 0–4                         |

> 第一列為 header，Apps Script 依 header 自動對位。

---

## 步驟

### Step 1 — 建立 Google Sheet

1. 到 [sheets.new](https://sheets.new) 新建檔案
2. 命名為 `Pace DB`
3. 新增兩個分頁 `sleep` / `exercise`，第一列貼上 header（見上表）
4. 預設的 `Sheet1` 可刪除

### Step 2 — 撰寫 Apps Script

在 Sheet 內 **Extensions → Apps Script**，貼入：

```js
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  const sheet = e.parameter.sheet; // 'sleep' or 'exercise'
  const data = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheet).getDataRange().getValues();
  const [header, ...rows] = data;
  const result = rows.map(r => Object.fromEntries(header.map((h, i) => [h, r[i]])));
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const { sheet, record } = JSON.parse(e.postData.contents);
  const s = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheet);
  const header = s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0];
  s.appendRow(header.map(h => record[h] ?? ''));
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Step 3 — 部署為 Web App

1. Apps Script 編輯器右上 **Deploy → New deployment**
2. 齒輪 → 選 **Web app**
3. **Execute as**: Me
4. **Who has access**: **Anyone**（prototype 用，不含敏感資料才可以這樣做）
5. Deploy → 第一次會要求授權，同意
6. 複製 Web app URL（`https://script.google.com/macros/s/AKfy.../exec`）

> 往後每次修改 Apps Script 要重新 **Manage deployments → Edit → Version: New version**，否則不會生效。

### Step 4 — 前端 service 層

新增 [src/data/db.ts](src/data/db.ts)：

```ts
const URL = 'https://script.google.com/macros/s/你的ID/exec';

export type SleepRow = {
  timestamp: string;
  date: string;
  hours: number;
  feel: number;
  note: string;
};

export type ExerciseRow = {
  timestamp: string;
  date: string;
  type: string;
  duration: number;
  intensity: number;
  mood: number;
};

export async function fetchRows<T>(sheet: 'sleep' | 'exercise'): Promise<T[]> {
  const r = await fetch(`${URL}?sheet=${sheet}`);
  return r.json();
}

export async function appendRow(
  sheet: 'sleep' | 'exercise',
  record: SleepRow | ExerciseRow,
) {
  await fetch(URL, {
    method: 'POST',
    // 用 text/plain 避開 CORS preflight（Apps Script 不支援 OPTIONS）
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ sheet, record }),
  });
}
```

### Step 5 — 串進 SleepScreens

在 [src/components/screens/SleepScreens.tsx](src/components/screens/SleepScreens.tsx) 的「完成紀錄」按鈕 handler：

```ts
import { appendRow } from '../../data/db';

// 原本的 mutation 保留
state.sleepRecorded = true;
state.sleepHours = hoursLive;
state.sleepFeel = feelLive;

// 新增：寫入 sheet（fire-and-forget）
appendRow('sleep', {
  timestamp: new Date().toISOString(),
  date: new Date().toISOString().slice(0, 10),
  hours: hoursLive,
  feel: feelLive,
  note: '',
});
```

### Step 6 — 串進 ExerciseScreens

在 [src/components/screens/ExerciseScreens.tsx](src/components/screens/ExerciseScreens.tsx) 的完成 handler：

```ts
import { appendRow } from '../../data/db';

state.exerciseRecorded = true;
state.exerciseType = typeLive;
state.exerciseDuration = durationLive;
state.exerciseIntensity = intensityLive;
state.exerciseMood = moodLive;

appendRow('exercise', {
  timestamp: new Date().toISOString(),
  date: new Date().toISOString().slice(0, 10),
  type: typeLive,
  duration: durationLive,
  intensity: intensityLive,
  mood: moodLive,
});
```

---

## 驗證

1. `npm run dev`，走完睡眠紀錄 flow
2. 打開 Google Sheet → `sleep` 分頁，應該看到新列
3. 運動紀錄 flow 同理驗證 `exercise` 分頁
4. 瀏覽器 DevTools → Network 檢查 POST 200 OK
5. 直接貼 `Web app URL?sheet=sleep` 到瀏覽器，確認 GET 回 JSON

---

## 後續可做（非本次範圍）

- HomeScreen 進入時 `fetchRows('sleep')`，從 sheet 重算 `streak` / `sleepWeekly`
- InsightsScreen 改用 sheet 資料繪圖
- 加上簡單的 userId（prompt 使用者輸入名字，寫入 row）以區分多人 demo
- 本地加 `localStorage` 備份，離線也能用

---

## 風險與注意事項

- **Apps Script cold start**：第一次請求可能 2–3s，之後很快。demo 前先打一次 warm up
- **Who has access: Anyone**：URL 等於密碼，不要貼到公開 repo 或 issue；寫進 `.env` 更安全
- **Rate limit**：Apps Script 每天 ~20,000 次呼叫，prototype 用量綽綽有餘
- **Schema 變更**：新增欄位時先在 Sheet 加 header，再改 `db.ts` type，Apps Script 不用動
- **多人同時寫**：`appendRow` 是 atomic，不會撞列
