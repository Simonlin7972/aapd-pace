import React from 'react';
import { PaceSans } from './components/ui/foundations/Text';
import { SegmentedControl } from './components/ui/inputs/SegmentedControl';
import { DocPage } from './components/design-system/DocPage';
import { Divider, SectionHead, NumberDot, DoDontCards } from './components/design-system/doc-helpers';

const SegmentedControlDoc: React.FC = () => {
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
    <DocPage
      activeL1="inputs"
      activeL2="mol-segmented"
      title="Segmented Control"
      description="在少數互斥選項之間切換——例如時間範圍或檢視模式。選擇永遠有一個「正在使用」的狀態。"
    >
      {(theme) => (
        <>
          <Divider />

          {/* ANATOMY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Anatomy" sub="由 Track、Item 與 Thumb 組成。Thumb 永遠指向目前選中的 Item。" />
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
                  <NumberDot n={1} />
                  <PaceSans size={14} color={theme.ink}>Track — 所有選項的承載容器</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot n={2} />
                  <PaceSans size={14} color={theme.ink}>Item — 每一個可點擊的選項區域</PaceSans>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NumberDot n={3} />
                  <PaceSans size={14} color={theme.ink}>Thumb — 標示目前選中的浮起背景</PaceSans>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* SIZE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Size" sub="Default 用在頁面頂端的主要切換；Compact 放在卡片或次區塊內。" />
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

          <Divider />

          {/* OPTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Options" sub="建議 2–4 個選項。超過 4 個改用下拉選單或 tab，避免每一格太窄讀不清。" />
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

          <Divider />

          {/* USAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHead kicker="Usage" sub="切換是立即生效的——選到哪就看哪。文案短而具體，避免命令式語氣。" />
            <DoDontCards
              dos={[
                '只在互斥選項之間使用——同時只有一個會被選中',
                '標籤越短越好，兩到三個字最好（例：「日／週／月」）',
                '切換後馬上反映結果，不需要額外「確認」按鈕',
                '永遠保有一個被選中的預設值，避免「全部空著」的情況',
              ]}
              donts={[
                '不要用在會破壞資料或觸發 side effects 的選擇',
                '不要塞超過 4 個選項——改用下拉或 tab',
                '不要用在可複選的情境，那是 checkbox/chip 的工作',
                '不要讓標籤長短差距過大，格子會明顯不對稱',
              ]}
            />
          </div>
        </>
      )}
    </DocPage>
  );
};

export default SegmentedControlDoc;
