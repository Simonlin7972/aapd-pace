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
