import React from 'react';
import { THEMES, FONTS, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { PaceSerif, PaceSans } from './components/ui/foundations/Text';
import { HoursSlider } from './components/ui/inputs/HoursSlider';
import { SideNav, SIDENAV_WIDTH, DS_THEME_KEY, readDarkPref } from './components/design-system/SideNav';

function buildTheme(dark = false): PaceTheme {
  const base = dark ? THEMES.oatDark : THEMES.oat;
  return {
    ...base,
    radius: 30,
    lang: 'zh-TW',
    L: PACE_I18N['zh-TW'],
    profileVariant: 'classic',
  } as PaceTheme;
}

const Divider: React.FC<{ theme: PaceTheme }> = ({ theme }) => (
  <div style={{ height: 1, width: '100%', background: theme.inkMuted, opacity: 0.25 }} />
);

const SectionHead: React.FC<{ theme: PaceTheme; kicker: string; sub: string }> = ({ theme, kicker, sub }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
    <PaceSans size={11} weight={500} color={theme.terracotta} style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>
      {kicker}
    </PaceSans>
    <PaceSans size={15} color={theme.inkSoft} style={{ lineHeight: 1.6 }}>{sub}</PaceSans>
  </div>
);

const NumberDot: React.FC<{ theme: PaceTheme; n: number }> = ({ theme, n }) => (
  <div
    style={{
      width: 24, height: 24, borderRadius: 12,
      background: theme.terracotta, color: theme.textOnBrand,
      fontFamily: FONTS.sans, fontSize: 12, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {n}
  </div>
);

const HoursSliderDoc: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(() => readDarkPref());
  const theme = buildTheme(isDark);

  const handleThemeToggle = (v: string) => {
    const dark = v === 'dark';
    setIsDark(dark);
    localStorage.setItem(DS_THEME_KEY, dark ? 'dark' : 'light');
  };

  const [anatomyVal, setAnatomyVal] = React.useState(6);
  const [range8, setRange8] = React.useState(4);
  const [range12, setRange12] = React.useState(7.5);
  const [range24, setRange24] = React.useState(14);

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: FONTS.sans, color: theme.ink }}>
      <SideNav
        theme={theme}
        activeL1="inputs"
        activeL2="mol-hours-slider"
        isDark={isDark}
        onToggle={handleThemeToggle}
      />

      <div style={{ marginLeft: SIDENAV_WIDTH }}>
        {/* Header bar — back to design system */}
        <div style={{ padding: '20px 48px', borderBottom: `1px solid ${theme.line}`, background: theme.bg }}>
          <a
            href="/design-system#mol-hours-slider"
            onClick={(e) => {
              const ref = document.referrer;
              if (ref && new URL(ref).pathname === '/design-system') {
                e.preventDefault();
                history.back();
              }
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: FONTS.sans, fontSize: 14, fontWeight: 500,
              color: theme.inkSoft, textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            返回設計系統
          </a>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {/* Title block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            <PaceSans size={12} weight={500} color={theme.inkMuted} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Component
            </PaceSans>
            <PaceSerif size={56} weight={700} color={theme.ink} style={{ lineHeight: 1.15 }}>
              Hours Slider
            </PaceSerif>
            <PaceSans size={17} color={theme.inkSoft} style={{ lineHeight: 1.65, maxWidth: 760 }}>
              讓使用者以拖拉方式輸入時數——睡眠、運動、或任何連續區間的時間長度。以漸層提示方向，以拖曳提供回饋。
            </PaceSans>
          </div>

          <Divider theme={theme} />

          {/* ANATOMY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Anatomy" sub="由 Track、Fill、Thumb、Tick labels 四個部分組成。" />
            <div
              style={{
                background: theme.surface,
                borderRadius: 12,
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
              }}
            >
              <div style={{ width: 560, maxWidth: '100%', alignSelf: 'center' }}>
                <HoursSlider theme={theme} value={anatomyVal} onChange={setAnatomyVal} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, rowGap: 14, maxWidth: 560, alignSelf: 'center', width: '100%' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={1} />
                  <PaceSans size={14} color={theme.ink}>Track — 底層 6px 線，承載整個區間</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={2} />
                  <PaceSans size={14} color={theme.ink}>Fill — 漸層條，從 Dust 到 Terracotta</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={3} />
                  <PaceSans size={14} color={theme.ink}>Thumb — 30×30 拖拉點，標示目前位置</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={4} />
                  <PaceSans size={14} color={theme.ink}>Tick labels — 對應刻度的數字提示</PaceSans>
                </div>
              </div>
            </div>
          </div>

          <Divider theme={theme} />

          {/* STATES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="States" sub="拖曳中 thumb 放大到 1.1 並加深陰影，給使用者「握住了」的回饋。" />
            <div
              style={{
                background: theme.surface,
                borderRadius: 12,
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                gap: 28,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>Default</PaceSans>
                <HoursSlider theme={theme} value={6} onChange={() => {}} state="default" />
              </div>
              <Divider theme={theme} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>Dragging</PaceSans>
                <HoursSlider theme={theme} value={6} onChange={() => {}} state="dragging" />
              </div>
            </div>
          </div>

          <Divider theme={theme} />

          {/* RANGE & STEP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Range & Step" sub="依場景調整 min / max / step——範圍越大，step 建議越粗，避免使用者精細拖拉。" />
            <div
              style={{
                background: theme.surface,
                borderRadius: 12,
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>0–8h, step 1 — 運動時長</PaceSans>
                <HoursSlider theme={theme} value={range8} onChange={setRange8} min={0} max={8} step={1} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>0–12h, step 0.5 — 預設，睡眠時長</PaceSans>
                <HoursSlider theme={theme} value={range12} onChange={setRange12} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>0–24h, step 1 — 全日長度</PaceSans>
                <HoursSlider theme={theme} value={range24} onChange={setRange24} min={0} max={24} step={1} />
              </div>
            </div>
          </div>

          <Divider theme={theme} />

          {/* USAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Usage" sub="拖拉輸入重視的是體感，不是精確——搭配顯示當前數值，讓使用者信任自己的選擇。" />
            <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
              {/* DO */}
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
                    background: theme.terracotta,
                    color: theme.textOnBrand,
                    padding: '4px 10px',
                    borderRadius: 10,
                    fontFamily: FONTS.sans,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  DO
                </div>
                {[
                  '搭配顯示當前數值，拖拉時數字同步變化',
                  '刻度標籤只標幾個代表值（例：0 / 3 / 6 / 9 / 12），不要每格都寫',
                  '範圍較大時加大 step（例：0–24h 用 1h 為單位）',
                  '文案強調體感——「昨晚睡了幾小時？」勝過「請輸入睡眠時數」',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 24, background: theme.terracotta, borderRadius: 3, flexShrink: 0 }} />
                    <PaceSans size={14} color={theme.ink} style={{ lineHeight: 1.7, flex: 1 }}>{t}</PaceSans>
                  </div>
                ))}
              </div>

              {/* DON'T */}
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
                    background: theme.inkMuted,
                    color: theme.textOnBrand,
                    padding: '4px 10px',
                    borderRadius: 10,
                    fontFamily: FONTS.sans,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  DON'T
                </div>
                {[
                  '不要用在需要精確數值的輸入（例：準確到分鐘），改用 stepper 或輸入框',
                  '不要把 step 設得太細（例：0.1h）——拖拉體感會變不穩',
                  '不要省略 tick labels，使用者會失去空間參考',
                  '不要讓 thumb 小於 28×28，手指點擊會不容易',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 24, background: theme.inkMuted, borderRadius: 3, flexShrink: 0 }} />
                    <PaceSans size={14} color={theme.ink} style={{ lineHeight: 1.7, flex: 1 }}>{t}</PaceSans>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoursSliderDoc;
