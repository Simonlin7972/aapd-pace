import React from 'react';
import { THEMES, FONTS, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { PaceSerif, PaceSans } from './components/ui/foundations/Text';
import { SegmentedControl } from './components/ui/inputs/SegmentedControl';

function buildTheme(): PaceTheme {
  return {
    ...THEMES.oat,
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
    <PaceSans
      size={11}
      weight={500}
      color={theme.terracotta}
      style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
    >
      {kicker}
    </PaceSans>
    <PaceSans size={15} color={theme.inkSoft} style={{ lineHeight: 1.6 }}>{sub}</PaceSans>
  </div>
);

const NumberDot: React.FC<{ theme: PaceTheme; n: number }> = ({ theme, n }) => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: 12,
      background: theme.terracotta,
      color: theme.textOnBrand,
      fontFamily: FONTS.sans,
      fontSize: 12,
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {n}
  </div>
);

const SegmentedControlDoc: React.FC = () => {
  const theme = buildTheme();

  const [anatomyVal, setAnatomyVal] = React.useState('day');
  const [sizeDefault, setSizeDefault] = React.useState('day');
  const [sizeCompact, setSizeCompact] = React.useState('day');
  const [opt2, setOpt2] = React.useState('week');
  const [opt3, setOpt3] = React.useState('day');
  const [opt4, setOpt4] = React.useState('day');

  const opts3 = [
    { k: 'day', l: '日' },
    { k: 'week', l: '週' },
    { k: 'month', l: '月' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        fontFamily: FONTS.sans,
        color: theme.ink,
      }}
    >
      {/* Header bar — back to design system */}
      <div
        style={{
          padding: '20px 48px',
          borderBottom: `1px solid ${theme.line}`,
          background: theme.bg,
        }}
      >
        <a
          href="/design-system#mol-segmented"
          onClick={(e) => {
            const ref = document.referrer;
            if (ref && new URL(ref).pathname === '/design-system') {
              e.preventDefault();
              history.back();
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 500,
            color: theme.inkSoft,
            textDecoration: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          返回設計系統
        </a>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}
      >
        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <PaceSans
            size={12}
            weight={500}
            color={theme.inkMuted}
            style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            Component
          </PaceSans>
          <PaceSerif size={56} weight={700} color={theme.ink} style={{ lineHeight: 1.15 }}>
            Segmented Control
          </PaceSerif>
          <PaceSans size={17} color={theme.inkSoft} style={{ lineHeight: 1.65, maxWidth: 760 }}>
            在少數互斥選項之間切換——例如時間範圍或檢視模式。選擇永遠有一個「正在使用」的狀態。
          </PaceSans>
        </div>

        <Divider theme={theme} />

        {/* ANATOMY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead
            theme={theme}
            kicker="Anatomy"
            sub="由 Track、Item 與 Thumb 組成。Thumb 永遠指向目前選中的 Item。"
          />
          <div
            style={{
              background: theme.surface,
              borderRadius: 12,
              padding: '48px 40px',
              display: 'flex',
              gap: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 320 }}>
              <SegmentedControl theme={theme} value={anatomyVal} onChange={setAnatomyVal} options={opts3} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot theme={theme} n={1} />
                <PaceSans size={14} color={theme.ink}>Track — 所有選項的承載容器</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot theme={theme} n={2} />
                <PaceSans size={14} color={theme.ink}>Item — 每一個可點擊的選項區域</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot theme={theme} n={3} />
                <PaceSans size={14} color={theme.ink}>Thumb — 標示目前選中的浮起背景</PaceSans>
              </div>
            </div>
          </div>
        </div>

        <Divider theme={theme} />

        {/* SIZE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead
            theme={theme}
            kicker="Size"
            sub="Default 用在頁面頂端的主要切換；Compact 放在卡片或次區塊內。"
          />
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
              <PaceSans size={13} weight={500} color={theme.inkMuted}>Default — 高度 36，適用一般頁面</PaceSans>
              <SegmentedControl theme={theme} value={sizeDefault} onChange={setSizeDefault} options={opts3} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PaceSans size={13} weight={500} color={theme.inkMuted}>Compact — 高度 32，適用密度較高的區塊</PaceSans>
              <SegmentedControl theme={theme} value={sizeCompact} onChange={setSizeCompact} options={opts3} compact />
            </div>
          </div>
        </div>

        <Divider theme={theme} />

        {/* OPTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead
            theme={theme}
            kicker="Options"
            sub="建議 2–4 個選項。超過 4 個改用下拉選單或 tab，避免每一格太窄讀不清。"
          />
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
              <PaceSans size={13} weight={500} color={theme.inkMuted}>2 個選項</PaceSans>
              <SegmentedControl
                theme={theme}
                value={opt2}
                onChange={setOpt2}
                options={[
                  { k: 'week', l: '週' },
                  { k: 'month', l: '月' },
                ]}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PaceSans size={13} weight={500} color={theme.inkMuted}>3 個選項</PaceSans>
              <SegmentedControl theme={theme} value={opt3} onChange={setOpt3} options={opts3} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PaceSans size={13} weight={500} color={theme.inkMuted}>4 個選項</PaceSans>
              <SegmentedControl
                theme={theme}
                value={opt4}
                onChange={setOpt4}
                options={[
                  { k: 'day', l: '日' },
                  { k: 'week', l: '週' },
                  { k: 'month', l: '月' },
                  { k: 'year', l: '年' },
                ]}
              />
            </div>
          </div>
        </div>

        <Divider theme={theme} />

        {/* USAGE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead
            theme={theme}
            kicker="Usage"
            sub="切換是立即生效的——選到哪就看哪。文案短而具體，避免命令式語氣。"
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
                '只在互斥選項之間使用——同時只有一個會被選中',
                '標籤越短越好，兩到三個字最好（例：「日／週／月」）',
                '切換後馬上反映結果，不需要額外「確認」按鈕',
                '永遠保有一個被選中的預設值，避免「全部空著」的情況',
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
                '不要用在會破壞資料或觸發 side effects 的選擇',
                '不要塞超過 4 個選項——改用下拉或 tab',
                '不要用在可複選的情境，那是 checkbox/chip 的工作',
                '不要讓標籤長短差距過大，格子會明顯不對稱',
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
  );
};

export default SegmentedControlDoc;
