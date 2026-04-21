import React from 'react';
import type { PaceTheme } from '../../../data/tokens';

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
