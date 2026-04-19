import React from 'react';
import { THEMES, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { IOSDevice } from './components/IOSFrame';
import { NavStack } from './components/NavStack';
import { LaunchScreen } from './components/LaunchScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { SleepStep1, SleepStep2, SleepStep3 } from './components/screens/SleepScreens';
import { MoodSheet } from './components/screens/MoodSheet';
import { MoveScreen, MoveDoneScreen } from './components/screens/MoveScreens';
import { FoodScreen } from './components/screens/FoodScreen';
import { InsightsScreen } from './components/screens/InsightsScreen';
import { ProfileScreen } from './components/screens/ProfileScreens';

interface Tweaks {
  accent: string;
  radius: number;
  dark: boolean;
  lang: string;
  profileVariant: string;
}

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

function App() {
  const [tweaks, setTweaks] = React.useState<Tweaks>({
    accent: 'amber',
    radius: 30,
    dark: false,
    lang: 'zh-TW',
    profileVariant: 'classic',
  });
  const [jumpTo] = React.useState(0);
  const theme = buildTheme(tweaks);

  React.useEffect(() => {
    document.body.classList.toggle('pace-dark', tweaks.dark);
  }, [tweaks.dark]);

  const update = (patch: Partial<Tweaks>) => {
    setTweaks(p => ({ ...p, ...patch }));
  };

  // Build screens with settings passthrough for profile
  const SCREENS: Record<string, React.ComponentType<any>> = {
    home: HomeScreen,
    sleepStep1: SleepStep1,
    sleepStep2: SleepStep2,
    sleepStep3: SleepStep3,
    moodSheet: MoodSheet,
    move: MoveScreen,
    moveDone: MoveDoneScreen,
    food: FoodScreen,
    insights: InsightsScreen,
    profile: (props: any) => (
      <ProfileScreen
        {...props}
        settings={tweaks}
        onUpdate={update}
      />
    ),
  };

  return (
    <div className="stage">
      <div style={{ position: 'relative' }}>
        <IOSDevice width={380} height={820} dark={tweaks.dark} bg={theme.bg}>
          <DeviceRoot key={jumpTo} theme={theme} screens={SCREENS} />
        </IOSDevice>
      </div>

    </div>
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
