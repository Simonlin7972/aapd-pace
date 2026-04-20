import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { Icons } from '../Icons';
import { PaceSerif, PaceSans } from '../UI';

const ProgressBar: React.FC<{ current: number; total: number; theme: PaceTheme }> = ({ current, total, theme }) => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
    {Array.from({ length: total }).map((_, i) => {
      const active = i === current - 1;
      return (
        <div key={i} style={{
          width: active ? 28 : 16, height: 4, borderRadius: 2,
          background: active ? theme.terracotta : theme.line,
          transition: 'width 320ms cubic-bezier(0.4, 0, 0.2, 1), background 320ms ease',
        }} />
      );
    })}
  </div>
);

export const TopBar: React.FC<{
  theme: PaceTheme;
  onBack?: () => void;
  onClose?: () => void;
  right?: React.ReactNode;
  step?: string;
  title?: string;
  progress?: { current: number; total: number };
}> = ({ theme, onBack, onClose, right, step, title, progress }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '56px 20px 0',
  }}>
    <div onClick={onBack || onClose} style={{ color: theme.inkSoft, cursor: 'pointer', padding: 8, margin: -8 }}>
      {onBack ? Icons.ChevronL({ size: 22 }) : onClose ? Icons.Close({ size: 22 }) : null}
    </div>
    {progress && <ProgressBar current={progress.current} total={progress.total} theme={theme} />}
    {!progress && title && <PaceSerif size={15} color={theme.ink}>{title}</PaceSerif>}
    <div style={{ minWidth: 38, textAlign: 'right' }}>
      {step && !progress ? <PaceSans size={12} color={theme.inkMuted}>{step}</PaceSans> : right}
    </div>
  </div>
);
