import React from 'react';
import { FONTS, type PaceTheme } from '../../data/tokens';
import { Icons } from '../ui/foundations/Icons';
import { SegmentedControl } from '../ui/inputs/SegmentedControl';

export const DS_THEME_KEY = 'pace.ds.theme';
export const readDarkPref = () => localStorage.getItem(DS_THEME_KEY) === 'dark';

export interface NavItem {
  id: string;
  label: string;
  level: 0 | 1 | 2;
}

export const NAV_ITEMS: NavItem[] = [
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

export const SIDENAV_WIDTH = 232;

interface SideNavProps {
  theme: PaceTheme;
  activeL1: string;
  activeL2: string;
  isDark: boolean;
  onToggle: (v: string) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ theme: t, activeL1, activeL2, isDark, onToggle }) => {
  const [collapsed, setCollapsed] = React.useState<Set<string>>(
    () => new Set(NAV_ITEMS.filter(n => n.level === 1).map(n => n.id))
  );
  const [query, setQuery] = React.useState('');

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.location.hash.slice(1) !== id) {
        history.pushState(null, '', `#${id}`);
      }
    } else {
      // Target isn't on current page — jump to main design system page with hash
      window.location.href = `/design-system#${id}`;
    }
  };

  const handleLogoClick = () => {
    if (window.location.pathname === '/design-system') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/design-system';
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
      width: SIDENAV_WIDTH,
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
        onClick={handleLogoClick}
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
