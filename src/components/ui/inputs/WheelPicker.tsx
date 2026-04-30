import React from 'react';
import type { PaceTheme } from '../../../data/tokens';
import { FONTS } from '../../../data/tokens';

// iOS-style scroll-snap wheel picker. Single column.
export const WheelPicker: React.FC<{
  theme: PaceTheme;
  values: string[];
  selectedIndex: number;
  onChange: (idx: number) => void;
  itemHeight?: number;
  visibleCount?: number;
  width?: number;
}> = ({ theme, values, selectedIndex, onChange, itemHeight = 36, visibleCount = 5, width = 84 }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const lastReportedRef = React.useRef(selectedIndex);

  const padCount = Math.floor(visibleCount / 2);
  const totalHeight = itemHeight * visibleCount;

  // Sync external selectedIndex → scroll position
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const target = selectedIndex * itemHeight;
    if (Math.abs(el.scrollTop - target) > 1) {
      el.scrollTop = target;
      lastReportedRef.current = selectedIndex;
    }
  }, [selectedIndex, itemHeight]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const idx = Math.round(el.scrollTop / itemHeight);
      const clamped = Math.max(0, Math.min(values.length - 1, idx));
      if (clamped !== lastReportedRef.current) {
        lastReportedRef.current = clamped;
        if (navigator.vibrate) navigator.vibrate(3);
        onChange(clamped);
      }
    });
  };

  return (
    <div style={{ position: 'relative', width, height: totalHeight }}>
      {/* Center selection band */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: padCount * itemHeight, height: itemHeight,
        borderTop: `1px solid ${theme.line}`,
        borderBottom: `1px solid ${theme.line}`,
        pointerEvents: 'none',
      }} />
      {/* Top fade */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0,
        height: padCount * itemHeight,
        background: `linear-gradient(${theme.bg}, ${theme.bg}00)`,
        pointerEvents: 'none', zIndex: 1,
      }} />
      {/* Bottom fade */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height: padCount * itemHeight,
        background: `linear-gradient(${theme.bg}00, ${theme.bg})`,
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: totalHeight,
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{ height: padCount * itemHeight }} />
        {values.map((v, i) => {
          const dist = Math.abs(i - selectedIndex);
          const opacity = dist === 0 ? 1 : dist === 1 ? 0.5 : 0.28;
          return (
            <div
              key={i}
              style={{
                height: itemHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollSnapAlign: 'center',
                fontFamily: FONTS.serif,
                fontSize: 22,
                fontWeight: 500,
                color: theme.ink,
                opacity,
                transition: 'opacity 180ms ease',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {v}
            </div>
          );
        })}
        <div style={{ height: padCount * itemHeight }} />
      </div>
    </div>
  );
};
