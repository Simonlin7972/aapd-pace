import React from 'react';
import { THEMES, FONTS, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { PaceSerif, PaceSans } from './components/ui/foundations/Text';
import { SleepChart } from './components/ui/data-display/SleepChart';
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

const SleepChartDoc: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(() => readDarkPref());
  const theme = buildTheme(isDark);

  const handleThemeToggle = (v: string) => {
    const dark = v === 'dark';
    setIsDark(dark);
    localStorage.setItem(DS_THEME_KEY, dark ? 'dark' : 'light');
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: FONTS.sans, color: theme.ink }}>
      <SideNav
        theme={theme}
        activeL1="data-display"
        activeL2="org-sleep-chart"
        isDark={isDark}
        onToggle={handleThemeToggle}
      />

      <div style={{ marginLeft: SIDENAV_WIDTH }}>
        <div style={{ padding: '20px 48px', borderBottom: `1px solid ${theme.line}`, background: theme.bg }}>
          <a
            href="/design-system#org-sleep-chart"
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

        <div style={{ maxWidth: 880, margin: '0 auto', padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            <PaceSans size={12} weight={500} color={theme.inkMuted} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Component
            </PaceSans>
            <PaceSerif size={56} weight={700} color={theme.ink} style={{ lineHeight: 1.15 }}>
              Sleep Chart
            </PaceSerif>
            <PaceSans size={17} color={theme.inkSoft} style={{ lineHeight: 1.65, maxWidth: 760 }}>
              以平滑曲線呈現一週睡眠時長——看節奏，不看單日。頂點標示最近一天，漸層淡化提醒「這是趨勢，不是判決」。
            </PaceSans>
          </div>

          <Divider theme={theme} />

          {/* ANATOMY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Anatomy" sub="由 Header、Curve、Gradient fill、Dots、Day labels 五個部分組成。" />
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
              <div style={{ maxWidth: 560, width: '100%', alignSelf: 'center' }}>
                <SleepChart theme={theme} data={[5.5, 6.2, 7.0, 6.5, 4.8, 7.8, 6.5]} average={6.3} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, rowGap: 14, maxWidth: 560, width: '100%', alignSelf: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={1} />
                  <PaceSans size={14} color={theme.ink}>Header — 標題 + 週平均</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={2} />
                  <PaceSans size={14} color={theme.ink}>Curve — 平滑的 Bézier 曲線</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={3} />
                  <PaceSans size={14} color={theme.ink}>Gradient fill — 向下淡化的漸層底</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={4} />
                  <PaceSans size={14} color={theme.ink}>Dots — 每日端點，末點放大</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={5} />
                  <PaceSans size={14} color={theme.ink}>Day labels — 對應星期的文字</PaceSans>
                </div>
              </div>
            </div>
          </div>

          <Divider theme={theme} />

          {/* DATA PATTERNS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Data patterns" sub="同樣的元件，不同的資料呈現不同故事。" />
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>平穩的一週</PaceSans>
                <SleepChart theme={theme} data={[7.0, 7.2, 6.8, 7.1, 7.0, 7.3, 6.9]} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>週末補眠</PaceSans>
                <SleepChart theme={theme} data={[5.8, 6.0, 5.5, 6.2, 5.9, 8.4, 8.1]} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>睡眠不足——值得留意</PaceSans>
                <SleepChart theme={theme} data={[5.0, 4.5, 5.2, 4.8, 5.0, 5.5, 5.2]} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>震盪的一週</PaceSans>
                <SleepChart theme={theme} data={[4.5, 7.8, 5.2, 8.0, 4.8, 7.5, 6.0]} />
              </div>
            </div>
          </div>

          <Divider theme={theme} />

          {/* USAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Usage" sub="圖是為了看節奏，不是為了打分數。平均值陪伴，不評斷。" />
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
                  '搭配週平均數字，讓抽象曲線有具體參考',
                  '用平滑曲線強調節奏，不要用直線連接強調單日',
                  '末點放大（4px），標示「最近一天」',
                  '漸層底淡化往下，暗示這是趨勢不是精準量測',
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
                  '不要在曲線上加判斷標籤（「太少」「剛好」）',
                  '不要把 y 軸從 0 開始——會放大小波動變成戲劇性',
                  '不要用紅色警示「睡太少」，warn 感會變成指責',
                  '不要顯示到精確的分鐘，保留「大約」的包容度',
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

export default SleepChartDoc;
