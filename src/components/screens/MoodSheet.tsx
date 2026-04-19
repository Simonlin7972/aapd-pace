import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { MOOD_SCALE } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { PaceSerif, PaceSans, PaceButton } from '../UI';
import { MoodSlider } from '../Sliders';
import { BlobShape } from '../BlobShape';

export const MoodSheet: React.FC<{ theme: PaceTheme; onClose: () => void }> = ({ theme, onClose }) => {
  const L = theme.L;
  const [val, setVal] = React.useState(PaceState.mood);
  const M = MOOD_SCALE;
  return (
    <div style={{ padding: '14px 22px 8px' }}>
      <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {L.moment}
      </PaceSans>
      <PaceSerif size={26} weight={500} color={theme.ink} style={{ marginBottom: 6 }}>
        {L.moodSheet_title}
      </PaceSerif>
      <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 24, lineHeight: 1.55 }}>
        {L.moodSheet_sub}
      </PaceSans>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28, height: 120,
      }}>
        <BlobShape
          size={100}
          fill={M[val].color}
          dropShadow={`0 12px 32px ${M[val].color}55`}
          transition="all 360ms cubic-bezier(0.34,1.56,0.64,1)"
        />
      </div>

      <div style={{ marginBottom: 28 }}>
        <MoodSlider theme={theme} value={val} onChange={(v) => {
          if (v !== val && navigator.vibrate) navigator.vibrate(6);
          setVal(v);
        }} />
      </div>

      <PaceButton theme={theme} full onClick={() => {
        PaceState.mood = val;
        onClose();
      }}>{L.record}</PaceButton>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <PaceSans size={13} color={theme.inkMuted} onClick={onClose} style={{ cursor: 'pointer' }}>{L.skipOk}</PaceSans>
      </div>
    </div>
  );
};
