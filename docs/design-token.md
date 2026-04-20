# Pace Design Tokens

兩層結構：**Primitives**（純值）→ **Semantic**（情境，引用 primitives）。

實體檔案：
- [docs/tokens/primitives.json](tokens/primitives.json) — 所有 primitive 值（mode-agnostic）
- [docs/tokens/semantic-light.json](tokens/semantic-light.json) — semantic tokens，reference 指向 light primitives
- [docs/tokens/semantic-dark.json](tokens/semantic-dark.json) — semantic tokens，reference 指向 dark primitives（path 與 light 完全一致）

DTCG 格式（`$value` / `$type`），已驗證可匯入 Figma Variables。設計 token 原始資料來自 [src/data/tokens.ts](../src/data/tokens.ts)；本 JSON 目前涵蓋 **color / space / radius**，typography / motion / shadow 只存於代碼與 [src/DesignSystem.tsx](../src/DesignSystem.tsx)，尚未匯出。

---

## 0. Conventions

- 顏色：6 位 hex（`#RRGGBB`）或 8 位 hex（`#RRGGBBAA`，含透明）。**不用 `rgba()`**，DTCG 不接受。
- 尺寸：`Npx` 字串（含 `0px`、`9999px`）。
- Reference 語法：`{path.to.token}`，**不加** `primitive.` / `semantic.` 前綴（set 名稱由檔案決定）。
- Light / Dark semantic 必須用**同一條 path**，差別只在引用的 primitive。
- `$type` 對齊 DTCG：`color` / `dimension`。

---

## 1. Primitives（`primitives.json`）

### 1.1 Color

#### `color.oat`（米白燕麥 — 主背景階）
| Token | Value | 用途暗示 |
|---|---|---|
| `color.oat.50`  | `#FBF6EC` | 最亮，elevated surface |
| `color.oat.100` | `#F7F1E5` | surface |
| `color.oat.200` | `#EFE7D8` | canvas（淺色模式底） |
| `color.oat.700` | `#3D352B` | dark elevated |
| `color.oat.800` | `#342D24` | dark surface |
| `color.oat.900` | `#2A241D` | dark canvas |

#### `color.terracotta`（赭土 — 品牌主色）
| Token | Value | 用途 |
|---|---|---|
| `color.terracotta.500` | `#A8734F` | light brand |
| `color.terracotta.300` | `#C89878` | dark brand |

#### `color.amber`（深琥珀 — 強調）
| Token | Value | 用途 |
|---|---|---|
| `color.amber.500` | `#8B5E3C` | light deep |
| `color.amber.300` | `#B08366` | dark deep |

#### `color.sage`（鼠尾草綠 — 輔助 · 積極）
| Token | Value | 用途 |
|---|---|---|
| `color.sage.500` | `#9AA590` | light |
| `color.sage.300` | `#8A9582` | dark |

#### `color.dust`（煙粉 — 輔助 · 柔和）
| Token | Value | 用途 |
|---|---|---|
| `color.dust.500` | `#C4A898` | light |
| `color.dust.300` | `#B59A8C` | dark |

#### `color.warn`（柔和橙黃 — 警示）
| Token | Value | 用途 |
|---|---|---|
| `color.warn.500` | `#C78A4F` | light |
| `color.warn.300` | `#D9A878` | dark |

#### `color.ink`（文字色階 — 暖深棕）
| Token | Value | 用途 |
|---|---|---|
| `color.ink.900` | `#3D342A` | light primary |
| `color.ink.700` | `#6E6456` | light secondary |
| `color.ink.500` | `#9A8F7E` | light / dark tertiary |
| `color.ink.100` | `#C4B8A2` | dark secondary |
| `color.ink.50`  | `#F2EADB` | dark primary |

> `ink.500` 在兩 mode 都作 tertiary。

#### `color.mood`（情緒色階 — 5 階，冷→暖，刻意不含紅）
每階提供 `color`（fill / blob）與 `dot`（slider 小點）。mode 無關。

| Step | Key | color | dot | label |
|---|---|---|---|---|
| 1 | `color.mood.low`    | `#8FA0A8` | `#7C919B` | 疲憊 |
| 2 | `color.mood.flat`   | `#A8B0A8` | `#96A096` | 平淡 |
| 3 | `color.mood.ok`     | `#C8B89E` | `#B8A68A` | 還行 |
| 4 | `color.mood.bright` | `#D9B8A8` | `#C9A494` | 輕盈 |
| 5 | `color.mood.warm`   | `#C4805C` | `#B37048` | 充滿能量 |

#### `color.alpha`（透明覆蓋 — line / divider，8-digit hex）
| Token | Value | 用途 |
|---|---|---|
| `color.alpha.ink.09`  | `#3D342A17` | light line（`ink.900` + ~9% alpha） |
| `color.alpha.ink.16`  | `#3D342A29` | light line strong（~16%） |
| `color.alpha.bone.08` | `#F2EADB14` | dark line（`ink.50` + ~8%） |
| `color.alpha.bone.15` | `#F2EADB26` | dark line strong（~15%） |

> 子鍵名沿用原 decimal alpha（`09` / `16` / `08` / `15`），只是值改用 8-digit hex 以符合 DTCG。

### 1.2 Space（4px grid）

| Token | Value | 常見用途 |
|---|---|---|
| `space.0`       | `0px`  | reset |
| `space.1`       | `4px`  | hairline |
| `space.2`       | `6px`  | mood heatmap gap |
| `space.3`       | `8px`  | chip / tag gap |
| `space.4`       | `10px` | compact gap |
| `space.5`       | `12px` | grid card gap |
| `space.6`       | `14px` | tight card padding |
| `space.7`       | `16px` | header icon gap |
| `space.8`       | `18px` | compact card padding |
| `space.9`       | `20px` | card / topbar 水平 padding |
| `space.10`      | `24px` | screen 水平 padding / section margin |
| `space.11`      | `28px` | section spacing |
| `space.12`      | `32px` | – |
| `space.14`      | `48px` | export 頁 screen 間距 |
| `space.safeTop` | `56px` | iOS status bar 安全距離 |

### 1.3 Radius

| Token | Value | 用途 |
|---|---|---|
| `radius.sm`   | `12px`   | segmented control |
| `radius.md`   | `14px`   | small radius option |
| `radius.lg`   | `20px`   | button、sheet 偏大邊 |
| `radius.xl`   | `22px`   | medium radius option |
| `radius.2xl`  | `24px`   | bottom sheet |
| `radius.3xl`  | `30px`   | large radius option（**default**） |
| `radius.full` | `9999px` | pill / chip |

> `theme.radius` 可選 14 / 22 / 30；button 走 `min(theme.radius, 20)`。

---

## 2. Semantic（`semantic-light.json` / `semantic-dark.json`）

同一 token path，Light / Dark 指向不同 primitive。

### 2.1 `color.bg.*`
| Semantic | Light → | Dark → |
|---|---|---|
| `color.bg.canvas`   | `{color.oat.200}` | `{color.oat.900}` |
| `color.bg.surface`  | `{color.oat.100}` | `{color.oat.800}` |
| `color.bg.elevated` | `{color.oat.50}`  | `{color.oat.700}` |

> `canvas` = 螢幕底；`surface` = card；`elevated` = card-on-card / sheet。

### 2.2 `color.text.*`
| Semantic | Light → | Dark → |
|---|---|---|
| `color.text.primary`   | `{color.ink.900}`        | `{color.ink.50}` |
| `color.text.secondary` | `{color.ink.700}`        | `{color.ink.100}` |
| `color.text.tertiary`  | `{color.ink.500}`        | `{color.ink.500}` |
| `color.text.inverse`   | `{color.oat.200}`        | `{color.ink.900}` |
| `color.text.brand`     | `{color.terracotta.500}` | `{color.terracotta.300}` |
| `color.text.onBrand`   | `{color.oat.50}`         | `{color.oat.50}` |

### 2.3 `color.border.*`
| Semantic | Light → | Dark → |
|---|---|---|
| `color.border.subtle` | `{color.alpha.ink.09}`   | `{color.alpha.bone.08}` |
| `color.border.strong` | `{color.alpha.ink.16}`   | `{color.alpha.bone.15}` |
| `color.border.focus`  | `{color.terracotta.500}` | `{color.terracotta.300}` |

### 2.4 `color.brand.*` / `color.accent.*`
| Semantic | Light → | Dark → | 備註 |
|---|---|---|---|
| `color.brand.default` | `{color.terracotta.500}` | `{color.terracotta.300}` | 主品牌色 |
| `color.brand.deep`    | `{color.amber.500}`      | `{color.amber.300}`      | 深琥珀、強調 |
| `color.accent.calm`   | `{color.sage.500}`       | `{color.sage.300}`       | 積極健康 |
| `color.accent.soft`   | `{color.dust.500}`       | `{color.dust.300}`       | 柔和強調 |

### 2.5 `color.feedback.*`
| Semantic | Light → | Dark → |
|---|---|---|
| `color.feedback.warn` | `{color.warn.500}` | `{color.warn.300}` |

> Pace 刻意不引入 error / success / 紅色。

### 2.6 `color.mood.*`
Light / Dark 共用。每階拆成 `fill` 與 `dot`。

| Semantic | → |
|---|---|
| `color.mood.low.fill`    | `{color.mood.low.color}` |
| `color.mood.low.dot`     | `{color.mood.low.dot}` |
| `color.mood.flat.fill`   | `{color.mood.flat.color}` |
| `color.mood.flat.dot`    | `{color.mood.flat.dot}` |
| `color.mood.ok.fill`     | `{color.mood.ok.color}` |
| `color.mood.ok.dot`      | `{color.mood.ok.dot}` |
| `color.mood.bright.fill` | `{color.mood.bright.color}` |
| `color.mood.bright.dot`  | `{color.mood.bright.dot}` |
| `color.mood.warm.fill`   | `{color.mood.warm.color}` |
| `color.mood.warm.dot`    | `{color.mood.warm.dot}` |

### 2.7 `spacing.*`
Mode 無關，兩檔數值相同。

| Semantic | → primitive |
|---|---|
| `spacing.screen.x`       | `{space.10}` — 24px 螢幕水平 padding |
| `spacing.screen.safeTop` | `{space.safeTop}` — 56px |
| `spacing.card.padding`   | `{space.9}` — 20px |
| `spacing.card.compact`   | `{space.8}` — 18px |
| `spacing.card.tight`     | `{space.6}` — 14px |
| `spacing.section.gap`    | `{space.11}` — 28px |
| `spacing.section.margin` | `{space.10}` — 24px |
| `spacing.grid.gap`       | `{space.5}` — 12px |
| `spacing.chip.gap`       | `{space.3}` — 8px |
| `spacing.heatmap.gap`    | `{space.2}` — 6px |

### 2.8 `radius.*`
Mode 無關。

| Semantic | → primitive | 用途 |
|---|---|---|
| `radius.button`    | `{radius.lg}`   | Button |
| `radius.card`      | `{radius.3xl}`  | PaceCard |
| `radius.segmented` | `{radius.sm}`   | SegmentedControl |
| `radius.sheet`     | `{radius.2xl}`  | BottomSheet |
| `radius.pill`      | `{radius.full}` | chip / pill |

---

## 3. JSON 片段範例

`primitives.json`：
```json
{
  "color": {
    "oat": {
      "200": { "$value": "#EFE7D8", "$type": "color" },
      "900": { "$value": "#2A241D", "$type": "color" }
    },
    "alpha": {
      "ink": { "09": { "$value": "#3D342A17", "$type": "color" } }
    }
  },
  "space": {
    "10":      { "$value": "24px", "$type": "dimension" },
    "safeTop": { "$value": "56px", "$type": "dimension" }
  },
  "radius": {
    "lg":   { "$value": "20px",   "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension" }
  }
}
```

`semantic-light.json`（`semantic-dark.json` path 相同、ref 不同）：
```json
{
  "color": {
    "bg": {
      "canvas": { "$value": "{color.oat.200}", "$type": "color" }
    },
    "text": {
      "primary": { "$value": "{color.ink.900}", "$type": "color" }
    }
  },
  "spacing": {
    "card": { "padding": { "$value": "{space.9}", "$type": "dimension" } }
  },
  "radius": {
    "button": { "$value": "{radius.lg}", "$type": "dimension" }
  }
}
```

---

## 4. 匯入 Figma（Tokens Studio）

1. Figma → Plugins → **Tokens Studio for Figma**。
2. Plugin → Settings → Storage → 指向 [docs/tokens/](tokens/)（multi-file）或上傳單檔。
3. Load Tokens → 會看到 3 個 token sets：`primitives` / `semantic-light` / `semantic-dark`。
4. 手動設 theme / mode：Light theme 用 `primitives + semantic-light`、Dark theme 用 `primitives + semantic-dark`，同一個 collection、兩個 mode。
5. Apply to Figma → Variables panel 出現對應 collection，每個 semantic variable 在兩個 mode 下各有值、切換 mode 會自動 alias 到對應 primitive。

> 若想分成 **Primitive** 與 **Semantic** 兩個 collection，把 primitives 獨立為一個 theme group（不分 mode），semantic 為另一個 theme group（分 Light / Dark 兩 mode）。
