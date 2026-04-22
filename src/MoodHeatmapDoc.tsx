import React from 'react';
import { THEMES, FONTS, MOOD_SCALE, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { PaceSerif, PaceSans } from './components/ui/foundations/Text';
import { MoodHeatmap } from './components/ui/data-display/MoodHeatmap';
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

const MoodHeatmapDoc: React.FC = () => {
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
        activeL2="org-heatmap"
        isDark={isDark}
        onToggle={handleThemeToggle}
      />

      <div style={{ marginLeft: SIDENAV_WIDTH }}>
        <div style={{ padding: '20px 48px', borderBottom: `1px solid ${theme.line}`, background: theme.bg }}>
          <a
            href="/design-system#org-heatmap"
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
              Mood Heatmap
            </PaceSerif>
            <PaceSans size={17} color={theme.inkSoft} style={{ lineHeight: 1.65, maxWidth: 760 }}>
              把一週的情緒色溫攤成一排色塊——不排名、不打分，讓使用者一眼看見自己的節奏。
            </PaceSans>
          </div>

          <Divider theme={theme} />

          {/* ANATOMY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Anatomy" sub="由 Header、Day tile、Day label 三個部分組成。" />
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
                <MoodHeatmap theme={theme} data={[1, 2, 3, 2, 0, 3, 4]} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, rowGap: 14, maxWidth: 560, width: '100%', alignSelf: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={1} />
                  <PaceSans size={14} color={theme.ink}>Header — 標題 + 情境提示</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={2} />
                  <PaceSans size={14} color={theme.ink}>Day tile — 當天情緒對應的色塊</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={3} />
                  <PaceSans size={14} color={theme.ink}>Day label — 對應星期的文字</PaceSans>
                </div>
              </div>
            </div>
          </div>

          <Divider theme={theme} />

          {/* VALUES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Values" sub="5 個色溫對應 5 個情緒等級。和 MoodSlider 用同一套 MOOD_SCALE。" />
            <div
              style={{
                background: theme.surface,
                borderRadius: 12,
                padding: 40,
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 16,
              }}
            >
              {MOOD_SCALE.map((m, i) => (
                <div key={m.key} style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: '100%', height: 52, borderRadius: 10, background: m.color, opacity: 0.85 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <PaceSans size={13} weight={500} color={theme.ink}>{i} — {m.label}</PaceSans>
                    <PaceSans size={11} color={theme.inkMuted}>{m.color}</PaceSans>
                  </div>
                </div>
              ))}
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
                <PaceSans size={13} weight={500} color={theme.inkMuted}>情緒起伏的一週</PaceSans>
                <MoodHeatmap theme={theme} data={[1, 2, 3, 2, 0, 3, 4]} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>整週穩定（大多落在「還行」）</PaceSans>
                <MoodHeatmap theme={theme} data={[2, 2, 2, 3, 2, 2, 3]} hint="每天一筆" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>有兩天還沒記錄</PaceSans>
                <MoodHeatmap theme={theme} data={[1, 2, 0, 0, 3, 3, 4]} missingDays={[2, 3]} hint="記錄 5 / 7" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>疲憊偏多——值得觀察的訊號</PaceSans>
                <MoodHeatmap theme={theme} data={[0, 0, 1, 0, 1, 2, 1]} hint="冷→暖" />
              </div>
            </div>
          </div>

          <Divider theme={theme} />

          {/* USAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Usage" sub="Heatmap 是一個觀察工具，不是排行榜。色彩說故事，文字保持中立。" />
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
                  '文案保持中立，避免「好／壞」語氣',
                  '空日用虛線框表示「尚未記錄」，不要補預設值',
                  '色塊高度與圓角保持一致，讓節奏感出來',
                  '提示文字只做情境補充（例：「冷→暖」、「記錄 5 / 7」）',
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
                  '不要顯示「最好／最差」排名——這不是榜單',
                  '不要用紅色當「壞心情」色，會變成負面判斷',
                  '不要強制補齊空日，保留「今天沒記錄」的真實',
                  '不要加平均或分數——情緒不適合被平均化',
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

export default MoodHeatmapDoc;
