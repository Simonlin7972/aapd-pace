import React from 'react';
import { THEMES, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { PaceState } from './data/state';
import { IOSDevice } from './components/IOSFrame';
import { NavStack } from './components/NavStack';
import { HomeScreen } from './components/screens/HomeScreen';
import { SleepHome, SleepStep1, SleepStep2, SleepStep3 } from './components/screens/SleepScreens';
import { MoodSheet } from './components/screens/MoodSheet';
import { MoveScreen, MoveDoneScreen } from './components/screens/MoveScreens';
import { ExerciseHome, ExerciseRecord } from './components/screens/ExerciseScreens';
import { FoodScreen } from './components/screens/FoodScreen';
import { InsightsScreen } from './components/screens/InsightsScreen';
import { ProfileScreen } from './components/screens/ProfileScreens';
import { LaunchScreen } from './components/LaunchScreen';
import { FONTS } from './data/tokens';
import { SettingsCtx, type Tweaks } from './App';

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

// Wrapper: single screen rendered statically inside an iPhone frame
const ScreenFrame: React.FC<{
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}> = ({ label, children, dark = false }) => {
  const t = dark ? buildTheme(true) : buildTheme(false);
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

// Simple segmented control for export page (self-contained, no theme dependency)
const ExportSegmented: React.FC<{
  value: string;
  onChange: (v: string) => void;
  options: { k: string; l: string }[];
}> = ({ value, onChange, options }) => {
  const idx = options.findIndex(o => o.k === value);
  const pct = 100 / options.length;
  return (
    <div style={{
      position: 'relative',
      background: 'rgba(61,52,42,0.12)',
      borderRadius: 12, padding: 3,
      display: 'inline-flex', height: 38, width: 240,
    }}>
      <div style={{
        position: 'absolute', top: 3, bottom: 3,
        left: `calc(${idx * pct}% + 3px)`,
        width: `calc(${pct}% - 6px)`,
        background: '#FBF6EC',
        borderRadius: 9,
        boxShadow: '0 1px 3px rgba(61,52,42,0.1)',
        transition: 'left 280ms cubic-bezier(0.32,0.72,0,1)',
      }} />
      {options.map(o => (
        <div key={o.k} onClick={() => onChange(o.k)} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', cursor: 'pointer',
          fontFamily: FONTS.sans, fontSize: 13,
          color: value === o.k ? '#3D342A' : '#9A8F7E',
          fontWeight: value === o.k ? 500 : 400,
          transition: 'color 200ms ease',
        }}>{o.l}</div>
      ))}
    </div>
  );
};

export default function ExportPage() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const dark = mode === 'dark';
  const currentTheme = buildTheme(dark);
  const currentSettings: Tweaks = { accent: 'amber', radius: 30, dark, lang: 'zh-TW', profileVariant: 'classic' };
  const noop = () => {};

  // Ensure state is set for screens that need it
  PaceState.sleepRecorded = true;
  PaceState.sleepHours = 6.5;
  PaceState.sleepFeel = 2;
  PaceState.mood = 2;
  PaceState.moveDone = true;
  PaceState.moveMinutes = 25;
  PaceState.foodLogged = 2;
  PaceState.sleepWeekly = [6, 7.5, 5, 6.5, 8, 0, 0];
  PaceState.exerciseType = 'run';
  PaceState.exerciseDuration = 30;
  PaceState.exerciseIntensity = 2;
  PaceState.exerciseMood = 3;
  PaceState.exerciseRecorded = true;
  PaceState.exerciseWeekly = [30, 0, 45, 20, 0, 0, 0];

  const screens = [
    { label: '首頁 Home', name: 'home' },
    { label: '睡眠首頁 Sleep Home', name: 'sleepHome' },
    { label: '睡眠 Step 1', name: 'sleepStep1' },
    { label: '睡眠 Step 2', name: 'sleepStep2' },
    { label: '睡眠 Step 3', name: 'sleepStep3' },
    { label: '情緒 Mood', name: 'moodSheet' },
    { label: '運動 Move', name: 'move' },
    { label: '運動完成 Move Done', name: 'moveDone' },
    { label: '運動首頁 Exercise Home', name: 'exerciseHome' },
    { label: '運動記錄 Exercise Record', name: 'exerciseRecord' },
    { label: '飲食 Food', name: 'food' },
    { label: '週報 Insights', name: 'insights' },
    { label: '個人 Profile Classic', name: 'profile' },
  ];

  const SCREEN_MAP: Record<string, React.ComponentType<any>> = {
    home: HomeScreen,
    sleepHome: SleepHome,
    sleepStep1: SleepStep1,
    sleepStep2: SleepStep2,
    sleepStep3: SleepStep3,
    moodSheet: (props: any) => <MoodSheet {...props} onClose={() => {}} />,
    move: MoveScreen,
    moveDone: MoveDoneScreen,
    exerciseHome: ExerciseHome,
    exerciseRecord: ExerciseRecord,
    food: FoodScreen,
    insights: InsightsScreen,
    profile: ProfileScreen,
  };

  const pageBg = dark ? '#1E1A15' : '#D4CDB8';
  const titleColor = dark ? '#F2EADB' : '#3D342A';
  const labelColor = dark ? '#C4B8A2' : '#6E6456';

  return (
    <SettingsCtx.Provider value={{ settings: currentSettings, onUpdate: noop }}>
    <div style={{
      background: pageBg,
      minHeight: '100vh',
      padding: '60px 40px',
      transition: 'background 400ms ease',
    }}>
      <div style={{
        fontFamily: '"Noto Serif TC", serif',
        fontSize: 36, fontWeight: 500,
        color: titleColor,
        marginBottom: 20,
        textAlign: 'center',
        transition: 'color 400ms ease',
      }}>Pace — All Screens</div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
        <ExportSegmented
          value={mode}
          onChange={(v) => setMode(v as 'light' | 'dark')}
          options={[
            { k: 'light', l: 'Light' },
            { k: 'dark', l: 'Dark' },
          ]}
        />
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 48,
        justifyContent: 'center',
        marginBottom: 80,
      }}>
        <ScreenFrame label="啟動畫面 Launch" dark={dark}>
          <LaunchScreen theme={currentTheme} static />
        </ScreenFrame>
        {screens.map(s => (
          <ScreenFrame key={s.name} label={s.label} dark={dark}>
            <NavStackWrapper theme={currentTheme} screen={s.name} screens={SCREEN_MAP} />
          </ScreenFrame>
        ))}
      </div>

      <div style={{
        fontFamily: '"Noto Sans TC", sans-serif',
        fontSize: 14,
        color: labelColor,
        marginBottom: 60,
        textAlign: 'center',
        transition: 'color 400ms ease',
      }}>Profile Variants</div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 48,
        justifyContent: 'center',
      }}>
        {['editorial', 'minimal'].map(variant => {
          const variantSettings: Tweaks = { ...currentSettings, profileVariant: variant };
          return (
            <SettingsCtx.Provider key={`profile-${variant}`} value={{ settings: variantSettings, onUpdate: noop }}>
              <ScreenFrame label={`Profile ${variant}`} dark={dark}>
                <NavStackWrapper theme={currentTheme} screen="profile" screens={SCREEN_MAP} />
              </ScreenFrame>
            </SettingsCtx.Provider>
          );
        })}
      </div>
    </div>
    </SettingsCtx.Provider>
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
