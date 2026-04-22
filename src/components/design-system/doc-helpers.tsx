import React from 'react';
import { FONTS, type PaceTheme } from '../../data/tokens';
import { PaceSans } from '../ui/foundations/Text';

const Ctx = React.createContext<PaceTheme | null>(null);

export const DocThemeProvider = Ctx.Provider;

export const useDocTheme = (): PaceTheme => {
  const t = React.useContext(Ctx);
  if (!t) throw new Error('useDocTheme must be used inside <DocPage>');
  return t;
};

export const Divider: React.FC = () => {
  const theme = useDocTheme();
  return <div style={{ height: 1, width: '100%', background: theme.inkMuted, opacity: 0.25 }} />;
};

export const SectionHead: React.FC<{ kicker: string; sub: string }> = ({ kicker, sub }) => {
  const theme = useDocTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <PaceSans
        size={11}
        weight={500}
        color={theme.terracotta}
        style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
      >
        {kicker}
      </PaceSans>
      <PaceSans size={15} color={theme.inkSoft} style={{ lineHeight: 1.6 }}>{sub}</PaceSans>
    </div>
  );
};

export const NumberDot: React.FC<{ n: number }> = ({ n }) => {
  const theme = useDocTheme();
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        background: theme.terracotta,
        color: theme.textOnBrand,
        fontFamily: FONTS.sans,
        fontSize: 12,
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
};

export const DoDontCards: React.FC<{ dos: string[]; donts: string[] }> = ({ dos, donts }) => {
  const theme = useDocTheme();

  const renderCard = (kind: 'do' | 'dont', items: string[]) => {
    const isDo = kind === 'do';
    const accent = isDo ? theme.terracotta : theme.inkMuted;
    return (
      <div
        style={{
          flex: 1,
          background: theme.surface,
          borderRadius: 12,
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div
          style={{
            alignSelf: 'flex-start',
            background: accent,
            color: theme.textOnBrand,
            padding: '4px 10px',
            borderRadius: 10,
            fontFamily: FONTS.sans,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.04em',
          }}
        >
          {isDo ? 'DO' : "DON'T"}
        </div>
        {items.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 24, background: accent, borderRadius: 3, flexShrink: 0 }} />
            <PaceSans size={14} color={theme.ink} style={{ lineHeight: 1.7, flex: 1 }}>{t}</PaceSans>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
      {renderCard('do', dos)}
      {renderCard('dont', donts)}
    </div>
  );
};
