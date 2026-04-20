import React from 'react';
import type { PaceTheme } from '../data/tokens';
import { PaceNum } from './UI';

export { MoodSlider } from './ui/MoodSlider';

const iosEase = 'cubic-bezier(0.32, 0.72, 0, 1)';
const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

// Draggable hours slider
export const HoursSlider: React.FC<{
  theme: PaceTheme;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}> = ({ theme, value, onChange, min = 0, max = 12, step = 0.5 }) => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const steps = Math.round((max - min) / step);

  const getValFromX = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, ratio));
    return min + Math.round(clamped * steps) * step;
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    e.preventDefault();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    onChange(getValFromX(x));
  };

  React.useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const next = getValFromX(x);
      if (next !== value) onChange(next);
    };
    const end = () => setDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [dragging, value, onChange]);

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ userSelect: 'none', touchAction: 'none' }}>
      <div ref={trackRef} onMouseDown={start} onTouchStart={start} style={{
        position: 'relative', height: 44, cursor: 'pointer',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
          height: 6, borderRadius: 3,
          background: theme.line,
        }} />
        <div style={{
          position: 'absolute', left: 0, width: `${pct}%`, top: '50%', transform: 'translateY(-50%)',
          height: 6, borderRadius: 3,
          background: `linear-gradient(90deg, ${theme.dust}, ${theme.terracotta})`,
          transition: dragging ? 'none' : `width 200ms ${iosEase}`,
        }} />
        <div style={{
          position: 'absolute', left: `${pct}%`, top: '50%',
          transform: `translate(-50%, -50%) scale(${dragging ? 1.1 : 1})`,
          width: 30, height: 30, borderRadius: '50%',
          background: theme.surface,
          border: `3px solid ${theme.terracotta}`,
          boxShadow: dragging ? '0 6px 18px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.12)',
          transition: dragging ? 'transform 120ms ease-out' : `all 260ms ${spring}`,
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        {['0', '3', '6', '9', '12'].map(t => (
          <PaceNum key={t} size={11} color={theme.inkMuted}>{t}h</PaceNum>
        ))}
      </div>
    </div>
  );
};
