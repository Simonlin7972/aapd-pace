import React from 'react';
import type { PaceTheme } from '../data/tokens';
import { MOOD_SCALE } from '../data/tokens';
import { PaceState } from '../data/state';
import type { SleepLogEntry } from '../data/state';
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
  const today = new Date();
  const ym = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const totalDays = today.getDate(); // 1號到今天

  const entries: SleepLogEntry[] = (PaceState.sleepLog || [])
    .filter(e => e.date.startsWith(ym))
    .sort((a, b) => b.date.localeCompare(a.date));

  const recorded = entries.length;
  const avg = recorded > 0 ? entries.reduce((s, e) => s + e.hours, 0) / recorded : 0;

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
          {/* Summary block */}
          <div style={{ marginTop: 8, marginBottom: 28 }}>
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
                  {/* Mood dot */}
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: M[e.feel].color, flexShrink: 0,
                  }} />
                  {/* Date + feel */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <PaceSerif size={15} color={theme.ink}>{formatRowDate(e.date)}</PaceSerif>
                    <PaceSans size={11} color={theme.inkMuted} style={{ marginTop: 2 }}>
                      {L[`mood_${M[e.feel].key}`]} · {formatHM(e.bedtimeMin)} → {formatHM(e.wakeTimeMin)}
                    </PaceSans>
                  </div>
                  {/* Hours */}
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
