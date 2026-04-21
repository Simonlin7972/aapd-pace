import React from 'react';
import type { PaceTheme } from '../../../data/tokens';
import { FONTS } from '../../../data/tokens';

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  theme: PaceTheme;
  size?: number;
  weight?: number;
  color?: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  theme,
  size = 13,
  weight = 500,
  color,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
  ...rest
}) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      {...rest}
      onMouseEnter={(e) => { setHover(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHover(false); onMouseLeave?.(e); }}
      style={{
        fontFamily: FONTS.sans,
        fontSize: size,
        fontWeight: weight,
        color: color ?? theme.terracotta,
        textDecoration: hover ? 'underline' : 'none',
        textUnderlineOffset: '6px',
        textDecorationThickness: '6px',
        cursor: 'pointer',
        transition: 'color 150ms ease',
        ...style,
      }}
    >
      {children}
    </a>
  );
};
