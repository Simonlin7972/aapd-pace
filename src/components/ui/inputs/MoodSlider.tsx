import React from 'react';
import { MOOD_SCALE, type PaceTheme } from '../../../data/tokens';
import { PaceSans } from '../foundations/Text';

const iosEase = 'cubic-bezier(0.32, 0.72, 0, 1)';
const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const MoodSlider: React.FC<{
  theme: PaceTheme;
  value: number;
  onChange: (v: number) => void;
  height?: number;
  showLabels?: boolean;
  big?: boolean;
}> = ({ theme, value, onChange, height = 40, showLabels = true, big = false }) => {
  const M = MOOD_SCALE;
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [dragRatio, setDragRatio] = React.useState(-1);

  const getRatioFromX = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  const snapToNearest = (ratio: number) => {
    const idx = Math.round(ratio * (M.length - 1));
    return Math.max(0, Math.min(M.length - 1, idx));
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const ratio = getRatioFromX(x);
    setDragRatio(ratio);
    onChange(snapToNearest(ratio));
  };

  React.useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const ratio = getRatioFromX(x);
      setDragRatio(ratio);
      const next = snapToNearest(ratio);
      if (next !== value) onChange(next);
    };
    const handleEnd = () => {
      setDragging(false);
      setDragRatio(-1);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragging, value, onChange]);

  const snappedPct = ((value + 0.5) / M.length) * 100;
  const leftPct = dragging && dragRatio >= 0 ? dragRatio * 100 : snappedPct;
  const thumbColor = M[value].color;

  return (
    <div style={{ userSelect: 'none', touchAction: 'none' }}>
      <div
        ref={trackRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        style={{ position: 'relative', height, cursor: 'pointer' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: height / 2,
          background: `linear-gradient(90deg, ${M[0].color}, ${M[1].color}, ${M[2].color}, ${M[3].color}, ${M[4].color})`,
          opacity: 0.55,
        }} />
        <div style={{ position: 'relative', display: 'flex', height: '100%' }}>
          {M.map((m) => (
            <div key={m.key} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: theme.ink,
                opacity: 0.35,
                transition: `all 200ms ${iosEase}`,
              }} />
            </div>
          ))}
        </div>
        <div style={{
          position: 'absolute', top: '50%', left: `${leftPct}%`,
          transform: `translate(-50%, -50%) scale(${dragging ? 1.15 : 1})`,
          width: big ? 44 : height - 6, height: big ? 44 : height - 6,
          borderRadius: '50%',
          background: thumbColor,
          boxShadow: dragging
            ? `0 8px 24px ${thumbColor}70, 0 2px 6px rgba(0,0,0,0.15)`
            : `0 3px 10px ${thumbColor}50, 0 1px 3px rgba(0,0,0,0.1)`,
          border: `2.5px solid ${theme.bg}`,
          transition: dragging ? 'none' : `all 320ms ${spring}`,
        }} />
      </div>
      {showLabels && (
        <div style={{ display: 'flex', marginTop: 10 }}>
          {M.map((m, i) => {
            const L = theme.L || {};
            const label = L[`mood_${m.key}`] || m.label;
            return (
              <PaceSans key={m.key} size={10}
                color={i === value ? theme.ink : theme.inkMuted}
                weight={i === value ? 500 : 400}
                style={{ flex: 1, textAlign: 'center', transition: `color 200ms ${iosEase}` }}>
                {label}
              </PaceSans>
            );
          })}
        </div>
      )}
    </div>
  );
};
