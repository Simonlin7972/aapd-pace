import React from 'react';
import type { PaceTheme } from '../data/tokens';
import { MOOD_SCALE } from '../data/tokens';
import { PaceState } from '../data/state';
import type { SleepLogEntry } from '../data/state';
import { Icons } from '../components/ui/foundations/Icons';
import { PaceSerif, PaceSans } from '../components/ui/foundations/Text';
import { useNav } from '../components/system/NavStack';
import { TopBar } from '../components/ui/navigation/TopBar';
import { formatHM } from '../lib/time';

const pickObservation = (avg: number, L: Record<string, any>): string => {
  if (avg >= 7.5) return L.sleepLog_obs_long;
  if (avg < 6) return L.sleepLog_obs_short;
  return L.sleepLog_obs_steady;
};

export const SleepLog: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const M = MOOD_SCALE;
  const today = React.useMemo(() => new Date(), []);
  const todayY = today.getFullYear();
  const todayM = today.getMonth() + 1;

  const [view, setView] = React.useState({ y: todayY, m: todayM });
  const isCurrent = view.y === todayY && view.m === todayM;
  const ym = `${view.y}-${String(view.m).padStart(2, '0')}`;
  const totalDays = isCurrent ? today.getDate() : new Date(view.y, view.m, 0).getDate();

  const entries: SleepLogEntry[] = (PaceState.sleepLog || [])
    .filter(e => e.date.startsWith(ym))
    .sort((a, b) => b.date.localeCompare(a.date));

  const recorded = entries.length;
  const avg = recorded > 0 ? entries.reduce((s, e) => s + e.hours, 0) / recorded : 0;

  const goPrev = () => {
    setView(v => v.m === 1 ? { y: v.y - 1, m: 12 } : { y: v.y, m: v.m - 1 });
  };
  const goNext = () => {
    if (isCurrent) return;
    setView(v => v.m === 12 ? { y: v.y + 1, m: 1 } : { y: v.y, m: v.m + 1 });
  };

  const formatRowDate = (iso: string): string => {
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    const w = L.weekShort[dt.getDay()];
    return `${m}/${d} (${w})`;
  };

  return (
    <div style={{ background: theme.bg, height: '100%', position: 'relative' }}>
      <div className="screen-scroll" style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
        <TopBar theme={theme} onBack={() => nav.pop()} title={L.sleepLog_title} />
        <div style={{ padding: '8px 24px 80px' }}>
          {/* Month switcher */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 18, marginTop: 4, marginBottom: 24,
          }}>
            <button
              type="button"
              onClick={goPrev}
              aria-label="prev month"
              style={{
                background: 'transparent', border: 'none', padding: 8, cursor: 'pointer',
                color: theme.inkSoft, display: 'flex', alignItems: 'center',
              }}
            >
              {Icons.ChevronL({ size: 20 })}
            </button>
            <PaceSerif size={18} weight={500} color={theme.ink} style={{ minWidth: 110, textAlign: 'center' }}>
              {L.sleepLog_monthLabel(view.y, view.m)}
            </PaceSerif>
            <button
              type="button"
              onClick={goNext}
              disabled={isCurrent}
              aria-label="next month"
              style={{
                background: 'transparent', border: 'none', padding: 8,
                cursor: isCurrent ? 'not-allowed' : 'pointer',
                color: isCurrent ? theme.inkMuted : theme.inkSoft,
                opacity: isCurrent ? 0.35 : 1,
                display: 'flex', alignItems: 'center',
              }}
            >
              {Icons.ChevronR({ size: 20 })}
            </button>
          </div>

          {/* Summary block */}
          <div style={{ marginBottom: 28 }}>
            <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 10 }}>
              {recorded > 0 ? L.sleepLog_summary(recorded, totalDays, avg) : ''}
            </PaceSans>
            <PaceSerif size={22} weight={500} color={theme.ink} style={{ lineHeight: 1.45, textWrap: 'balance' as any }}>
              {recorded > 0 ? pickObservation(avg, L) : L.sleepLog_empty}
            </PaceSerif>
          </div>

          {/* List */}
          {entries.length > 0 && (
            <div style={{
              background: theme.surface, borderRadius: theme.radius,
              padding: '4px 18px',
            }}>
              {entries.map((e, i) => (
                <div
                  key={e.date}
                  style={{
                    padding: '16px 0',
                    borderTop: i === 0 ? 'none' : `1px solid ${theme.line}`,
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: M[e.feel].color, flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <PaceSerif size={15} color={theme.ink}>{formatRowDate(e.date)}</PaceSerif>
                    <PaceSans size={11} color={theme.inkMuted} style={{ marginTop: 2 }}>
                      {L[`mood_${M[e.feel].key}`]} · {formatHM(e.bedtimeMin)} → {formatHM(e.wakeTimeMin)}
                    </PaceSans>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, flexShrink: 0 }}>
                    <PaceSerif size={20} weight={400} color={theme.ink}>{e.hours.toFixed(1)}</PaceSerif>
                    <PaceSans size={11} color={theme.inkMuted}>h</PaceSans>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
