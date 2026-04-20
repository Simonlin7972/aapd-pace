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

// Animated enter wrapper — skips animation on revisited screens
export const AnimatedEnter: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  skip?: boolean;
}> = ({ children, delay = 0, y = 10, skip }) => {
  const [on, setOn] = React.useState(skip || false);
  React.useEffect(() => {
    if (skip) return;
    const t = setTimeout(() => setOn(true), delay + 20);
    return () => clearTimeout(t);
  }, [delay, skip]);
  return (
    <div style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${y}px)`,
      transition: skip ? 'none' : 'all 420ms cubic-bezier(0.32,0.72,0,1)',
    }}>{children}</div>
  );
};

// Re-export from dedicated files
export { PageSlider } from './PageSlider';
export { SegmentedControl, SegmentedControl as PaceSegmented } from './SegmentedControl';
export { PaceButton } from './ui/PaceButton';
