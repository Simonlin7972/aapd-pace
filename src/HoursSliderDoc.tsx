import React from 'react';
import { PaceSans } from './components/ui/foundations/Text';
import { HoursSlider } from './components/ui/inputs/HoursSlider';
import { DocPage } from './components/design-system/DocPage';
import { Divider, SectionHead, NumberDot, DoDontCards } from './components/design-system/doc-helpers';

const HoursSliderDoc: React.FC = () => {
  const [anatomyVal, setAnatomyVal] = React.useState(6);
  const [range8, setRange8] = React.useState(4);
  const [range12, setRange12] = React.useState(7.5);
  const [range24, setRange24] = React.useState(14);

  return (
    <DocPage
      activeL1="inputs"
      activeL2="mol-hours-slider"
      title="Hours Slider"
      description="讓使用者以拖拉方式輸入時數——睡眠、運動、或任何連續區間的時間長度。以漸層提示方向，以拖曳提供回饋。"
    >
      {(theme) => (
        <>
          <Divider />

          {/* ANATOMY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Anatomy" sub="由 Track、Fill、Thumb、Tick labels 四個部分組成。" />
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
                  <NumberDot n={1} />
                  <PaceSans size={14} color={theme.ink}>Track — 底層 6px 線，承載整個區間</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot n={2} />
                  <PaceSans size={14} color={theme.ink}>Fill — 漸層條，從 Dust 到 Terracotta</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot n={3} />
                  <PaceSans size={14} color={theme.ink}>Thumb — 30×30 拖拉點，標示目前位置</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot n={4} />
                  <PaceSans size={14} color={theme.ink}>Tick labels — 對應刻度的數字提示</PaceSans>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* STATES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="States" sub="拖曳中 thumb 放大到 1.1 並加深陰影，給使用者「握住了」的回饋。" />
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
              <Divider />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <PaceSans size={13} weight={500} color={theme.inkMuted}>Dragging</PaceSans>
                <HoursSlider theme={theme} value={6} onChange={() => {}} state="dragging" />
              </div>
            </div>
          </div>

          <Divider />

          {/* RANGE & STEP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Range & Step" sub="依場景調整 min / max / step——範圍越大，step 建議越粗，避免使用者精細拖拉。" />
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

          <Divider />

          {/* USAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Usage" sub="拖拉輸入重視的是體感，不是精確——搭配顯示當前數值，讓使用者信任自己的選擇。" />
            <DoDontCards
              dos={[
                '搭配顯示當前數值，拖拉時數字同步變化',
                '刻度標籤只標幾個代表值（例：0 / 3 / 6 / 9 / 12），不要每格都寫',
                '範圍較大時加大 step（例：0–24h 用 1h 為單位）',
                '文案強調體感——「昨晚睡了幾小時？」勝過「請輸入睡眠時數」',
              ]}
              donts={[
                '不要用在需要精確數值的輸入（例：準確到分鐘），改用 stepper 或輸入框',
                '不要把 step 設得太細（例：0.1h）——拖拉體感會變不穩',
                '不要省略 tick labels，使用者會失去空間參考',
                '不要讓 thumb 小於 28×28，手指點擊會不容易',
              ]}
            />
          </div>
        </>
      )}
    </DocPage>
  );
};

export default HoursSliderDoc;
