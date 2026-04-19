# PRD: 睡眠管理 MVP

**Status:** Draft
**Owner:** Simon Lin
**Last Updated:** 2026-04-19
**Target Release:** MVP
**Availability:** All users

---

## Context

### 現有狀態

目前 Pace app 已實作一個 3-step 睡眠記錄流程：

1. **SleepStep1** — 「你今天醒來，感覺如何？」（MoodSlider 0-4）
2. **SleepStep2** — 「昨晚，大概睡了多久？」（HoursSlider 0-14h）
3. **SleepStep3** — 摘要與建議（根據時數與感受給出文案）

使用者從 BottomBar「睡眠」tab 點擊後直接進入 Step 1 記錄流程，記錄完回到 Home。**目前缺少一個獨立的睡眠管理首頁**，讓使用者在「已記錄」狀態下仍能查看、回顧睡眠資訊。

### 技術環境

- React 19 + TypeScript + Vite 8
- 無 UI framework，所有 styling 走 inline style + design tokens
- Navigation：自製 NavStack（push / pop / replace）
- State：plain mutable object（`PaceState`），prototype 寫法
- i18n：zh-TW / en / ja 三語系
- iPhone frame：380 x 820，底部 34px home indicator 保留區

---

## Problem

使用者點擊 BottomBar「睡眠」tab 時，無論是否已記錄，都直接進入記錄流程。這導致：

- **已記錄的使用者**沒有地方回顧今天的睡眠數據
- **沒有週維度的睡眠趨勢**，使用者無法感知自己的睡眠模式
- BottomBar「睡眠」入口的體驗與其他 tab（如「今天」有 dashboard）不一致

## Evidence

- ⚠️ **Assumed：** 使用者記錄完睡眠後，再次點擊「睡眠」tab 會期望看到回顧，而非重新記錄
- ⚠️ **Assumed：** 週維度的趨勢視覺化能增加使用者的持續記錄動機
- ✅ **Validated：** 現有 InsightsScreen 已有週睡眠圖表，表示設計方向有考慮過趨勢呈現

---

## Success Criteria

### Lagging Indicators（上線後）

| Metric | Current | Target | Timeframe |
|--------|---------|--------|-----------|
| 睡眠 tab 日均點擊次數 | [PLACEHOLDER] | 提升 30% | 上線後 2 週 |
| 連續記錄天數（streak） | [PLACEHOLDER] | 提升 20% | 上線後 4 週 |

### Leading Indicators（上線前）

| Metric | Current | Target | 預測意義 |
|--------|---------|--------|----------|
| 內部 dogfooding 使用率 | N/A | 團隊每人至少用 3 天 | 預測採用度 |
| Design review 通過 | N/A | 一輪通過 | 預測品質 |

---

## Proposed Solution

### 新增「SleepHome」睡眠管理首頁

在 BottomBar「睡眠」tab 與記錄流程之間，插入一個 **SleepHome** 頁面作為睡眠模組的 landing page。

### 頁面結構

```
┌─────────────────────────┐
│  ← 返回        睡眠      │  Navigation Bar
├─────────────────────────┤
│                         │
│   今日睡眠卡片            │  Hero Card
│   ┌───────────────────┐ │
│   │  😴 6.5 小時       │ │  - 睡眠時數
│   │  感覺：還行         │ │  - 醒來感受（MOOD_SCALE 對應）
│   │  00:30 → 07:00    │ │  - 就寢 / 起床時間
│   └───────────────────┘ │
│                         │
│   [重新記錄]  ← 未記錄時   │  CTA Button
│              顯示 [開始記錄]│
│                         │
│   本週趨勢               │  Section Title
│   ┌───────────────────┐ │
│   │  ▁ ▃ ▅ ▇ ▅ ▃ ·   │ │  - 7 天柱狀圖
│   │  一 二 三 四 五 六 日 │ │  - 標示今天
│   │  平均 6.2h          │ │  - 週平均
│   └───────────────────┘ │
│                         │
│   睡眠小語               │  Insight Card
│   ┌───────────────────┐ │
│   │  💡 這週你的睡眠    │ │  - 根據數據動態生成
│   │  比上週穩定了不少    │ │
│   └───────────────────┘ │
│                         │
├─────────────────────────┤
│  BottomBar              │
└─────────────────────────┘
```

### 狀態邏輯

| 條件 | SleepHome 行為 |
|------|---------------|
| `sleepRecorded === false` | Hero Card 顯示空狀態 + 「開始記錄」CTA，點擊進入 SleepStep1 |
| `sleepRecorded === true` | Hero Card 顯示今日數據 + 「重新記錄」次要按鈕 |

### Navigation Flow

```
BottomBar「睡眠」
    │
    ▼
SleepHome（新增）
    │
    ├── [開始記錄 / 重新記錄] → SleepStep1 → Step2 → Step3 → pop 回 SleepHome
    │
    └── 週趨勢圖（靜態展示，MVP 不可互動）
```

### User Stories

**Story 1：首次記錄**
- **As a** 剛開始使用 Pace 的使用者
- **I want to** 點擊「睡眠」tab 後看到清楚的引導
- **So that** 我知道可以記錄睡眠，並被鼓勵開始

**Story 2：回顧今日睡眠**
- **As a** 已記錄今日睡眠的使用者
- **I want to** 點擊「睡眠」tab 後看到今天的睡眠摘要與本週趨勢
- **So that** 我能快速了解自己的睡眠狀況，不需重新走記錄流程

**Story 3：重新記錄**
- **As a** 覺得剛才記錄有誤的使用者
- **I want to** 在睡眠首頁點「重新記錄」回到記錄流程
- **So that** 我可以修正睡眠數據

---

## Non-Goals（MVP 不做）

- **睡眠目標設定**（如：目標 8 小時 / 目標就寢時間）
- **鬧鐘 / 提醒功能**
- **月度 / 長期趨勢**（MVP 只做本週 7 天）
- **睡眠品質細項**（如：中途醒來次數、夢境記錄）
- **社交 / 分享功能**
- **與 HealthKit / 穿戴裝置整合**
- **週趨勢圖互動**（點擊某天看詳情）
- **深色模式適配**（先做 oat light theme）

---

## Dependencies

### Feature Dependencies
- **現有 SleepStep1-3 流程**：保持不變，SleepHome 作為前置頁面 — ✅ 已存在
- **PaceState 擴充**：需新增 `sleepWeekly` 欄位存放 7 天假資料 — 無阻擋

### Team Dependencies
- **Design**：SleepHome 視覺稿 / 空狀態設計 — MVP 可先用 code prototype 推進

### External Dependencies
- 無

**Critical Path：** 無阻擋性依賴，可直接開工。

---

## 實作要點

### 需異動的檔案

| 檔案 | 異動 |
|------|------|
| `src/components/screens/SleepScreens.tsx` | 新增 `SleepHome` component |
| `src/App.tsx` | `SCREENS` 加入 `sleepHome: SleepHome` |
| `src/Export.tsx` | `SCREEN_MAP` + `screens` 加入 sleepHome |
| `src/components/BottomBar.tsx` | 睡眠 tab 改為 `nav.push('sleepHome')` |
| `src/data/state.ts` | 新增 `sleepWeekly: number[]`（7 天假資料） |
| `src/data/i18n.ts` | 新增 SleepHome 相關文案（三語系） |

### 元件拆分（建議）

- `SleepHeroCard` — 今日睡眠卡片（含空狀態）
- `SleepWeekChart` — 本週柱狀圖（inline SVG）
- `SleepInsightCard` — 動態睡眠小語

### State 擴充

```ts
// state.ts 新增
sleepWeekly: [6, 7.5, 5, 6.5, 8, 0, 0]  // 7 天假資料，0 = 未記錄
```

---

## Risks

| Risk | Type | Impact | Mitigation |
|------|------|--------|------------|
| SleepHome 增加一層導航，使用者覺得多餘 | U | M | 空狀態時 CTA 要夠明顯，降低認知負擔 |
| 週趨勢假資料與實際記錄斷裂 | V | L | MVP 明確標示為 prototype，後續接真實資料 |
| SleepStep3 完成後 pop 回 SleepHome 的轉場不順 | U | L | 用 `replace('sleepHome')` 避免 stack 累積 |

---

## Open Questions

| Question | Assumption | How to Validate | Timeline |
|----------|-----------|-----------------|----------|
| 使用者是否需要在 SleepHome 編輯就寢/起床時間？ | MVP 不需要，記錄流程處理即可 | 觀察 dogfooding feedback | MVP 後 |
| 週趨勢圖要不要顯示「感受」維度？ | MVP 只顯示時數柱狀圖 | Design review 討論 | 開發前 |
| SleepStep3 完成後是回 SleepHome 還是回 Home？ | 回 SleepHome，讓使用者看到更新後的數據 | Prototype 測試 | 開發中 |

---

## Sign-off

| Role | Name | Approved |
|------|------|----------|
| Product | | ⬜ |
| Engineering | | ⬜ |
| Design | | ⬜ |
