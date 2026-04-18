import React from 'react';
import { FONTS, type PaceTheme } from '../data/tokens';

// Card container
export const PaceCard: React.FC<{
  theme: PaceTheme;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
  padding?: number;
  tone?: 'surface' | 'elevated';
}> = ({ theme, style, children, onClick, padding = 20, tone = 'surface' }) => (
  <div
    onClick={onClick}
    style={{
      background: tone === 'elevated' ? theme.surfaceElevated : theme.surface,
      borderRadius: theme.radius,
      padding,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 220ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 220ms',
      ...style,
    }}
  >
    {children}
  </div>
);

// Serif heading
export const PaceSerif: React.FC<{
  children: React.ReactNode;
  size?: number;
  weight?: number;
  style?: React.CSSProperties;
  color?: string;
}> = ({ children, size = 24, weight = 500, style, color }) => (
  <div style={{
    fontFamily: FONTS.serif,
    fontSize: size,
    fontWeight: weight,
    lineHeight: 1.35,
    letterSpacing: '0.01em',
    color,
    ...style,
  }}>{children}</div>
);

// Sans body text
export const PaceSans: React.FC<{
  children: React.ReactNode;
  size?: number;
  weight?: number;
  style?: React.CSSProperties;
  color?: string;
  onClick?: () => void;
}> = ({ children, size = 15, weight = 400, style, color, onClick }) => (
  <div onClick={onClick} style={{
    fontFamily: FONTS.sans,
    fontSize: size,
    fontWeight: weight,
    lineHeight: 1.55,
    color,
    ...style,
  }}>{children}</div>
);

// Monospace numbers
export const PaceNum: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
  color?: string;
}> = ({ children, size = 14, style, color }) => (
  <span style={{
    fontFamily: FONTS.mono,
    fontSize: size,
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-0.01em',
    color,
    ...style,
  }}>{children}</span>
);

// Primary button
export const PaceButton: React.FC<{
  theme: PaceTheme;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'soft' | 'text';
  style?: React.CSSProperties;
  full?: boolean;
}> = ({ theme, children, onClick, variant = 'primary', style, full }) => {
  const styles = variant === 'primary'
    ? { background: theme.terracotta, color: '#FBF6EC' }
    : variant === 'soft'
    ? { background: theme.surface, color: theme.ink, border: `1px solid ${theme.line}` }
    : { background: 'transparent', color: theme.terracotta };
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 8,
        padding: '14px 22px',
        borderRadius: Math.min(theme.radius, 20),
        fontFamily: FONTS.sans, fontSize: 15, fontWeight: 500,
        cursor: 'pointer',
        width: full ? '100%' : undefined,
        boxSizing: 'border-box',
        transition: 'transform 180ms, opacity 180ms',
        ...styles,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Animated enter wrapper
export const AnimatedEnter: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
}> = ({ children, delay = 0, y = 10 }) => {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setOn(true), delay + 20);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${y}px)`,
      transition: 'all 420ms cubic-bezier(0.32,0.72,0,1)',
    }}>{children}</div>
  );
};

// Segmented control (iOS-style)
export const PaceSegmented: React.FC<{
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
      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,52,42,0.12)',
      borderRadius: 12, padding: 3,
      display: 'flex', height: compact ? 32 : 36,
    }}>
      <div style={{
        position: 'absolute', top: 3, bottom: 3,
        left: `calc(${idx * pct}% + 3px)`,
        width: `calc(${pct}% - 6px)`,
        background: theme.surfaceElevated || theme.surface,
        borderRadius: 9,
        boxShadow: isDark
          ? '0 1px 2px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.1)'
          : '0 1px 2px rgba(61,52,42,0.12), 0 2px 6px rgba(61,52,42,0.08)',
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
