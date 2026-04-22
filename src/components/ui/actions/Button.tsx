import React from 'react';
import { FONTS, type PaceTheme } from '../../../data/tokens';

type Variant = 'primary' | 'soft' | 'text';
type State = 'default' | 'hover' | 'pressed' | 'disabled';

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 0xff}, ${(n >> 8) & 0xff}, ${n & 0xff}, ${alpha})`;
}

function getVariantStateStyles(theme: PaceTheme, variant: Variant, state: State): React.CSSProperties {
  if (variant === 'primary') {
    const base: React.CSSProperties = { background: theme.terracotta, color: theme.textOnBrand };
    if (state === 'hover') return { ...base, filter: 'brightness(0.92)' };
    if (state === 'pressed') return { ...base, filter: 'brightness(0.84)', transform: 'scale(0.97)' };
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
}> = ({ theme, children, onClick, variant = 'primary', state = 'default', disabled, style, full }) => {
  const effectiveState: State = disabled ? 'disabled' : state;
  const styles = getVariantStateStyles(theme, variant, effectiveState);
  return (
    <div
      onClick={effectiveState === 'disabled' ? undefined : onClick}
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
        ...styles,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
