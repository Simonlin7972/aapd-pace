import React from 'react';
import { THEMES, FONTS, type PaceTheme } from '../../data/tokens';
import { PACE_I18N } from '../../data/i18n';
import { PaceSerif, PaceSans } from '../ui/foundations/Text';
import { SideNav, SIDENAV_WIDTH, DS_THEME_KEY, readDarkPref } from './SideNav';
import { DocThemeProvider } from './doc-helpers';

function buildTheme(dark = false): PaceTheme {
  const base = dark ? THEMES.oatDark : THEMES.oat;
  return {
    ...base,
    radius: 30,
    lang: 'zh-TW',
    L: PACE_I18N['zh-TW'],
    profileVariant: 'classic',
  } as PaceTheme;
}

export const DocPage: React.FC<{
  activeL1: string;
  activeL2: string;
  title: string;
  description: string;
  children: (theme: PaceTheme) => React.ReactNode;
}> = ({ activeL1, activeL2, title, description, children }) => {
  const [isDark, setIsDark] = React.useState<boolean>(() => readDarkPref());
  const theme = buildTheme(isDark);

  const handleThemeToggle = (v: string) => {
    const dark = v === 'dark';
    setIsDark(dark);
    localStorage.setItem(DS_THEME_KEY, dark ? 'dark' : 'light');
  };

  const pageBg = isDark ? '#1F1A14' : '#E8DFCC';
  const navBg = isDark ? 'rgba(42,36,29,0.92)' : 'rgba(239,231,216,0.92)';

  return (
    <DocThemeProvider value={theme}>
      <div style={{ minHeight: '100vh', background: pageBg, fontFamily: FONTS.sans, color: theme.ink }}>
        <SideNav
          theme={theme}
          activeL1={activeL1}
          activeL2={activeL2}
          isDark={isDark}
          onToggle={handleThemeToggle}
        />

        <div style={{ marginLeft: SIDENAV_WIDTH }}>
          {/* Sticky top nav */}
          <div
            style={{
              padding: '20px',
              borderBottom: `1px solid ${theme.line}`,
              background: navBg,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            <a
              href={`/design-system#${activeL2}`}
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
                {title}
              </PaceSerif>
              <PaceSans size={17} color={theme.inkSoft} style={{ lineHeight: 1.65, maxWidth: 760 }}>
                {description}
              </PaceSans>
            </div>
            {children(theme)}
          </div>
        </div>
      </div>
    </DocThemeProvider>
  );
};
