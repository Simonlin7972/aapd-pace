import React from 'react';
import { FONTS, type PaceTheme } from '../../../data/tokens';

type Variant = 'primary' | 'soft' | 'text';
type State = 'default' | 'hover' | 'pressed' | 'disabled';

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 0xff}, ${(n >> 8) & 0xff}, ${n & 0xff}, ${alpha})`;
}

function darken(hex: string, factor: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = Math.max(0, Math.round(((n >> 16) & 0xff) * factor));
  const g = Math.max(0, Math.round(((n >> 8) & 0xff) * factor));
  const b = Math.max(0, Math.round((n & 0xff) * factor));
  return `rgb(${r}, ${g}, ${b})`;
}

function getVariantStateStyles(theme: PaceTheme, variant: Variant, state: State): React.CSSProperties {
  if (variant === 'primary') {
    const base: React.CSSProperties = { background: theme.terracotta, color: theme.textOnBrand };
    if (state === 'hover') return { ...base, background: darken(theme.terracotta, 0.92) };
    if (state === 'pressed') return { ...base, background: darken(theme.terracotta, 0.84), transform: 'scale(0.97)' };
    if (state === 'disabled') return {
      background: hexToRgba(theme.terracotta, 0.4),
      color: hexToRgba(theme.textOnBrand, 0.75),
      cursor: 'not-allowed',
    };
    return base;
  }
  if (variant === 'soft') {
    const base: React.CSSProperties = { background: theme.surface, color: theme.ink, border: `1px solid ${theme.line}` };
    if (state === 'hover') return { ...base, background: theme.surfaceElevated, border: `1px solid ${theme.lineStrong}` };
    if (state === 'pressed') return { ...base, background: theme.surfaceElevated, border: `1px solid ${theme.lineStrong}`, transform: 'scale(0.97)', filter: 'brightness(0.96)' };
    if (state === 'disabled') return {
      background: theme.surface,
      color: theme.inkMuted,
      border: `1px solid ${theme.line}`,
      opacity: 0.55,
      cursor: 'not-allowed',
    };
    return base;
  }
  // text
  const base: React.CSSProperties = { background: 'transparent', color: theme.terracotta };
  if (state === 'hover') return { ...base, background: hexToRgba(theme.terracotta, 0.1) };
  if (state === 'pressed') return { ...base, background: hexToRgba(theme.terracotta, 0.18), transform: 'scale(0.97)' };
  if (state === 'disabled') return { ...base, color: hexToRgba(theme.terracotta, 0.4), cursor: 'not-allowed' };
  return base;
}

export const Button: React.FC<{
  theme: PaceTheme;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  state?: State;
  disabled?: boolean;
  style?: React.CSSProperties;
  full?: boolean;
}> = ({ theme, children, onClick, variant = 'primary', state, disabled, style, full }) => {
  const [hover, setHover] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const interactiveState: State = pressed ? 'pressed' : hover ? 'hover' : 'default';
  const effectiveState: State = disabled ? 'disabled' : state ?? interactiveState;
  const styles = getVariantStateStyles(theme, variant, effectiveState);

  return (
    <div
      onClick={effectiveState === 'disabled' ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 8,
        padding: '14px 22px',
        borderRadius: Math.min(theme.radius, 20),
        fontFamily: FONTS.serif, fontSize: 15, fontWeight: 700,
        cursor: 'pointer',
        width: full ? '100%' : undefined,
        boxSizing: 'border-box',
        transition: 'transform 180ms, opacity 180ms, background 180ms, filter 180ms, border-color 180ms',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        ...styles,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
