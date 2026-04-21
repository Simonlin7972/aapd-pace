import React from 'react';
import { FONTS } from '../../../data/tokens';

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
