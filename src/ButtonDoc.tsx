import React from 'react';
import { THEMES, FONTS, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { PaceSerif, PaceSans } from './components/ui/foundations/Text';
import { Button } from './components/ui/actions/Button';

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

const Kicker: React.FC<{ theme: PaceTheme; color?: string; tracking?: string; children: React.ReactNode }> = ({
  theme,
  color,
  tracking = '0.12em',
  children,
}) => (
  <PaceSans
    size={11}
    weight={500}
    color={color ?? theme.terracotta}
    style={{ letterSpacing: tracking, textTransform: 'uppercase' }}
  >
    {children}
  </PaceSans>
);

const SectionHead: React.FC<{ theme: PaceTheme; kicker: string; sub: string }> = ({ theme, kicker, sub }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
    <Kicker theme={theme} tracking="0.14em">{kicker}</Kicker>
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

const UsageBar: React.FC<{ theme: PaceTheme }> = ({ theme }) => (
  <div style={{ width: 6, height: 24, background: theme.terracotta, borderRadius: 3, flexShrink: 0 }} />
);

const ButtonDoc: React.FC = () => {
  const theme = buildTheme();

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
          href="/design-system#mol-button"
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
            Button
          </PaceSerif>
          <PaceSans size={17} color={theme.inkSoft} style={{ lineHeight: 1.65, maxWidth: 760 }}>
            按鈕讓使用者對一個動作做出承諾——送出表單、確認決定，或觸發主要流程。
          </PaceSans>
        </div>

        <Divider theme={theme} />

        {/* ANATOMY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead theme={theme} kicker="Anatomy" sub="一顆按鈕由容器與文字標籤組成。" />
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
            <Button theme={theme}>按鈕</Button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot theme={theme} n={1} />
                <PaceSans size={14} color={theme.ink}>Container — 承載動作的形狀與表面</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot theme={theme} n={2} />
                <PaceSans size={14} color={theme.ink}>Label — 一到兩個字，描述會發生什麼</PaceSans>
              </div>
            </div>
          </div>
        </div>

        <Divider theme={theme} />

        {/* VARIANTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead theme={theme} kicker="Variants" sub="使用三種層級來區分同一頁面上動作的輕重。" />
          {[
            { variant: 'primary' as const, title: 'Primary', desc: '頁面上最重要的動作。每個視圖建議只用一次。' },
            { variant: 'soft' as const, title: 'Soft', desc: '次要動作，支援 Primary；語氣輕但仍需引導。' },
            { variant: 'text' as const, title: 'Text', desc: '第三層級，低強度。用在返回、取消、或並列選項。' },
          ].map((v) => (
            <div
              key={v.variant}
              style={{
                background: theme.surface,
                borderRadius: 12,
                padding: '28px 32px',
                display: 'flex',
                gap: 32,
                alignItems: 'center',
              }}
            >
              <div style={{ width: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Button theme={theme} variant={v.variant}>按鈕</Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
                <PaceSerif size={18} weight={700} color={theme.ink}>{v.title}</PaceSerif>
                <PaceSans size={14} color={theme.inkSoft} style={{ lineHeight: 1.55 }}>{v.desc}</PaceSans>
              </div>
            </div>
          ))}
        </div>

        <Divider theme={theme} />

        {/* STATES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead theme={theme} kicker="States" sub="每個 Variant 都有三種互動狀態：預設、懸停、按下。" />
          <div
            style={{
              background: theme.surface,
              borderRadius: 12,
              padding: 40,
              display: 'flex',
              gap: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[
              { label: 'Default', opacity: 1 },
              { label: 'Hover', opacity: 0.88 },
              { label: 'Pressed', opacity: 0.92, scale: 0.97 },
            ].map((s) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
                <Button
                  theme={theme}
                  style={{
                    opacity: s.opacity,
                    transform: s.scale ? `scale(${s.scale})` : undefined,
                  }}
                >
                  按鈕
                </Button>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>{s.label}</PaceSans>
              </div>
            ))}
          </div>
        </div>

        <Divider theme={theme} />

        {/* WIDTH */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead theme={theme} kicker="Width" sub="Hug 配合行內排列，Full 用在表單底部或單一主要動作。" />
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
              <PaceSans size={13} weight={500} color={theme.inkMuted}>Hug — 寬度跟隨內容</PaceSans>
              <Button theme={theme}>按鈕</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PaceSans size={13} weight={500} color={theme.inkMuted}>Full — 填滿容器寬度</PaceSans>
              <Button theme={theme} full>按鈕</Button>
            </div>
          </div>
        </div>

        <Divider theme={theme} />

        {/* USAGE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead theme={theme} kicker="Usage" sub="文案陪伴、觀察、溫柔——按鈕語氣同樣以邀請取代命令。" />
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
                'Label 用動詞開頭，清楚指出會發生什麼（例如「開始記錄」）',
                '一個視圖只放一顆 Primary，避免競爭焦點',
                '破壞性動作搭配二次確認，而不是直接執行',
                '文字語氣邀請、不強迫——「今晚試試看？」勝過「立刻開始」',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <UsageBar theme={theme} />
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
                '不要同時出現兩顆 Primary 爭奪注意力',
                '不要把按鈕當作純裝飾或純展示',
                '避免抽象字眼像「送出」「確認」，改用具體的動作',
                '不要用驚嘆號或判斷語氣（「很棒！」「你應該…」）',
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

export default ButtonDoc;
