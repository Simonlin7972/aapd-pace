# Google Sheets 作為 Prototype Database — 當前運作模式

> **Status**: ✅ 已上線（寫入端）｜🟡 讀取端未接
> **Last updated**: 2026-04-21

Sleep 與 Exercise 的紀錄在使用者按下完成時，會同時寫入 `PaceState`（記憶體 + localStorage）和 Google Sheet。Sheet 作為跨 session 的歷史資料來源，方便 demo 時呈現資料累積、也讓設計/PM 能直接看 raw data。

- **技術選型**：Google Apps Script Web App（免 API key、免 OAuth、免後端）
- **原則**：prototype 等級，fire-and-forget、寫入失敗只印 `console.warn`、不擋 UI

---

## 架構

```
SleepScreens / ExerciseScreens
        │
        │  appendRow(sheet, record)      ← 已接
        ▼
   src/data/db.ts  ──────────►  Apps Script Web App  ──────────►  Google Sheet
        ▲                                                              │
        │  fetchRows(sheet)              ← 已實作，尚未使用                │
        └──────────────────────────────────────────────────────────────┘
```

寫入路徑：使用者按「完成紀錄」→ mutate `PaceState`（同步，觸發 UI 更新）→ `appendRow()` 發 POST（不 await）→ Sheet 新增一列。

---

## 當前實作

### 1. Apps Script Web App（已部署）

- Web App URL 寫死在 [src/data/db.ts:9](src/data/db.ts#L9) 的 `DB_URL` 常數
- `doGet(?sheet=xxx)`：回傳整個分頁的資料（header 當 key 的 JSON array）
- `doPost`：依 header 對位寫入一列
- 部署設定：**Execute as: Me** / **Who has access: Anyone**

> ⚠️ URL 等同密碼，不要貼到公開 repo / issue。目前寫死在 code 裡屬 prototype 權宜，正式環境應走 `.env`。

### 2. Google Sheet schema

Sheet 檔名：`Pace DB`

**Sheet `sleep`**

| Column    | Type   | 說明                             |
|-----------|--------|--------------------------------|
| timestamp | string | ISO 8601，由 `nowFields()` 產生   |
| date      | string | `YYYY-MM-DD`                   |
| hours     | number | 睡眠時數                         |
| feel      | number | 0–4，對應 `MOOD_SCALE` 索引       |
| note      | string | 目前固定空字串（預留欄位）             |

**Sheet `exercise`**

| Column    | Type   | 說明                            |
|-----------|--------|-------------------------------|
| timestamp | string | ISO 8601                      |
| date      | string | `YYYY-MM-DD`                  |
| type      | string | `walk` / `run` / `yoga` 等 key  |
| duration  | number | 分鐘                            |
| intensity | number | 0–4                           |
| mood      | number | 0–4                           |

Apps Script 依第一列 header 自動對位，新增欄位只要在 Sheet 加 header + 更新 `db.ts` type 即可，Apps Script 不用動。

### 3. 前端 service — [src/data/db.ts](src/data/db.ts)

提供三個 export：

- `appendRow(sheet, record)` — fire-and-forget POST，失敗時 `console.warn`
- `fetchRows<T>(sheet)` — 讀取整個分頁（**尚未被任何 screen 使用**）
- `nowFields()` — 產生 `{ timestamp, date }` 兩欄，避免每次 inline 寫 `new Date()`

POST 的 `Content-Type` 使用 `text/plain;charset=utf-8`，用以避開 CORS preflight（Apps Script 不支援 OPTIONS）。

### 4. 接入點

**Sleep 紀錄** — [src/components/screens/SleepScreens.tsx:306](src/components/screens/SleepScreens.tsx#L306)
在 step 2 的「看看昨晚」按鈕 handler 內，與 `PaceState.sleepHours / sleepRecorded` 的 mutate 同步觸發。

**Exercise 紀錄** — [src/components/screens/ExerciseScreens.tsx:350](src/components/screens/ExerciseScreens.tsx#L350)
在 `handleDone()` 內，與 `PaceState.exercise*` 的 mutate 同步觸發。

兩處都採 fire-and-forget — 不 await、不因網路錯誤擋住 UI 前進。

---

## 驗證方式

1. `npm run dev`，走完睡眠 / 運動紀錄 flow
2. 打開 Google Sheet，對應分頁應出現新列
3. DevTools → Network，確認 POST 200 OK
4. 在瀏覽器直接貼 `DB_URL?sheet=sleep` 應回 JSON array

---

## 尚未做 / 可選擴充

- **讀取端接入**：HomeScreen 進入時 `fetchRows('sleep')`，從 Sheet 重算 `streak` / `sleepWeekly`；InsightsScreen 改用 Sheet 資料繪圖
- **userId**：多人 demo 時加欄位區分
- **URL 移到 `.env`**：避免 commit 風險
- **離線備份**：目前 `PaceState` 已走 localStorage，Sheet 寫入失敗時資料不會掉

---

## 風險與注意事項

- **Apps Script cold start**：第一次請求可能 2–3s，之後很快。demo 前先打一次 `DB_URL?sheet=sleep` warm up
- **每次改 Apps Script 要重新部署**：**Manage deployments → Edit → Version: New version**，不重新部署不會生效
- **Rate limit**：Apps Script 每天 ~20,000 次呼叫，prototype 用量綽綽有餘
- **多人同時寫**：`appendRow` 是 atomic，不會撞列
- **資料雙寫**：目前 `PaceState`（UI 顯示用）與 Sheet（歷史用）是獨立兩套 — Sheet 寫入失敗時 UI 仍會正常推進，但那筆不會進 Sheet。可接受。
