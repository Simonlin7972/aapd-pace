import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { Icons } from '../Icons';
import { PaceSerif, PaceSans } from '../UI';

// 假 iOS status bar 的高度（IOSStatusBar 的 padding 21+22+19）。desktop iPhone frame 下，TopBar 要多讓這麼多空間才不會跟 9:41/訊號圖示 重疊
const STATUS_BAR_H = 62;
// 與 styles.css 內隱藏 .ios-status-bar 的 breakpoint 同步：narrow viewport 下假 status bar 已經消失，不用讓空間
const NARROW_VP = '(max-width: 480px)';

// header 共用 padding：mobile 規格 16/12/12/16（top/right/bottom/left）。假 status bar 可見時（desktop iPhone frame）top 再補 62px
export function useHeaderPadding(): React.CSSProperties {
  const compute = () => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia(NARROW_VP).matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  };
  const [noFakeStatusBar, setNoFakeStatusBar] = React.useState(compute);
  React.useEffect(() => {
    const standaloneMql = window.matchMedia('(display-mode: standalone)');
    const narrowMql = window.matchMedia(NARROW_VP);
    const update = () => setNoFakeStatusBar(compute());
    standaloneMql.addEventListener('change', update);
    narrowMql.addEventListener('change', update);
    return () => {
      standaloneMql.removeEventListener('change', update);
      narrowMql.removeEventListener('change', update);
    };
  }, []);
  return {
    paddingTop: noFakeStatusBar ? 'calc(env(safe-area-inset-top) + 16px)' : STATUS_BAR_H + 16,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 16,
  };
}

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
  leftLabel?: string; // 左側無 back/close action 時顯示的小標（e.g. home 的日期）
  right?: React.ReactNode;
  step?: string;
  title?: string;
  progress?: { current: number; total: number };
}> = ({ theme, onBack, onClose, leftLabel, right, step, title, progress }) => {
  const headerPad = useHeaderPadding();
  const action = onBack || onClose;
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 5,
      background: theme.bg,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      ...headerPad,
    }}>
      <div
        onClick={action}
        style={{
          color: theme.inkSoft,
          cursor: action ? 'pointer' : 'default',
          padding: action ? 8 : 0,
          margin: action ? -8 : 0,
        }}
      >
        {onBack ? Icons.ChevronL({ size: 22 })
          : onClose ? Icons.Close({ size: 22 })
          : leftLabel ? (
            <PaceSans size={12} color={theme.inkMuted} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {leftLabel}
            </PaceSans>
          ) : null}
      </div>
      {progress && <ProgressBar current={progress.current} total={progress.total} theme={theme} />}
      {!progress && title && <PaceSerif size={15} color={theme.ink}>{title}</PaceSerif>}
      <div style={{ minWidth: 38, textAlign: 'right' }}>
        {step && !progress ? <PaceSans size={12} color={theme.inkMuted}>{step}</PaceSans> : right}
      </div>
    </div>
  );
};
