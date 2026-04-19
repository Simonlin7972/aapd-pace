# Pace — Claude Code notes

iOS-style wellness tracking prototype. React 19 + TypeScript + Vite 8，無 UI framework、無 router、無狀態管理 lib。所有 styling 走 inline style + design tokens。

## Entry points（非 react-router）

`src/main.tsx` 靠 `window.location.pathname` 分派：

| Path | Renders | 用途 |
|---|---|---|
| `/` | `App.tsx` | 互動 prototype，裝在 380×820 iPhone frame 裡 |
| `/export` | `Export.tsx` | 所有 screens 一頁攤開（給設計 review / Figma 截圖） |
| `/design-system` | `DesignSystem.tsx` | tokens / typography / components 展示 |

## 新增 screen 要動兩處

1. `SCREENS` in [src/App.tsx](src/App.tsx) — runtime 用
2. `SCREEN_MAP` + `screens` array in [src/Export.tsx](src/Export.tsx) — export 頁用

`.claude/settings.local.json` 裡有 PostToolUse hook：編輯 `src/components/screens/` 或 `src/data/state.ts` 時會自動提醒檢查 Export.tsx 是否需同步。

## Navigation

自製 `NavStack` in [src/components/NavStack.tsx](src/components/NavStack.tsx)。元件用 `useNav()` 取得：

- `push(name, props?)` / `pop()` / `replace(name, props?)`
- `presentSheet(name, props?)` / `dismissSheet()` — 底部抽屜（e.g. `moodSheet`）
- `useToast()` 回 `{show, node}`，把 `node` 放 screen 裡才會渲染

## Theme & tokens

- 所有 screen/元件都收 `theme: PaceTheme` prop（prop drilling，沒用 context）
- Tokens 在 [src/data/tokens.ts](src/data/tokens.ts)：`THEMES.oat` / `THEMES.oatDark` + `MOOD_SCALE` + `FONTS`
- `theme.L` 是當前語系字典（來自 [src/data/i18n.ts](src/data/i18n.ts)），新文案要同時加到每個語系
- 字型：`FONTS.serif`（Noto Serif TC，標題）/ `FONTS.sans`（Noto Sans TC，內文）

## State

[src/data/state.ts](src/data/state.ts) 的 `PaceState` 是 plain mutable object（**不是** React state）。元件直接讀寫：

```tsx
state.mood = moodLive;  // 直接 mutate
```

這是 prototype 寫法，不要改成 reducer/context。

## iPhone frame 注意事項

- `IOSDevice` 固定 380×820
- 底部 34px 是 home indicator 保留區。任何浮動 UI（如 BottomBar）`bottom` 至少 28，才不會撞到

## BottomBar

[src/components/BottomBar.tsx](src/components/BottomBar.tsx)。只在 `HomeScreen` 渲染（sub-flow 進入後自然隱藏）。5 個 tab：今天 / 睡眠 / 運動 / 飲食 / 情緒。Responsive：item 用 `flex: 1` 均分寬度。

## Commands

```bash
npm run dev     # Vite dev server（port 5173，被佔會自動跳）
npm run build   # tsc -b + vite build
npm run lint    # eslint
```

沒有 test suite。Node 需 20.19+ 或 22.12+（22.10.0 會警告但能跑）。

## 風格

- Prototype 等級 — 不要加 error handling、validation、abstraction。三行重複好過早抽象
- 用 inline style，不要引入 Tailwind 或 CSS module
- Zh-TW 為主要語系，user-facing 文字走 `theme.L`
- 回覆預設 Traditional Chinese、簡短
