import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { MOOD_SCALE } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { Icons } from '../Icons';
import { PaceSerif, PaceSans, PaceButton, AnimatedEnter } from '../UI';
import { MoodSlider, HoursSlider } from '../Sliders';
import { useNav, useVisited } from '../NavStack';
import { TopBar } from './TopBar';
import { BottomBar } from '../BottomBar';
import { BlobShape } from '../BlobShape';

// SleepHome: landing page for sleep tab
const WeekChart: React.FC<{ theme: PaceTheme; data: number[]; L: Record<string, any> }> = ({ theme, data, L }) => {
  const max = Math.max(...data, 10);
  const barH = 100;
  const today = new Date().getDay(); // 0=Sun
  const todayIdx = today === 0 ? 6 : today - 1; // convert to Mon=0
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: barH + 24, padding: '0 4px' }}>
      {data.map((h, i) => {
        const height = h > 0 ? Math.max((h / max) * barH, 6) : 4;
        const isToday = i === todayIdx;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%', maxWidth: 32,
              height,
              borderRadius: 8,
              background: h > 0
                ? isToday ? theme.terracotta : theme.dust
                : theme.line,
              opacity: h > 0 ? (isToday ? 1 : 0.6) : 0.4,
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

export const SleepHome: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const visited = useVisited();
  const skip = visited.has('sleepHome');
  const L = theme.L;
  const st = PaceState;
  const M = MOOD_SCALE;
  const recorded = st.sleepRecorded;
  const weekly = st.sleepWeekly;
  const validDays = weekly.filter(h => h > 0);
  const weekAvg = validDays.length > 0 ? validDays.reduce((a, b) => a + b, 0) / validDays.length : 0;
  const insight = weekAvg >= 6.5 ? L.sleepHome_insight : L.sleepHome_insightLow;

  return (
    <div style={{ background: theme.bg, height: '100%', position: 'relative' }}>
      <div className="screen-scroll" style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingTop: 56 }}>
        <div style={{ padding: '8px 20px 120px' }}>
          {/* Header */}
          <AnimatedEnter delay={50} skip={skip}>
            <div style={{ marginBottom: 28 }}>
              <PaceSans size={12} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                {L.sleepHome_title}
              </PaceSans>
              <PaceSerif size={26} weight={500} color={theme.ink}>
                {L.sleepHome_today}
              </PaceSerif>
            </div>
          </AnimatedEnter>

          {/* Hero card */}
          <AnimatedEnter delay={120} skip={skip}>
            <div style={{
              background: theme.surface, borderRadius: theme.radius,
              padding: 22, marginBottom: 16, position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative blob */}
              <BlobShape
                size={80}
                fill={theme.dust}
                opacity={0.2}
                style={{ position: 'absolute', right: -16, top: -16 }}
              />

              {recorded ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, position: 'relative' }}>
                    <div style={{ color: theme.inkSoft }}>{Icons.Sleep({ size: 22 })}</div>
                    <PaceSans size={13} color={theme.inkSoft}>{L.lastNight}</PaceSans>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8, position: 'relative' }}>
                    <PaceSerif size={42} weight={400} color={theme.ink}>{st.sleepHours.toFixed(1)}</PaceSerif>
                    <PaceSans size={16} color={theme.inkMuted}>{L.u_hour}</PaceSans>
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 18, position: 'relative' }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: `${M[st.sleepFeel].color}20`,
                      padding: '5px 12px', borderRadius: 12,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: M[st.sleepFeel].color }} />
                      <PaceSans size={12} color={theme.ink}>{L[`mood_${M[st.sleepFeel].key}`]}</PaceSans>
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: theme.line, padding: '5px 12px', borderRadius: 12,
                    }}>
                      <PaceSans size={12} color={theme.inkSoft}>00:30 → 07:00</PaceSans>
                    </div>
                  </div>
                  <PaceButton theme={theme} variant="soft" full onClick={() => nav.push('sleepStep1')}>
                    {L.sleepHome_reRecord}
                  </PaceButton>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0', position: 'relative' }}>
                  <div style={{ color: theme.inkMuted, marginBottom: 16 }}>{Icons.Sleep({ size: 36 })}</div>
                  <PaceSans size={14} color={theme.inkSoft} style={{ marginBottom: 20 }}>
                    {L.sleepHome_empty}
                  </PaceSans>
                  <PaceButton theme={theme} full onClick={() => nav.push('sleepStep1')}>
                    {L.sleepHome_startRecord}
                  </PaceButton>
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
                <PaceSerif size={17} color={theme.ink}>{L.sleepHome_weekTrend}</PaceSerif>
                {validDays.length > 0 && (
                  <PaceSans size={12} color={theme.inkMuted}>
                    {weekAvg.toFixed(1)}h · {L.sleepHome_weekAvg}
                  </PaceSans>
                )}
              </div>
              <WeekChart theme={theme} data={weekly} L={L} />
            </div>
          </AnimatedEnter>

          {/* Insight card */}
          {validDays.length > 0 && (
            <AnimatedEnter delay={360} skip={skip}>
              <div style={{
                background: theme.surface, borderRadius: theme.radius,
                padding: 18, display: 'flex', gap: 12,
              }}>
                <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.75 }}>{Icons.Leaf({ size: 18 })}</div>
                <div style={{ flex: 1 }}>
                  <PaceSerif size={15} color={theme.ink} style={{ marginBottom: 4 }}>{L.sleepHome_insightTip}</PaceSerif>
                  <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.55 }}>
                    {insight}
                  </PaceSans>
                </div>
              </div>
            </AnimatedEnter>
          )}
        </div>
      </div>
      <BottomBar theme={theme} active="sleep" />
    </div>
  );
};

// Sleep flow — single screen with internal step management
// TopBar + progress bar stays fixed; only content transitions between steps
const iosEase = 'cubic-bezier(0.32, 0.72, 0, 1)';

export const SleepFlow: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const M = MOOD_SCALE;
  const [step, setStep] = React.useState(1);
  const [feel, setFeel] = React.useState(PaceState.sleepFeel);
  const [h, setH] = React.useState(PaceState.sleepHours);
  const [dir, setDir] = React.useState<'forward' | 'back'>('forward');
  const [transitioning, setTransitioning] = React.useState(false);

  const goTo = (next: number, direction: 'forward' | 'back') => {
    setDir(direction);
    setTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setTransitioning(false);
    }, 280);
  };

  const handleClose = () => {
    if (step === 3) {
      nav.replace('sleepHome');
    } else {
      nav.pop();
    }
  };

  const handleBack = () => {
    if (step > 1) goTo(step - 1, 'back');
    else nav.pop();
  };

  const st = PaceState;
  const summary = st.sleepHours >= 7 ? L.summary_good : st.sleepHours >= 5.5 ? L.summary_ok : L.summary_low;

  const contentStyle: React.CSSProperties = {
    flex: 1, display: 'flex', flexDirection: 'column',
    opacity: transitioning ? 0 : 1,
    transform: transitioning
      ? `translateX(${dir === 'forward' ? '40px' : '-40px'})`
      : 'translateX(0)',
    transition: transitioning ? 'none' : `opacity 320ms ${iosEase}, transform 320ms ${iosEase}`,
  };

  return (
    <div style={{ background: theme.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed TopBar — never transitions */}
      <TopBar
        theme={theme}
        onClose={step === 1 || step === 3 ? handleClose : undefined}
        onBack={step === 2 ? handleBack : undefined}
        progress={{ current: step, total: 3 }}
      />

      {/* Step content — fades/slides on transition */}
      <div style={contentStyle}>
        {step === 1 && (
          <>
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
              <BlobShape
                size={140}
                fill={M[feel].color}
                mood={feel}
                dropShadow={`0 16px 40px ${M[feel].color}60`}
                transition="all 420ms cubic-bezier(0.34,1.56,0.64,1)"
                style={{ marginBottom: 36 }}
              />
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
                goTo(2, 'forward');
              }}>{L.continue}</PaceButton>
            </div>
          </>
        )}

        {step === 2 && (
          <>
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
                goTo(3, 'forward');
              }}>{L.seeLastNight}</PaceButton>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ padding: '28px 24px 0', flex: 1 }}>
              <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {L.lastNight}
              </PaceSans>
              <PaceSerif size={30} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 24, textWrap: 'balance' as any }}>
                {summary}
              </PaceSerif>

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

              <div style={{ background: theme.surface, borderRadius: theme.radius, padding: 18, display: 'flex', gap: 12 }}>
                <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.75 }}>{Icons.Leaf({ size: 18 })}</div>
                <div style={{ flex: 1 }}>
                  <PaceSerif size={15} color={theme.ink} style={{ marginBottom: 4 }}>{L.suggestTitle}</PaceSerif>
                  <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.55 }}>
                    {st.sleepHours >= 7 ? L.suggest_focus : L.suggest_rest}
                  </PaceSans>
                </div>
              </div>
            </div>
            <div style={{ padding: '24px 20px' }}>
              <PaceButton theme={theme} full onClick={() => nav.replace('sleepHome')}>{L.okThanks}</PaceButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Keep old exports as aliases for backward compatibility in Export.tsx
export const SleepStep1 = SleepFlow;
export const SleepStep2: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  // Export page renders this standalone — show step 2 content statically
  const L = theme.L;
  const st = PaceState;
  return (
    <div style={{ background: theme.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} onBack={() => {}} progress={{ current: 2, total: 3 }} />
      <div style={{ padding: '28px 24px 0' }}>
        <PaceSerif size={28} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 10, whiteSpace: 'pre-line' }}>
          {L.sleep_step2_title}
        </PaceSerif>
        <PaceSans size={13} color={theme.inkSoft}>{L.sleep_step2_sub}</PaceSans>
      </div>
      <div style={{ flex: 1, padding: '40px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 36 }}>
          <PaceSerif size={64} weight={400} color={theme.ink}>{st.sleepHours.toFixed(1)}</PaceSerif>
          <PaceSans size={18} color={theme.inkSoft}>{L.u_hour}</PaceSans>
        </div>
        <div style={{ width: '100%' }}>
          <HoursSlider theme={theme} value={st.sleepHours} onChange={() => {}} />
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
        <PaceButton theme={theme} full onClick={() => {}}>{L.seeLastNight}</PaceButton>
      </div>
    </div>
  );
};

export const SleepStep3: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const L = theme.L;
  const M = MOOD_SCALE;
  const st = PaceState;
  const summary = st.sleepHours >= 7 ? L.summary_good : st.sleepHours >= 5.5 ? L.summary_ok : L.summary_low;
  return (
    <div style={{ background: theme.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} onClose={() => {}} progress={{ current: 3, total: 3 }} />
      <div style={{ padding: '28px 24px 0', flex: 1 }}>
        <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {L.lastNight}
        </PaceSans>
        <PaceSerif size={30} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 24, textWrap: 'balance' as any }}>
          {summary}
        </PaceSerif>
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
        <div style={{ background: theme.surface, borderRadius: theme.radius, padding: 18, display: 'flex', gap: 12 }}>
          <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.75 }}>{Icons.Leaf({ size: 18 })}</div>
          <div style={{ flex: 1 }}>
            <PaceSerif size={15} color={theme.ink} style={{ marginBottom: 4 }}>{L.suggestTitle}</PaceSerif>
            <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.55 }}>
              {st.sleepHours >= 7 ? L.suggest_focus : L.suggest_rest}
            </PaceSans>
          </div>
        </div>
      </div>
      <div style={{ padding: '24px 20px' }}>
        <PaceButton theme={theme} full onClick={() => {}}>{L.okThanks}</PaceButton>
      </div>
    </div>
  );
};
