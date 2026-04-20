import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { MOOD_SCALE } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { Icons } from '../Icons';
import { PaceSerif, PaceSans, Button, AnimatedEnter } from '../UI';
import { MoodSlider } from '../Sliders';
import { useNav, useVisited } from '../NavStack';
import { TopBar } from './TopBar';
import { BottomBar } from '../BottomBar';
import { BlobShape } from '../BlobShape';

const EXERCISE_TYPES = [
  { k: 'walk', emoji: '🚶' },
  { k: 'run', emoji: '🏃' },
  { k: 'yoga', emoji: '🧘' },
  { k: 'weight', emoji: '🏋️' },
  { k: 'cycle', emoji: '🚴' },
  { k: 'swim', emoji: '🏊' },
  { k: 'hike', emoji: '⛰️' },
  { k: 'dance', emoji: '💃' },
  { k: 'stretch', emoji: '🤸' },
  { k: 'other', emoji: '✨' },
];

const INTENSITY_COLORS = ['#8FA0A8', '#A8B0A8', '#C8B89E', '#D9B8A8', '#C4805C'];

// Week chart (reused pattern from SleepHome)
const WeekChart: React.FC<{ theme: PaceTheme; data: number[]; L: Record<string, any> }> = ({ theme, data, L }) => {
  const max = Math.max(...data, 60);
  const barH = 100;
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: barH + 24, padding: '0 4px' }}>
      {data.map((m, i) => {
        const height = m > 0 ? Math.max((m / max) * barH, 6) : 4;
        const isToday = i === todayIdx;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%', maxWidth: 32,
              height,
              borderRadius: 8,
              background: m > 0
                ? isToday ? theme.terracotta : theme.sage
                : theme.line,
              opacity: m > 0 ? (isToday ? 1 : 0.6) : 0.4,
              transition: 'height 400ms cubic-bezier(0.32,0.72,0,1)',
            }} />
            <PaceSans size={10} color={isToday ? theme.ink : theme.inkMuted} weight={isToday ? 600 : 400}>
              {L.week[i]}
            </PaceSans>
          </div>
        );
      })}
    </div>
  );
};

// ExerciseHome
export const ExerciseHome: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const visited = useVisited();
  const skip = visited.has('exerciseHome');
  const L = theme.L;
  const st = PaceState;
  const M = MOOD_SCALE;
  const recorded = st.exerciseRecorded;
  const weekly = st.exerciseWeekly;
  const validDays = weekly.filter(m => m > 0);
  const weekAvg = validDays.length > 0 ? Math.round(validDays.reduce((a, b) => a + b, 0) / validDays.length) : 0;
  const insight = validDays.length >= 3 ? L.exerciseHome_insight3 : validDays.length >= 1 ? L.exerciseHome_insight1 : L.exerciseHome_insight0;
  const typeInfo = EXERCISE_TYPES.find(t => t.k === st.exerciseType);

  return (
    <div style={{ background: theme.bg, height: '100%', position: 'relative' }}>
      <div className="screen-scroll" style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingTop: 56 }}>
        <div style={{ padding: '8px 20px 120px' }}>
          {/* Header */}
          <AnimatedEnter delay={50} skip={skip}>
            <div style={{ marginBottom: 28 }}>
              <PaceSans size={12} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                {L.exerciseHome_title}
              </PaceSans>
              <PaceSerif size={26} weight={500} color={theme.ink}>
                {L.exerciseHome_today}
              </PaceSerif>
            </div>
          </AnimatedEnter>

          {/* Hero card */}
          <AnimatedEnter delay={120} skip={skip}>
            <div style={{
              background: theme.surface, borderRadius: theme.radius,
              padding: 22, marginBottom: 16, position: 'relative', overflow: 'hidden',
            }}>
              <BlobShape
                size={80}
                fill={theme.sage}
                opacity={0.2}
                style={{ position: 'absolute', right: -16, top: -16 }}
              />

              {recorded ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, position: 'relative' }}>
                    <div style={{ fontSize: 20 }}>{typeInfo?.emoji || '✨'}</div>
                    <PaceSans size={13} color={theme.inkSoft}>{L[`exercise_type_${st.exerciseType}`] || st.exerciseType}</PaceSans>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8, position: 'relative' }}>
                    <PaceSerif size={42} weight={400} color={theme.ink}>{st.exerciseDuration}</PaceSerif>
                    <PaceSans size={16} color={theme.inkMuted}>{L.u_minute}</PaceSans>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 18, position: 'relative', flexWrap: 'wrap' }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: `${INTENSITY_COLORS[st.exerciseIntensity]}20`,
                      padding: '5px 12px', borderRadius: 12,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: INTENSITY_COLORS[st.exerciseIntensity] }} />
                      <PaceSans size={12} color={theme.ink}>
                        {[L.intensity_light, L.intensity_easy, L.intensity_moderate, L.intensity_hard, L.intensity_max][st.exerciseIntensity]}
                      </PaceSans>
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: `${M[st.exerciseMood].color}20`,
                      padding: '5px 12px', borderRadius: 12,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: M[st.exerciseMood].color }} />
                      <PaceSans size={12} color={theme.ink}>{L[`mood_${M[st.exerciseMood].key}`]}</PaceSans>
                    </div>
                  </div>
                  <Button theme={theme} variant="soft" full onClick={() => nav.push('exerciseRecord')}>
                    {L.exerciseHome_reRecord}
                  </Button>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0', position: 'relative' }}>
                  <div style={{ color: theme.inkMuted, marginBottom: 16 }}>{Icons.Move({ size: 36 })}</div>
                  <PaceSans size={14} color={theme.inkSoft} style={{ marginBottom: 20 }}>
                    {L.exerciseHome_empty}
                  </PaceSans>
                  <Button theme={theme} full onClick={() => nav.push('exerciseRecord')}>
                    {L.exerciseHome_startRecord}
                  </Button>
                </div>
              )}
            </div>
          </AnimatedEnter>

          {/* Week trend */}
          <AnimatedEnter delay={240} skip={skip}>
            <div style={{
              background: theme.surface, borderRadius: theme.radius,
              padding: 22, marginBottom: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
                <PaceSerif size={17} color={theme.ink}>{L.exerciseHome_weekTrend}</PaceSerif>
                {validDays.length > 0 && (
                  <PaceSans size={12} color={theme.inkMuted}>
                    {weekAvg}{L.u_minute} · {L.exerciseHome_weekAvg}
                  </PaceSans>
                )}
              </div>
              <WeekChart theme={theme} data={weekly} L={L} />
              {validDays.length > 0 && (
                <PaceSans size={12} color={theme.inkMuted} style={{ marginTop: 12, textAlign: 'center' }}>
                  {L.exerciseHome_weekTotal} {validDays.length} {L.exerciseHome_weekCount}
                </PaceSans>
              )}
            </div>
          </AnimatedEnter>

          {/* Insight card */}
          <AnimatedEnter delay={360} skip={skip}>
            <div style={{
              background: theme.surface, borderRadius: theme.radius,
              padding: 18, display: 'flex', gap: 12,
            }}>
              <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.75 }}>{Icons.Leaf({ size: 18 })}</div>
              <div style={{ flex: 1 }}>
                <PaceSerif size={15} color={theme.ink} style={{ marginBottom: 4 }}>{L.exerciseHome_insightTip}</PaceSerif>
                <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.55 }}>
                  {insight}
                </PaceSans>
              </div>
            </div>
          </AnimatedEnter>
        </div>
      </div>
      <BottomBar theme={theme} active="move" />
    </div>
  );
};

// Duration slider for exercise (5-120 min, step 5)
const DurationSlider: React.FC<{
  theme: PaceTheme;
  value: number;
  onChange: (v: number) => void;
}> = ({ theme, value, onChange }) => {
  const min = 5, max = 120, step = 5;
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const steps = (max - min) / step;

  const getVal = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return min + Math.round(ratio * steps) * step;
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    e.preventDefault();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    onChange(getVal(x));
  };

  React.useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const next = getVal(x);
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
  const iosEase = 'cubic-bezier(0.32, 0.72, 0, 1)';
  const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

  return (
    <div style={{ userSelect: 'none', touchAction: 'none' }}>
      <div ref={trackRef} onMouseDown={start} onTouchStart={start} style={{
        position: 'relative', height: 44, cursor: 'pointer',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
          height: 6, borderRadius: 3, background: theme.line,
        }} />
        <div style={{
          position: 'absolute', left: 0, width: `${pct}%`, top: '50%', transform: 'translateY(-50%)',
          height: 6, borderRadius: 3,
          background: `linear-gradient(90deg, ${theme.sage}, ${theme.terracotta})`,
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
        {['5', '30', '60', '90', '120'].map(t => (
          <PaceSans key={t} size={11} color={theme.inkMuted}>{t}</PaceSans>
        ))}
      </div>
    </div>
  );
};

// Intensity selector — 5 horizontal options
const IntensitySelector: React.FC<{
  theme: PaceTheme;
  value: number;
  onChange: (v: number) => void;
  labels: string[];
}> = ({ theme, value, onChange, labels }) => {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {labels.map((label, i) => {
        const on = value === i;
        return (
          <div key={i} onClick={() => {
            if (i !== value && navigator.vibrate) navigator.vibrate(6);
            onChange(i);
          }} style={{
            flex: 1, textAlign: 'center', padding: '10px 2px',
            background: on ? `${INTENSITY_COLORS[i]}25` : theme.surface,
            border: `1.5px solid ${on ? INTENSITY_COLORS[i] : theme.line}`,
            borderRadius: 14,
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: INTENSITY_COLORS[i],
              margin: '0 auto 6px',
              opacity: on ? 1 : 0.4,
              transition: 'opacity 200ms',
            }} />
            <PaceSans size={10} color={on ? theme.ink : theme.inkMuted} weight={on ? 500 : 400}>
              {label}
            </PaceSans>
          </div>
        );
      })}
    </div>
  );
};

// ExerciseRecord — single-page card-based entry
export const ExerciseRecord: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const [type, setType] = React.useState(PaceState.exerciseType || '');
  const [duration, setDuration] = React.useState(PaceState.exerciseDuration || 30);
  const [intensity, setIntensity] = React.useState(PaceState.exerciseIntensity);
  const [mood, setMood] = React.useState(PaceState.exerciseMood);
  const [done, setDone] = React.useState(false);

  const canSubmit = type !== '';

  const intensityLabels = [L.intensity_light, L.intensity_easy, L.intensity_moderate, L.intensity_hard, L.intensity_max];

  const handleDone = () => {
    PaceState.exerciseType = type;
    PaceState.exerciseDuration = duration;
    PaceState.exerciseIntensity = intensity;
    PaceState.exerciseMood = mood;
    PaceState.exerciseRecorded = true;
    setDone(true);
    setTimeout(() => nav.replace('exerciseHome'), 1200);
  };

  if (done) {
    const typeInfo = EXERCISE_TYPES.find(t => t.k === type);
    return (
      <div style={{
        background: theme.bg, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}>
        <AnimatedEnter delay={0}>
          <div style={{ fontSize: 40, marginBottom: 16, textAlign: 'center' }}>✓</div>
        </AnimatedEnter>
        <AnimatedEnter delay={120}>
          <PaceSerif size={24} weight={500} color={theme.ink} style={{ textAlign: 'center', marginBottom: 16 }}>
            {L.exercise_toast}
          </PaceSerif>
        </AnimatedEnter>
        <AnimatedEnter delay={240}>
          <PaceSans size={14} color={theme.inkSoft} style={{ textAlign: 'center' }}>
            {typeInfo?.emoji} {L[`exercise_type_${type}`]} · {duration} {L.u_minute}
          </PaceSans>
        </AnimatedEnter>
      </div>
    );
  }

  return (
    <div style={{ background: theme.bg, height: '100%', position: 'relative' }}>
      <TopBar theme={theme} onClose={() => nav.pop()} step={L.exercise_record_title} />
      <div className="screen-scroll" style={{
        position: 'absolute', inset: 0, overflowY: 'auto',
        paddingTop: 100,
      }}>
        <div style={{ padding: '0 20px 120px' }}>
          {/* Section 1: Exercise type */}
          <AnimatedEnter delay={50}>
            <PaceSerif size={18} weight={500} color={theme.ink} style={{ marginBottom: 16 }}>
              {L.exercise_whatDidYouDo}
            </PaceSerif>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10, marginBottom: 32,
            }}>
              {EXERCISE_TYPES.map(t => {
                const on = type === t.k;
                return (
                  <div key={t.k} onClick={() => setType(t.k)} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: '14px 8px',
                    background: on ? theme.surface : 'transparent',
                    border: `1.5px solid ${on ? theme.terracotta : theme.line}`,
                    borderRadius: 18,
                    cursor: 'pointer',
                    transform: on ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 200ms cubic-bezier(0.34,1.56,0.64,1)',
                  }}>
                    <div style={{ fontSize: 22 }}>{t.emoji}</div>
                    <PaceSans size={12} color={on ? theme.ink : theme.inkSoft} weight={on ? 500 : 400}>
                      {L[`exercise_type_${t.k}`]}
                    </PaceSans>
                  </div>
                );
              })}
            </div>
          </AnimatedEnter>

          {/* Divider */}
          <div style={{ height: 1, background: theme.line, marginBottom: 28 }} />

          {/* Section 2: Duration */}
          <AnimatedEnter delay={120}>
            <PaceSerif size={18} weight={500} color={theme.ink} style={{ marginBottom: 8 }}>
              {L.exercise_howLong}
            </PaceSerif>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12, justifyContent: 'center' }}>
              <PaceSerif size={48} weight={400} color={theme.ink} style={{ transition: 'color 200ms' }}>{duration}</PaceSerif>
              <PaceSans size={16} color={theme.inkMuted}>{L.u_minute}</PaceSans>
            </div>
            <DurationSlider theme={theme} value={duration} onChange={v => {
              if (v !== duration && navigator.vibrate) navigator.vibrate(4);
              setDuration(v);
            }} />
            <div style={{ marginBottom: 32 }} />
          </AnimatedEnter>

          {/* Divider */}
          <div style={{ height: 1, background: theme.line, marginBottom: 28 }} />

          {/* Section 3: Intensity */}
          <AnimatedEnter delay={200}>
            <PaceSerif size={18} weight={500} color={theme.ink} style={{ marginBottom: 16 }}>
              {L.exercise_intensity}
            </PaceSerif>
            <IntensitySelector theme={theme} value={intensity} onChange={setIntensity} labels={intensityLabels} />
            <div style={{ marginBottom: 32 }} />
          </AnimatedEnter>

          {/* Divider */}
          <div style={{ height: 1, background: theme.line, marginBottom: 28 }} />

          {/* Section 4: Mood after */}
          <AnimatedEnter delay={280}>
            <PaceSerif size={18} weight={500} color={theme.ink} style={{ marginBottom: 16 }}>
              {L.exercise_moodAfter}
            </PaceSerif>
            <MoodSlider theme={theme} value={mood} onChange={v => {
              if (v !== mood && navigator.vibrate) navigator.vibrate(6);
              setMood(v);
            }} />
            <div style={{ marginBottom: 32 }} />
          </AnimatedEnter>

          {/* Submit button */}
          <AnimatedEnter delay={360}>
            <Button
              theme={theme}
              full
              onClick={canSubmit ? handleDone : undefined}
              style={{ opacity: canSubmit ? 1 : 0.4, pointerEvents: canSubmit ? 'auto' : 'none' }}
            >
              {L.exercise_done}
            </Button>
          </AnimatedEnter>
        </div>
      </div>
    </div>
  );
};
