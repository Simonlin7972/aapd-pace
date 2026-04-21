import React from 'react';
import {
  PersonSimpleWalkIcon, PersonSimpleRunIcon, PersonSimpleTaiChiIcon, BarbellIcon,
  PersonSimpleBikeIcon, PersonSimpleSwimIcon, PersonSimpleHikeIcon, MusicNotesIcon,
  PersonArmsSpreadIcon, SparkleIcon,
} from '@phosphor-icons/react';
import { THEMES, MOOD_SCALE, FONTS, TYPE_SCALE, type PaceTheme } from './data/tokens';
import { PACE_I18N } from './data/i18n';
import { Icons } from './components/ui/foundations/Icons';

const EXERCISE_ICONS = [
  { k: 'walk',    Icon: PersonSimpleWalkIcon },
  { k: 'run',     Icon: PersonSimpleRunIcon },
  { k: 'yoga',    Icon: PersonSimpleTaiChiIcon },
  { k: 'weight',  Icon: BarbellIcon },
  { k: 'cycle',   Icon: PersonSimpleBikeIcon },
  { k: 'swim',    Icon: PersonSimpleSwimIcon },
  { k: 'hike',    Icon: PersonSimpleHikeIcon },
  { k: 'dance',   Icon: MusicNotesIcon },
  { k: 'stretch', Icon: PersonArmsSpreadIcon },
  { k: 'other',   Icon: SparkleIcon },
];
import { PaceSerif, PaceSans, PaceNum } from './components/ui/foundations/Text';
import { PaceCard } from './components/ui/containers/Card';
import { Button } from './components/ui/actions/Button';
import { SegmentedControl } from './components/ui/inputs/SegmentedControl';
import { MoodSlider } from './components/ui/inputs/MoodSlider';
import { HoursSlider } from './components/ui/inputs/HoursSlider';
import { AnimatedEnter } from './components/ui/feedback/AnimatedEnter';
import { TopBar } from './components/ui/navigation/TopBar';
import { BlobShape } from './components/ui/foundations/BlobShape';

function buildTheme(dark = false): PaceTheme {
  const base = dark ? { ...THEMES.oatDark } : { ...THEMES.oat };
  return {
    ...base,
    radius: 30,
    lang: 'zh-TW',
    L: PACE_I18N['zh-TW'],
    profileVariant: 'classic',
  } as PaceTheme;
}

// Persist theme preference across DS / Button / SegmentedControl doc pages
const DS_THEME_KEY = 'pace.ds.theme';
const readDarkPref = () => localStorage.getItem(DS_THEME_KEY) === 'dark';

// React context to thread active theme through helper components
const ThemeCtx = React.createContext<PaceTheme>(buildTheme(false));

// ─── Layout helpers ─────────────────────────────

const Section: React.FC<{ id?: string; title: string; subtitle?: string; children: React.ReactNode }> = ({ id, title, subtitle, children }) => {
  const t = React.useContext(ThemeCtx);
  return (
    <div id={id} style={{ marginBottom: 80, scrollMarginTop: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <PaceSerif size={28} weight={500} color={t.ink} style={{ marginBottom: 6 }}>{title}</PaceSerif>
        {subtitle && <PaceSans size={14} color={t.inkMuted} style={{ lineHeight: 1.6 }}>{subtitle}</PaceSans>}
      </div>
      {children}
    </div>
  );
};

const SubSection: React.FC<{ id?: string; title: string; action?: React.ReactNode; children: React.ReactNode }> = ({ id, title, action, children }) => {
  const t = React.useContext(ThemeCtx);
  return (
    <div id={id} style={{ marginBottom: 40, scrollMarginTop: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <PaceSans size={12} color={t.inkMuted} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</PaceSans>
        {action}
      </div>
      {children}
    </div>
  );
};

// ─── Side navigation ────────────────────────────

interface NavItem {
  id: string;
  label: string;
  level: 0 | 1 | 2;   // 0 = part header, 1 = section, 2 = subsection
}

const NAV_ITEMS: NavItem[] = [
  // ── Foundations (Design tokens) ──
  { id: 'part-foundations', label: 'Foundations', level: 0 },

  { id: 'colors', label: 'Color', level: 1 },
  { id: 'colors-bg', label: 'Background', level: 2 },
  { id: 'colors-accent', label: 'Accent palette', level: 2 },
  { id: 'colors-ink', label: 'Text (Ink)', level: 2 },
  { id: 'colors-line', label: 'Border & divider', level: 2 },
  { id: 'colors-semantic', label: 'Semantic', level: 2 },
  { id: 'colors-mood', label: 'Mood scale', level: 2 },

  { id: 'typography', label: 'Typography', level: 1 },
  { id: 'type-families', label: 'Font families', level: 2 },
  { id: 'type-scale', label: 'Type scale', level: 2 },
  { id: 'type-weights', label: 'Font weights', level: 2 },

  { id: 'spacing', label: 'Spacing', level: 1 },

  { id: 'radius', label: 'Shape', level: 1 },
  { id: 'radius-special', label: 'Special values', level: 2 },

  { id: 'shadows', label: 'Elevation', level: 1 },

  { id: 'motion', label: 'Motion', level: 1 },
  { id: 'motion-easing', label: 'Easing curves', level: 2 },
  { id: 'motion-duration', label: 'Duration scale', level: 2 },

  // ── Components (按用途分類) ──
  { id: 'part-components', label: 'Components', level: 0 },

  { id: 'foundations', label: 'Foundations', level: 1 },
  { id: 'atom-typography', label: 'Text primitives', level: 2 },
  { id: 'atom-icons', label: 'Iconography', level: 2 },
  { id: 'atom-dividers', label: 'Dividers', level: 2 },
  { id: 'atom-indicators', label: 'Color indicators', level: 2 },

  { id: 'actions', label: 'Actions', level: 1 },
  { id: 'mol-button', label: 'Button', level: 2 },
  { id: 'mol-chips', label: 'Chips & pills', level: 2 },
  { id: 'org-settings-row', label: 'Settings row', level: 2 },

  { id: 'inputs', label: 'Inputs', level: 1 },
  { id: 'mol-mood-slider', label: 'Mood slider', level: 2 },
  { id: 'mol-hours-slider', label: 'Hours slider', level: 2 },
  { id: 'mol-segmented', label: 'Segmented control', level: 2 },
  { id: 'mol-satisfaction', label: 'Satisfaction cards', level: 2 },

  { id: 'containers', label: 'Containers', level: 1 },
  { id: 'mol-card', label: 'Card', level: 2 },
  { id: 'org-dimcard', label: 'Dimension card', level: 2 },
  { id: 'org-insight', label: 'Insight card', level: 2 },
  { id: 'org-quote', label: 'Quote block', level: 2 },
  { id: 'org-sheet', label: 'Bottom sheet', level: 2 },

  { id: 'data-display', label: 'Data display', level: 1 },
  { id: 'org-stats', label: 'Stats grid', level: 2 },
  { id: 'org-profile-stats', label: 'Profile stats', level: 2 },
  { id: 'org-heatmap', label: 'Mood heatmap', level: 2 },
  { id: 'org-sleep-chart', label: 'Sleep trend chart', level: 2 },
  { id: 'org-calendar', label: 'Activity calendar', level: 2 },

  { id: 'feedback', label: 'Feedback', level: 1 },
  { id: 'mol-toast', label: 'Toast', level: 2 },
  { id: 'org-hint', label: 'Hint line', level: 2 },
  { id: 'mol-animated', label: 'Animated enter', level: 2 },

  { id: 'navigation', label: 'Navigation', level: 1 },
  { id: 'org-topbar', label: 'Top bar', level: 2 },

  { id: 'templates', label: 'Templates', level: 1 },
  { id: 'tpl-layouts', label: 'Screen layouts', level: 2 },
];

const SideNav: React.FC<{ activeL1: string; activeL2: string; isDark: boolean; onToggle: (v: string) => void }> = ({ activeL1, activeL2, isDark, onToggle }) => {
  const t = React.useContext(ThemeCtx);
  const [collapsed, setCollapsed] = React.useState<Set<string>>(
    () => new Set(NAV_ITEMS.filter(n => n.level === 1).map(n => n.id))
  );
  const [query, setQuery] = React.useState('');
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.location.hash.slice(1) !== id) {
      history.pushState(null, '', `#${id}`);
    }
  };
  const toggleCollapse = (id: string) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Search: build set of visible ids (matches + their parent context). `null` = no active search.
  const q = query.trim().toLowerCase();
  const searchVisibleIds = React.useMemo<Set<string> | null>(() => {
    if (!q) return null;
    const visible = new Set<string>();
    let currentL0: string | null = null;
    let currentL1: string | null = null;
    NAV_ITEMS.forEach(item => {
      if (item.level === 0) currentL0 = item.id;
      if (item.level === 1) currentL1 = item.id;
      if (item.label.toLowerCase().includes(q)) {
        visible.add(item.id);
        if (currentL0) visible.add(currentL0);
        if (item.level === 2 && currentL1) visible.add(currentL1);
      }
    });
    return visible;
  }, [q]);

  return (
    <nav style={{
      position: 'fixed', left: 0, top: 0, bottom: 0,
      width: 232,
      background: isDark ? 'rgba(42,36,29,0.92)' : 'rgba(239,231,216,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRight: `1px solid ${t.line}`,
      overflowY: 'auto',
      padding: '28px 0',
      zIndex: 100,
      fontFamily: FONTS.sans,
      transition: 'background 300ms ease',
    }}>
      {/* Logo */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          padding: '0 20px 16px',
          borderBottom: `1px solid ${t.line}`,
          marginBottom: 12,
          cursor: 'pointer',
        }}
      >
        <div style={{ fontFamily: FONTS.serif, fontSize: 20, fontWeight: 500, color: t.ink, marginBottom: 2 }}>Pace</div>
        <div style={{ fontSize: 11, color: t.inkMuted, letterSpacing: '0.06em' }}>Design System</div>
      </div>

      {/* Theme switcher */}
      <div style={{ padding: '0 16px 12px' }}>
        <SegmentedControl
          theme={t}
          value={isDark ? 'dark' : 'light'}
          onChange={onToggle}
          options={[{ k: 'light', l: '淺色' }, { k: 'dark', l: '深色' }]}
          compact
        />
      </div>

      {/* Search */}
      <div style={{ padding: '0 16px 16px', borderBottom: `1px solid ${t.line}`, marginBottom: 12 }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '8px 28px 8px 12px',
              fontFamily: FONTS.sans,
              fontSize: 13,
              color: t.ink,
              background: isDark ? 'rgba(242,234,219,0.06)' : 'rgba(61,52,42,0.04)',
              border: `1px solid ${t.line}`,
              borderRadius: 8,
              outline: 'none',
              transition: 'border-color 150ms ease, background 150ms ease',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = t.lineStrong; }}
            onBlur={e => { e.currentTarget.style.borderColor = t.line; }}
          />
          {query && (
            <div
              onClick={() => setQuery('')}
              style={{
                position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                padding: 4, cursor: 'pointer', color: t.inkMuted,
                display: 'flex', alignItems: 'center',
              }}
              aria-label="Clear search"
            >
              {Icons.Close({ size: 12 })}
            </div>
          )}
        </div>
      </div>

      {/* Nav items */}
      <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {searchVisibleIds && searchVisibleIds.size === 0 && (
          <div style={{
            padding: '16px 12px', fontSize: 12, color: t.inkMuted, fontStyle: 'italic',
          }}>
            No results for "{query}"
          </div>
        )}
        {(() => {
          let currentL1: string | null = null;
          let l0Count = 0;
          return NAV_ITEMS.map(item => {
            if (item.level === 1) currentL1 = item.id;
            if (searchVisibleIds && !searchVisibleIds.has(item.id)) return null;
            const isHidden = !searchVisibleIds && item.level === 2 && currentL1 !== null && collapsed.has(currentL1);
            if (isHidden) return null;

            const isActive = item.level === 1 ? activeL1 === item.id : activeL2 === item.id;
            const isLevel0 = item.level === 0;
            const isLevel1 = item.level === 1;

            if (isLevel0) {
              l0Count++;
              return (
                <React.Fragment key={item.id}>
                  {l0Count > 1 && (
                    <div style={{
                      borderTop: `1px solid ${t.line}`,
                      margin: '16px 12px 0',
                    }} />
                  )}
                  <div style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: t.inkMuted,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '20px 12px 8px',
                  }}>{item.label}</div>
                </React.Fragment>
              );
            }

            if (isLevel1) {
              const isCollapsed = collapsed.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCollapse(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    fontSize: 13,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? t.ink : t.inkSoft,
                    borderRadius: 8,
                    padding: '7px 10px 7px 12px',
                    cursor: 'pointer',
                    lineHeight: 1.4,
                    transition: 'color 150ms ease',
                  }}
                >
                  <div style={{ flex: 1 }}>{item.label}</div>
                  <div style={{
                    color: t.inkMuted,
                    display: 'flex', alignItems: 'center',
                    transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                    transition: 'transform 180ms ease',
                  }}>
                    {Icons.ChevronR({ size: 14 })}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                onClick={() => handleClick(item.id)}
                style={{
                  fontSize: 12,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? t.ink : t.inkMuted,
                  padding: '5px 12px',
                  paddingLeft: 24,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: isActive ? (isDark ? 'rgba(242,234,219,0.07)' : 'rgba(61,52,42,0.07)') : 'transparent',
                  transition: 'all 150ms ease',
                  lineHeight: 1.4,
                }}
              >
                {item.label}
              </div>
            );
          });
        })()}
      </div>
    </nav>
  );
};

function useScrollSpy(ids: string[]): string {
  const [active, setActive] = React.useState(ids[1] || '');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-32px 0px -60% 0px', threshold: 0 }
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const TokenRow: React.FC<{ label: string; value: string; token?: string; preview?: React.ReactNode }> = ({ label, value, token, preview }) => {
  const t = React.useContext(ThemeCtx);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: `1px solid ${t.line}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {preview}
        <div>
          <PaceSans size={14} color={t.ink}>{label}</PaceSans>
          {token && <PaceSans size={11} color={t.inkMuted} style={{ fontFamily: FONTS.mono, marginTop: 2 }}>{token}</PaceSans>}
        </div>
      </div>
      <PaceNum size={12} color={t.inkMuted}>{value}</PaceNum>
    </div>
  );
};

// Satisfaction card with expanding border ring on select
const SatisfactionCard: React.FC<{
  label: string; color: string; selected: boolean;
  onSelect: () => void; theme: PaceTheme;
}> = ({ label, color, selected, onSelect, theme }) => {
  const [pulse, setPulse] = React.useState(0);
  const prevSelected = React.useRef(selected);

  React.useEffect(() => {
    if (selected && !prevSelected.current) {
      setPulse(p => p + 1);
    }
    prevSelected.current = selected;
  }, [selected]);

  return (
    <div onClick={onSelect} style={{
      flex: 1, padding: '18px 12px',
      background: theme.surface, borderRadius: theme.radius,
      cursor: 'pointer', position: 'relative',
      border: `2px solid ${selected ? color : 'transparent'}`,
      transition: 'border-color 200ms ease',
      overflow: 'visible',
    }}>
      {/* Expanding ring pulse */}
      {pulse > 0 && (
        <PulseRing key={pulse} color={color} radius={theme.radius} />
      )}
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: color, marginBottom: 10,
      }} />
      <PaceSans size={14} color={theme.ink}>{label}</PaceSans>
    </div>
  );
};

const PulseRing: React.FC<{ color: string; radius: number }> = ({ color, radius }) => {
  const [phase, setPhase] = React.useState<'start' | 'end'>('start');
  React.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase('end')));
  }, []);
  return (
    <div style={{
      position: 'absolute',
      inset: phase === 'start' ? -2 : -8,
      borderRadius: radius + (phase === 'start' ? 0 : 6),
      border: `2px solid ${color}`,
      opacity: phase === 'start' ? 0.7 : 0,
      transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)',
      pointerEvents: 'none',
    }} />
  );
};

// ─── Design System Page ─────────────────────────

export default function DesignSystemPage() {
  const [isDark, setIsDark] = React.useState<boolean>(() => readDarkPref());
  const [segVal, setSegVal] = React.useState('a');
  const [moodVal, setMoodVal] = React.useState(2);
  const [hoursVal, setHoursVal] = React.useState(6.5);
  const [chipVal, setChipVal] = React.useState('walk');
  const [durationVal, setDurationVal] = React.useState(25);
  const [mealVal, setMealVal] = React.useState(1);
  const [healthVal, setHealthVal] = React.useState(1);

  const theme = buildTheme(isDark);
  const themeSource = isDark ? THEMES.oatDark : THEMES.oat;

  // Observe only level-2 items so nested Section wrappers don't override their children
  const sectionIds = React.useMemo(() => NAV_ITEMS.filter(n => n.level === 2).map(n => n.id), []);
  const activeL2 = useScrollSpy(sectionIds);
  const activeL1 = React.useMemo(() => {
    if (!activeL2) return '';
    const idx = NAV_ITEMS.findIndex(n => n.id === activeL2);
    for (let i = idx; i >= 0; i--) {
      if (NAV_ITEMS[i].level === 1) return NAV_ITEMS[i].id;
    }
    return '';
  }, [activeL2]);

  // Scroll to hash on initial mount (browser's native hash scroll happens before React renders)
  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
  }, []);

  const handleThemeToggle = (v: string) => {
    const dark = v === 'dark';
    setIsDark(dark);
    localStorage.setItem(DS_THEME_KEY, dark ? 'dark' : 'light');
  };

  return (
    <ThemeCtx.Provider value={theme}>
    <div style={{ background: isDark ? '#1F1A14' : '#E8DFCC', minHeight: '100vh', transition: 'background 300ms ease' }}>
      <SideNav activeL1={activeL1} activeL2={activeL2} isDark={isDark} onToggle={handleThemeToggle} />
      <div style={{
        marginLeft: 232,
        display: 'flex',
        justifyContent: 'center',
      }}>
      <div style={{
        padding: '80px 60px',
        maxWidth: 960,
        width: '100%',
      }}>
      {/* Header */}
      <div style={{ marginBottom: 80, textAlign: 'center' }}>
        <PaceSerif size={48} weight={500} color={theme.ink} style={{ marginBottom: 12 }}>
          Pace — Design System
        </PaceSerif>
        <PaceSans size={16} color={theme.inkSoft} style={{ lineHeight: 1.6 }}>
          Foundations &amp; Component Library
        </PaceSans>
        <div style={{ width: 48, height: 2, background: theme.terracotta, margin: '24px auto 0', opacity: 0.6 }} />
      </div>

      {/* ═══════════════════════════════════════════════
          PART 1 — FUNDAMENTALS (Design Tokens)
          ═══════════════════════════════════════════════ */}
      <div id="part-foundations" style={{ marginBottom: 100, scrollMarginTop: 32 }}>
        <PaceSans size={11} color={theme.inkMuted} style={{
          letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 40,
          textAlign: 'center',
        }}>Foundations</PaceSans>

        {/* ── Colors ── */}
        <Section id="colors" title="Colors" subtitle={`Warm, desaturated palette rooted in oat & earth tones. Currently viewing: ${isDark ? 'Oat·Night (dark)' : 'Oat (light)'}.`}>

          {/* Backgrounds */}
          <SubSection id="colors-bg" title="Background">
            <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 12 }}>
              {isDark ? 'Dark — 燕麥·夜 Oat·Night' : 'Light — 燕麥 Oat'}
            </PaceSans>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TokenRow label="bg — Canvas background" value={themeSource.bg} token="theme.bg → color/bg/canvas"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.bg, border: `1px solid ${theme.line}` }} />} />
              <TokenRow label="surface — Card / section fill" value={themeSource.surface} token="theme.surface → color/bg/surface"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.surface, border: `1px solid ${theme.line}` }} />} />
              <TokenRow label="surfaceElevated — Elevated card / BottomBar" value={themeSource.surfaceElevated} token="theme.surfaceElevated → color/bg/elevated"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.surfaceElevated, border: `1px solid ${theme.line}` }} />} />
            </div>
          </SubSection>

          {/* Accent colors */}
          <SubSection id="colors-accent" title="Accent Colors">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TokenRow label="terracotta — Primary action / brand" value={themeSource.terracotta} token="theme.terracotta → color/brand/default"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.terracotta }} />} />
              <TokenRow label="amber — Deep brand accent" value={themeSource.amber} token="theme.amber → color/brand/deep"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.amber }} />} />
              <TokenRow label="sage — Calm / move accent" value={themeSource.sage} token="theme.sage → color/accent/calm"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.sage }} />} />
              <TokenRow label="dust — Soft / sleep accent" value={themeSource.dust} token="theme.dust → color/accent/soft"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.dust }} />} />
            </div>
          </SubSection>

          {/* Text colors */}
          <SubSection id="colors-ink" title="Text Colors (Ink)">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TokenRow label="ink — Primary text" value={themeSource.ink} token="theme.ink → color/text/primary"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.ink }} />} />
              <TokenRow label="inkSoft — Secondary text" value={themeSource.inkSoft} token="theme.inkSoft → color/text/secondary"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.inkSoft }} />} />
              <TokenRow label="inkMuted — Tertiary / labels" value={themeSource.inkMuted} token="theme.inkMuted → color/text/tertiary"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.inkMuted }} />} />
            </div>
          </SubSection>

          {/* Line / border colors */}
          <SubSection id="colors-line" title="Line / Border Colors">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <TokenRow label="line — Subtle border" value={isDark ? 'rgba(242,234,219,0.08)' : 'rgba(61,52,42,0.09)'} token="theme.line → color/border/subtle"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: theme.surface, border: `2px solid ${themeSource.line}` }} />} />
              <TokenRow label="lineStrong — Strong border" value={isDark ? 'rgba(242,234,219,0.15)' : 'rgba(61,52,42,0.16)'} token="theme.lineStrong → color/border/strong"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: theme.surface, border: `2px solid ${themeSource.lineStrong}` }} />} />
            </div>
          </SubSection>

          {/* Semantic / warn */}
          <SubSection id="colors-semantic" title="Semantic Colors">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TokenRow label="warn — Warning / alert" value={themeSource.warn} token="theme.warn → color/feedback/warn"
                preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: themeSource.warn }} />} />
            </div>
          </SubSection>

          {/* Mood color scale */}
          <SubSection id="colors-mood" title="Mood Color Scale">
            <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 16, lineHeight: 1.6 }}>
              Five steps from cool to warm. No red — designed to avoid negative connotations.
            </PaceSans>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOOD_SCALE.map(m => (
                <TokenRow key={m.key} label={`${m.label} — ${m.key}`} value={`${m.color} · dot: ${m.dot}`} token={`MOOD_SCALE[${m.key}] → color/mood/${m.key}/color`}
                  preview={<div style={{ width: 32, height: 32, borderRadius: 8, background: m.color, boxShadow: `0 4px 10px ${m.color}40` }} />} />
              ))}
            </div>
            {/* Gradient preview */}
            <div style={{
              marginTop: 20, height: 32, borderRadius: 16,
              background: `linear-gradient(90deg, ${MOOD_SCALE.map(m => m.color).join(', ')})`,
            }} />
          </SubSection>
        </Section>

        {/* ── Typography ── */}
        <Section id="typography" title="Typography" subtitle="Three typeface families for Chinese + Latin mixed content.">

          <SubSection id="type-families" title="Font Families">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Serif — Headings &amp; Display</PaceSans>
                <PaceSerif size={32} color={theme.ink} style={{ marginBottom: 8 }}>少一點監控，多一點陪伴</PaceSerif>
                <PaceSerif size={24} color={theme.ink} style={{ marginBottom: 8 }}>Pace — gentle wellness</PaceSerif>
                <PaceSans size={12} color={theme.inkMuted} style={{ fontFamily: FONTS.mono }}>{FONTS.serif}</PaceSans>
              </div>
              <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Sans — Body &amp; UI</PaceSans>
                <PaceSans size={18} color={theme.ink} style={{ marginBottom: 8 }}>記錄你今天的感受，不需要完美。</PaceSans>
                <PaceSans size={15} color={theme.ink} style={{ marginBottom: 8 }}>The rhythm of your day, gently tracked.</PaceSans>
                <PaceSans size={12} color={theme.inkMuted} style={{ fontFamily: FONTS.mono }}>{FONTS.sans}</PaceSans>
              </div>
              <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Mono — Numbers &amp; Data</PaceSans>
                <PaceNum size={36} color={theme.ink} style={{ display: 'block', marginBottom: 8 }}>6.5h · 25min · 3/3</PaceNum>
                <PaceSans size={12} color={theme.inkMuted} style={{ fontFamily: FONTS.mono }}>{FONTS.mono}</PaceSans>
              </div>
            </div>
          </SubSection>

          <SubSection id="type-scale" title="Type Scale">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {TYPE_SCALE.map(t => (
                <div key={t.key} style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                  borderBottom: `1px solid ${theme.line}`, paddingBottom: 12,
                }}>
                  <div style={{
                    fontFamily: t.family === 'serif' ? FONTS.serif : FONTS.sans,
                    fontSize: t.size, fontWeight: t.weight,
                    color: theme.ink, lineHeight: t.lh,
                    flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>Aa 昨晚睡得好嗎</div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                    <PaceNum size={12} color={theme.inkMuted}>{t.size}px · {Math.round(t.lh * 100)}%</PaceNum>
                    <PaceSans size={10} color={theme.inkMuted} style={{ marginTop: 2 }}>{t.label}</PaceSans>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection id="type-weights" title="Font Weights">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { weight: 400, label: 'Regular', desc: 'Body text, descriptions' },
                { weight: 500, label: 'Medium', desc: 'Headings, buttons, labels' },
                { weight: 590, label: 'Semibold', desc: 'iOS status bar clock' },
              ].map(w => (
                <div key={w.weight} style={{ background: theme.surface, borderRadius: 16, padding: 20 }}>
                  <PaceSerif size={28} weight={w.weight} color={theme.ink} style={{ marginBottom: 8 }}>Aa 陪伴</PaceSerif>
                  <PaceNum size={12} color={theme.inkMuted}>{w.weight}</PaceNum>
                  <PaceSans size={12} color={theme.inkSoft} style={{ marginTop: 4 }}>{w.label}</PaceSans>
                  <PaceSans size={11} color={theme.inkMuted} style={{ marginTop: 2 }}>{w.desc}</PaceSans>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* ── Spacing ── */}
        <Section id="spacing" title="Spacing" subtitle="Consistent spacing values used throughout the app.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <div>
              <PaceSans size={12} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Padding</PaceSans>
              {[
                { val: 56, label: 'Top safe area (status bar)' },
                { val: 24, label: 'Screen horizontal padding' },
                { val: 20, label: 'Card padding / TopBar horizontal' },
                { val: 18, label: 'Compact card padding' },
                { val: 14, label: 'Tight card padding' },
              ].map(s => (
                <div key={s.val} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0', borderBottom: `1px solid ${theme.line}`,
                }}>
                  <div style={{ width: s.val, height: 12, background: theme.terracotta, borderRadius: 3, opacity: 0.6, flexShrink: 0 }} />
                  <PaceNum size={12} color={theme.ink} style={{ width: 36, flexShrink: 0 }}>{s.val}px</PaceNum>
                  <PaceSans size={12} color={theme.inkSoft}>{s.label}</PaceSans>
                </div>
              ))}
            </div>
            <div>
              <PaceSans size={12} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Gap</PaceSans>
              {[
                { val: 48, label: 'Export page screen gap' },
                { val: 28, label: 'Section spacing' },
                { val: 24, label: 'Section margin bottom' },
                { val: 16, label: 'Icon gap in header' },
                { val: 12, label: 'Grid card gap' },
                { val: 10, label: 'Compact gap' },
                { val: 8, label: 'Chip / tag gap' },
                { val: 6, label: 'Mood heatmap gap' },
              ].map(s => (
                <div key={`gap-${s.val}`} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0', borderBottom: `1px solid ${theme.line}`,
                }}>
                  <div style={{ width: s.val, height: 12, background: theme.sage, borderRadius: 3, opacity: 0.6, flexShrink: 0 }} />
                  <PaceNum size={12} color={theme.ink} style={{ width: 36, flexShrink: 0 }}>{s.val}px</PaceNum>
                  <PaceSans size={12} color={theme.inkSoft}>{s.label}</PaceSans>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Shape (Border Radius) ── */}
        <Section id="radius" title="Shape" subtitle="Border radius tokens. Three configurable radius options applied globally via theme.radius.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 24 }}>
            {[
              { r: 14, label: 'Small' },
              { r: 22, label: 'Medium' },
              { r: 30, label: 'Large (default)' },
            ].map(v => (
              <div key={v.r} style={{
                background: theme.surface, borderRadius: v.r, padding: 32,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}>
                <PaceSerif size={28} color={theme.ink}>{v.r}px</PaceSerif>
                <PaceSans size={13} color={theme.inkSoft}>{v.label}</PaceSans>
              </div>
            ))}
          </div>
          <SubSection id="radius-special" title="Special Radius Values">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { r: 'min(radius, 20)', val: 20, label: 'Button', show: 20 },
                { r: '12px', val: 12, label: 'Segmented Control', show: 12 },
                { r: '24px', val: 24, label: 'Bottom Sheet', show: 24 },
                { r: '999px', val: 999, label: 'Pill / Chip', show: 999 },
              ].map(v => (
                <div key={v.label} style={{
                  background: theme.surface, borderRadius: v.show, padding: '18px 16px',
                  textAlign: 'center',
                }}>
                  <PaceNum size={14} color={theme.ink}>{v.r}</PaceNum>
                  <PaceSans size={11} color={theme.inkMuted} style={{ marginTop: 4 }}>{v.label}</PaceSans>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* ── Shadows ── */}
        <Section id="shadows" title="Elevation" subtitle="Layered shadows for depth and elevation hierarchy.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
              { label: 'Device Frame', shadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)', desc: 'iOS device mockup' },
              { label: 'Card Hover', shadow: '0 8px 24px rgba(0,0,0,0.12)', desc: 'Interactive card states' },
              { label: 'Mood Blob', shadow: `0 16px 40px ${MOOD_SCALE[4].color}60`, desc: 'Mood indicator glow' },
              { label: 'Slider Thumb (Active)', shadow: `0 8px 24px ${MOOD_SCALE[2].color}70, 0 2px 6px rgba(0,0,0,0.15)`, desc: 'Dragging state' },
              { label: 'Segmented Control Knob', shadow: '0 1px 2px rgba(61,52,42,0.12), 0 2px 6px rgba(61,52,42,0.08)', desc: 'iOS-style indicator' },
              { label: 'Toast', shadow: 'none', desc: 'Overlay with rgba(61,52,42,0.92) bg' },
            ].map(s => (
              <div key={s.label} style={{
                background: theme.surface, borderRadius: 20, padding: 24,
                boxShadow: s.shadow !== 'none' ? s.shadow : undefined,
              }}>
                <PaceSans size={14} color={theme.ink} weight={500} style={{ marginBottom: 4 }}>{s.label}</PaceSans>
                <PaceSans size={12} color={theme.inkSoft}>{s.desc}</PaceSans>
                <PaceSans size={10} color={theme.inkMuted} style={{ fontFamily: FONTS.mono, marginTop: 8, lineHeight: 1.4, wordBreak: 'break-all' }}>
                  {s.shadow}
                </PaceSans>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Motion / Animation ── */}
        <Section id="motion" title="Motion" subtitle="iOS-inspired easing curves and duration values for smooth, natural-feeling transitions.">
          <SubSection id="motion-easing" title="Easing Curves">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {[
                { name: 'iOS Standard', value: 'cubic-bezier(0.32, 0.72, 0, 1)', desc: 'Navigation transitions, slider movements, page animations' },
                { name: 'Spring / Bounce', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', desc: 'Card press, slider thumb scale, entrance animations' },
              ].map(e => (
                <div key={e.name} style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
                  <PaceSans size={14} color={theme.ink} weight={500} style={{ marginBottom: 4 }}>{e.name}</PaceSans>
                  <PaceSans size={12} color={theme.inkSoft} style={{ marginBottom: 10, lineHeight: 1.5 }}>{e.desc}</PaceSans>
                  <PaceNum size={11} color={theme.inkMuted}>{e.value}</PaceNum>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection id="motion-duration" title="Duration Scale">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { ms: 120, label: 'Micro', desc: 'Thumb scale on drag' },
                { ms: 180, label: 'Fast', desc: 'Button press, card tap scale, chip toggle' },
                { ms: 200, label: 'Quick', desc: 'Color transitions, dot indicators' },
                { ms: 220, label: 'Normal', desc: 'Card hover shadow, transform' },
                { ms: 280, label: 'Segmented', desc: 'Segmented control slide' },
                { ms: 320, label: 'Sheet backdrop', desc: 'Backdrop fade, slider value' },
                { ms: 380, label: 'Navigation', desc: 'Push/pop screen transitions' },
                { ms: 420, label: 'Enter', desc: 'AnimatedEnter fade + translateY' },
                { ms: 900, label: 'Fade out', desc: 'Launch screen exit' },
                { ms: 1400, label: 'Blob entrance', desc: 'Living blob scale-in with spring' },
              ].map(d => (
                <div key={d.ms} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '10px 0', borderBottom: `1px solid ${theme.line}`,
                }}>
                  <PaceNum size={13} color={theme.ink} style={{ width: 60, textAlign: 'right' }}>{d.ms}ms</PaceNum>
                  <div style={{
                    width: `${Math.min(d.ms / 4, 200)}px`, height: 6,
                    borderRadius: 3, background: theme.terracotta,
                    opacity: 0.5,
                  }} />
                  <div style={{ flex: 1 }}>
                    <PaceSans size={13} color={theme.ink}>{d.label}</PaceSans>
                    <PaceSans size={11} color={theme.inkMuted}>{d.desc}</PaceSans>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>
      </div>

      {/* ═══════════════════════════════════════════════
          PART 2 — COMPONENTS (按用途分類)
          詳見 docs/component-architecture.md
          ═══════════════════════════════════════════════ */}
      <div id="part-components" style={{ scrollMarginTop: 32 }}>
        <PaceSans size={11} color={theme.inkMuted} style={{
          letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 40,
          textAlign: 'center',
        }}>Components</PaceSans>

        {/* ── FOUNDATIONS ── */}
        <Section id="foundations" title="Foundations" subtitle="Visual primitives — the raw vocabulary of the system. Not interactive.">

          {/* Typography components */}
          <SubSection id="atom-typography" title="Typography Components">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{'<PaceSerif>'}</PaceSans>
                <PaceSerif size={26} color={theme.ink}>少一點監控，多一點陪伴</PaceSerif>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginTop: 6 }}>Props: size, weight, color, style</PaceSans>
              </div>
              <div style={{ borderTop: `1px solid ${theme.line}`, paddingTop: 20 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{'<PaceSans>'}</PaceSans>
                <PaceSans size={15} color={theme.ink}>記錄你今天的感受，不需要完美。</PaceSans>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginTop: 6 }}>Props: size, weight, color, style, onClick</PaceSans>
              </div>
              <div style={{ borderTop: `1px solid ${theme.line}`, paddingTop: 20 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{'<PaceNum>'}</PaceSans>
                <PaceNum size={24} color={theme.ink}>6.5h · 25min · 42d</PaceNum>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginTop: 6 }}>Props: size, color, style — tabular-nums enabled</PaceSans>
              </div>
            </div>
          </SubSection>

          {/* Icons */}
          <SubSection id="atom-icons" title="Icons">
            <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 16, lineHeight: 1.6 }}>
              18 stroke-based SVG icons. Default: 24×24, stroke-width 1.6. Configurable size prop.
            </PaceSans>
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }}>
                {Object.entries(Icons).map(([name, Icon]) => (
                  <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 56, height: 56,
                      border: `1px solid ${theme.line}`,
                      borderRadius: 14,
                      color: theme.ink,
                      background: theme.bg,
                    }}>
                      {Icon({ size: 28 })}
                    </div>
                    <PaceSans size={10} color={theme.inkMuted}>{name}</PaceSans>
                  </div>
                ))}
              </div>
              {/* Size variants */}
              <div style={{ marginTop: 24, borderTop: `1px solid ${theme.line}`, paddingTop: 20 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Size Variants</PaceSans>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  {[16, 18, 20, 22, 24, 28, 32].map(s => (
                    <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ color: theme.ink }}>{Icons.Sleep({ size: s })}</div>
                      <PaceNum size={10} color={theme.inkMuted}>{s}</PaceNum>
                    </div>
                  ))}
                </div>
              </div>
              {/* Exercise icons (Phosphor duotone) */}
              <div style={{ marginTop: 24, borderTop: `1px solid ${theme.line}`, paddingTop: 20 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Exercise Icons</PaceSans>
                <PaceSans size={12} color={theme.inkSoft} style={{ marginBottom: 16, lineHeight: 1.6 }}>
                  Phosphor duotone set used on the exercise logging screen.
                </PaceSans>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }}>
                  {EXERCISE_ICONS.map(({ k, Icon }) => (
                    <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 56, height: 56,
                        border: `1px solid ${theme.line}`,
                        borderRadius: 14,
                        color: theme.terracotta,
                        background: theme.bg,
                      }}>
                        <Icon size={28} weight="duotone" />
                      </div>
                      <PaceSans size={10} color={theme.inkMuted}>{theme.L[`exercise_type_${k}`]}</PaceSans>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SubSection>

          {/* Dividers */}
          <SubSection id="atom-dividers" title="Dividers &amp; Separators">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 8 }}>Line (light)</PaceSans>
                <div style={{ height: 1, background: theme.line }} />
              </div>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 8 }}>Line Strong</PaceSans>
                <div style={{ height: 1, background: theme.lineStrong }} />
              </div>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 8 }}>Accent Divider</PaceSans>
                <div style={{ width: 48, height: 2, background: theme.terracotta, opacity: 0.6 }} />
              </div>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 8 }}>Bottom Sheet Handle</PaceSans>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 36, height: 4, borderRadius: 2, background: theme.lineStrong }} />
                </div>
              </div>
            </div>
          </SubSection>

          {/* Color Dots */}
          <SubSection id="atom-indicators" title="Color Indicators">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 10 }}>Mood dots (on slider track)</PaceSans>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  {MOOD_SCALE.map(m => (
                    <div key={m.key} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: theme.ink, opacity: 0.35,
                    }} />
                  ))}
                </div>
              </div>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 10 }}>Food health indicator dots</PaceSans>
                <div style={{ display: 'flex', gap: 16 }}>
                  {[theme.sage, theme.dust, theme.terracotta].map((c, i) => (
                    <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: c }} />
                  ))}
                </div>
              </div>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 10 }}>Organic blob shape</PaceSans>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  {[theme.dust, theme.sage, theme.terracotta].map((c, i) => (
                    <BlobShape key={i} size={48} fill={c} dropShadow={`0 8px 20px ${c}40`} />
                  ))}
                </div>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ── ACTIONS ── */}
        <Section id="actions" title="Actions" subtitle="Components users actively tap to trigger behaviour.">

          {/* Buttons */}
          <SubSection
            id="mol-button"
            title="Button"
            action={
              <a
                href="/design-system/button"
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  fontWeight: 500,
                  color: theme.terracotta,
                  textDecoration: 'none',
                }}
              >
                查看詳細文件 →
              </a>
            }
          >
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Button theme={theme} full>Primary — 記錄</Button>
              <Button theme={theme} variant="soft" full>Soft — 稍後再說</Button>
              <Button theme={theme} variant="text" full>Text — 跳過也沒關係</Button>
            </div>
          </SubSection>

          {/* Chips / Tags */}
          <SubSection id="mol-chips" title="Chips &amp; Selection Pills">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 10 }}>Activity type chips (pill style)</PaceSans>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {[
                    { k: 'walk', l: '散步' }, { k: 'run', l: '跑步' },
                    { k: 'yoga', l: '瑜伽' }, { k: 'strength', l: '肌力' },
                  ].map(t => (
                    <div key={t.k} onClick={() => setChipVal(t.k)} style={{
                      padding: '10px 18px', borderRadius: 999,
                      background: chipVal === t.k ? theme.ink : 'transparent',
                      color: chipVal === t.k ? theme.bg : theme.inkSoft,
                      border: `1px solid ${chipVal === t.k ? theme.ink : theme.lineStrong}`,
                      fontFamily: FONTS.sans, fontSize: 14,
                      cursor: 'pointer', transition: 'all 200ms ease',
                    }}>{t.l}</div>
                  ))}
                </div>
              </div>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 10 }}>Duration pills (fill style)</PaceSans>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[10, 20, 30, 45, 60].map(v => (
                    <div key={v} onClick={() => setDurationVal(v)} style={{
                      flex: 1, textAlign: 'center', padding: '14px 0',
                      background: durationVal === v ? theme.terracotta : theme.bg,
                      color: durationVal === v ? '#FBF6EC' : theme.inkSoft,
                      borderRadius: theme.radius,
                      fontFamily: FONTS.sans, fontSize: 14,
                      cursor: 'pointer', transition: 'all 180ms ease',
                    }}>{v}</div>
                  ))}
                </div>
              </div>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 10 }}>Meal selection (grid style)</PaceSans>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['早餐', '午餐', '晚餐', '點心'].map((m, i) => (
                    <div key={m} onClick={() => setMealVal(i)} style={{
                      flex: 1, textAlign: 'center', padding: '12px 0',
                      background: mealVal === i ? theme.ink : theme.bg,
                      color: mealVal === i ? theme.bg : theme.inkSoft,
                      borderRadius: theme.radius,
                      fontFamily: FONTS.sans, fontSize: 13,
                      cursor: 'pointer', transition: 'all 180ms ease',
                    }}>{m}</div>
                  ))}
                </div>
              </div>
            </div>
          </SubSection>

          {/* Settings Row */}
          <SubSection id="org-settings-row" title="SettingsRow &amp; ClassicRow">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              <div style={{ background: theme.surface, borderRadius: 20, padding: 20 }}>
                <PaceSans size={10} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>SettingsRow + Segmented</PaceSans>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>外觀</PaceSans>
                    <SegmentedControl theme={theme}
                      value={isDark ? 'dark' : 'light'}
                      onChange={() => {}}
                      options={[{ k: 'light', l: '淺色' }, { k: 'dark', l: '深色' }]}
                      compact
                    />
                  </div>
                </div>
              </div>
              <div style={{ background: theme.surface, borderRadius: 20, overflow: 'hidden' }}>
                <PaceSans size={10} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 18px 0' }}>ClassicRow (list item)</PaceSans>
                {[
                  { icon: Icons.Mood({ size: 18 }), label: '提醒設定', hint: '每晚 22:00' },
                  { icon: Icons.Leaf({ size: 18 }), label: '聲音回饋', hint: '開啟' },
                  { icon: Icons.Insight({ size: 18 }), label: '數據管理', hint: '匯出' },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 18px',
                    borderTop: i > 0 ? `1px solid ${theme.line}` : 'none',
                  }}>
                    <div style={{ color: theme.inkSoft, opacity: 0.85 }}>{r.icon}</div>
                    <PaceSans size={15} color={theme.ink} style={{ flex: 1 }}>{r.label}</PaceSans>
                    <PaceSans size={12} color={theme.inkMuted}>{r.hint}</PaceSans>
                    <div style={{ color: theme.inkMuted, opacity: 0.6 }}>{Icons.ChevronR({ size: 16 })}</div>
                  </div>
                ))}
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ── INPUTS ── */}
        <Section id="inputs" title="Inputs" subtitle="Components that capture feeling or data — Pace 的核心分類。">

          {/* Mood Slider */}
          <SubSection id="mol-mood-slider" title="MoodSlider">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
              <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 16, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                5-point horizontal drag slider with gradient
              </PaceSans>
              <MoodSlider theme={theme} value={moodVal} onChange={setMoodVal} />
            </div>
          </SubSection>

          {/* Hours Slider */}
          <SubSection id="mol-hours-slider" title="HoursSlider">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
              <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 16, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Range slider (0–12h, 0.5h steps) with gradient fill
              </PaceSans>
              <HoursSlider theme={theme} value={hoursVal} onChange={setHoursVal} />
            </div>
          </SubSection>

          {/* Segmented Control */}
          <SubSection
            id="mol-segmented"
            title="SegmentedControl"
            action={
              <a
                href="/design-system/segmented-control"
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  fontWeight: 500,
                  color: theme.terracotta,
                  textDecoration: 'none',
                }}
              >
                查看詳細文件 →
              </a>
            }
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 12 }}>2 options</PaceSans>
                <SegmentedControl theme={theme}
                  value={segVal === 'a' || segVal === 'b' ? segVal : 'a'}
                  onChange={setSegVal}
                  options={[{ k: 'a', l: '日間' }, { k: 'b', l: '夜間' }]}
                />
              </div>
              <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 12 }}>3 options</PaceSans>
                <SegmentedControl theme={theme}
                  value="zh-TW"
                  onChange={() => {}}
                  options={[{ k: 'zh-TW', l: '中文' }, { k: 'en', l: 'EN' }, { k: 'ja', l: '日本語' }]}
                />
              </div>
            </div>
            <div style={{ marginTop: 16, background: theme.surface, borderRadius: 20, padding: 24 }}>
              <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 12 }}>Compact variant</PaceSans>
              <SegmentedControl theme={theme}
                value="a"
                onChange={() => {}}
                options={[{ k: 'a', l: '日' }, { k: 'b', l: '夜' }]}
                compact
              />
            </div>
          </SubSection>

          {/* Health / satisfaction cards */}
          <SubSection id="mol-satisfaction" title="Satisfaction Cards">
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { k: 0, l: '清淡', c: theme.sage },
                { k: 1, l: '均衡', c: theme.dust },
                { k: 2, l: '放縱', c: theme.terracotta },
              ].map(h => (
                <SatisfactionCard
                  key={h.k}
                  label={h.l}
                  color={h.c}
                  selected={healthVal === h.k}
                  onSelect={() => setHealthVal(h.k)}
                  theme={theme}
                />
              ))}
            </div>
          </SubSection>
        </Section>

        {/* ── CONTAINERS ── */}
        <Section id="containers" title="Containers" subtitle="Shells that hold content.">

          {/* Cards */}
          <SubSection id="mol-card" title="PaceCard">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 8 }}>tone="surface" (default)</PaceSans>
                <PaceCard theme={theme}>
                  <PaceSans size={14} color={theme.ink}>Card content with surface background</PaceSans>
                  <PaceSans size={12} color={theme.inkSoft} style={{ marginTop: 4 }}>Padding: 20px, radius: theme.radius</PaceSans>
                </PaceCard>
              </div>
              <div>
                <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 8 }}>tone="elevated"</PaceSans>
                <PaceCard theme={theme} tone="elevated">
                  <PaceSans size={14} color={theme.ink}>Card content with elevated background</PaceSans>
                  <PaceSans size={12} color={theme.inkSoft} style={{ marginTop: 4 }}>Brighter surface for emphasis</PaceSans>
                </PaceCard>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 8 }}>Clickable card (interactive)</PaceSans>
              <PaceCard theme={theme} onClick={() => {}} padding={18}>
                <PaceSans size={14} color={theme.ink}>Tap me — cursor: pointer, transitions on hover</PaceSans>
              </PaceCard>
            </div>
          </SubSection>

          {/* DimCard */}
          <SubSection id="org-dimcard" title="DimCard (Dimension Card)">
            <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 16, lineHeight: 1.6 }}>
              Home screen metric cards in a 2×2 grid. Contains icon, label, value, unit, and note with decorative background circle.
            </PaceSans>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[
                { icon: Icons.Sleep({ size: 32 }), label: '睡眠', val: '6.5', unit: '小時', note: '淺眠較多', tone: theme.dust },
                { icon: Icons.Move({ size: 32 }), label: '運動', val: '25', unit: '分鐘', note: '散步', tone: theme.sage },
                { icon: Icons.Food({ size: 32 }), label: '飲食', val: '2/3', unit: '餐', note: '今日已記錄', tone: theme.terracotta },
                { icon: Icons.Mood({ size: 32 }), label: '情緒', val: '還行', unit: '', note: '平穩的一天', tone: MOOD_SCALE[2].color },
              ].map((d, i) => (
                <div key={i} style={{
                  background: theme.surface, borderRadius: theme.radius, padding: 18,
                  position: 'relative', overflow: 'hidden', cursor: 'pointer',
                }}>
                  <div style={{
                    position: 'absolute', right: -20, bottom: -20,
                    width: 70, height: 70, borderRadius: '50%',
                    background: d.tone, opacity: 0.25,
                  }} />
                  <div style={{ color: theme.inkSoft, marginBottom: 24, position: 'relative' }}>{d.icon}</div>
                  <PaceSans size={12} color={theme.inkMuted} style={{ marginBottom: 4, position: 'relative' }}>{d.label}</PaceSans>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 6, position: 'relative' }}>
                    <PaceSerif size={26} color={theme.ink}>{d.val}</PaceSerif>
                    <PaceSans size={11} color={theme.inkMuted}>{d.unit}</PaceSans>
                  </div>
                  <PaceSans size={11} color={theme.inkSoft} style={{ position: 'relative' }}>{d.note}</PaceSans>
                </div>
              ))}
            </div>
          </SubSection>

          {/* Insight Card */}
          <SubSection id="org-insight" title="Insight Card">
            <PaceCard theme={theme} padding={18} tone="elevated">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ color: theme.terracotta, opacity: 0.8 }}>{Icons.Leaf({ size: 16 })}</div>
                <PaceSans size={12} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  我們注意到
                </PaceSans>
              </div>
              <PaceSerif size={18} color={theme.ink} style={{ lineHeight: 1.5, marginBottom: 10 }}>
                運動的日子，你的睡眠品質比較好
              </PaceSerif>
              <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.6 }}>
                本週有運動的三天，你的平均睡眠時數是 7.2 小時，沒有運動的日子則是 5.8 小時。
              </PaceSans>
            </PaceCard>
          </SubSection>

          {/* Quote block */}
          <SubSection id="org-quote" title="Quote Block">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              <div style={{ background: theme.surface, borderRadius: 20, padding: '18px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.75 }}>{Icons.Leaf({ size: 16 })}</div>
                <PaceSerif size={15} color={theme.inkSoft} style={{ lineHeight: 1.6, fontStyle: 'italic' }}>
                  不需要追求完美的每一天，只要誠實面對自己。
                </PaceSerif>
              </div>
              <div style={{ textAlign: 'center', padding: '20px 24px' }}>
                <PaceSerif size={16} color={theme.inkSoft} style={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                  「慢慢來，也是一種節奏。」
                </PaceSerif>
                <div style={{ margin: '14px auto 0', width: 24, height: 1, background: theme.terracotta, opacity: 0.7 }} />
              </div>
            </div>
          </SubSection>

          {/* Bottom Sheet */}
          <SubSection id="org-sheet" title="Bottom Sheet">
            <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 16, lineHeight: 1.6 }}>
              Modal sheet sliding up from bottom with backdrop overlay. Used for mood check-in.
            </PaceSans>
            <div style={{
              background: theme.bg, borderRadius: 20, overflow: 'hidden',
              position: 'relative', height: 300,
            }}>
              {/* Fake backdrop */}
              <div style={{
                position: 'absolute', inset: 0,
                background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(61,52,42,0.4)',
              }} />
              {/* Sheet */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: theme.bg,
                borderTopLeftRadius: 24, borderTopRightRadius: 24,
                paddingBottom: 20,
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px' }}>
                  <div style={{ width: 36, height: 4, borderRadius: 2, background: theme.lineStrong }} />
                </div>
                <div style={{ padding: '8px 22px' }}>
                  <PaceSans size={12} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>此刻</PaceSans>
                  <PaceSerif size={22} weight={500} color={theme.ink}>現在感覺怎麼樣？</PaceSerif>
                </div>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ── DATA DISPLAY ── */}
        <Section id="data-display" title="Data Display" subtitle="Turning records into readable visuals. Read-only.">

          {/* Stats Grid */}
          <SubSection id="org-stats" title="Stats Grid">
            <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 16, lineHeight: 1.6 }}>
              3-column stat display used in sleep summary and profile screens. Shows metric + unit + label.
            </PaceSans>
            <PaceCard theme={theme} padding={18}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[
                  { l: '時長', v: '6.5', u: 'h' },
                  { l: '感受', v: '還行', u: '' },
                  { l: '本週', v: '6.3', u: 'h avg' },
                ].map((x, i) => (
                  <div key={i} style={{ background: theme.bg, borderRadius: theme.radius, padding: 14 }}>
                    <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 4 }}>{x.l}</PaceSans>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                      <PaceSerif size={17} color={theme.ink}>{x.v}</PaceSerif>
                      <PaceSans size={10} color={theme.inkMuted}>{x.u}</PaceSans>
                    </div>
                  </div>
                ))}
              </div>
            </PaceCard>
          </SubSection>

          {/* Profile Stats (3 variants) */}
          <SubSection id="org-profile-stats" title="Profile Stats Variants">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {/* Classic */}
              <div style={{ background: theme.surface, borderRadius: 20, padding: 20 }}>
                <PaceSans size={10} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Classic</PaceSans>
                <div style={{ display: 'flex' }}>
                  {[
                    { l: '持續', v: '3', u: '天' },
                    { l: '平均', v: '6.3', u: '小時' },
                    { l: '加入', v: '42', u: '天前' },
                  ].map((s, i) => (
                    <React.Fragment key={s.l}>
                      {i > 0 && <div style={{ width: 1, background: theme.line, margin: '4px 0' }} />}
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <PaceSans size={10} color={theme.inkMuted} style={{ marginBottom: 4 }}>{s.l}</PaceSans>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                          <PaceSerif size={18} color={theme.ink}>{s.v}</PaceSerif>
                          <PaceSans size={10} color={theme.inkMuted}>{s.u}</PaceSans>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {/* Editorial */}
              <div style={{ background: theme.surface, borderRadius: 20, padding: 20 }}>
                <PaceSans size={10} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Editorial</PaceSans>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: `1px solid ${theme.line}`, borderBottom: `1px solid ${theme.line}`, padding: '14px 0' }}>
                  {[
                    { v: '42', l: '持續' },
                    { v: '6.3', l: '平均' },
                    { v: 'iv', l: '章節' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center', borderLeft: i > 0 ? `1px solid ${theme.line}` : 'none' }}>
                      <PaceSerif size={22} weight={400} color={theme.ink} style={{ fontStyle: 'italic', marginBottom: 4 }}>{s.v}</PaceSerif>
                      <PaceSans size={9} color={theme.inkMuted} style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</PaceSans>
                    </div>
                  ))}
                </div>
              </div>
              {/* Minimal */}
              <div style={{ background: theme.surface, borderRadius: 20, padding: 20 }}>
                <PaceSans size={10} color={theme.inkMuted} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Minimal</PaceSans>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: `1px solid ${theme.line}`, paddingTop: 14 }}>
                  {[
                    { v: '42', l: '持續', align: 'left' as const },
                    { v: '6.3', l: '平均', align: 'center' as const },
                    { v: '4', l: '情緒', align: 'right' as const },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: s.align }}>
                      <PaceSerif size={20} weight={400} color={theme.ink} style={{ marginBottom: 4 }}>{s.v}</PaceSerif>
                      <PaceSans size={9} color={theme.inkMuted} style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</PaceSans>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SubSection>

          {/* Mood Heatmap */}
          <SubSection id="org-heatmap" title="Mood Heatmap">
            <PaceCard theme={theme} padding={18}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <PaceSans size={13} color={theme.ink} weight={500}>情緒色溫</PaceSans>
                <PaceSans size={11} color={theme.inkMuted}>冷→暖</PaceSans>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 2, 0, 3, 4].map((mood, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                    <div style={{
                      width: '100%', height: 52, borderRadius: 10,
                      background: MOOD_SCALE[mood].color, opacity: 0.85,
                    }} />
                    <PaceSans size={11} color={theme.inkMuted}>{['一', '二', '三', '四', '五', '六', '日'][i]}</PaceSans>
                  </div>
                ))}
              </div>
            </PaceCard>
          </SubSection>

          {/* Sleep Trend Chart */}
          <SubSection id="org-sleep-chart" title="Sleep Trend Chart">
            <PaceCard theme={theme} padding={18}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <PaceSans size={13} color={theme.ink} weight={500}>睡眠趨勢</PaceSans>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                  <PaceSerif size={16} color={theme.ink}>6.3</PaceSerif>
                  <PaceSans size={11} color={theme.inkMuted}>週平均</PaceSans>
                </div>
              </div>
              <div style={{ position: 'relative', height: 70, marginBottom: 10 }}>
                <svg viewBox="0 0 280 70" width="100%" height="70" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ds-g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor={theme.terracotta} stopOpacity="0.28" />
                      <stop offset="1" stopColor={theme.terracotta} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {(() => {
                    const data = [5.5, 6.2, 7.0, 6.5, 4.8, 7.8, 6.5];
                    const pts = data.map((s, i) => {
                      const x = (i / 6) * 280;
                      const y = 70 - ((s - 3) / 6) * 60;
                      return [x, Math.max(8, Math.min(66, y))];
                    });
                    const d = pts.reduce((acc, [x, y], i) => {
                      if (i === 0) return `M ${x} ${y}`;
                      const [px, py] = pts[i - 1];
                      const cx2 = (px + x) / 2;
                      return `${acc} Q ${cx2} ${py}, ${cx2} ${(py + y) / 2} T ${x} ${y}`;
                    }, '');
                    return (
                      <>
                        <path d={`${d} L 280 70 L 0 70 Z`} fill="url(#ds-g)" />
                        <path d={d} fill="none" stroke={theme.terracotta} strokeWidth="1.8" strokeLinecap="round" />
                        {pts.map(([x, y], i) => (
                          <circle key={i} cx={x} cy={y} r={i === 6 ? 4 : 2.5} fill={theme.terracotta} />
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {['一', '二', '三', '四', '五', '六', '日'].map(d => (
                  <PaceSans key={d} size={11} color={theme.inkMuted} style={{ width: 20, textAlign: 'center' }}>{d}</PaceSans>
                ))}
              </div>
            </PaceCard>
          </SubSection>

          {/* Minimal Calendar Grid */}
          <SubSection id="org-calendar" title="Activity Calendar (Minimal Profile)">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
              <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 16 }}>6-week dot grid showing activity history</PaceSans>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, maxWidth: 320 }}>
                {Array.from({ length: 42 }).map((_, i) => {
                  const isSkip = [2, 9, 17, 26, 33].includes(i);
                  const isToday = i === 41;
                  const opacity = isSkip ? 0 : (0.35 + (i / 42) * 0.55);
                  return (
                    <div key={i} style={{
                      aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ── FEEDBACK ── */}
        <Section id="feedback" title="Feedback" subtitle="系統給使用者的溫柔回應，對應 Pace 的陪伴式提醒設計哲學。">

          {/* Toast */}
          <SubSection id="mol-toast" title="Toast">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
              <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 16 }}>
                Auto-dismiss notification (2200ms). Positioned absolute bottom-center.
              </PaceSans>
              <div style={{ position: 'relative', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  background: isDark ? 'rgba(242,234,219,0.92)' : 'rgba(61,52,42,0.92)',
                  color: isDark ? '#2A241D' : '#FBF6EC',
                  padding: '10px 18px', borderRadius: 999,
                  fontFamily: FONTS.sans, fontSize: 13,
                  whiteSpace: 'nowrap',
                }}>已記錄今天的情緒 ✓</div>
              </div>
            </div>
          </SubSection>

          {/* Streak / hint line */}
          <SubSection id="org-hint" title="Hint Line">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 20 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ color: theme.terracotta, marginTop: 2, opacity: 0.7 }}>
                  {Icons.Leaf({ size: 16 })}
                </div>
                <PaceSans size={13} color={theme.inkSoft} style={{ lineHeight: 1.6, flex: 1 }}>
                  已經連續 3 天記錄了，你做得很好。
                </PaceSans>
              </div>
            </div>
          </SubSection>

          {/* AnimatedEnter */}
          <SubSection id="mol-animated" title="AnimatedEnter">
            <div style={{ background: theme.surface, borderRadius: 20, padding: 24 }}>
              <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 16, lineHeight: 1.6 }}>
                Fade + translateY entrance wrapper. Stagger with increasing delay values (60ms increments).
              </PaceSans>
              <div style={{ display: 'flex', gap: 12 }}>
                {[0, 60, 120, 180, 240].map((d) => (
                  <AnimatedEnter key={d} delay={d}>
                    <div style={{
                      background: theme.bg, borderRadius: 12,
                      padding: 16, textAlign: 'center', flex: 1,
                    }}>
                      <PaceNum size={12} color={theme.inkMuted}>delay={d}</PaceNum>
                    </div>
                  </AnimatedEnter>
                ))}
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ── NAVIGATION ── */}
        <Section id="navigation" title="Navigation" subtitle="頁內導覽結構元件。跨頁面的 NavStack / PageSlider 屬於 System 層。">

          {/* TopBar */}
          <SubSection id="org-topbar" title="TopBar">
            <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 16, lineHeight: 1.6 }}>
              Sticky navigation header. Left slot: back chevron, or small uppercase label when there's no action (home). Center slot: serif title, progress bar, or empty. Right slot: small step label, or custom node (home icons). Padding adapts to viewport — desktop frame reserves space for the fake status bar, mobile browser and PWA standalone use safe-area insets.
            </PaceSans>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                {
                  label: 'Date + icons — Home',
                  render: (
                    <TopBar
                      theme={theme}
                      leftLabel="週六・4 月 18 日"
                      right={
                        <div style={{ color: theme.inkSoft, display: 'flex', gap: 16 }}>
                          <div style={{ padding: 4 }}>{Icons.Insight({ size: 20 })}</div>
                          <div style={{ padding: 4 }}>{Icons.Me({ size: 20 })}</div>
                        </div>
                      }
                    />
                  ),
                },
                {
                  label: 'Back + title — Insights',
                  render: <TopBar theme={theme} onBack={() => {}} title="4 月 12 – 18" />,
                },
                {
                  label: 'Back + step — Food / Move / Exercise',
                  render: <TopBar theme={theme} onBack={() => {}} step="記錄運動" />,
                },
                {
                  label: 'Back + progress — Sleep flow',
                  render: <TopBar theme={theme} onBack={() => {}} progress={{ current: 2, total: 3 }} />,
                },
              ].map(v => (
                <div key={v.label} style={{ background: theme.bg, borderRadius: 20, overflow: 'hidden' }}>
                  <PaceSans size={10} color={theme.inkMuted} style={{ padding: '8px 12px 0', textAlign: 'center' }}>{v.label}</PaceSans>
                  <div style={{ paddingTop: 0 }}>{v.render}</div>
                </div>
              ))}
            </div>
            <PaceSans size={11} color={theme.inkMuted} style={{ marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Sleep flow — progress states
            </PaceSans>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[1, 2, 3].map(n => (
                <div key={n} style={{ background: theme.bg, borderRadius: 20, overflow: 'hidden' }}>
                  <PaceSans size={10} color={theme.inkMuted} style={{ padding: '8px 12px 0', textAlign: 'center' }}>Step {n} / 3</PaceSans>
                  <div style={{ paddingTop: 0 }}>
                    <TopBar theme={theme} onBack={() => {}} progress={{ current: n, total: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* ── TEMPLATES ── */}
        <Section id="templates" title="Templates" subtitle="Full-screen layouts composed of components. Shown at actual device size.">

          <SubSection id="tpl-layouts" title="Screen Layout Patterns">
            <PaceSans size={13} color={theme.inkSoft} style={{ marginBottom: 24, lineHeight: 1.6 }}>
              Three primary layout patterns used across all screens.
            </PaceSans>
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
              {/* Scrollable Home */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <PaceSans size={12} color={theme.inkMuted}>Scrollable (Home, Insights)</PaceSans>
                <div style={{
                  width: 200, height: 340, borderRadius: 24,
                  border: `2px solid ${theme.lineStrong}`,
                  padding: 12, display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{ height: 24, background: theme.line, borderRadius: 6 }} />
                  <div style={{ height: 40, background: theme.surface, borderRadius: 10 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flex: 1 }}>
                    <div style={{ background: theme.surface, borderRadius: 10 }} />
                    <div style={{ background: theme.surface, borderRadius: 10 }} />
                    <div style={{ background: theme.surface, borderRadius: 10 }} />
                    <div style={{ background: theme.surface, borderRadius: 10 }} />
                  </div>
                </div>
              </div>

              {/* Flow with footer */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <PaceSans size={12} color={theme.inkMuted}>Flow (Sleep, Move, Food)</PaceSans>
                <div style={{
                  width: 200, height: 340, borderRadius: 24,
                  border: `2px solid ${theme.lineStrong}`,
                  padding: 12, display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{ height: 20, background: theme.line, borderRadius: 6 }} />
                  <div style={{ height: 16, background: theme.line, borderRadius: 4, width: '80%' }} />
                  <div style={{ height: 10, background: theme.line, borderRadius: 3, width: '60%', opacity: 0.5 }} />
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: theme.dust, opacity: 0.5 }} />
                  </div>
                  <div style={{ height: 36, background: theme.terracotta, borderRadius: 14, opacity: 0.8 }} />
                </div>
              </div>

              {/* Centered confirmation */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <PaceSans size={12} color={theme.inkMuted}>Confirmation (MoveDone)</PaceSans>
                <div style={{
                  width: 200, height: 340, borderRadius: 24,
                  border: `2px solid ${theme.lineStrong}`,
                  padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
                }}>
                  <BlobShape size={60} fill={theme.sage} opacity={0.7} />
                  <div style={{ height: 14, background: theme.line, borderRadius: 4, width: '70%' }} />
                  <div style={{ height: 8, background: theme.line, borderRadius: 3, width: '50%', opacity: 0.5 }} />
                  <div style={{ height: 36, background: theme.terracotta, borderRadius: 14, opacity: 0.8, width: '80%', marginTop: 12 }} />
                </div>
              </div>
            </div>
          </SubSection>
        </Section>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '60px 0 40px', borderTop: `1px solid ${theme.line}` }}>
        <PaceSerif size={20} color={theme.inkSoft} style={{ fontStyle: 'italic', marginBottom: 8 }}>Pace</PaceSerif>
        <PaceSans size={12} color={theme.inkMuted}>Design System v0.1 — Foundations &amp; Components</PaceSans>
      </div>
      </div>
      </div>
    </div>
    </ThemeCtx.Provider>
  );
}
