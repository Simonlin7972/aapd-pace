import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { MOOD_SCALE } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { Icons } from '../Icons';
import { PaceSerif, PaceSans, PaceButton, AnimatedEnter } from '../UI';
import { MoodSlider, HoursSlider } from '../Sliders';
import { useNav } from '../NavStack';
import { TopBar } from './TopBar';

// Step 1: Feel
export const SleepStep1: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const [feel, setFeel] = React.useState(PaceState.sleepFeel);
  const M = MOOD_SCALE;

  return (
    <div style={{ background: theme.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} onClose={() => nav.pop()} step="1 / 3" />
      <div style={{ padding: '28px 24px 0' }}>
        <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {L.dim_sleep}
        </PaceSans>
        <PaceSerif size={28} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 10, whiteSpace: 'pre-line' }}>
          {L.sleep_step1_title}
        </PaceSerif>
        <PaceSans size={14} color={theme.inkSoft} style={{ lineHeight: 1.6 }}>
          {L.sleep_step1_sub}
        </PaceSans>
      </div>

      <div style={{ flex: 1, padding: '40px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={{
          width: 140, height: 140, marginBottom: 36,
          borderRadius: '52% 48% 45% 55% / 55% 60% 40% 45%',
          background: M[feel].color,
          boxShadow: `0 16px 40px ${M[feel].color}60`,
          transition: 'all 420ms cubic-bezier(0.34,1.56,0.64,1)',
        }} />
        <PaceSerif size={22} color={theme.ink} style={{ marginBottom: 30 }}>{M[feel].label}</PaceSerif>
        <div style={{ width: '100%' }}>
          <MoodSlider theme={theme} value={feel} onChange={(v) => {
            if (v !== feel && navigator.vibrate) navigator.vibrate(6);
            setFeel(v);
          }} />
        </div>
      </div>

      <div style={{ padding: '28px 20px' }}>
        <PaceButton theme={theme} full onClick={() => {
          PaceState.sleepFeel = feel;
          nav.push('sleepStep2');
        }}>{L.continue}</PaceButton>
      </div>
    </div>
  );
};

// Step 2: Hours
export const SleepStep2: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const [h, setH] = React.useState(PaceState.sleepHours);

  return (
    <div style={{ background: theme.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} onBack={() => nav.pop()} step="2 / 3" />
      <div style={{ padding: '28px 24px 0' }}>
        <PaceSerif size={28} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 10, whiteSpace: 'pre-line' }}>
          {L.sleep_step2_title}
        </PaceSerif>
        <PaceSans size={13} color={theme.inkSoft}>{L.sleep_step2_sub}</PaceSans>
      </div>

      <div style={{ flex: 1, padding: '40px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 36 }}>
          <PaceSerif size={64} weight={400} color={theme.ink} style={{ transition: 'color 200ms' }}>{h.toFixed(1)}</PaceSerif>
          <PaceSans size={18} color={theme.inkSoft}>{L.u_hour}</PaceSans>
        </div>

        <div style={{ width: '100%' }}>
          <HoursSlider theme={theme} value={h} onChange={(v) => {
            if (v !== h && navigator.vibrate) navigator.vibrate(4);
            setH(v);
          }} />
        </div>

        <div style={{ marginTop: 44, display: 'flex', gap: 8, width: '100%' }}>
          <div style={{ flex: 1, background: theme.surface, borderRadius: theme.radius, padding: 14 }}>
            <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 4 }}>{L.bedtime}</PaceSans>
            <PaceSerif size={17} color={theme.ink}>00:30</PaceSerif>
          </div>
          <div style={{ flex: 1, background: theme.surface, borderRadius: theme.radius, padding: 14 }}>
            <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 4 }}>{L.waketime}</PaceSans>
            <PaceSerif size={17} color={theme.ink}>07:00</PaceSerif>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 20px' }}>
        <PaceButton theme={theme} full onClick={() => {
          PaceState.sleepHours = h;
          PaceState.sleepRecorded = true;
          nav.push('sleepStep3');
        }}>{L.seeLastNight}</PaceButton>
      </div>
    </div>
  );
};

// Step 3: Summary
export const SleepStep3: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const M = MOOD_SCALE;
  const st = PaceState;
  const summary = st.sleepHours >= 7
    ? L.summary_good
    : st.sleepHours >= 5.5
      ? L.summary_ok
      : L.summary_low;

  return (
    <div style={{ background: theme.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} onClose={() => nav.replace('home')} step={L.done} />
      <div style={{ padding: '28px 24px 0', flex: 1 }}>
        <AnimatedEnter delay={80}>
          <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {L.lastNight}
          </PaceSans>
          <PaceSerif size={30} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 24, textWrap: 'balance' as any }}>
            {summary}
          </PaceSerif>
        </AnimatedEnter>

        <AnimatedEnter delay={220}>
          <div style={{ marginBottom: 28, padding: '10px 0' }}>
            <svg viewBox="0 0 320 80" width="100%" height="80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="s-g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={theme.dust} stopOpacity="0.45" />
                  <stop offset="1" stopColor={theme.dust} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 45 Q 40 55, 80 40 T 160 50 Q 200 60, 240 35 T 320 45 L 320 80 L 0 80 Z" fill="url(#s-g)" />
              <path d="M0 45 Q 40 55, 80 40 T 160 50 Q 200 60, 240 35 T 320 45" fill="none" stroke={theme.terracotta} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </AnimatedEnter>

        <AnimatedEnter delay={320}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[
              { l: L.stat_duration, v: st.sleepHours.toFixed(1), u: 'h' },
              { l: L.stat_feel, v: L[`mood_${M[st.sleepFeel].key}`], u: '' },
              { l: L.stat_week, v: '6.3', u: 'h avg' },
            ].map((x, i) => (
              <div key={i} style={{ background: theme.surface, borderRadius: theme.radius, padding: 14 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 4 }}>{x.l}</PaceSans>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <PaceSerif size={17} color={theme.ink}>{x.v}</PaceSerif>
                  <PaceSans size={10} color={theme.inkMuted}>{x.u}</PaceSans>
                </div>
              </div>
            ))}
          </div>
        </AnimatedEnter>

        <AnimatedEnter delay={420}>
          <div style={{ background: theme.surface, borderRadius: theme.radius, padding: 18, display: 'flex', gap: 12 }}>
            <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.75 }}>{Icons.Leaf({ size: 18 })}</div>
            <div style={{ flex: 1 }}>
              <PaceSerif size={15} color={theme.ink} style={{ marginBottom: 4 }}>{L.suggestTitle}</PaceSerif>
              <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.55 }}>
                {st.sleepHours >= 7 ? L.suggest_focus : L.suggest_rest}
              </PaceSans>
            </div>
          </div>
        </AnimatedEnter>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <PaceButton theme={theme} full onClick={() => nav.replace('home')}>{L.okThanks}</PaceButton>
      </div>
    </div>
  );
};
