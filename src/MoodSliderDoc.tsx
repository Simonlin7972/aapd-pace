import React from 'react';
import { MOOD_SCALE } from './data/tokens';
import { PaceSans } from './components/ui/foundations/Text';
import { MoodSlider } from './components/ui/inputs/MoodSlider';
import { DocPage } from './components/design-system/DocPage';
import { Divider, SectionHead, NumberDot, DoDontCards } from './components/design-system/doc-helpers';

const valueDescriptions = [
  { n: 0, label: '疲憊', desc: '低能量、累。不是負面判斷，是身體的訊號。' },
  { n: 1, label: '平淡', desc: '沒什麼特別。剛好在中間的靜止感。' },
  { n: 2, label: '還行', desc: '可以運轉的穩定狀態。大多數日子的基準。' },
  { n: 3, label: '輕盈', desc: '輕鬆、好走動、腦袋清楚。' },
  { n: 4, label: '充滿能量', desc: '充滿電，想行動的一天。' },
];

const MoodSliderDoc: React.FC = () => {
  const [anatomyVal, setAnatomyVal] = React.useState(2);

  return (
    <DocPage
      activeL1="inputs"
      activeL2="mol-mood-slider"
      title="Mood Slider"
      description="沿著光譜滑動選擇當下的感覺——從疲憊到充滿能量共五個等級。色彩由冷到暖對應情緒溫度。"
    >
      {(theme) => (
        <>
          <Divider />

          {/* ANATOMY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Anatomy" sub="由 Gradient Track、Snap Dot、Thumb、Labels 組成。Thumb 顏色跟著當前情緒走。" />
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
                  <NumberDot n={1} />
                  <PaceSans size={14} color={theme.ink}>Gradient Track — 冷到暖的 5 色光譜</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot n={2} />
                  <PaceSans size={14} color={theme.ink}>Snap Dot — 5 個等距停靠點</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot n={3} />
                  <PaceSans size={14} color={theme.ink}>Thumb — 浮起的手柄，顏色跟著情緒走</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot n={4} />
                  <PaceSans size={14} color={theme.ink}>Labels — 對應當前語系的情緒文字</PaceSans>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* VALUES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Values" sub="五個情緒等級，由冷到暖。不是打分，是觀察。" />
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

          <Divider />

          {/* USAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Usage" sub="這是觀察工具，不是量表。保持語氣中立，讓使用者用自己的話理解自己的感覺。" />
            <DoDontCards
              dos={[
                '文案中立，避免「好／壞」的二分語氣',
                '拖動即生效，不需要「確認」步驟',
                '預設值為中間（還行），讓使用者從基準點自由移動',
                '標籤用描述情境的短語，而不是打分數',
              ]}
              donts={[
                '不要用分數（「1 分」「5 分」）取代情緒文字',
                '不要把兩端寫成「不好／好」—那是判斷，不是觀察',
                '不要在結果頁顯示平均數——情緒不是可以被平均的',
                '不要強迫使用者選擇；允許「略過今天」',
              ]}
            />
          </div>
        </>
      )}
    </DocPage>
  );
};

export default MoodSliderDoc;
