import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { MOOD_SCALE } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { Icons } from '../Icons';
import { PaceCard, PaceSerif, PaceSans, AnimatedEnter } from '../UI';
import { MoodSlider } from '../Sliders';
import { useNav, useToast, useVisited } from '../NavStack';
import { BottomBar } from '../BottomBar';
import { BlobShape } from '../BlobShape';
import { TopBar } from './TopBar';

const DimCard: React.FC<{ theme: PaceTheme; d: any }> = ({ theme, d }) => {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={d.tap}
      style={{
        background: theme.surface,
        borderRadius: theme.radius,
        padding: 18,
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 180ms cubic-bezier(0.34,1.56,0.64,1)',
      }}>
      <div style={{
        position: 'absolute', right: -20, bottom: -20,
        width: 70, height: 70, borderRadius: '50%',
        background: d.tone, opacity: d.light ? 0.2 : 0.25,
      }} />
      <div style={{ color: theme.inkSoft, marginBottom: 24, position: 'relative' }}>{d.icon}</div>
      <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 4, position: 'relative' }}>{d.label}</PaceSans>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 6, position: 'relative' }}>
        <PaceSerif size={26} color={theme.ink}>{d.val}</PaceSerif>
        <PaceSans size={11} color={theme.inkMuted}>{d.unit}</PaceSans>
      </div>
      <PaceSans size={11} color={theme.inkSoft} style={{ position: 'relative' }}>{d.note}</PaceSans>
    </div>
  );
};

export const HomeScreen: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const toast = useToast();
  const visited = useVisited();
  const skip = visited.has('home');
  const L = theme.L;
  const state = PaceState;
  const [moodLive, setMoodLive] = React.useState(state.mood);
  React.useEffect(() => { state.mood = moodLive; }, [moodLive]);

  const dims = [
    { k: 'sleep', icon: Icons.Sleep({ size: 32 }), label: L.dim_sleep, val: state.sleepRecorded ? state.sleepHours : '—', unit: state.sleepRecorded ? L.u_hour : '', note: state.sleepRecorded ? L.sleepNote_shallow : L.notRecorded, tone: theme.dust, tap: () => nav.push('sleepStep1') },
    { k: 'move', icon: Icons.Move({ size: 32 }), label: L.dim_move, val: state.exerciseRecorded ? state.exerciseDuration : '—', unit: state.exerciseRecorded ? L.u_minute : '', note: state.exerciseRecorded ? (L[`exercise_type_${state.exerciseType}`] || L.moveNote_walk) : L.notMoved, tone: theme.sage, tap: () => nav.push('exerciseRecord') },
    { k: 'food', icon: Icons.Food({ size: 32 }), label: L.dim_food, val: `${state.foodLogged}/3`, unit: L.u_meal, note: L.foodNote, tone: theme.terracotta, light: true, tap: () => nav.push('food') },
    { k: 'mood', icon: Icons.Mood({ size: 32 }), label: L.dim_mood, val: MOOD_SCALE[state.mood].label, unit: '', note: L.moodNote, tone: MOOD_SCALE[state.mood].color, tap: () => nav.presentSheet('moodSheet') },
  ];

  const status = state.sleepRecorded
    ? L.statusRecorded(state.sleepHours)
    : L.statusNew;

  return (
    <div style={{ background: theme.bg, height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
        <TopBar
          theme={theme}
          leftLabel={L.dateToday}
          right={
            <div style={{ color: theme.inkSoft, display: 'flex', gap: 16 }}>
              <div onClick={() => nav.push('insights')} style={{ cursor: 'pointer', padding: 4 }}>{Icons.Insight({ size: 20 })}</div>
              <div onClick={() => nav.push('profile')} style={{ cursor: 'pointer', padding: 4 }}>{Icons.Me({ size: 20 })}</div>
            </div>
          }
        />
        <div style={{ padding: '8px 20px 120px' }}>
          <AnimatedEnter delay={50} skip={skip}>
            <div style={{ position: 'relative', marginBottom: 24 }}>
              <BlobShape
                size={70}
                fill={theme.dust}
                opacity={0.5}
                style={{ position: 'absolute', right: -6, top: -10 }}
              />
              <PaceSerif size={30} weight={500} color={theme.ink} style={{ marginBottom: 10, position: 'relative' }}>
                {theme.name.includes('夜') ? L.greetingNight : L.greeting}
              </PaceSerif>
              <PaceSerif size={19} weight={400} color={theme.inkSoft} style={{ lineHeight: 1.5, position: 'relative', textWrap: 'pretty' as any }}>
                {status}
              </PaceSerif>
            </div>
          </AnimatedEnter>

          <AnimatedEnter delay={120} skip={skip}>
            <PaceCard theme={theme} padding={18} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <PaceSans size={13} color={theme.inkSoft}>{L.feelNow}</PaceSans>
                <PaceSans size={12} color={theme.inkMuted}>{L.dragToRecord}</PaceSans>
              </div>
              <MoodSlider theme={theme} value={moodLive} onChange={(v) => {
                if (v !== moodLive && navigator.vibrate) navigator.vibrate(6);
                setMoodLive(v);
              }} />
            </PaceCard>
          </AnimatedEnter>

          <AnimatedEnter delay={200} skip={skip}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '8px 2px 14px' }}>
              <PaceSerif size={18} color={theme.ink}>{L.fourWindows}</PaceSerif>
            </div>
          </AnimatedEnter>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {dims.map((d, i) => (
              <AnimatedEnter key={d.k} delay={240 + i * 60} y={14} skip={skip}>
                <DimCard theme={theme} d={d} />
              </AnimatedEnter>
            ))}
          </div>

          <AnimatedEnter delay={520} skip={skip}>
            <div style={{ margin: '24px 4px 8px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.7 }}>
                {Icons.Leaf({ size: 16 })}
              </div>
              <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.6, flex: 1 }}>
                {L.streakLine}
              </PaceSans>
            </div>
          </AnimatedEnter>
        </div>
        {toast.node}
      </div>
      <BottomBar theme={theme} active="today" />
    </div>
  );
};
