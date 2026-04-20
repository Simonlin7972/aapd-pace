import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { FONTS } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { PaceSerif, PaceSans, Button, AnimatedEnter } from '../UI';
import { useNav } from '../NavStack';
import { TopBar } from './TopBar';
import { BlobShape } from '../BlobShape';

export const MoveScreen: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const [type, setType] = React.useState('walk');
  const [min, setMin] = React.useState(25);
  const TYPES = [
    { k: 'walk', l: L.move_walk },
    { k: 'run', l: L.move_run },
    { k: 'yoga', l: L.move_yoga },
    { k: 'strength', l: L.move_strength },
  ];
  return (
    <div style={{ background: theme.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} onClose={() => nav.pop()} step={L.moveHeader} />
      <div style={{ padding: '28px 24px 0', flex: 1 }}>
        <PaceSerif size={28} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 10 }}>
          {L.move_title}
        </PaceSerif>
        <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 28 }}>{L.move_sub}</PaceSans>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {TYPES.map(t => (
            <div key={t.k} onClick={() => setType(t.k)} style={{
              padding: '10px 18px', borderRadius: 999,
              background: type === t.k ? theme.ink : 'transparent',
              color: type === t.k ? theme.bg : theme.inkSoft,
              border: `1px solid ${type === t.k ? theme.ink : theme.lineStrong}`,
              fontFamily: FONTS.sans, fontSize: 14,
              cursor: 'pointer', transition: 'all 200ms ease',
            }}>{t.l}</div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 20 }}>
          <PaceSerif size={54} color={theme.ink}>{min}</PaceSerif>
          <PaceSans size={16} color={theme.inkSoft}>{L.u_minute}</PaceSans>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[10, 20, 30, 45, 60].map(v => (
            <div key={v} onClick={() => setMin(v)} style={{
              flex: 1, textAlign: 'center', padding: '14px 0',
              background: min === v ? theme.terracotta : theme.surface,
              color: min === v ? '#FBF6EC' : theme.inkSoft,
              borderRadius: theme.radius,
              fontFamily: FONTS.sans, fontSize: 14,
              cursor: 'pointer', transition: 'all 180ms ease',
            }}>{v}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: '24px 20px' }}>
        <Button theme={theme} full onClick={() => {
          PaceState.moveDone = true;
          PaceState.moveMinutes = min;
          nav.replace('moveDone');
        }}>{L.record}</Button>
      </div>
    </div>
  );
};

export const MoveDoneScreen: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  return (
    <div style={{ background: theme.bg, minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <AnimatedEnter delay={60}>
        <BlobShape
          size={120}
          fill={theme.sage}
          dropShadow={`0 16px 40px ${theme.sage}50`}
          style={{ marginBottom: 32 }}
        />
      </AnimatedEnter>
      <AnimatedEnter delay={220}>
        <PaceSerif size={30} weight={500} color={theme.ink} style={{ textAlign: 'center', marginBottom: 12, whiteSpace: 'pre-line' }}>
          {L.moveDone_title}
        </PaceSerif>
      </AnimatedEnter>
      <AnimatedEnter delay={380}>
        <PaceSans size={14} color={theme.inkSoft} style={{ textAlign: 'center', marginBottom: 40 }}>
          {PaceState.moveMinutes} {L.u_minute} · {L.move_walk}
        </PaceSans>
      </AnimatedEnter>
      <div style={{ width: '100%', padding: '0 4px' }}>
        <AnimatedEnter delay={500}>
          <Button theme={theme} full onClick={() => nav.replace('home')}>{L.backHome}</Button>
        </AnimatedEnter>
        <AnimatedEnter delay={580}>
          <div style={{ textAlign: 'center', marginTop: 14 }}>
            <PaceSans size={13} color={theme.inkMuted} onClick={() => nav.presentSheet('moodSheet')} style={{ cursor: 'pointer' }}>
              {L.logMoodHint}
            </PaceSans>
          </div>
        </AnimatedEnter>
      </div>
    </div>
  );
};
