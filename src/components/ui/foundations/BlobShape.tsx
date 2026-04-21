import React from 'react';

const BLOB_PATH =
  'M 50 2 C 73 2 96 15 97 42 C 98 68 82 96 54 98 C 27 99 3 82 2 55 C 1 27 22 2 50 2 Z';

// 5 organic blob shapes — progressively more dynamic as mood increases
export const BLOB_PATHS = [
  // 0: low — compact, contracted
  'M 50 8 C 68 6 88 22 90 46 C 92 68 76 90 52 92 C 30 93 10 76 8 52 C 6 30 28 9 50 8 Z',
  // 1: flat — slightly irregular
  'M 52 5 C 74 4 94 18 95 44 C 96 70 78 94 52 96 C 28 97 5 78 4 52 C 3 28 26 6 52 5 Z',
  // 2: ok — default organic blob
  'M 50 2 C 73 2 96 15 97 42 C 98 68 82 96 54 98 C 27 99 3 82 2 55 C 1 27 22 2 50 2 Z',
  // 3: bright — more expressive
  'M 48 1 C 76 0 98 12 99 40 C 100 72 80 98 50 99 C 22 100 1 78 0 48 C -1 20 18 2 48 1 Z',
  // 4: warm — most expanded, organic
  'M 46 0 C 78 -1 100 10 100 38 C 101 74 78 100 46 100 C 18 101 -1 76 0 44 C -1 16 14 1 46 0 Z',
];

// Scale multiplier per mood level
export const BLOB_SCALES = [0.85, 0.92, 1.0, 1.08, 1.18];

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
  /** Mood index 0-4: drives shape variant + scale breathing */
  mood?: number;
}

export const BlobShape: React.FC<BlobShapeProps> = ({
  size,
  fill = 'currentColor',
  opacity = 1,
  dropShadow,
  gradient,
  transition,
  style,
  mood,
}) => {
  const gradientId = React.useId();
  const fillValue = gradient ? `url(#${gradientId})` : fill;
  const cx = gradient?.cx ?? '35%';
  const cy = gradient?.cy ?? '35%';

  const hasMood = typeof mood === 'number' && mood >= 0 && mood <= 4;
  const path = hasMood ? BLOB_PATHS[mood] : BLOB_PATH;
  const scale = hasMood ? BLOB_SCALES[mood] : 1;
  const actualSize = size * scale;

  return (
    <div
      style={{
        width: actualSize,
        height: actualSize,
        filter: dropShadow ? `drop-shadow(${dropShadow})` : undefined,
        transition: transition || undefined,
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
        <path d={path} style={{ fill: fillValue, opacity, transition: transition || undefined }} />
      </svg>
    </div>
  );
};
