import React from 'react';
import { PaceSerif, PaceSans } from './components/ui/foundations/Text';
import { Button } from './components/ui/actions/Button';
import { DocPage } from './components/design-system/DocPage';
import { Divider, SectionHead, NumberDot, DoDontCards } from './components/design-system/doc-helpers';

const ButtonDoc: React.FC = () => (
  <DocPage
    activeL1="actions"
    activeL2="mol-button"
    title="Button"
    description="按鈕讓使用者對一個動作做出承諾——送出表單、確認決定，或觸發主要流程。"
  >
    {(theme) => (
      <>
        <Divider />

        {/* ANATOMY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Anatomy" sub="一顆按鈕由容器與文字標籤組成。" />
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
                <NumberDot n={1} />
                <PaceSans size={14} color={theme.ink}>Container — 承載動作的形狀與表面</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <NumberDot n={2} />
                <PaceSans size={14} color={theme.ink}>Label — 一到兩個字，描述會發生什麼</PaceSans>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* VARIANTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Variants" sub="使用三種層級來區分同一頁面上動作的輕重。" />
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

        <Divider />

        {/* STATES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="States" sub="每個 Variant 都有四種互動狀態：預設、懸停、按下、停用。" />
          <div
            style={{
              background: theme.surface,
              borderRadius: 12,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            {(['primary', 'soft', 'text'] as const).map((v, idx) => (
              <React.Fragment key={v}>
                {idx > 0 && <Divider />}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <PaceSans
                    size={12}
                    weight={500}
                    color={theme.inkMuted}
                    style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    {v}
                  </PaceSans>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {(['default', 'hover', 'pressed', 'disabled'] as const).map((s) => (
                      <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                        <Button theme={theme} variant={v} state={s}>按鈕</Button>
                        <PaceSans size={13} weight={500} color={theme.inkMuted}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </PaceSans>
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <Divider />

        {/* WIDTH */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Width" sub="Hug 配合行內排列，Full 用在表單底部或單一主要動作。" />
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

        <Divider />

        {/* USAGE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHead kicker="Usage" sub="文案陪伴、觀察、溫柔——按鈕語氣同樣以邀請取代命令。" />
          <DoDontCards
            dos={[
              'Label 用動詞開頭，清楚指出會發生什麼（例如「開始記錄」）',
              '一個視圖只放一顆 Primary，避免競爭焦點',
              '破壞性動作搭配二次確認，而不是直接執行',
              '文字語氣邀請、不強迫——「今晚試試看？」勝過「立刻開始」',
            ]}
            donts={[
              '不要同時出現兩顆 Primary 爭奪注意力',
              '不要把按鈕當作純裝飾或純展示',
              '避免抽象字眼像「送出」「確認」，改用具體的動作',
              '不要用驚嘆號或判斷語氣（「很棒！」「你應該…」）',
            ]}
          />
        </div>
      </>
    )}
  </DocPage>
);

export default ButtonDoc;
