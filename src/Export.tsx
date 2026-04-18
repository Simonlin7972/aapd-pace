import React from 'react';
import { THEMES, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { PaceState } from './data/state';
import { IOSDevice } from './components/IOSFrame';
import { NavStack } from './components/NavStack';
import { HomeScreen } from './components/screens/HomeScreen';
import { SleepStep1, SleepStep2, SleepStep3 } from './components/screens/SleepScreens';
import { MoodSheet } from './components/screens/MoodSheet';
import { MoveScreen, MoveDoneScreen } from './components/screens/MoveScreens';
import { FoodScreen } from './components/screens/FoodScreen';
import { InsightsScreen } from './components/screens/InsightsScreen';
import { ProfileScreen } from './components/screens/ProfileScreens';
import { LaunchScreen } from './components/LaunchScreen';

function buildTheme(dark = false): PaceTheme {
  const base = dark ? { ...THEMES.oatDark } : { ...THEMES.oat };
  return {
    ...base,
    radius: 30,
    lang: 'zh-TW',
    L: PACE_I18N['zh-TW'],
    profileVariant: 'classic',
  } as PaceTheme;
}

const theme = buildTheme(false);
const darkTheme = buildTheme(true);

// Wrapper: single screen rendered statically inside an iPhone frame
const ScreenFrame: React.FC<{
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}> = ({ label, children, dark = false }) => {
  const t = dark ? darkTheme : theme;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{
        fontFamily: '"Noto Sans TC", sans-serif',
        fontSize: 14, fontWeight: 500,
        color: dark ? '#C4B8A2' : '#6E6456',
        letterSpacing: '0.04em',
      }}>{label}</div>
      <IOSDevice width={380} height={820} dark={dark} bg={t.bg}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: t.bg }}>
          {children}
        </div>
      </IOSDevice>
    </div>
  );
};

// Static screen renderer - renders a single screen without NavStack
const StaticScreen: React.FC<{
  label: string;
  screen: React.ComponentType<any>;
  dark?: boolean;
  extraProps?: Record<string, any>;
}> = ({ label, screen: Screen, dark = false, extraProps = {} }) => {
  const t = dark ? darkTheme : theme;
  // Provide a dummy nav context
  const dummyNav = {
    push: () => {},
    pop: () => {},
    replace: () => {},
    presentSheet: () => {},
    dismissSheet: () => {},
    stack: [],
  };
  const NavCtx = React.createContext(dummyNav);

  return (
    <ScreenFrame label={label} dark={dark}>
      {/* We need NavCtx provider - import it from NavStack */}
      <Screen theme={t} {...extraProps} />
    </ScreenFrame>
  );
};

// We need the NavCtx from NavStack - let's use a simpler approach
// Just render each screen directly with a nav context wrapper
import { useNav } from './components/NavStack';

// Create a wrapper that provides nav context
const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // We'll create a minimal context
  return <>{children}</>;
};

export default function ExportPage() {
  const settings = { dark: false, lang: 'zh-TW', profileVariant: 'classic' };
  const darkSettings = { dark: true, lang: 'zh-TW', profileVariant: 'classic' };

  // Ensure state is set for screens that need it
  PaceState.sleepRecorded = true;
  PaceState.sleepHours = 6.5;
  PaceState.sleepFeel = 2;
  PaceState.mood = 2;
  PaceState.moveDone = true;
  PaceState.moveMinutes = 25;
  PaceState.foodLogged = 2;

  const screens = [
    { label: '首頁 Home', name: 'home' },
    { label: '睡眠 Step 1', name: 'sleepStep1' },
    { label: '睡眠 Step 2', name: 'sleepStep2' },
    { label: '睡眠 Step 3', name: 'sleepStep3' },
    { label: '情緒 Mood', name: 'moodSheet' },
    { label: '運動 Move', name: 'move' },
    { label: '運動完成 Move Done', name: 'moveDone' },
    { label: '飲食 Food', name: 'food' },
    { label: '週報 Insights', name: 'insights' },
    { label: '個人 Profile Classic', name: 'profile' },
  ];

  const SCREEN_MAP: Record<string, React.ComponentType<any>> = {
    home: HomeScreen,
    sleepStep1: SleepStep1,
    sleepStep2: SleepStep2,
    sleepStep3: SleepStep3,
    moodSheet: (props: any) => <MoodSheet {...props} onClose={() => {}} />,
    move: MoveScreen,
    moveDone: MoveDoneScreen,
    food: FoodScreen,
    insights: InsightsScreen,
    profile: (props: any) => <ProfileScreen {...props} settings={settings} onUpdate={() => {}} />,
  };

  return (
    <div style={{
      background: '#D4CDB8',
      minHeight: '100vh',
      padding: '60px 40px',
    }}>
      <div style={{
        fontFamily: '"Noto Serif TC", serif',
        fontSize: 36, fontWeight: 500,
        color: '#3D342A',
        marginBottom: 12,
        textAlign: 'center',
      }}>Pace — All Screens</div>
      <div style={{
        fontFamily: '"Noto Sans TC", sans-serif',
        fontSize: 14,
        color: '#6E6456',
        marginBottom: 60,
        textAlign: 'center',
      }}>Light Mode</div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 48,
        justifyContent: 'center',
        marginBottom: 80,
      }}>
        <ScreenFrame label="啟動畫面 Launch">
          <LaunchScreen theme={theme} static />
        </ScreenFrame>
        {screens.map(s => {
          const Comp = SCREEN_MAP[s.name];
          return (
            <ScreenFrame key={s.name} label={s.label}>
              <NavStackWrapper theme={theme} screen={s.name} screens={SCREEN_MAP} />
            </ScreenFrame>
          );
        })}
      </div>

      <div style={{
        fontFamily: '"Noto Sans TC", sans-serif',
        fontSize: 14,
        color: '#9A8F7E',
        marginBottom: 60,
        textAlign: 'center',
      }}>Dark Mode</div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 48,
        justifyContent: 'center',
        marginBottom: 80,
      }}>
        {['home', 'insights', 'profile'].map(name => {
          const darkScreenMap: Record<string, React.ComponentType<any>> = {
            ...SCREEN_MAP,
            profile: (props: any) => <ProfileScreen {...props} settings={darkSettings} onUpdate={() => {}} />,
          };
          return (
            <ScreenFrame key={`dark-${name}`} label={`${screens.find(s => s.name === name)?.label} (Dark)`} dark>
              <NavStackWrapper theme={darkTheme} screen={name} screens={darkScreenMap} />
            </ScreenFrame>
          );
        })}
      </div>

      <div style={{
        fontFamily: '"Noto Sans TC", sans-serif',
        fontSize: 14,
        color: '#9A8F7E',
        marginBottom: 60,
        textAlign: 'center',
      }}>Profile Variants</div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 48,
        justifyContent: 'center',
      }}>
        {['editorial', 'minimal'].map(variant => {
          const variantScreenMap: Record<string, React.ComponentType<any>> = {
            ...SCREEN_MAP,
            profile: (props: any) => <ProfileScreen {...props} settings={{ ...settings, profileVariant: variant }} onUpdate={() => {}} />,
          };
          return (
            <ScreenFrame key={`profile-${variant}`} label={`Profile ${variant}`}>
              <NavStackWrapper theme={theme} screen="profile" screens={variantScreenMap} />
            </ScreenFrame>
          );
        })}
      </div>
    </div>
  );
}

// Renders a single screen inside a NavStack so useNav() works
const NavStackWrapper: React.FC<{
  theme: PaceTheme;
  screen: string;
  screens: Record<string, React.ComponentType<any>>;
}> = ({ theme, screen, screens }) => {
  return (
    <NavStack initial={screen} screens={screens} theme={theme} />
  );
};
