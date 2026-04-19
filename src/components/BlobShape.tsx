import React from 'react';

const BLOB_PATH =
  'M 50 2 C 73 2 96 15 97 42 C 98 68 82 96 54 98 C 27 99 3 82 2 55 C 1 27 22 2 50 2 Z';

interface BlobShapeProps {
  size: number;
  fill?: string;
  opacity?: number;
  dropShadow?: string;
  gradient?: {
    type: 'radial';
    from: string;
    to: string;
    cx?: string;
    cy?: string;
  };
  transition?: string;
  style?: React.CSSProperties;
}

export const BlobShape: React.FC<BlobShapeProps> = ({
  size,
  fill = 'currentColor',
  opacity = 1,
  dropShadow,
  gradient,
  transition,
  style,
}) => {
  const gradientId = React.useId();
  const fillValue = gradient ? `url(#${gradientId})` : fill;
  const cx = gradient?.cx ?? '35%';
  const cy = gradient?.cy ?? '35%';

  return (
    <div
      style={{
        width: size,
        height: size,
        filter: dropShadow ? `drop-shadow(${dropShadow})` : undefined,
        transition,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', display: 'block' }}
      >
        {gradient && (
          <defs>
            <radialGradient id={gradientId} cx={cx} cy={cy} r="70%">
              <stop offset="0%" stopColor={gradient.from} />
              <stop offset="100%" stopColor={gradient.to} />
            </radialGradient>
          </defs>
        )}
        <path d={BLOB_PATH} style={{ fill: fillValue, opacity, transition }} />
      </svg>
    </div>
  );
};
