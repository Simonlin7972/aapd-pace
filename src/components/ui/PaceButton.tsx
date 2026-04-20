import React from 'react';
import { FONTS, type PaceTheme } from '../../data/tokens';

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
        fontFamily: FONTS.serif, fontSize: 15, fontWeight: 700,
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
