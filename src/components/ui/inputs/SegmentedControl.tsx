import React from 'react';
import { FONTS, type PaceTheme } from '../../../data/tokens';

// Segmented control (iOS-style)
export const SegmentedControl: React.FC<{
  theme: PaceTheme;
  value: string;
  onChange: (v: string) => void;
  options: { k: string; l: string }[];
  compact?: boolean;
}> = ({ theme, value, onChange, options, compact = false }) => {
  const idx = options.findIndex(o => o.k === value);
  const pct = 100 / options.length;
  const hex = (theme.bg || '#000').replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const isDark = lum < 0.5;
  return (
    <div style={{
      position: 'relative',
      background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(61,52,42,0.12)',
      borderRadius: 12, padding: 3,
      display: 'flex', height: compact ? 32 : 36,
    }}>
      <div style={{
        position: 'absolute', top: 3, bottom: 3,
        left: `calc(${idx * pct}% + 3px)`,
        width: `calc(${pct}% - 6px)`,
        background: theme.surfaceElevated || theme.surface,
        borderRadius: 9,
        transition: 'left 280ms cubic-bezier(0.32,0.72,0,1)',
      }} />
      {options.map(o => (
        <div key={o.k} onClick={() => onChange(o.k)} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', cursor: 'pointer',
          fontFamily: FONTS.sans, fontSize: compact ? 12 : 13,
          color: value === o.k ? theme.ink : theme.inkSoft,
          fontWeight: value === o.k ? 500 : 400,
          transition: 'color 200ms ease',
        }}>{o.l}</div>
      ))}
    </div>
  );
};
