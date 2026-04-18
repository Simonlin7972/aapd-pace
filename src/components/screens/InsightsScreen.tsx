import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { MOOD_SCALE } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { Icons } from '../Icons';
import { PaceCard, PaceSerif, PaceSans, AnimatedEnter } from '../UI';
import { useNav } from '../NavStack';
import { TopBar } from './TopBar';

export const InsightsScreen: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const M = MOOD_SCALE;
  const week = [
    { d: L.week[0], mood: 1, sleep: 5.5 },
    { d: L.week[1], mood: 2, sleep: 6.2 },
    { d: L.week[2], mood: 3, sleep: 7.0 },
    { d: L.week[3], mood: 2, sleep: 6.5 },
    { d: L.week[4], mood: 0, sleep: 4.8 },
    { d: L.week[5], mood: 3, sleep: 7.8 },
    { d: L.week[6], mood: PaceState.mood, sleep: PaceState.sleepHours },
  ];
  return (
    <div style={{ background: theme.bg, minHeight: '100%', overflowY: 'auto' }}>
      <TopBar theme={theme} onBack={() => nav.pop()} title={L.insightsRange} />
      <div style={{ padding: '24px 20px 40px' }}>
        <AnimatedEnter delay={60}>
          <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {L.weekYou}
          </PaceSans>
          <PaceSerif size={30} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 12, whiteSpace: 'pre-line' }}>
            {L.weekSummary}
          </PaceSerif>
          <PaceSans size={14} color={theme.inkSoft} style={{ lineHeight: 1.6, marginBottom: 28 }}>
            {L.weekSub}
          </PaceSans>
        </AnimatedEnter>

        <AnimatedEnter delay={180}>
          <PaceCard theme={theme} padding={18} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <PaceSans size={13} color={theme.ink} weight={500}>{L.moodHeatTitle}</PaceSans>
              <PaceSans size={11} color={theme.inkMuted}>{L.moodHeatSub}</PaceSans>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {week.map((w, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                  <div style={{
                    width: '100%', height: 52, borderRadius: 10,
                    background: M[w.mood].color, opacity: 0.85,
                    transition: 'background 300ms ease',
                  }} />
                  <PaceSans size={11} color={theme.inkMuted}>{w.d}</PaceSans>
                </div>
              ))}
            </div>
          </PaceCard>
        </AnimatedEnter>

        <AnimatedEnter delay={280}>
          <PaceCard theme={theme} padding={18} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <PaceSans size={13} color={theme.ink} weight={500}>{L.sleepCardTitle}</PaceSans>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <PaceSerif size={16} color={theme.ink}>6.3</PaceSerif>
                <PaceSans size={11} color={theme.inkMuted}>{L.weekAvg}</PaceSans>
              </div>
            </div>
            <div style={{ position: 'relative', height: 70, marginBottom: 10 }}>
              <svg viewBox="0 0 280 70" width="100%" height="70" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="w-g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={theme.terracotta} stopOpacity="0.28" />
                    <stop offset="1" stopColor={theme.terracotta} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {(() => {
                  const pts = week.map((w, i) => {
                    const x = (i / 6) * 280;
                    const y = 70 - ((w.sleep - 3) / 6) * 60;
                    return [x, Math.max(8, Math.min(66, y))];
                  });
                  const d = pts.reduce((acc, [x, y], i) => {
                    if (i === 0) return `M ${x} ${y}`;
                    const [px, py] = pts[i - 1];
                    const cx2 = (px + x) / 2;
                    return `${acc} Q ${cx2} ${py}, ${cx2} ${(py + y) / 2} T ${x} ${y}`;
                  }, '');
                  return (
                    <>
                      <path d={`${d} L 280 70 L 0 70 Z`} fill="url(#w-g)" />
                      <path d={d} fill="none" stroke={theme.terracotta} strokeWidth="1.8" strokeLinecap="round" />
                      {pts.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r={i === 6 ? 4 : 2.5} fill={theme.terracotta} />
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {week.map((w, i) => (
                <PaceSans key={i} size={11} color={theme.inkMuted} style={{ width: 20, textAlign: 'center' }}>{w.d}</PaceSans>
              ))}
            </div>
          </PaceCard>
        </AnimatedEnter>

        <AnimatedEnter delay={380}>
          <PaceCard theme={theme} padding={18} tone="elevated">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ color: theme.terracotta, opacity: 0.8 }}>{Icons.Leaf({ size: 16 })}</div>
              <PaceSans size={12} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {L.weDidNotice}
              </PaceSans>
            </div>
            <PaceSerif size={18} color={theme.ink} style={{ lineHeight: 1.5, marginBottom: 10 }}>
              {L.insightBig}
            </PaceSerif>
            <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.6 }}>
              {L.insightSmall}
            </PaceSans>
          </PaceCard>
        </AnimatedEnter>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <PaceSerif size={16} color={theme.inkSoft} style={{ fontStyle: 'italic' }}>
            {L.insightsQuote}
          </PaceSerif>
        </div>
      </div>
    </div>
  );
};
