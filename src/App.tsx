import React from 'react';
import { THEMES, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { IOSDevice } from './components/system/IOSFrame';
import { NavStack } from './components/system/NavStack';
import { LaunchScreen } from './components/system/LaunchScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SleepHome, SleepFlow } from './screens/SleepScreens';
import { MoodSheet } from './screens/MoodSheet';
import { MoveScreen, MoveDoneScreen } from './screens/MoveScreens';
import { ExerciseHome, ExerciseRecord } from './screens/ExerciseScreens';
import { FoodScreen } from './screens/FoodScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { ProfileScreen } from './screens/ProfileScreens';

export interface Tweaks {
  accent: string;
  radius: number;
  dark: boolean;
  lang: string;
  profileVariant: string;
}

// Settings context so ProfileScreen can read settings without remounting
export const SettingsCtx = React.createContext<{
  settings: Tweaks;
  onUpdate: (patch: Partial<Tweaks>) => void;
}>(null!);

function buildTheme(t: Tweaks): PaceTheme {
  const base = t.dark ? { ...THEMES.oatDark } : { ...THEMES.oat };
  const theme: any = { ...base };
  theme.radius = t.radius;
  const map: Record<string, string> = {
    terracotta: base.terracotta,
    amber: base.amber,
    sage: base.sage,
    dust: base.dust,
  };
  theme.terracotta = map[t.accent] || base.terracotta;
  theme.lang = t.lang || 'zh-TW';
  theme.L = PACE_I18N[theme.lang] || PACE_I18N['zh-TW'];
  theme.profileVariant = t.profileVariant || 'classic';
  return theme as PaceTheme;
}

function detectStandalone() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  return (window.navigator as unknown as { standalone?: boolean }).standalone === true;
}

function App() {
  const [tweaks, setTweaks] = React.useState<Tweaks>({
    accent: 'amber',
    radius: 30,
    dark: false,
    lang: 'zh-TW',
    profileVariant: 'classic',
  });
  const [jumpTo] = React.useState(0);
  const [standalone, setStandalone] = React.useState(detectStandalone);
  const theme = buildTheme(tweaks);

  React.useEffect(() => {
    document.body.classList.toggle('pace-dark', tweaks.dark);
  }, [tweaks.dark]);

  React.useEffect(() => {
    const mql = window.matchMedia('(display-mode: standalone)');
    const onChange = (e: MediaQueryListEvent) => setStandalone(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const update = (patch: Partial<Tweaks>) => {
    setTweaks(p => ({ ...p, ...patch }));
  };

  // Stable SCREENS object — ProfileScreen reads settings from context
  const SCREENS = React.useMemo<Record<string, React.ComponentType<any>>>(() => ({
    home: HomeScreen,
    sleepHome: SleepHome,
    sleepStep1: SleepFlow,
    moodSheet: MoodSheet,
    move: MoveScreen,
    moveDone: MoveDoneScreen,
    exerciseHome: ExerciseHome,
    exerciseRecord: ExerciseRecord,
    food: FoodScreen,
    insights: InsightsScreen,
    profile: ProfileScreen,
  }), []);

  return (
    <SettingsCtx.Provider value={{ settings: tweaks, onUpdate: update }}>
      <div className={standalone ? 'stage stage--standalone' : 'stage'}>
        <div style={{ position: 'relative', width: standalone ? '100%' : undefined, height: standalone ? '100%' : undefined }}>
          <IOSDevice width={380} height={820} dark={tweaks.dark} bg={theme.bg} standalone={standalone}>
            <DeviceRoot key={jumpTo} theme={theme} screens={SCREENS} />
          </IOSDevice>
        </div>
      </div>
    </SettingsCtx.Provider>
  );
}

function DeviceRoot({ theme, screens }: { theme: PaceTheme; screens: Record<string, React.ComponentType<any>> }) {
  const [launched, setLaunched] = React.useState(false);
  const [homeIn, setHomeIn] = React.useState(false);

  React.useEffect(() => {
    if (launched) {
      const t = setTimeout(() => setHomeIn(true), 50);
      return () => clearTimeout(t);
    }
  }, [launched]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: theme.bg }}>
      <div style={{
        position: 'absolute', inset: 0,
        opacity: homeIn ? 1 : 0,
        transform: homeIn ? 'scale(1)' : 'scale(1.02)',
        transition: 'opacity 1000ms cubic-bezier(0.32,0.72,0,1), transform 1000ms cubic-bezier(0.32,0.72,0,1)',
      }}>
        <NavStack initial="home" screens={screens} theme={theme} />
      </div>
      {!launched && <LaunchScreen theme={theme} onDone={() => setLaunched(true)} />}
    </div>
  );
}

export default App;
