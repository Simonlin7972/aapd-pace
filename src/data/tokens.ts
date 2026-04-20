// Pace design tokens — warm, desaturated, 文件驅動
// 溫柔優先、去飽和、米白燕麥主色、鼠尾草綠+煙粉輔色、赭土深琥珀強調、柔和橙黃警示

export interface PaceTheme {
  name: string;
  bg: string;
  surface: string;
  surfaceElevated: string;
  sage: string;
  dust: string;
  terracotta: string;
  amber: string;
  warn: string;
  ink: string;
  inkSoft: string;
  inkMuted: string;
  line: string;
  lineStrong: string;
  textOnBrand: string;
  radius: number;
  lang: string;
  L: Record<string, any>;
  profileVariant: string;
}

export const THEMES = {
  oat: {
    name: '燕麥',
    bg: '#EFE7D8',
    surface: '#F7F1E5',
    surfaceElevated: '#FBF6EC',
    sage: '#9AA590',
    dust: '#C4A898',
    terracotta: '#A8734F',
    amber: '#8B5E3C',
    warn: '#C78A4F',
    ink: '#3D342A',
    inkSoft: '#6E6456',
    inkMuted: '#9A8F7E',
    line: 'rgba(61,52,42,0.09)',
    lineStrong: 'rgba(61,52,42,0.16)',
    textOnBrand: '#FBF6EC',
  },
  oatDark: {
    name: '燕麥·夜',
    bg: '#2A241D',
    surface: '#342D24',
    surfaceElevated: '#3D352B',
    sage: '#8A9582',
    dust: '#B59A8C',
    terracotta: '#C89878',
    amber: '#B08366',
    warn: '#D9A878',
    ink: '#F2EADB',
    inkSoft: '#C4B8A2',
    inkMuted: '#8A7F6E',
    line: 'rgba(242,234,219,0.08)',
    lineStrong: 'rgba(242,234,219,0.15)',
    textOnBrand: '#2A241D',
  },
};

// 情緒色溫（冷→暖）— 五個等級，不含紅
export const MOOD_SCALE = [
  { key: 'low', label: '疲憊', color: '#8FA0A8', dot: '#7C919B' },
  { key: 'flat', label: '平淡', color: '#A8B0A8', dot: '#96A096' },
  { key: 'ok', label: '還行', color: '#C8B89E', dot: '#B8A68A' },
  { key: 'bright', label: '輕盈', color: '#D9B8A8', dot: '#C9A494' },
  { key: 'warm', label: '充滿能量', color: '#C4805C', dot: '#B37048' },
];

export const FONTS = {
  serif: '"Noto Serif TC", "Source Serif", Georgia, "PingFang TC", serif',
  sans: '"Noto Sans TC", -apple-system, system-ui, "PingFang TC", sans-serif',
  mono: '"SF Mono", "Roboto Mono", ui-monospace, monospace',
};

// Type scale — Display + Heading 1-6 + Text LG/MD/RG/SM/XS
export const FONT_SIZES = {
  display: 56,
  h1: 42,
  h2: 36,
  h3: 30,
  h4: 26,
  h5: 22,
  h6: 18,
  textLg: 15,
  textMd: 14,
  textRg: 13,
  textSm: 12,
  textXs: 11,
} as const;

export const TYPE_SCALE = [
  { key: 'display', label: 'Display',   size: 56, family: 'serif', weight: 500, lh: 1.3 },
  { key: 'h1',      label: 'Heading 1', size: 42, family: 'serif', weight: 500, lh: 1.3 },
  { key: 'h2',      label: 'Heading 2', size: 36, family: 'serif', weight: 500, lh: 1.3 },
  { key: 'h3',      label: 'Heading 3', size: 30, family: 'serif', weight: 500, lh: 1.3 },
  { key: 'h4',      label: 'Heading 4', size: 26, family: 'serif', weight: 500, lh: 1.3 },
  { key: 'h5',      label: 'Heading 5', size: 22, family: 'serif', weight: 500, lh: 1.35 },
  { key: 'h6',      label: 'Heading 6', size: 18, family: 'serif', weight: 500, lh: 1.4 },
  { key: 'textLg',  label: 'Text LG',   size: 15, family: 'sans',  weight: 400, lh: 1.55 },
  { key: 'textMd',  label: 'Text MD',   size: 14, family: 'sans',  weight: 400, lh: 1.55 },
  { key: 'textRg',  label: 'Text RG',   size: 13, family: 'sans',  weight: 400, lh: 1.5 },
  { key: 'textSm',  label: 'Text SM',   size: 12, family: 'sans',  weight: 400, lh: 1.5 },
  { key: 'textXs',  label: 'Text XS',   size: 11, family: 'sans',  weight: 400, lh: 1.4 },
] as const;
