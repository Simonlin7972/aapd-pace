import React from 'react';
import type { PaceTheme } from '../data/tokens';
import { FONTS } from '../data/tokens';
import { Icons } from './Icons';
import { useNav } from './NavStack';

export type BottomTabKey = 'today' | 'sleep' | 'move' | 'food' | 'mood';

const iosEase = 'cubic-bezier(0.32, 0.72, 0, 1)';

export const BottomBar: React.FC<{
  theme: PaceTheme;
  active?: BottomTabKey;
}> = ({ theme, active = 'today' }) => {
  const nav = useNav();
  const L = theme.L;

  const items: { k: BottomTabKey; label: string; icon: React.ReactNode; tap: () => void }[] = [
    { k: 'today', label: '今天', icon: Icons.Home({ size: 17 }), tap: () => nav.replace('home') },
    { k: 'sleep', label: L.dim_sleep, icon: Icons.Sleep({ size: 17 }), tap: () => nav.push('sleepStep1') },
    { k: 'move', label: L.dim_move, icon: Icons.Move({ size: 17 }), tap: () => nav.push('move') },
    { k: 'food', label: L.dim_food, icon: Icons.Food({ size: 17 }), tap: () => nav.push('food') },
    { k: 'mood', label: L.dim_mood, icon: Icons.Mood({ size: 17 }), tap: () => nav.presentSheet('moodSheet') },
  ];

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 28,
      padding: '0 16px',
      pointerEvents: 'none', zIndex: 20,
    }}>
      <div style={{
        display: 'flex', alignItems: 'stretch',
        width: '100%',
        background: theme.surfaceElevated,
        borderRadius: 28,
        padding: 6,
        gap: 2,
        boxShadow: '0 6px 22px rgba(61,52,42,0.10), 0 1px 0 rgba(255,255,255,0.6) inset',
        pointerEvents: 'auto',
        boxSizing: 'border-box',
      }}>
        {items.map(it => {
          const on = active === it.k;
          return (
            <div
              key={it.k}
              onClick={it.tap}
              style={{
                flex: 1, minWidth: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 3,
                padding: '8px 4px',
                borderRadius: 22,
                background: on ? theme.line : 'transparent',
                color: on ? theme.ink : theme.inkSoft,
                fontFamily: FONTS.sans,
                fontSize: 11, fontWeight: on ? 500 : 400,
                cursor: 'pointer',
                transition: `background 240ms ${iosEase}, color 200ms ease`,
                whiteSpace: 'nowrap',
              }}
            >
              {it.icon}
              <span>{it.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
