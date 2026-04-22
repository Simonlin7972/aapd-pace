import React from 'react';
import type { PaceTheme } from '../../../data/tokens';
import { PaceSans, PaceSerif } from '../foundations/Text';
import { PaceCard } from '../containers/Card';

const DEFAULT_LABELS = ['一', '二', '三', '四', '五', '六', '日'];

export const SleepChart: React.FC<{
  theme: PaceTheme;
  data: number[];
  dayLabels?: string[];
  title?: string;
  average?: number;
  averageSuffix?: string;
  showDots?: boolean;
  padding?: number;
}> = ({
  theme,
  data,
  dayLabels,
  title = '睡眠趨勢',
  average,
  averageSuffix = '週平均',
  showDots = true,
  padding = 18,
}) => {
  const gradId = React.useId().replace(/:/g, '');
  const labels = dayLabels ?? DEFAULT_LABELS.slice(0, data.length);
  const avg = average ?? data.reduce((s, v) => s + v, 0) / data.length;
  const avgDisplay = avg.toFixed(1);

  const viewW = 280;
  const viewH = 70;
  const n = data.length;
  const pts = data.map((s, i) => {
    const x = (i / (n - 1)) * viewW;
    const y = viewH - ((s - 3) / 6) * 60;
    return [x, Math.max(8, Math.min(66, y))] as [number, number];
  });
  const d = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    const cx2 = (px + x) / 2;
    return `${acc} Q ${cx2} ${py}, ${cx2} ${(py + y) / 2} T ${x} ${y}`;
  }, '');

  return (
    <PaceCard theme={theme} padding={padding}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <PaceSans size={13} color={theme.ink} weight={500}>{title}</PaceSans>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <PaceSerif size={16} color={theme.ink}>{avgDisplay}</PaceSerif>
          <PaceSans size={11} color={theme.inkMuted}>{averageSuffix}</PaceSans>
        </div>
      </div>
      <div style={{ position: 'relative', height: viewH, marginBottom: 10 }}>
        <svg viewBox={`0 0 ${viewW} ${viewH}`} width="100%" height={viewH} preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={theme.terracotta} stopOpacity="0.28" />
              <stop offset="1" stopColor={theme.terracotta} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${d} L ${viewW} ${viewH} L 0 ${viewH} Z`} fill={`url(#${gradId})`} />
          <path d={d} fill="none" stroke={theme.terracotta} strokeWidth="1.8" strokeLinecap="round" />
          {showDots && pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === n - 1 ? 4 : 2.5} fill={theme.terracotta} />
          ))}
        </svg>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {labels.map((l, i) => (
          <PaceSans key={i} size={11} color={theme.inkMuted} style={{ width: 20, textAlign: 'center' }}>{l}</PaceSans>
        ))}
      </div>
    </PaceCard>
  );
};
