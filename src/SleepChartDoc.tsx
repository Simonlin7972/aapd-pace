import React from 'react';
import { PaceSans } from './components/ui/foundations/Text';
import { SleepChart } from './components/ui/data-display/SleepChart';
import { DocPage } from './components/design-system/DocPage';
import { Divider, SectionHead, NumberDot, DoDontCards } from './components/design-system/doc-helpers';

const SleepChartDoc: React.FC = () => (
  <DocPage
    activeL1="data-display"
    activeL2="org-sleep-chart"
    title="Sleep Chart"
    description="以平滑曲線呈現一週睡眠時長——看節奏，不看單日。頂點標示最近一天，漸層淡化提醒「這是趨勢，不是判決」。"
  >
    {(theme) => (
      <>
        <Divider />

        {/* ANATOMY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Anatomy" sub="由 Header、Curve、Gradient fill、Dots、Day labels 五個部分組成。" />
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
                <NumberDot n={1} />
                <PaceSans size={14} color={theme.ink}>Header — 標題 + 週平均</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot n={2} />
                <PaceSans size={14} color={theme.ink}>Curve — 平滑的 Bézier 曲線</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot n={3} />
                <PaceSans size={14} color={theme.ink}>Gradient fill — 向下淡化的漸層底</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot n={4} />
                <PaceSans size={14} color={theme.ink}>Dots — 每日端點，末點放大</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot n={5} />
                <PaceSans size={14} color={theme.ink}>Day labels — 對應星期的文字</PaceSans>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* DATA PATTERNS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Data patterns" sub="同樣的元件，不同的資料呈現不同故事。" />
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

        <Divider />

        {/* USAGE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Usage" sub="圖是為了看節奏，不是為了打分數。平均值陪伴，不評斷。" />
          <DoDontCards
            dos={[
              '搭配週平均數字，讓抽象曲線有具體參考',
              '用平滑曲線強調節奏，不要用直線連接強調單日',
              '末點放大（4px），標示「最近一天」',
              '漸層底淡化往下，暗示這是趨勢不是精準量測',
            ]}
            donts={[
              '不要在曲線上加判斷標籤（「太少」「剛好」）',
              '不要把 y 軸從 0 開始——會放大小波動變成戲劇性',
              '不要用紅色警示「睡太少」，warn 感會變成指責',
              '不要顯示到精確的分鐘，保留「大約」的包容度',
            ]}
          />
        </div>
      </>
    )}
  </DocPage>
);

export default SleepChartDoc;
