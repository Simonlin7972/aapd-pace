import React from 'react';
import { THEMES, FONTS, MOOD_SCALE, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { PaceSerif, PaceSans } from './components/ui/foundations/Text';
import { MoodSlider } from './components/ui/inputs/MoodSlider';
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

const MoodSliderDoc: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(() => readDarkPref());
  const theme = buildTheme(isDark);

  const handleThemeToggle = (v: string) => {
    const dark = v === 'dark';
    setIsDark(dark);
    localStorage.setItem(DS_THEME_KEY, dark ? 'dark' : 'light');
  };

  const [anatomyVal, setAnatomyVal] = React.useState(2);

  const valueDescriptions = [
    { n: 0, label: '疲憊', desc: '低能量、累。不是負面判斷，是身體的訊號。' },
    { n: 1, label: '平淡', desc: '沒什麼特別。剛好在中間的靜止感。' },
    { n: 2, label: '還行', desc: '可以運轉的穩定狀態。大多數日子的基準。' },
    { n: 3, label: '輕盈', desc: '輕鬆、好走動、腦袋清楚。' },
    { n: 4, label: '充滿能量', desc: '充滿電，想行動的一天。' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: FONTS.sans, color: theme.ink }}>
      <SideNav
        theme={theme}
        activeL1="inputs"
        activeL2="mol-mood-slider"
        isDark={isDark}
        onToggle={handleThemeToggle}
      />

      <div style={{ marginLeft: SIDENAV_WIDTH }}>
        {/* Header bar */}
        <div style={{ padding: '20px 48px', borderBottom: `1px solid ${theme.line}`, background: theme.bg }}>
          <a
            href="/design-system#mol-mood-slider"
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
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            <PaceSans size={12} weight={500} color={theme.inkMuted} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Component
            </PaceSans>
            <PaceSerif size={56} weight={700} color={theme.ink} style={{ lineHeight: 1.15 }}>
              Mood Slider
            </PaceSerif>
            <PaceSans size={17} color={theme.inkSoft} style={{ lineHeight: 1.65, maxWidth: 760 }}>
              沿著光譜滑動選擇當下的感覺——從疲憊到充滿能量共五個等級。色彩由冷到暖對應情緒溫度。
            </PaceSans>
          </div>

          <Divider theme={theme} />

          {/* ANATOMY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead
              theme={theme}
              kicker="Anatomy"
              sub="由 Gradient Track、Snap Dot、Thumb、Labels 組成。Thumb 顏色跟著當前情緒走。"
            />
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
              <MoodSlider theme={theme} value={anatomyVal} onChange={setAnatomyVal} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, rowGap: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={1} />
                  <PaceSans size={14} color={theme.ink}>Gradient Track — 冷到暖的 5 色光譜</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={2} />
                  <PaceSans size={14} color={theme.ink}>Snap Dot — 5 個等距停靠點</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={3} />
                  <PaceSans size={14} color={theme.ink}>Thumb — 浮起的手柄，顏色跟著情緒走</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot theme={theme} n={4} />
                  <PaceSans size={14} color={theme.ink}>Labels — 對應當前語系的情緒文字</PaceSans>
                </div>
              </div>
            </div>
          </div>

          <Divider theme={theme} />

          {/* VALUES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead theme={theme} kicker="Values" sub="五個情緒等級，由冷到暖。不是打分，是觀察。" />
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
              {valueDescriptions.map((v, idx) => (
                <div key={v.n} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <PaceSans size={14} weight={500} color={MOOD_SCALE[v.n].dot}>{v.n} — {v.label}</PaceSans>
                    <PaceSans size={13} color={theme.inkSoft}>{v.desc}</PaceSans>
                  </div>
                  <MoodSlider theme={theme} value={v.n} onChange={() => {}} />
                  {idx < valueDescriptions.length - 1 && <div style={{ height: 1, background: theme.line, marginTop: 12 }} />}
                </div>
              ))}
            </div>
          </div>

          <Divider theme={theme} />

          {/* USAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead
              theme={theme}
              kicker="Usage"
              sub="這是觀察工具，不是量表。保持語氣中立，讓使用者用自己的話理解自己的感覺。"
            />
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
                  '文案中立，避免「好／壞」的二分語氣',
                  '拖動即生效，不需要「確認」步驟',
                  '預設值為中間（還行），讓使用者從基準點自由移動',
                  '標籤用描述情境的短語，而不是打分數',
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
                  '不要用分數（「1 分」「5 分」）取代情緒文字',
                  '不要把兩端寫成「不好／好」—那是判斷，不是觀察',
                  '不要在結果頁顯示平均數——情緒不是可以被平均的',
                  '不要強迫使用者選擇；允許「略過今天」',
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

export default MoodSliderDoc;
