import React from 'react';
import { MOOD_SCALE } from './data/tokens';
import { PaceSans } from './components/ui/foundations/Text';
import { MoodHeatmap } from './components/ui/data-display/MoodHeatmap';
import { DocPage } from './components/design-system/DocPage';
import { Divider, SectionHead, NumberDot, DoDontCards } from './components/design-system/doc-helpers';

const MoodHeatmapDoc: React.FC = () => (
  <DocPage
    activeL1="data-display"
    activeL2="org-heatmap"
    title="Mood Heatmap"
    description="把一週的情緒色溫攤成一排色塊——不排名、不打分，讓使用者一眼看見自己的節奏。"
  >
    {(theme) => (
      <>
        <Divider />

        {/* ANATOMY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Anatomy" sub="由 Header、Day tile、Day label 三個部分組成。" />
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
                <NumberDot n={1} />
                <PaceSans size={14} color={theme.ink}>Header — 標題 + 情境提示</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot n={2} />
                <PaceSans size={14} color={theme.ink}>Day tile — 當天情緒對應的色塊</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot n={3} />
                <PaceSans size={14} color={theme.ink}>Day label — 對應星期的文字</PaceSans>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* VALUES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Values" sub="5 個色溫對應 5 個情緒等級。和 MoodSlider 用同一套 MOOD_SCALE。" />
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

        <Divider />

        {/* USAGE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Usage" sub="Heatmap 是一個觀察工具，不是排行榜。色彩說故事，文字保持中立。" />
          <DoDontCards
            dos={[
              '文案保持中立，避免「好／壞」語氣',
              '空日用虛線框表示「尚未記錄」，不要補預設值',
              '色塊高度與圓角保持一致，讓節奏感出來',
              '提示文字只做情境補充（例：「冷→暖」、「記錄 5 / 7」）',
            ]}
            donts={[
              '不要顯示「最好／最差」排名——這不是榜單',
              '不要用紅色當「壞心情」色，會變成負面判斷',
              '不要強制補齊空日，保留「今天沒記錄」的真實',
              '不要加平均或分數——情緒不適合被平均化',
            ]}
          />
        </div>
      </>
    )}
  </DocPage>
);

export default MoodHeatmapDoc;
