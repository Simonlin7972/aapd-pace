import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { Icons } from '../Icons';
import { PaceSerif, PaceSans } from '../UI';

export const TopBar: React.FC<{
  theme: PaceTheme;
  onBack?: () => void;
  onClose?: () => void;
  right?: React.ReactNode;
  step?: string;
  title?: string;
}> = ({ theme, onBack, onClose, right, step, title }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '56px 20px 0',
  }}>
    <div onClick={onBack || onClose} style={{ color: theme.inkSoft, cursor: 'pointer', padding: 8, margin: -8 }}>
      {onBack ? Icons.ChevronL({ size: 22 }) : onClose ? Icons.Close({ size: 22 }) : null}
    </div>
    {title && <PaceSerif size={15} color={theme.ink}>{title}</PaceSerif>}
    <div style={{ minWidth: 38, textAlign: 'right' }}>
      {step ? <PaceSans size={12} color={theme.inkMuted}>{step}</PaceSans> : right}
    </div>
  </div>
);
