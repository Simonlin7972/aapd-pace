import React from 'react';
import type { PaceTheme } from '../data/tokens';

const iosEase = 'cubic-bezier(0.32, 0.72, 0, 1)';

// Navigation context
interface NavContextType {
  push: (name: string, props?: Record<string, any>) => void;
  pop: () => void;
  replace: (name: string, props?: Record<string, any>) => void;
  presentSheet: (name: string, props?: Record<string, any>) => void;
  dismissSheet: () => void;
  stack: { name: string; props: Record<string, any> }[];
}

const NavCtx = React.createContext<NavContextType | null>(null);
export const useNav = () => React.useContext(NavCtx)!;

// Bottom sheet
const BottomSheet: React.FC<{
  theme: PaceTheme;
  children: React.ReactNode;
  onClose: () => void;
}> = ({ theme, children, onClose }) => {
  const [mounted, setMounted] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);
  const close = () => {
    setClosing(true);
    setTimeout(onClose, 320);
  };
  const visible = mounted && !closing;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div onClick={close} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(61,52,42,0.4)',
        opacity: visible ? 1 : 0,
        transition: `opacity 320ms ${iosEase}`,
      }} />
      <div style={{
        position: 'relative',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: `transform 380ms ${iosEase}`,
        background: theme.bg,
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        maxHeight: '86%',
        overflow: 'auto',
        paddingBottom: 28,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: theme.lineStrong }} />
        </div>
        {children}
      </div>
    </div>
  );
};

// Toast
export const useToast = () => {
  const [toast, setToast] = React.useState<string | null>(null);
  const show = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(null), 2200);
  };
  const node = toast ? (
    <div style={{
      position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(61,52,42,0.92)', color: '#FBF6EC',
      padding: '10px 18px', borderRadius: 999,
      fontFamily: '"Noto Sans TC", sans-serif', fontSize: 13,
      zIndex: 200, whiteSpace: 'nowrap',
      animation: 'paceToast 320ms cubic-bezier(0.34,1.56,0.64,1)',
    }}>{toast}</div>
  ) : null;
  return { show, node };
};

// NavStack
export const NavStack: React.FC<{
  initial: string;
  screens: Record<string, React.ComponentType<any>>;
  theme: PaceTheme;
}> = ({ initial, screens, theme }) => {
  const [stack, setStack] = React.useState([{ name: initial, props: {} as Record<string, any> }]);
  const [popping, setPopping] = React.useState(false);
  const [pushing, setPushing] = React.useState(false);
  const [sheet, setSheet] = React.useState<{ name: string; props: Record<string, any> } | null>(null);

  const push = (name: string, props = {}) => {
    setPushing(true);
    setStack(s => [...s, { name, props }]);
    setTimeout(() => setPushing(false), 420);
  };
  const pop = () => {
    if (stack.length <= 1) return;
    setPopping(true);
    setTimeout(() => {
      setStack(s => s.slice(0, -1));
      setPopping(false);
    }, 380);
  };
  const replace = (name: string, props = {}) => {
    setStack([{ name, props }]);
  };
  const presentSheet = (name: string, props = {}) => setSheet({ name, props });
  const dismissSheet = () => setSheet(null);

  const nav = { push, pop, replace, presentSheet, dismissSheet, stack };

  return (
    <NavCtx.Provider value={nav}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: theme.bg }}>
        {stack.map((frame, i) => {
          const Comp = screens[frame.name];
          const isTop = i === stack.length - 1;
          const isUnder = i === stack.length - 2;
          const transform = isTop
            ? (pushing ? 'translateX(100%)' : popping ? 'translateX(100%)' : 'translateX(0)')
            : isUnder
              ? (popping ? 'translateX(0) scale(1)' : 'translateX(-22%) scale(0.97)')
              : 'translateX(-22%) scale(0.97)';
          const opacity = isTop ? 1 : (isUnder ? (popping ? 1 : 0.65) : 0);
          return (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              transform,
              opacity,
              transition: `transform 380ms ${iosEase}, opacity 380ms ${iosEase}`,
              boxShadow: isTop && i > 0 ? '-12px 0 40px rgba(0,0,0,0.12)' : 'none',
              background: theme.bg,
              pointerEvents: isTop ? 'auto' : 'none',
            }}>
              {Comp && <Comp theme={theme} {...frame.props} />}
            </div>
          );
        })}

        {sheet && (
          <BottomSheet theme={theme} onClose={dismissSheet}>
            {React.createElement(screens[sheet.name], { theme, ...sheet.props, onClose: dismissSheet })}
          </BottomSheet>
        )}
      </div>
    </NavCtx.Provider>
  );
};
