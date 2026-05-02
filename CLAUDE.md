# Pace — Claude Code notes

iOS-style wellness tracking prototype. React 19 + TypeScript + Vite 7，無 UI framework、無 router、無狀態管理 lib。所有 styling 走 inline style + design tokens。

## Entry points（非 react-router）

`src/main.tsx` 靠 `window.location.pathname` 分派：

| Path | Renders | 用途 |
|---|---|---|
| `/` | `App.tsx` | 互動 prototype，裝在 380×820 iPhone frame 裡 |
| `/export` | `Export.tsx` | 所有 screens 一頁攤開（給設計 review / Figma 截圖） |
| `/design-system` | `DesignSystem.tsx` | tokens / typography / components 展示 |
| `/design-system/button` | `ButtonDoc.tsx` | Button 元件詳細文件（anatomy / variants / states / width / usage） |
| `/design-system/segmented-control` | `SegmentedControlDoc.tsx` | Segmented Control 元件詳細文件（anatomy / size / options / usage） |
| `/design-system/hours-slider` | `HoursSliderDoc.tsx` | Hours Slider 元件詳細文件（anatomy / states / range & step / usage） |
| `/design-system/mood-slider` | `MoodSliderDoc.tsx` | Mood Slider 元件詳細文件（anatomy / values / usage） |
| `/design-system/mood-heatmap` | `MoodHeatmapDoc.tsx` | Mood Heatmap 元件詳細文件（anatomy / values / data patterns / usage） |
| `/design-system/sleep-chart` | `SleepChartDoc.tsx` | Sleep Chart 元件詳細文件（anatomy / data patterns / usage） |
| `/deck` | `Deck.tsx` | 產品簡報（1920×1080，← → 翻頁，R 回第一頁） |

## 新增 screen 要動兩處

1. `SCREENS` in [src/App.tsx](src/App.tsx) — runtime 用
2. `SCREEN_MAP` + `screens` array in [src/Export.tsx](src/Export.tsx) — export 頁用

`.claude/settings.local.json` 裡有 PostToolUse hook：編輯 `src/screens/` 或 `src/data/state.ts` 時會自動提醒檢查 Export.tsx 是否需同步。

## Navigation

自製 `NavStack` in [src/components/system/NavStack.tsx](src/components/system/NavStack.tsx)。元件用 `useNav()` 取得：

- `push(name, props?)` / `pop()` / `replace(name, props?)`
- `presentSheet(name, props?)` / `dismissSheet()` — 底部抽屜（e.g. `moodSheet`）
- `useToast()` 回 `{show, node}`，把 `node` 放 screen 裡才會渲染

## Theme & tokens

- 所有 screen/元件都收 `theme: PaceTheme` prop（prop drilling，沒用 context）
- Tokens 在 [src/data/tokens.ts](src/data/tokens.ts)：`THEMES.oat` / `THEMES.oatDark` + `MOOD_SCALE` + `FONTS`
- `theme.L` 是當前語系字典（來自 [src/data/i18n.ts](src/data/i18n.ts)），新文案要同時加到每個語系
- 字型：`FONTS.serif`（Noto Serif TC，標題）/ `FONTS.sans`（Noto Sans TC，內文）
- Type scale：`FONT_SIZES`（display/h1-h6/textLg-Xs/text2Xs 共 13 階）+ `TYPE_SCALE`（帶 family/weight/lh metadata，含 `textMdMedium` / `textRgMedium` / `textSmMedium` / `textXsMedium` 4 個 Medium 變體），對應 Figma 的 `Display` / `Heading/1-6` / `Text/LG-XS` / `Text/2XS` / `Text/{MD,RG,SM,XS} Medium` 共 17 個 text styles

## State

[src/data/state.ts](src/data/state.ts) 的 `PaceState` 是 mutable object（**不是** React state），用 `Proxy` 包住。元件直接讀寫：

```tsx
state.mood = moodLive;  // 直接 mutate
```

Proxy 的 `set` trap 會同步把整包狀態寫進 `localStorage`（key：`pace.state.v1`），PWA 安裝後重開 app 資料不會歸零。只有 **頂層** 賦值會被攔截（例如 `PaceState.sleepWeekly = [...]` OK；`PaceState.sleepWeekly[0] = 3` 不會觸發寫入），新增狀態時維持整包替換的寫法。

`/export` 路徑下會寫入 fixture 值，state.ts 內 `isExportPath` guard 會跳過持久化，不會覆蓋真實使用者資料。

`sleepLog` 是相對今日生成的 fixture，`load()` 會強制覆蓋 localStorage 中的舊值，避免日期過期。新增類似的「相對時間 fixture」欄位時要在 `load()` 同步加排除。

這是 prototype 寫法，不要改成 reducer/context。

## iPhone frame 注意事項

- `IOSDevice` 固定 380×820
- 底部 34px 是 home indicator 保留區。任何浮動 UI（如 BottomBar）`bottom` 至少 28，才不會撞到

## BottomBar

[src/components/ui/navigation/BottomBar.tsx](src/components/ui/navigation/BottomBar.tsx)。只在 `HomeScreen` 渲染（sub-flow 進入後自然隱藏）。5 個 tab：今天 / 睡眠 / 運動 / 飲食 / 情緒。Responsive：item 用 `flex: 1` 均分寬度。

## Commands

```bash
npm run dev     # Vite dev server（port 5173，被佔會自動跳）
npm run build   # tsc -b + vite build（含 PWA：manifest + sw.js）
npm run lint    # eslint
npm run preview # 預覽 production build，SW 才會真的註冊
```

沒有 test suite。Node 需 20.19+ 或 22.12+（22.10.0 會警告但能跑）。

## PWA

- 用 [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) auto-generate SW（Workbox），`registerType: 'autoUpdate'`。設定在 [vite.config.ts](vite.config.ts)、SW 在 [src/main.tsx](src/main.tsx) 以 `virtual:pwa-register` 註冊
- Manifest 由 plugin 產出為 `dist/manifest.webmanifest`，`<link rel="manifest">` 自動注入 `index.html`；不要手寫 manifest
- 快取範圍：precache App Shell（JS/CSS/HTML/SVG/PNG/woff2），`navigateFallback: '/index.html'`。不做 runtime cache
- Icons 放 [public/](public/)：`icon-192.png`、`icon-512.png`、`icon-512-maskable.png`、`apple-touch-icon.png`（180）。`favicon.svg` 已在
- `theme_color` / `background_color` = `#F5F1EA`（oat）。改動 theme 主色時 [vite.config.ts](vite.config.ts) 與 [index.html](index.html) 的 `<meta name="theme-color">` 要同步
- **Standalone 偵測**：[App.tsx](src/App.tsx) 的 `detectStandalone()` 檢查 `display-mode: standalone` / iOS `navigator.standalone`，傳 `standalone` prop 給 `IOSDevice`。true 時跳過假 frame / status bar / home indicator，填滿 `100dvh`。`/export` 與 `/design-system` 不走這段（永遠有 frame，用於設計 review）
- 裝 PWA 測試要跑 `npm run preview`（`npm run dev` 不會啟動 SW）

### 新增 PWA 設定或圖示時要檢查

1. 修改 manifest 欄位（name、icons、theme_color…）→ 改 [vite.config.ts](vite.config.ts)，rebuild 後驗證 `dist/manifest.webmanifest`
2. 加新靜態檔要被 precache → 確認 `workbox.globPatterns` 涵蓋副檔名
3. theme_color 改了 → 同步 [index.html](index.html) `<meta name="theme-color">`

## Figma 同步規則

Figma 檔案：`8UlMgAIjI3XVwsujXjnGdL`（PDBC | 產品 Pace）

將 code 轉成 Figma design 時，**禁止 hardcode**，必須使用 Figma 的 design system assets：

1. **Variables** — 顏色用 `setBoundVariableForPaint` 綁定 semantic variables（`color/bg/*`、`color/text/*`、`color/brand/*`），圓角用 `setBoundVariable` 綁定 `radius/*`，間距綁定 `spacing/*`
2. **Components** — 已建立的 Component Set（如 `Button`）直接 `createInstance()`，不要手刻 frame。用 `setProperties()` 覆寫 TEXT properties
3. **Styles** — 若檔案有 text styles / effect styles，用 `textStyleId` / `effectStyleId` 套用
4. **驗證** — 完成後 `get_screenshot` 確認視覺正確，並確認切換 Figma mode 時 light/dark 自動適配

### 已建立的 Figma assets

| Asset | 位置 | 備註 |
|---|---|---|
| `primitives` collection | 本地 variables | `space/*`、`radius/*`、`color/oat/*`、`color/ink/*`、`color/mood/*` 等原始 tokens |
| `semantic` collection | 本地 variables | 兩個 mode（Default=dark, Mode=light）。`color/bg/*`、`color/text/*`、`color/brand/*`、`spacing/*`、`radius/*` |
| `Button` | Design System 頁（`50:38`） | 3 Variant × 4 State × 2 Width = 24 variants（State 含 Disabled），Label TEXT property。Hover/Pressed 用實際色票變化（Primary: `color/brand/hover` / `color/brand/deep`；Soft: `color/bg/elevated` + `color/border/strong`；Text: 10% / 18% 品牌色底），不再依 opacity。核心 base components 放在 `src/components/ui/`，命名不加 `Pace` 前綴 |
| `SegmentedControl` | Design System 頁（`91:61`） | Size（Default/Compact）× Count（2/3/4）= 6 variants。Track 綁 `color/bg/track`、outer radius 綁 `radius/segmented` |
| `MoodSlider` | Design System 頁（`96:199`） | Value 0–4 共 5 variants。Thumb fill 綁 `color/mood/{key}/color` primitive、stroke 綁 `color/bg/canvas`；gradient track 採 MOOD_SCALE hex 直填 |
| `HoursSlider` | Design System 頁（`185:405`） | State=Default / Dragging 共 2 variants（Dragging 的 thumb 34×34 + 更重陰影）。Track 綁 `color/border/subtle`、Thumb fill 綁 `color/bg/surface`、stroke 綁 `color/brand/default`；gradient fill 採 dust/300 → terracotta/500 hex 直填。Tick labels 綁 `color/text/tertiary` |
| `MoodHeatmap` | Design System 頁（`193:530`） | 1 variant（State=Default）。Card bg 綁 `color/bg/surface` + `radius/card`。7 個 tile 綁 `color/mood/{key}/color` primitive（opacity 0.85）。Header title 綁 `color/text/primary`、hint 與 day labels 綁 `color/text/tertiary`。Tile row 用 HORIZONTAL auto-layout + FILL 均分寬度（responsive） |
| `SleepChart` | Design System 頁（`199:657`） | 1 variant（State=Default）。Card bg 綁 `color/bg/surface` + `radius/card`。Curve 是兩個 `createVector`（stroke + gradient fill），path data 採 M/Q only（Figma `vectorPaths` 不支援 T，且要空白分隔、數值 round 到 0.1）。Stroke/dots 綁 `color/brand/default`；gradient 採 terracotta hex 直填（stop 難綁 variable）。Chart area 內元素用 `constraints: SCALE` 隨寬度縮放 |
| `color/bg/track` | semantic variable | SegmentedControl track 底色。Light=`color/alpha/ink/09`、Dark=`color/alpha/bone/15` |
| Typography text styles | 本地 text styles（17 個） | `Display`、`Heading/1`–`Heading/6`（Serif Medium）、`Text/LG`–`Text/XS` + `Text/2XS`（Sans Regular）、`Text/MD Medium` / `Text/RG Medium` / `Text/SM Medium` / `Text/XS Medium`（Sans Medium，UI 標籤 / 選中態用）。對應 code 的 `TYPE_SCALE` / `FONT_SIZES` |

## 元件命名與位置

完整分類原則見 [docs/component-architecture.md](docs/component-architecture.md)。核心：**以用途分類，不以複雜度分類**。

- `src/components/system/` — 產品外殼（IOSFrame、LaunchScreen、NavStack、PageSlider）
- `src/components/ui/` — 按用途分七類：`foundations/`、`actions/`、`inputs/`、`containers/`、`data-display/`、`feedback/`、`navigation/`
- `src/screens/` — 頁面（HomeScreen、SleepScreens、MoodSheet…），**不再放在 `components/` 底下**
- 命名不加 `Pace` 前綴：`Button` 而非 `PaceButton`；檔名與 export 名一致
- Figma component set 名同步遵循（e.g. Figma 中也叫 `Button`）
- 例外：`PaceTheme` / `PaceState` 等型別、`PaceSerif` / `PaceSans` / `PaceCard` / `PaceNum` 等 legacy 命名未動，但新增元件一律不帶前綴

## 釐清優先

在執行任務前先釐清模糊或不足的資訊，避免做錯方向再重來。當使用者的 prompt 屬於以下情況時，要主動提問而不是直接開工：

- prompt 模糊、目的不明確、缺少關鍵資訊（例如「幫我寫一篇文章」、「幫我改一下這個」）
- 涉及創作、設計、程式、策略規劃等有多種合理方向的任務
- 一旦做錯方向，重做成本高的任務

簡單、明確、低風險的 prompt 不需要觸發（例如：「今天天氣如何」、「幫我翻譯這句話」、「這個字怎麼拼」）。

## 風格

- Prototype 等級 — 不要加 error handling、validation、abstraction。三行重複好過早抽象
- 用 inline style，不要引入 Tailwind 或 CSS module
- Zh-TW 為主要語系，user-facing 文字走 `theme.L`
- 回覆預設 Traditional Chinese、簡短

## 文案規範

所有 user-facing 文字（標題、副標、按鈕、空狀態、toast、insight）必須遵循 [docs/copywriting.md](docs/copywriting.md)。核心原則：陪伴 > 指導、觀察 > 判斷、溫柔 > 鼓勵。新增文案時三語系（zh-TW / en / ja）同步加到 [src/data/i18n.ts](src/data/i18n.ts)。
