import React from 'react';
import type { PaceTheme } from '../../data/tokens';
import { FONTS } from '../../data/tokens';
import { PaceState } from '../../data/state';
import { Icons } from '../Icons';
import { PaceCard, PaceSerif, PaceSans, AnimatedEnter, SegmentedControl, PageSlider } from '../UI';
import { useNav } from '../NavStack';
import { SettingsCtx } from '../../App';
import { BlobShape } from '../BlobShape';
import { useHeaderPadding, useScrolledParent } from './TopBar';

// Profile 三個 variant 共用的 sticky header wrapper — 跟 TopBar 同樣的 scroll-aware bg layer + blur 機制
const ProfileHeader: React.FC<{
  theme: PaceTheme;
  onBack: () => void;
  center?: React.ReactNode;
  rightWidth?: number;
}> = ({ theme, onBack, center, rightWidth = 22 }) => {
  const headerPad = useHeaderPadding();
  const [ref, scrolled] = useScrolledParent<HTMLDivElement>();
  return (
    <div ref={ref} style={{
      position: 'sticky', top: 0, zIndex: 5,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      ...headerPad,
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1,
        background: theme.bg,
        opacity: scrolled ? 1 : 0,
        transition: 'opacity 240ms ease',
      }} />
      <div onClick={onBack} style={{ color: theme.inkSoft, cursor: 'pointer', padding: 8, margin: -8 }}>
        {Icons.ChevronL({ size: 22 })}
      </div>
      {center}
      <div style={{ width: rightWidth }} />
    </div>
  );
};

// Shared settings controls
const SettingsRow: React.FC<{ theme: PaceTheme; label: string; children: React.ReactNode }> = ({ theme, label, children }) => (
  <div>
    <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</PaceSans>
    {children}
  </div>
);

const PaceSettingsControls: React.FC<{
  theme: PaceTheme;
  compact?: boolean;
  settings: any;
  onUpdate: (patch: Record<string, any>) => void;
}> = ({ theme, compact = false, settings, onUpdate }) => {
  const L = theme.L;
  const isDark = !!settings.dark;
  const variant = settings.profileVariant || 'classic';
  const LANG = [
    { k: 'zh-TW', l: '中文' }, { k: 'en', l: 'EN' }, { k: 'ja', l: '日本語' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SettingsRow theme={theme} label={L.p_appearance}>
        <SegmentedControl theme={theme}
          value={isDark ? 'dark' : 'light'}
          onChange={(v) => onUpdate({ dark: v === 'dark' })}
          options={[{ k: 'light', l: L.p_light }, { k: 'dark', l: L.p_dark }]}
          compact={compact}
        />
      </SettingsRow>
      <SettingsRow theme={theme} label={L.p_language}>
        <SegmentedControl theme={theme}
          value={settings.lang || 'zh-TW'}
          onChange={(v) => onUpdate({ lang: v })}
          options={LANG}
          compact={compact}
        />
      </SettingsRow>
      <SettingsRow theme={theme} label={L.p_variantLabel}>
        <SegmentedControl theme={theme}
          value={variant}
          onChange={(v) => onUpdate({ profileVariant: v })}
          options={[
            { k: 'classic', l: L.p_variant_classic },
            { k: 'editorial', l: L.p_variant_editorial },
            { k: 'minimal', l: L.p_variant_minimal },
          ]}
          compact={compact}
        />
      </SettingsRow>
    </div>
  );
};

// Classic Row
const ClassicRow: React.FC<{ theme: PaceTheme; r: any; border: boolean }> = ({ theme, r, border }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '16px 18px',
    borderTop: border ? `1px solid ${theme.line}` : 'none',
    cursor: 'pointer',
  }}>
    <div style={{ color: theme.inkSoft, opacity: 0.85 }}>{r.icon}</div>
    <PaceSans size={15} color={theme.ink} style={{ flex: 1 }}>{r.label}</PaceSans>
    {r.hint && <PaceSans size={12} color={theme.inkMuted}>{r.hint}</PaceSans>}
    <div style={{ color: theme.inkMuted, opacity: 0.6 }}>{Icons.ChevronR({ size: 16 })}</div>
  </div>
);

// v1 — Classic
const ProfileClassic: React.FC<{ theme: PaceTheme; settings: any; onUpdate: (p: any) => void }> = ({ theme, settings, onUpdate }) => {
  const nav = useNav();
  const st = PaceState;
  const L = theme.L;

  const stats = [
    { l: L.p_streak, v: st.streak || 3, u: L.p_u_day },
    { l: L.p_avg, v: '6.3', u: L.p_u_hour },
    { l: L.p_join, v: '42', u: L.p_u_dayAgo },
  ];
  const rows = [
    { k: 'remind', icon: Icons.Mood({ size: 18 }), label: L.p_remind, hint: L.p_remindHint },
    { k: 'sound', icon: Icons.Leaf({ size: 18 }), label: L.p_sound, hint: L.p_soundHint },
    { k: 'data', icon: Icons.Insight({ size: 18 }), label: L.p_data, hint: L.p_dataHint },
  ];
  const rows2 = [
    { k: 'about', icon: Icons.Me({ size: 18 }), label: L.p_about, hint: 'v0.1' },
    { k: 'feedback', icon: Icons.Food({ size: 18 }), label: L.p_feedback, hint: '' },
  ];

  return (
    <div style={{ background: theme.bg, position: 'absolute', inset: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <ProfileHeader
        theme={theme}
        onBack={() => nav.pop()}
        center={<PaceSans size={15} color={theme.ink}>{L.p_title}</PaceSans>}
      />

      <div style={{ padding: '32px 24px 40px' }}>
        <AnimatedEnter delay={60}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32 }}>
            <BlobShape
              size={72}
              gradient={{ type: 'radial', from: theme.dust, to: theme.terracotta }}
              dropShadow={`0 8px 20px ${theme.terracotta}40`}
              style={{ flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <PaceSerif size={26} weight={500} color={theme.ink} style={{ marginBottom: 4 }}>{L.p_name}</PaceSerif>
              <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.5 }}>{L.p_bio}</PaceSans>
            </div>
          </div>
        </AnimatedEnter>

        <AnimatedEnter delay={140}>
          <PaceCard theme={theme} padding={18} style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex' }}>
              {stats.map((s, i) => (
                <React.Fragment key={s.l}>
                  {i > 0 && <div style={{ width: 1, background: theme.line, margin: '4px 0' }} />}
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 6, letterSpacing: '0.06em' }}>{s.l}</PaceSans>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 3 }}>
                      <PaceSerif size={22} color={theme.ink}>{s.v}</PaceSerif>
                      <PaceSans size={11} color={theme.inkMuted}>{s.u}</PaceSans>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </PaceCard>
        </AnimatedEnter>

        <AnimatedEnter delay={220}>
          <div style={{
            background: theme.surface, borderRadius: theme.radius,
            padding: '18px 20px', marginBottom: 22,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.75 }}>{Icons.Leaf({ size: 16 })}</div>
            <PaceSerif size={15} color={theme.inkSoft} style={{ lineHeight: 1.6, fontStyle: 'italic' }}>{L.p_quote}</PaceSerif>
          </div>
        </AnimatedEnter>

        <AnimatedEnter delay={280}>
          <div style={{ background: theme.surface, borderRadius: theme.radius, padding: '18px', marginBottom: 14 }}>
            <PaceSettingsControls theme={theme} settings={settings} onUpdate={onUpdate} />
          </div>
        </AnimatedEnter>

        <AnimatedEnter delay={360}>
          <div style={{ background: theme.surface, borderRadius: theme.radius, marginBottom: 14, overflow: 'hidden' }}>
            {rows.map((r, i) => <ClassicRow key={r.k} theme={theme} r={r} border={i > 0} />)}
          </div>
        </AnimatedEnter>

        <AnimatedEnter delay={420}>
          <div style={{ background: theme.surface, borderRadius: theme.radius, marginBottom: 14, overflow: 'hidden' }}>
            {rows2.map((r, i) => <ClassicRow key={r.k} theme={theme} r={r} border={i > 0} />)}
          </div>
        </AnimatedEnter>

        <AnimatedEnter delay={500}>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <PaceSans size={12} color={theme.inkMuted} style={{ cursor: 'pointer' }}>{L.p_signout}</PaceSans>
          </div>
        </AnimatedEnter>
      </div>
    </div>
  );
};

// v2 — Editorial
const ProfileEditorial: React.FC<{ theme: PaceTheme; settings: any; onUpdate: (p: any) => void }> = ({ theme, settings, onUpdate }) => {
  const nav = useNav();
  const L = theme.L;
  const isDark = !!settings.dark;

  const photoBg = isDark
    ? `radial-gradient(120% 80% at 30% 20%, ${theme.dust}40, transparent 60%),
       radial-gradient(80% 100% at 80% 90%, ${theme.terracotta}55, transparent 60%),
       linear-gradient(135deg, #2A241D, #3D352B)`
    : `radial-gradient(120% 80% at 30% 20%, ${theme.dust}55, transparent 60%),
       radial-gradient(80% 100% at 80% 90%, ${theme.terracotta}40, transparent 60%),
       linear-gradient(135deg, #E8DDC9, #D9C9AE)`;

  return (
    <div style={{ background: theme.bg, position: 'absolute', inset: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <ProfileHeader
        theme={theme}
        onBack={() => nav.pop()}
        center={
          <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            {L.p_tagline_editorial}
          </PaceSans>
        }
      />

      <div style={{ padding: '40px 28px 20px', textAlign: 'center' }}>
        <AnimatedEnter delay={60}>
          <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: 14 }}>
            {L.p_chapter}
          </PaceSans>
        </AnimatedEnter>
        <AnimatedEnter delay={140}>
          <PaceSerif size={42} weight={400} color={theme.ink} style={{
            lineHeight: 1.15, letterSpacing: '-0.02em', fontStyle: 'italic', textWrap: 'balance' as any,
          }}>{L.p_chapterTitle}</PaceSerif>
        </AnimatedEnter>
        <AnimatedEnter delay={220}>
          <div style={{ margin: '24px auto 0', width: 36, height: 1, background: theme.inkSoft, opacity: 0.35 }} />
        </AnimatedEnter>
      </div>

      <AnimatedEnter delay={300}>
        <div style={{ padding: '12px 28px 0' }}>
          <div style={{
            position: 'relative', aspectRatio: '4 / 5', borderRadius: 4,
            background: photoBg, overflow: 'hidden',
            boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.4)' : '0 20px 50px rgba(61,52,42,0.18)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `radial-gradient(${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(61,52,42,0.05)'} 1px, transparent 1px)`,
              backgroundSize: '3px 3px', mixBlendMode: 'overlay',
            }} />
            <div style={{
              position: 'absolute', left: 22, bottom: 22,
              fontFamily: FONTS.serif, fontStyle: 'italic',
              fontSize: 56, lineHeight: 1,
              color: isDark ? 'rgba(251,246,236,0.85)' : 'rgba(61,52,42,0.55)',
              fontWeight: 400,
            }}>A.</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 4px 0' }}>
            <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {L.p_caption}
            </PaceSans>
            <PaceSans size={11} color={theme.inkMuted} style={{ fontFamily: FONTS.serif, fontStyle: 'italic' }}>
              No. 042
            </PaceSans>
          </div>
        </div>
      </AnimatedEnter>

      <AnimatedEnter delay={400}>
        <div style={{ padding: '40px 32px 0' }}>
          <PaceSerif size={20} weight={400} color={theme.ink} style={{ lineHeight: 1.7, letterSpacing: '0.005em', textAlign: 'left' }}>
            <span style={{
              float: 'left', fontSize: 64, lineHeight: 0.9,
              padding: '6px 10px 0 0', fontStyle: 'italic', color: theme.terracotta,
            }}>{L.p_essayLines[0].trim().charAt(0)}</span>
            {L.p_essayLines[0].trim().slice(1)}<br />
            {L.p_essayLines.slice(1).map((line: string, i: number) => (
              <React.Fragment key={i}>{line}<br /></React.Fragment>
            ))}
          </PaceSerif>
        </div>
      </AnimatedEnter>

      <AnimatedEnter delay={500}>
        <div style={{
          margin: '40px 28px 0', padding: '24px 0',
          borderTop: `1px solid ${theme.line}`, borderBottom: `1px solid ${theme.line}`,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center',
        }}>
          {[
            { v: '42', l: L.p_streak, u: L.p_u_day },
            { v: '6.3', l: L.p_avg, u: L.p_u_hour },
            { v: 'iv', l: L.p_chapter.split('·')[0].trim(), u: '' },
          ].map((s, i) => (
            <div key={i} style={{ borderLeft: i === 0 ? 'none' : `1px solid ${theme.line}` }}>
              <PaceSerif size={32} weight={400} color={theme.ink} style={{
                fontStyle: 'italic', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.01em',
              }}>
                {s.v}
                {s.u && <span style={{ fontSize: 14, marginLeft: 2, fontStyle: 'normal', color: theme.inkMuted }}>{s.u}</span>}
              </PaceSerif>
              <PaceSans size={10} color={theme.inkMuted} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>{s.l}</PaceSans>
            </div>
          ))}
        </div>
      </AnimatedEnter>

      <AnimatedEnter delay={600}>
        <div style={{ padding: '40px 36px 0', textAlign: 'center' }}>
          <PaceSerif size={22} weight={400} color={theme.inkSoft} style={{
            fontStyle: 'italic', lineHeight: 1.5, letterSpacing: '-0.005em', textWrap: 'balance' as any,
          }}>{L.p_quote}</PaceSerif>
          <div style={{ margin: '20px auto 0', width: 24, height: 1, background: theme.terracotta, opacity: 0.7 }} />
        </div>
      </AnimatedEnter>

      <div style={{ padding: '48px 28px 0' }}>
        <AnimatedEnter delay={680}>
          <PaceSans size={10} color={theme.inkMuted} style={{
            letterSpacing: '0.22em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 20,
          }}>— Colophon —</PaceSans>
        </AnimatedEnter>
        <AnimatedEnter delay={740}>
          <PaceSettingsControls theme={theme} settings={settings} onUpdate={onUpdate} />
        </AnimatedEnter>
      </div>

      <AnimatedEnter delay={840}>
        <div style={{ padding: '48px 0 56px', textAlign: 'center' }}>
          <PaceSerif size={14} color={theme.inkMuted} style={{ fontStyle: 'italic', letterSpacing: '0.05em' }}>
            — {L.p_name} —
          </PaceSerif>
          <div style={{ marginTop: 20 }}>
            <PaceSans size={11} color={theme.inkMuted} style={{ cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {L.p_signout}
            </PaceSans>
          </div>
        </div>
      </AnimatedEnter>
    </div>
  );
};

// v3 — Minimal
const ProfileMinimal: React.FC<{ theme: PaceTheme; settings: any; onUpdate: (p: any) => void }> = ({ theme, settings, onUpdate }) => {
  const nav = useNav();
  const L = theme.L;

  const WEEKS = 6, DAYS = 7;
  const totalCells = WEEKS * DAYS;
  const skipped = new Set([2, 9, 17, 26, 33]);
  const today = totalCells - 1;

  return (
    <div style={{ background: theme.bg, position: 'absolute', inset: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <ProfileHeader theme={theme} onBack={() => nav.pop()} />

      <div style={{ padding: '64px 32px 0' }}>
        <AnimatedEnter delay={60}>
          <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
            {L.p_everyday}
          </PaceSans>
        </AnimatedEnter>
        <AnimatedEnter delay={140}>
          <PaceSerif size={36} weight={400} color={theme.ink} style={{ letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12 }}>
            {L.p_name.toLowerCase()}.
          </PaceSerif>
        </AnimatedEnter>
        <AnimatedEnter delay={220}>
          <PaceSans size={14} color={theme.inkSoft} style={{ lineHeight: 1.55 }}>
            {L.p_bio}
          </PaceSans>
        </AnimatedEnter>
      </div>

      <AnimatedEnter delay={320}>
        <div style={{ padding: '52px 32px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${DAYS}, 1fr)`, gap: 10 }}>
            {Array.from({ length: totalCells }).map((_, i) => {
              const isSkip = skipped.has(i);
              const isToday = i === today;
              const opacity = isSkip ? 0 : (0.35 + (i / totalCells) * 0.55);
              return (
                <div key={i} style={{
                  position: 'relative', aspectRatio: '1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isSkip ? (
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: theme.inkMuted, opacity: 0.18 }} />
                  ) : (
                    <div style={{
                      width: isToday ? 14 : 10, height: isToday ? 14 : 10,
                      borderRadius: '50%',
                      background: isToday ? theme.terracotta : theme.ink,
                      opacity: isToday ? 1 : opacity,
                      boxShadow: isToday ? `0 0 0 4px ${theme.terracotta}22` : 'none',
                      transition: 'all 200ms',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, padding: '0 2px' }}>
            <PaceSans size={10} color={theme.inkMuted} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {WEEKS}w
            </PaceSans>
            <PaceSans size={10} color={theme.terracotta} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {L.p_today}
            </PaceSans>
          </div>
        </div>
      </AnimatedEnter>

      <AnimatedEnter delay={420}>
        <div style={{
          margin: '60px 32px 0', paddingTop: 28,
          borderTop: `1px solid ${theme.line}`,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {[
            { v: '42', l: L.p_streak },
            { v: '6.3', l: L.p_avg },
            { v: '4', l: L.dim_mood },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: i === 0 ? 'left' : i === 1 ? 'center' : 'right' }}>
              <PaceSerif size={26} weight={400} color={theme.ink} style={{ lineHeight: 1, marginBottom: 6, letterSpacing: '-0.01em' }}>
                {s.v}
              </PaceSerif>
              <PaceSans size={10} color={theme.inkMuted} style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {s.l}
              </PaceSans>
            </div>
          ))}
        </div>
      </AnimatedEnter>

      <AnimatedEnter delay={520}>
        <div style={{ padding: '52px 36px 0', textAlign: 'center' }}>
          <PaceSerif size={16} color={theme.inkSoft} style={{ fontStyle: 'italic', lineHeight: 1.55, textWrap: 'balance' as any }}>
            {L.p_quote}
          </PaceSerif>
        </div>
      </AnimatedEnter>

      <div style={{ padding: '60px 32px 0' }}>
        <AnimatedEnter delay={620}>
          <PaceSettingsControls theme={theme} compact settings={settings} onUpdate={onUpdate} />
        </AnimatedEnter>
      </div>

      <AnimatedEnter delay={720}>
        <div style={{ padding: '48px 0 56px', textAlign: 'center' }}>
          <PaceSans size={11} color={theme.inkMuted} style={{ cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {L.p_signout}
          </PaceSans>
        </div>
      </AnimatedEnter>
    </div>
  );
};

// Dispatcher — slides between variants without remounting
const VARIANTS = ['classic', 'editorial', 'minimal'] as const;

export const ProfileScreen: React.FC<{
  theme: PaceTheme;
}> = ({ theme }) => {
  const { settings, onUpdate } = React.useContext(SettingsCtx);
  const v = settings.profileVariant || theme.profileVariant || 'classic';
  const idx = VARIANTS.indexOf(v as any);
  const activeIdx = idx === -1 ? 0 : idx;

  return (
    <PageSlider activeIndex={activeIdx}>
      <ProfileClassic theme={theme} settings={settings} onUpdate={onUpdate} />
      <ProfileEditorial theme={theme} settings={settings} onUpdate={onUpdate} />
      <ProfileMinimal theme={theme} settings={settings} onUpdate={onUpdate} />
    </PageSlider>
  );
};
