import React from 'react';
import type { PaceTheme } from '../data/tokens';
import { FONTS } from '../data/tokens';
import { PaceSerif, PaceSans } from '../components/ui/foundations/Text';
import { Button } from '../components/ui/actions/Button';
import { WheelPicker } from '../components/ui/inputs/WheelPicker';
import { roundTo5 } from '../lib/time';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

export const TimeSheet: React.FC<{
  theme: PaceTheme;
  onClose: () => void;
  mode: 'bedtime' | 'wakeTime';
  initialMin: number;
  onSave: (min: number) => void;
}> = ({ theme, onClose, mode, initialMin, onSave }) => {
  const L = theme.L;
  const snapped = roundTo5(initialMin);
  const [hour, setHour] = React.useState(Math.floor(snapped / 60) % 24);
  const [minIdx, setMinIdx] = React.useState(Math.floor((snapped % 60) / 5));

  const title = mode === 'bedtime' ? L.timeSheet_bedtime_title : L.timeSheet_wakeTime_title;

  return (
    <div style={{ padding: '14px 22px 8px' }}>
      <PaceSerif size={26} weight={500} color={theme.ink} style={{ marginBottom: 6 }}>
        {title}
      </PaceSerif>
      <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 28, lineHeight: 1.55 }}>
        {L.timeSheet_sub}
      </PaceSans>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, marginBottom: 28,
      }}>
        <WheelPicker
          theme={theme}
          values={HOURS}
          selectedIndex={hour}
          onChange={setHour}
        />
        <div style={{
          fontFamily: FONTS.serif, fontSize: 22, fontWeight: 500, color: theme.ink,
          paddingBottom: 2,
        }}>:</div>
        <WheelPicker
          theme={theme}
          values={MINUTES}
          selectedIndex={minIdx}
          onChange={setMinIdx}
        />
      </div>

      <Button theme={theme} full onClick={() => {
        onSave(hour * 60 + minIdx * 5);
        onClose();
      }}>{L.done}</Button>
    </div>
  );
};
