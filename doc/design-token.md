# Pace Design Tokens

Pace 的 token 結構走兩層：**Primitives**（純值，不帶語意）→ **Semantic**（綁定使用情境，引用 primitives）。

設計目標：未來能直接轉為 W3C Design Tokens JSON（`$value` / `$type`），import 進 Figma Variables。Semantic token 中所有 `value` 寫成 reference（例：`{primitive.color.oat.500}`）。

來源：[src/data/tokens.ts](../src/data/tokens.ts)、[src/DesignSystem.tsx](../src/DesignSystem.tsx)。

---

## 0. Conventions

- 顏色一律小寫 hex，含 `#`。半透明用 `rgba()`。
- 尺寸一律 `Npx`（含 0px）；無單位的捨棄。
- 時間用 `Nms`。Easing 用 `cubic-bezier()`。
- 字級命名沿用 Type Scale 表中的 label（`display-large`、`page-title` …）。
- Light / Dark 兩個 mode 共用同一份 semantic key，差別在 reference 指到不同 primitive。
- 所有 `$type` 對齊 W3C DTCG：`color` / `dimension` / `fontFamily` / `fontWeight` / `duration` / `cubicBezier` / `shadow` / `typography`。

---

## 1. Primitives

純值、與情境無關。命名以「色相 + 階」為主；單值色直接給 base 名。

### 1.1 Color

#### 1.1.1 `primitive.color.oat`（米白燕麥 — 主背景階）
| Token | Value | 用途暗示 |
|---|---|---|
| `oat.50`  | `#FBF6EC` | 最亮，elevated surface |
| `oat.100` | `#F7F1E5` | surface |
| `oat.200` | `#EFE7D8` | bg（淺色模式底） |
| `oat.700` | `#3D352B` | dark surfaceElevated |
| `oat.800` | `#342D24` | dark surface |
| `oat.900` | `#2A241D` | dark bg |

#### 1.1.2 `primitive.color.terracotta`（赭土 — 品牌主色）
| Token | Value | |
|---|---|---|
| `terracotta.500` | `#A8734F` | light |
| `terracotta.300` | `#C89878` | dark |

#### 1.1.3 `primitive.color.amber`（深琥珀 — 強調）
| Token | Value | |
|---|---|---|
| `amber.500` | `#8B5E3C` | light |
| `amber.300` | `#B08366` | dark |

#### 1.1.4 `primitive.color.sage`（鼠尾草綠 — 輔助）
| Token | Value | |
|---|---|---|
| `sage.500` | `#9AA590` | light |
| `sage.300` | `#8A9582` | dark |

#### 1.1.5 `primitive.color.dust`（煙粉 — 輔助）
| Token | Value | |
|---|---|---|
| `dust.500` | `#C4A898` | light |
| `dust.300` | `#B59A8C` | dark |

#### 1.1.6 `primitive.color.warn`（柔和橙黃 — 警示）
| Token | Value | |
|---|---|---|
| `warn.500` | `#C78A4F` | light |
| `warn.300` | `#D9A878` | dark |

#### 1.1.7 `primitive.color.ink`（文字色階 — 暖深棕）
| Token | Value | |
|---|---|---|
| `ink.900` | `#3D342A` | light primary |
| `ink.700` | `#6E6456` | light secondary |
| `ink.500` | `#9A8F7E` | light tertiary（同 dark tertiary） |
| `ink.50`  | `#F2EADB` | dark primary |
| `ink.100` | `#C4B8A2` | dark secondary |

> 註：`ink.500` (`#9A8F7E`) 在 light/dark 兩個模式都當 tertiary 使用。

#### 1.1.8 `primitive.color.mood`（情緒色階 — 5 階，冷→暖，刻意不含紅）

每階提供 `color`（fill / blob）與 `dot`（slider 上的小點）。

| Step | Key | color | dot | label |
|---|---|---|---|---|
| 1 | `mood.low`    | `#8FA0A8` | `#7C919B` | 疲憊 |
| 2 | `mood.flat`   | `#A8B0A8` | `#96A096` | 平淡 |
| 3 | `mood.ok`     | `#C8B89E` | `#B8A68A` | 還行 |
| 4 | `mood.bright` | `#D9B8A8` | `#C9A494` | 輕盈 |
| 5 | `mood.warm`   | `#C4805C` | `#B37048` | 充滿能量 |

#### 1.1.9 `primitive.color.alpha`（透明覆蓋 — line / divider）
| Token | Value | 用途 |
|---|---|---|
| `alpha.ink.09`  | `rgba(61,52,42,0.09)`   | light line |
| `alpha.ink.16`  | `rgba(61,52,42,0.16)`   | light lineStrong |
| `alpha.bone.08` | `rgba(242,234,219,0.08)`| dark line |
| `alpha.bone.15` | `rgba(242,234,219,0.15)`| dark lineStrong |

> `bone` = dark mode 下的暖白色基調（對應 `ink.50` 的 RGB）。

### 1.2 Dimension — Spacing

iOS 風格的 4px-grid。Padding 與 gap 共用同一張表。

| Token | Value | 常見用途 |
|---|---|---|
| `space.0`   | `0px`  | reset |
| `space.1`   | `4px`  | hairline |
| `space.2`   | `6px`  | mood heatmap gap |
| `space.3`   | `8px`  | chip / tag gap |
| `space.4`   | `10px` | compact gap |
| `space.5`   | `12px` | grid card gap |
| `space.6`   | `14px` | tight card padding |
| `space.7`   | `16px` | header icon gap |
| `space.8`   | `18px` | compact card padding |
| `space.9`   | `20px` | card / topbar 水平 padding |
| `space.10`  | `24px` | screen 水平 padding / section margin |
| `space.11`  | `28px` | section spacing |
| `space.12`  | `32px` | – |
| `space.14`  | `48px` | export 頁 screen 間距 |
| `space.safe-top` | `56px` | iOS status bar 安全距離 |

### 1.3 Dimension — Radius

| Token | Value | 用途 |
|---|---|---|
| `radius.sm`        | `12px` | segmented control |
| `radius.md`        | `14px` | small radius option |
| `radius.lg`        | `20px` | button、bottom sheet 邊角偏大邊 |
| `radius.xl`        | `22px` | medium radius option |
| `radius.2xl`       | `24px` | bottom sheet |
| `radius.3xl`       | `30px` | large radius option（**default**） |
| `radius.full`      | `999px`| pill / chip |

> theme.radius 的可調選項是 14 / 22 / 30，預設 30。Button radius 規則是 `min(theme.radius, 20)`。

### 1.4 Dimension — Font Size

| Token | Value | 對應 Type Scale label |
|---|---|---|
| `fontSize.10` | `10px` | tiny / tag |
| `fontSize.11` | `11px` | micro label |
| `fontSize.12` | `12px` | label |
| `fontSize.13` | `13px` | caption |
| `fontSize.14` | `14px` | body small |
| `fontSize.15` | `15px` | body / topbar |
| `fontSize.18` | `18px` | subtitle |
| `fontSize.22` | `22px` | card title |
| `fontSize.26` | `26px` | section title |
| `fontSize.28` | `28px` | screen title |
| `fontSize.30` | `30px` | page title |
| `fontSize.36` | `36px` | profile name |
| `fontSize.42` | `42px` | editorial title |
| `fontSize.56` | `56px` | display / app name |
| `fontSize.64` | `64px` | display large |

### 1.5 Font Family

| Token | Value | 用途 |
|---|---|---|
| `fontFamily.serif` | `"Noto Serif TC", "Source Serif", Georgia, "PingFang TC", serif` | 標題 / display |
| `fontFamily.sans`  | `"Noto Sans TC", -apple-system, system-ui, "PingFang TC", sans-serif` | 內文 / UI |
| `fontFamily.mono`  | `"SF Mono", "Roboto Mono", ui-monospace, monospace` | 數字 / 數據 |

### 1.6 Font Weight

| Token | Value | 用途 |
|---|---|---|
| `fontWeight.regular`  | `400` | 內文 |
| `fontWeight.medium`   | `500` | 標題、按鈕、label |
| `fontWeight.semibold` | `590` | iOS 狀態列時間 |

### 1.7 Duration

| Token | Value | 用途 |
|---|---|---|
| `duration.micro`   | `120ms`  | thumb scale |
| `duration.fast`    | `180ms`  | 按下、tap scale、chip toggle |
| `duration.quick`   | `200ms`  | 顏色過渡 |
| `duration.normal`  | `220ms`  | card hover shadow |
| `duration.medium`  | `280ms`  | segmented control 滑動 |
| `duration.slow`    | `320ms`  | sheet backdrop fade |
| `duration.nav`     | `380ms`  | push / pop 轉場 |
| `duration.enter`   | `420ms`  | AnimatedEnter fade + translateY |
| `duration.fadeOut` | `900ms`  | 啟動畫面退場 |
| `duration.blob`    | `1400ms` | living blob 入場 |

### 1.8 Easing

| Token | Value | 用途 |
|---|---|---|
| `easing.standard` | `cubic-bezier(0.32, 0.72, 0, 1)` | iOS 標準（轉場、slider） |
| `easing.spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 彈性、回彈 |

### 1.9 Shadow

Shadow 是組合值；JSON export 時建議拆成 W3C `shadow` type。下表保留可貼上 CSS 的字串形式。

| Token | Value | 用途 |
|---|---|---|
| `shadow.device`     | `0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)` | iPhone frame |
| `shadow.cardHover`  | `0 8px 24px rgba(0,0,0,0.12)` | card hover |
| `shadow.knob`       | `0 1px 2px rgba(61,52,42,0.12), 0 2px 6px rgba(61,52,42,0.08)` | segmented control 指示 |
| `shadow.moodBlob`   | `0 16px 40px {primitive.color.mood.warm.color}` 透明度 0.38 | mood blob 發光 |
| `shadow.sliderThumb`| `0 8px 24px {primitive.color.mood.ok.color}` 透明度 0.44 + `0 2px 6px rgba(0,0,0,0.15)` | 拖曳中 |

> mood-related shadow 採用「mood color + alpha」的組合；JSON 輸出時拆成兩層 shadow，第一層用 mood primitive，第二層為靜態 rgba。

---

## 2. Semantic

語意層只引用 primitives。Light / Dark 共用同一個 semantic key，靠 mode 切換 reference 目標。

### 2.1 Color

#### 2.1.1 `semantic.color.bg.*`
| Semantic | Light → primitive | Dark → primitive |
|---|---|---|
| `bg.canvas`     | `{primitive.color.oat.200}` | `{primitive.color.oat.900}` |
| `bg.surface`    | `{primitive.color.oat.100}` | `{primitive.color.oat.800}` |
| `bg.elevated`   | `{primitive.color.oat.50}`  | `{primitive.color.oat.700}` |

> `canvas` = screen 底色；`surface` = card；`elevated` = card-on-card / sheet。

#### 2.1.2 `semantic.color.text.*`
| Semantic | Light | Dark |
|---|---|---|
| `text.primary`   | `{primitive.color.ink.900}` | `{primitive.color.ink.50}` |
| `text.secondary` | `{primitive.color.ink.700}` | `{primitive.color.ink.100}` |
| `text.tertiary`  | `{primitive.color.ink.500}` | `{primitive.color.ink.500}` |
| `text.inverse`   | `{primitive.color.oat.200}` | `{primitive.color.ink.900}` |
| `text.brand`     | `{semantic.color.brand.default}` | `{semantic.color.brand.default}` |
| `text.onBrand`   | `{primitive.color.oat.50}`  | `{primitive.color.oat.50}`  |

#### 2.1.3 `semantic.color.border.*`
| Semantic | Light | Dark |
|---|---|---|
| `border.subtle` | `{primitive.color.alpha.ink.09}`  | `{primitive.color.alpha.bone.08}` |
| `border.strong` | `{primitive.color.alpha.ink.16}`  | `{primitive.color.alpha.bone.15}` |
| `border.focus`  | `{semantic.color.brand.default}`   | `{semantic.color.brand.default}` |

#### 2.1.4 `semantic.color.brand.*` / `accent.*`
| Semantic | Light | Dark | 備註 |
|---|---|---|---|
| `brand.default`  | `{primitive.color.terracotta.500}` | `{primitive.color.terracotta.300}` | 主品牌色 |
| `brand.deep`     | `{primitive.color.amber.500}`      | `{primitive.color.amber.300}`      | 深琥珀，hover / 強調 |
| `accent.calm`    | `{primitive.color.sage.500}`       | `{primitive.color.sage.300}`       | 鼠尾草，積極健康 |
| `accent.soft`    | `{primitive.color.dust.500}`       | `{primitive.color.dust.300}`       | 煙粉，柔和強調 |

#### 2.1.5 `semantic.color.feedback.*`
| Semantic | Light | Dark |
|---|---|---|
| `feedback.warn` | `{primitive.color.warn.500}` | `{primitive.color.warn.300}` |

> 沒有 error / success — Pace 刻意不引入紅色，警示也以 warn 取代。

#### 2.1.6 `semantic.color.mood.*`

直接 alias 到 primitive；light/dark 共用同一份（mood 色不分 mode）。

| Semantic | → primitive |
|---|---|
| `mood.low.fill`    | `{primitive.color.mood.low.color}` |
| `mood.low.dot`     | `{primitive.color.mood.low.dot}` |
| `mood.flat.fill`   | `{primitive.color.mood.flat.color}` |
| `mood.flat.dot`    | `{primitive.color.mood.flat.dot}` |
| `mood.ok.fill`     | `{primitive.color.mood.ok.color}` |
| `mood.ok.dot`      | `{primitive.color.mood.ok.dot}` |
| `mood.bright.fill` | `{primitive.color.mood.bright.color}` |
| `mood.bright.dot`  | `{primitive.color.mood.bright.dot}` |
| `mood.warm.fill`   | `{primitive.color.mood.warm.color}` |
| `mood.warm.dot`    | `{primitive.color.mood.warm.dot}` |

### 2.2 Spacing

語意層按「使用情境」命名；JSON export 時可選擇是否同時保留 primitive 與 semantic spacing。

| Semantic | → primitive |
|---|---|
| `spacing.screen.x`        | `{primitive.space.10}` （24px 螢幕水平 padding） |
| `spacing.screen.safeTop`  | `{primitive.space.safe-top}` （56px） |
| `spacing.card.padding`    | `{primitive.space.9}` （20px） |
| `spacing.card.compact`    | `{primitive.space.8}` （18px） |
| `spacing.card.tight`      | `{primitive.space.6}` （14px） |
| `spacing.section.gap`     | `{primitive.space.11}` （28px） |
| `spacing.section.margin`  | `{primitive.space.10}` （24px） |
| `spacing.grid.gap`        | `{primitive.space.5}` （12px） |
| `spacing.chip.gap`        | `{primitive.space.3}` （8px） |
| `spacing.heatmap.gap`     | `{primitive.space.2}` （6px） |

### 2.3 Radius

| Semantic | → primitive | 用途 |
|---|---|---|
| `radius.button`    | `{primitive.radius.lg}`  | PaceButton |
| `radius.card`      | `{primitive.radius.3xl}` | PaceCard（隨 theme.radius 可變） |
| `radius.segmented` | `{primitive.radius.sm}`  | SegmentedControl |
| `radius.sheet`     | `{primitive.radius.2xl}` | BottomSheet 上緣 |
| `radius.pill`      | `{primitive.radius.full}`| chip / pill |

### 2.4 Typography (composed tokens)

每個 typography token 都是 family + size + weight + lineHeight 的組合（W3C `typography` type）。

| Semantic | family | size | weight | lineHeight |
|---|---|---|---|---|
| `text.displayLarge`    | `serif` | `64px` | `400` | `1.1` |
| `text.displayApp`      | `serif` | `56px` | `500` | `1.1` |
| `text.editorial`       | `serif` | `42px` | `400` | `1.2` |
| `text.profileName`     | `serif` | `36px` | `400` | `1.2` |
| `text.pageTitle`       | `serif` | `30px` | `500` | `1.25` |
| `text.screenTitle`     | `serif` | `28px` | `500` | `1.3` |
| `text.sectionTitle`    | `serif` | `26px` | `500` | `1.3` |
| `text.cardTitle`       | `serif` | `22px` | `500` | `1.35` |
| `text.subtitle`        | `serif` | `18px` | `400` | `1.5` |
| `text.body`            | `sans`  | `15px` | `400` | `1.6` |
| `text.bodySmall`       | `sans`  | `14px` | `400` | `1.6` |
| `text.caption`         | `sans`  | `13px` | `400` | `1.5` |
| `text.label`           | `sans`  | `12px` | `400` | `1.4` |
| `text.microLabel`      | `sans`  | `11px` | `400` | `1.4` |
| `text.tiny`            | `sans`  | `10px` | `400` | `1.3` |
| `text.numeric`         | `mono`  | n/a    | `400` | `1.4` |

> `text.numeric` 是基底；實際使用時搭配某個 fontSize（例：`text.numeric` + `fontSize.36` 組成 PaceNum 的 hero 數字）。

### 2.5 Motion

| Semantic | duration | easing | 場景 |
|---|---|---|---|
| `motion.tap`        | `{duration.fast}`    | `{easing.standard}` | 按鈕、card 點擊 |
| `motion.toggle`     | `{duration.medium}`  | `{easing.standard}` | segmented control |
| `motion.transition` | `{duration.normal}`  | `{easing.standard}` | hover、shadow |
| `motion.nav`        | `{duration.nav}`     | `{easing.standard}` | 頁面 push / pop |
| `motion.enter`      | `{duration.enter}`   | `{easing.spring}`   | AnimatedEnter |
| `motion.sheet`      | `{duration.slow}`    | `{easing.standard}` | bottom sheet |
| `motion.spring`     | `{duration.fast}`    | `{easing.spring}`   | 彈性回饋 |
| `motion.blob`       | `{duration.blob}`    | `{easing.spring}`   | living blob 入場 |

### 2.6 Elevation

| Semantic | → primitive |
|---|---|
| `elevation.device`   | `{primitive.shadow.device}` |
| `elevation.cardHover`| `{primitive.shadow.cardHover}` |
| `elevation.knob`     | `{primitive.shadow.knob}` |
| `elevation.moodBlob` | `{primitive.shadow.moodBlob}` |
| `elevation.sliderThumb` | `{primitive.shadow.sliderThumb}` |

---

## 3. JSON 產出範例（節錄）

實際 export 時可依下列骨架展開所有 token：

```json
{
  "primitive": {
    "color": {
      "oat": {
        "50":  { "$value": "#FBF6EC", "$type": "color" },
        "100": { "$value": "#F7F1E5", "$type": "color" },
        "200": { "$value": "#EFE7D8", "$type": "color" },
        "700": { "$value": "#3D352B", "$type": "color" },
        "800": { "$value": "#342D24", "$type": "color" },
        "900": { "$value": "#2A241D", "$type": "color" }
      },
      "terracotta": {
        "500": { "$value": "#A8734F", "$type": "color" },
        "300": { "$value": "#C89878", "$type": "color" }
      },
      "ink": {
        "900": { "$value": "#3D342A", "$type": "color" },
        "700": { "$value": "#6E6456", "$type": "color" },
        "500": { "$value": "#9A8F7E", "$type": "color" },
        "100": { "$value": "#C4B8A2", "$type": "color" },
        "50":  { "$value": "#F2EADB", "$type": "color" }
      },
      "mood": {
        "warm": {
          "color": { "$value": "#C4805C", "$type": "color" },
          "dot":   { "$value": "#B37048", "$type": "color" }
        }
      },
      "alpha": {
        "ink": {
          "09": { "$value": "rgba(61,52,42,0.09)", "$type": "color" },
          "16": { "$value": "rgba(61,52,42,0.16)", "$type": "color" }
        }
      }
    },
    "space": {
      "0":  { "$value": "0px",  "$type": "dimension" },
      "3":  { "$value": "8px",  "$type": "dimension" },
      "10": { "$value": "24px", "$type": "dimension" }
    },
    "radius": {
      "sm":   { "$value": "12px", "$type": "dimension" },
      "lg":   { "$value": "20px", "$type": "dimension" },
      "3xl":  { "$value": "30px", "$type": "dimension" },
      "full": { "$value": "9999px", "$type": "dimension" }
    },
    "fontSize": {
      "15": { "$value": "15px", "$type": "dimension" },
      "30": { "$value": "30px", "$type": "dimension" }
    },
    "fontFamily": {
      "serif": { "$value": "Noto Serif TC, Source Serif, Georgia, PingFang TC, serif", "$type": "fontFamily" },
      "sans":  { "$value": "Noto Sans TC, -apple-system, system-ui, PingFang TC, sans-serif", "$type": "fontFamily" }
    },
    "fontWeight": {
      "regular":  { "$value": 400, "$type": "fontWeight" },
      "medium":   { "$value": 500, "$type": "fontWeight" },
      "semibold": { "$value": 590, "$type": "fontWeight" }
    },
    "duration": {
      "fast":   { "$value": "180ms", "$type": "duration" },
      "normal": { "$value": "220ms", "$type": "duration" },
      "nav":    { "$value": "380ms", "$type": "duration" }
    },
    "easing": {
      "standard": { "$value": [0.32, 0.72, 0, 1],     "$type": "cubicBezier" },
      "spring":   { "$value": [0.34, 1.56, 0.64, 1],  "$type": "cubicBezier" }
    }
  },

  "semantic": {
    "color": {
      "bg": {
        "canvas":   { "$value": "{primitive.color.oat.200}", "$type": "color" },
        "surface":  { "$value": "{primitive.color.oat.100}", "$type": "color" },
        "elevated": { "$value": "{primitive.color.oat.50}",  "$type": "color" }
      },
      "text": {
        "primary":   { "$value": "{primitive.color.ink.900}", "$type": "color" },
        "secondary": { "$value": "{primitive.color.ink.700}", "$type": "color" },
        "tertiary":  { "$value": "{primitive.color.ink.500}", "$type": "color" },
        "brand":     { "$value": "{semantic.color.brand.default}", "$type": "color" }
      },
      "border": {
        "subtle": { "$value": "{primitive.color.alpha.ink.09}", "$type": "color" },
        "strong": { "$value": "{primitive.color.alpha.ink.16}", "$type": "color" },
        "focus":  { "$value": "{semantic.color.brand.default}", "$type": "color" }
      },
      "brand": {
        "default": { "$value": "{primitive.color.terracotta.500}", "$type": "color" },
        "deep":    { "$value": "{primitive.color.amber.500}",      "$type": "color" }
      },
      "feedback": {
        "warn": { "$value": "{primitive.color.warn.500}", "$type": "color" }
      }
    },
    "radius": {
      "button":    { "$value": "{primitive.radius.lg}",   "$type": "dimension" },
      "card":      { "$value": "{primitive.radius.3xl}",  "$type": "dimension" },
      "segmented": { "$value": "{primitive.radius.sm}",   "$type": "dimension" },
      "pill":      { "$value": "{primitive.radius.full}", "$type": "dimension" }
    },
    "text": {
      "screenTitle": {
        "$type": "typography",
        "$value": {
          "fontFamily": "{primitive.fontFamily.serif}",
          "fontSize":   "{primitive.fontSize.28}",
          "fontWeight": "{primitive.fontWeight.medium}",
          "lineHeight": 1.3
        }
      },
      "body": {
        "$type": "typography",
        "$value": {
          "fontFamily": "{primitive.fontFamily.sans}",
          "fontSize":   "{primitive.fontSize.15}",
          "fontWeight": "{primitive.fontWeight.regular}",
          "lineHeight": 1.6
        }
      }
    },
    "motion": {
      "nav": {
        "$type": "transition",
        "$value": {
          "duration": "{primitive.duration.nav}",
          "timingFunction": "{primitive.easing.standard}"
        }
      }
    }
  }
}
```

---

## 4. Mode 切換建議（給 Figma Variables）

在 Figma Variables 中：

1. 建一個 collection `pace-tokens`，加兩個 mode：`light`、`dark`。
2. **Primitives** 全部放 mode-agnostic（單一值）。例外：成對 light/dark 的色（terracotta.500 / terracotta.300 等）也都放在 primitive 層，名稱保留。
3. **Semantic** 才依 mode 決定 reference：
   - `bg.canvas` 在 `light` → `oat.200`，在 `dark` → `oat.900`
   - `text.primary` 在 `light` → `ink.900`，在 `dark` → `ink.50`
   - 其餘 semantic 同樣兩個 mode 各設一條 alias。

這樣 Figma 端切 mode 就能整片畫面換色，不用重複貼值。
