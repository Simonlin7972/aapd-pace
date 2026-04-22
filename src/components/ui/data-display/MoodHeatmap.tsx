import React from 'react';
import { MOOD_SCALE, type PaceTheme } from '../../../data/tokens';
import { PaceSans } from '../foundations/Text';
import { PaceCard } from '../containers/Card';

const DEFAULT_LABELS = ['一', '二', '三', '四', '五', '六', '日'];

export const MoodHeatmap: React.FC<{
  theme: PaceTheme;
  data: number[];
  dayLabels?: string[];
  title?: string;
  hint?: string;
  missingDays?: number[];
  padding?: number;
}> = ({ theme, data, dayLabels, title = '情緒色溫', hint = '冷→暖', missingDays, padding = 18 }) => {
  const labels = dayLabels ?? DEFAULT_LABELS.slice(0, data.length);
  const missingSet = new Set(missingDays ?? []);

  return (
    <PaceCard theme={theme} padding={padding}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <PaceSans size={13} color={theme.ink} weight={500}>{title}</PaceSans>
        {hint && <PaceSans size={11} color={theme.inkMuted}>{hint}</PaceSans>}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {data.map((mood, i) => {
          const isMissing = missingSet.has(i);
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <div style={{
                width: '100%', height: 52, borderRadius: 10,
                background: isMissing ? theme.line : MOOD_SCALE[mood].color,
                opacity: isMissing ? 1 : 0.85,
                border: isMissing ? `1px dashed ${theme.inkMuted}` : 'none',
                boxSizing: 'border-box',
              }} />
              <PaceSans size={11} color={theme.inkMuted}>{labels[i]}</PaceSans>
            </div>
          );
        })}
      </div>
    </PaceCard>
  );
};
