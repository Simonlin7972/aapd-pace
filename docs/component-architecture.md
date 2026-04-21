# Pace — Component Architecture

> 本文件定義 Pace 前端元件的分類原則與目錄結構，作為重構與後續新增元件的依據。
> 核心精神：**以用途（intent）分類，而非以複雜度分類。**

---

## 現狀與問題

目前 `src/components/` 的結構是：

```
components/
├── screens/              # 各頁面
├── ui/                   # 只放了 3 個元件（Button、MoodSlider、SegmentedControl）
├── BlobShape.tsx         # 裝飾形狀
├── BottomBar.tsx         # 底部導覽
├── Icons.tsx             # 圖示
├── IOSFrame.tsx          # iOS 外框模擬
├── LaunchScreen.tsx      # 啟動畫面
├── NavStack.tsx          # 導覽堆疊容器
├── PageSlider.tsx        # 頁面切換
├── Sliders.tsx           # 滑桿集合
└── UI.tsx                # 未知用途（需釐清）
```

**三個具體問題：**

1. **`ui/` 形同虛設**。只有 3 個元件在裡面，其他 UI 元件散落在根目錄。
2. **根目錄混了兩種東西**。`Icons`、`Sliders` 是內容元件；`IOSFrame`、`LaunchScreen`、`NavStack`、`PageSlider` 是系統級的產品外殼。兩者不該平行。
3. **分類依據缺乏原則**。新增元件時沒有明確的判斷規則，長期會繼續惡化。

---

## 分類原則

**以用途分類，不以複雜度分類。**

對齊 Material Design 3、Apple HIG、Shopify Polaris、IBM Carbon 等主流設計系統的做法——每個分類回答一個問題：**「這個元件，讓使用者做什麼 / 看到什麼？」**

Pace 的元件分兩大層級：

- **System（系統層）**：產品的外殼與骨架。使用者不會意識到它「是一個元件」，但它決定了整個產品的呈現方式。
- **UI（內容層）**：使用者真正互動的元件。依用途再分七類。

---

## 新目錄結構

```
src/
├── components/
│   ├── system/               # 系統級元件（產品外殼）
│   │   ├── IOSFrame.tsx
│   │   ├── LaunchScreen.tsx
│   │   ├── NavStack.tsx
│   │   └── PageSlider.tsx
│   │
│   └── ui/                   # UI 元件（按用途分類）
│       ├── foundations/      # 視覺 token 與原子元素
│       ├── actions/          # 主動操作
│       ├── inputs/           # 感受與資料輸入
│       ├── containers/       # 內容容器
│       ├── data-display/     # 資料呈現
│       ├── feedback/         # 系統回饋
│       └── navigation/       # 頁內導覽
│
├── screens/                  # 頁面（從 components 提升出來）
│   ├── sleep/
│   ├── exercise/
│   ├── nutrition/
│   └── mood/
│
└── data/                     # 資料層（維持原狀）
    ├── db.ts
    ├── i18n.ts
    ├── state.ts
    └── tokens.ts
```

**重要調整：**

- **`screens/` 從 `components/` 提升到 `src/` 根目錄**。screens 不是元件，是頁面容器；把它和元件分開，語意更清楚。
- **`system/` 獨立出來**。iOS Frame、啟動畫面、導覽堆疊這類「產品外殼」不跟按鈕、卡片混在一起。
- **`ui/` 底下才按用途細分**。過去只有 3 個檔案的 `ui/`，現在會是主要的元件家園。

---

## System — 系統級元件

處理產品的外殼、啟動流程、頁面切換。**不含內容邏輯，只提供框架。**

| 元件 | 說明 |
|---|---|
| `IOSFrame` | 模擬 iOS 裝置外框（開發預覽用） |
| `LaunchScreen` | App 啟動畫面 |
| `NavStack` | 導覽堆疊容器，管理頁面層級 |
| `PageSlider` | 頁面左右切換動畫容器 |

**判斷是否屬於 System**：拿掉這個元件，產品「還能運作但不像一個 app」——那它就是 system。

---

## UI — 七大分類

### 1. Foundations — 基礎視覺系統

設計 token 層級的原子元素，構成整個系統的視覺語言。**不是互動元件。**

| 元件 | 目前位置 | 新位置 |
|---|---|---|
| Icons | `components/Icons.tsx` | `ui/foundations/Icons.tsx` |
| Text primitives | （待建立） | `ui/foundations/Text.tsx` |
| Dividers | （待建立） | `ui/foundations/Divider.tsx` |
| Color indicators | （待建立） | `ui/foundations/ColorDot.tsx` |
| BlobShape | `components/BlobShape.tsx` | `ui/foundations/BlobShape.tsx` |

> `BlobShape` 放在 Foundations 是因為它是視覺裝飾元素，沒有互動邏輯。

---

### 2. Actions — 主動操作

使用者主動觸發的操作元件。

| 元件 | 目前位置 | 新位置 |
|---|---|---|
| Button | `components/ui/Button.tsx` | `ui/actions/Button.tsx` |
| Chips & pills | （待建立） | `ui/actions/Chip.tsx` |
| Settings row | （待建立） | `ui/actions/SettingsRow.tsx` |

---

### 3. Inputs — 感受與資料輸入

**Pace 的核心分類。** 所有讓使用者輸入狀態、感受、數據的元件都歸在這裡。獨立成類，凸顯「感受優先」的產品主張。

| 元件 | 目前位置 | 新位置 |
|---|---|---|
| MoodSlider | `components/ui/MoodSlider.tsx` | `ui/inputs/MoodSlider.tsx` |
| SegmentedControl | `components/ui/SegmentedControl.tsx` | `ui/inputs/SegmentedControl.tsx` |
| Sliders（時數等） | `components/Sliders.tsx` | 拆分到 `ui/inputs/` 底下 |
| Satisfaction cards | （待建立） | `ui/inputs/SatisfactionCard.tsx` |

> **`Sliders.tsx` 需要拆分**。目前看起來是多個滑桿寫在同一檔，建議拆成 `MoodSlider`、`HoursSlider`、`IntensitySlider` 等獨立檔案，方便個別維護與 import。

---

### 4. Containers — 內容容器

承載內容的外殼。

| 元件 | 目前位置 | 新位置 |
|---|---|---|
| Card | （待建立） | `ui/containers/Card.tsx` |
| Dimension card | （待建立） | `ui/containers/DimensionCard.tsx` |
| Insight card | （待建立） | `ui/containers/InsightCard.tsx` |
| Quote block | （待建立） | `ui/containers/QuoteBlock.tsx` |
| Bottom sheet | （待建立） | `ui/containers/BottomSheet.tsx` |

---

### 5. Data Display — 資料呈現

把紀錄變成可讀的視覺。**唯讀，不含輸入邏輯。**

| 元件 | 目前位置 | 新位置 |
|---|---|---|
| Stats grid | （待建立） | `ui/data-display/StatsGrid.tsx` |
| Profile stats | （待建立） | `ui/data-display/ProfileStats.tsx` |
| Mood heatmap | （待建立） | `ui/data-display/MoodHeatmap.tsx` |
| Sleep trend chart | （待建立） | `ui/data-display/SleepTrendChart.tsx` |
| Activity calendar | （待建立） | `ui/data-display/ActivityCalendar.tsx` |

---

### 6. Feedback — 系統回饋

系統給使用者的溫柔回應，對應 Pace 的「陪伴式提醒」設計哲學。

| 元件 | 目前位置 | 新位置 |
|---|---|---|
| Toast | （待建立） | `ui/feedback/Toast.tsx` |
| Hint line | （待建立） | `ui/feedback/HintLine.tsx` |
| Animated enter | （待建立） | `ui/feedback/AnimatedEnter.tsx` |

> **設計原則提醒**：這類元件的文案與互動必須避免績效語言（「還差 800 步」），改用陪伴語氣（「要不要起來走走？」）。

---

### 7. Navigation — 頁內導覽

頁面層級的結構元件。（**注意：跨頁面的 `NavStack` 和 `PageSlider` 歸 System，不在這裡。**）

| 元件 | 目前位置 | 新位置 |
|---|---|---|
| BottomBar | `components/BottomBar.tsx` | `ui/navigation/BottomBar.tsx` |
| Top bar | （待建立） | `ui/navigation/TopBar.tsx` |

---

## 特殊檔案處理

重構時，以下檔案需要額外釐清：

| 檔案 | 現況 | 建議處理 |
|---|---|---|
| `components/UI.tsx` | 用途不明 | 打開檢查內容，如果是 barrel export（集中 re-export），改為 `ui/index.ts`；如果是實際元件，依功能歸類 |
| `components/Sliders.tsx` | 多個滑桿混在一起 | 拆成獨立檔案，各自移到 `ui/inputs/` |
| `components/Icons.tsx` | 集中式圖示 | 保留集中式，移到 `ui/foundations/Icons.tsx`；若檔案過大可考慮依類別拆分 |

---

## 重構流程

為了降低團隊協作成本與 PR conflict 風險，建議分階段執行，**每個階段一個 PR**：

### Phase 1 — 建立新結構（不動舊碼）
建立 `src/components/system/`、`src/components/ui/` 下七個子目錄，以及 `src/screens/`。舊檔案暫時保留原位。

### Phase 2 — 遷移 System 層
移動 `IOSFrame`、`LaunchScreen`、`NavStack`、`PageSlider` 到 `components/system/`，更新所有 import。
> 這批影響範圍通常只有 `App.tsx` 或最外層 entry，PR 會很乾淨。

### Phase 3 — 遷移 screens
把 `components/screens/` 提升到 `src/screens/`，更新 import。

### Phase 4 — 遷移既有 UI 元件
依以下順序，一次一個 PR：
1. Foundations（Icons、BlobShape）— 影響範圍最大，但改動單純
2. Actions（Button）
3. Inputs（MoodSlider、SegmentedControl、拆分 Sliders）
4. Navigation（BottomBar）

每次遷移時：
- 移動檔案到新目錄
- 更新所有 import 路徑
- PR 描述中列出變更清單

### Phase 5 — 清理
- 移除空的舊 `components/ui/` 目錄
- 刪除或釐清 `UI.tsx`
- 更新 `README.md` 的目錄說明

### Phase 6 — 後續新元件
依照下方的判斷流程，新元件直接加到對應分類，不再進舊目錄。

---

## 新增元件時的判斷流程

```
新元件要加到哪裡？
│
├─ 是產品外殼 / 啟動流程 / 跨頁面容器嗎？ → system/
│
└─ 是內容元件嗎？（繼續判斷）
    │
    ├─ 是視覺 token 或字級 / 圖示嗎？ → ui/foundations/
    ├─ 使用者會主動點擊觸發動作嗎？ → ui/actions/
    ├─ 使用者要輸入狀態或數據嗎？ → ui/inputs/
    ├─ 是用來裝內容的外殼嗎？ → ui/containers/
    ├─ 是呈現已有資料的圖表 / 統計嗎？ → ui/data-display/
    ├─ 是系統給使用者的回應嗎？ → ui/feedback/
    └─ 是頁內導覽結構嗎？ → ui/navigation/
```

**邊界情況的處理原則**：如果一個元件同時符合兩類，優先用「使用者看到它時最主要的感受」來判斷。

舉例：`InsightCard` 雖然包含統計數據，但它本質是一個「容器」——統計數字只是它的內容，所以歸 `containers/` 而不是 `data-display/`。反之，`SleepTrendChart` 本質是圖表，就算外面包了卡片外框，也歸 `data-display/`。

---

## 命名慣例

- 資料夾：`kebab-case`（`data-display/`、`mood-slider/`）
- 元件檔案：`PascalCase.tsx`（`MoodSlider.tsx`）
- 單檔元件：直接放在分類資料夾下（`ui/actions/Button.tsx`）
- 複雜元件：可建立同名資料夾，含 `index.ts` 統一 export
  ```
  ui/inputs/MoodSlider/
  ├── index.ts
  ├── MoodSlider.tsx
  └── MoodSliderThumb.tsx
  ```

---

## 參考來源

分類方式綜合自以下主流設計系統的用途導向思維：

- Material Design 3（Google）— Actions / Communication / Containment / Navigation / Selection
- Apple Human Interface Guidelines — Presentation / Layout / Menus & Actions / Selection & Input / Status
- Shopify Polaris — Actions / Forms / Feedback indicators / Structure
- IBM Carbon — 按使用情境分組

Pace 並未完全照搬任何一套，而是根據產品的「感受優先、去監控化」原則，調整出適合自己的七個分類 + 一個 System 層。
