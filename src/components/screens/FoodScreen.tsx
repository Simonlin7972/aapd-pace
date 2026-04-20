import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { FONTS } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { PaceSerif, PaceSans, Button } from '../UI';
import { useNav } from '../NavStack';
import { TopBar } from './TopBar';

export const FoodScreen: React.FC<{ theme: PaceTheme }> = ({ theme }) => {
  const nav = useNav();
  const L = theme.L;
  const meals = [L.meal_breakfast, L.meal_lunch, L.meal_dinner, L.meal_snack];
  const [sel, setSel] = React.useState(2);
  const [health, setHealth] = React.useState(1);
  const HEALTHS = [
    { k: 0, l: L.food_light, c: theme.sage },
    { k: 1, l: L.food_balanced, c: theme.dust },
    { k: 2, l: L.food_indulgent, c: theme.terracotta },
  ];
  return (
    <div style={{ background: theme.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar theme={theme} onBack={() => nav.pop()} step={L.foodHeader} />
      <div style={{ padding: '28px 24px 0', flex: 1 }}>
        <PaceSerif size={28} weight={500} color={theme.ink} style={{ lineHeight: 1.3, marginBottom: 10 }}>
          {L.food_title}
        </PaceSerif>
        <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 28 }}>{L.food_sub}</PaceSans>

        <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{L.mealLabel}</PaceSans>
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {meals.map((m: string, i: number) => (
            <div key={m} onClick={() => setSel(i)} style={{
              flex: 1, textAlign: 'center', padding: '12px 0',
              background: sel === i ? theme.ink : theme.surface,
              color: sel === i ? theme.bg : theme.inkSoft,
              borderRadius: theme.radius,
              fontFamily: FONTS.sans, fontSize: 13,
              cursor: 'pointer', transition: 'all 180ms ease',
            }}>{m}</div>
          ))}
        </div>

        <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{L.feelLabel}</PaceSans>
        <div style={{ display: 'flex', gap: 10 }}>
          {HEALTHS.map(h => (
            <div key={h.k} onClick={() => setHealth(h.k)} style={{
              flex: 1, padding: '18px 12px',
              background: theme.surface, borderRadius: theme.radius,
              cursor: 'pointer', position: 'relative',
              border: `2px solid ${health === h.k ? h.c : 'transparent'}`,
              transition: 'all 200ms ease',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: h.c, marginBottom: 10,
              }} />
              <PaceSans size={14} color={theme.ink}>{h.l}</PaceSans>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '24px 20px' }}>
        <Button theme={theme} full onClick={() => {
          PaceState.foodLogged = Math.min(3, PaceState.foodLogged + 1);
          nav.replace('home');
        }}>{L.record}</Button>
      </div>
    </div>
  );
};
