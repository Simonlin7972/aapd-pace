import React from 'react';
import type { PaceTheme } from '../../data/tokens';

// Living blob — continuously morphing organic shape with drifting warm colors
const LivingBlob: React.FC<{ theme: PaceTheme; visible: boolean }> = ({ visible }) => {
  const pathRef = React.useRef<SVGPathElement>(null);
  const stopA = React.useRef<SVGStopElement>(null);
  const stopB = React.useRef<SVGStopElement>(null);
  const glowRef = React.useRef<SVGStopElement>(null);

  const palette = React.useMemo(() => ([
    { a: '#C4714A', b: '#E3A678' },
    { a: '#B8864F', b: '#D9B78A' },
    { a: '#A8734F', b: '#C4A898' },
    { a: '#9E5C44', b: '#D08C6A' },
    { a: '#BE8A5E', b: '#EABE94' },
  ]), []);

  React.useEffect(() => {
    const N = 8;
    const R = 70;
    const cx = 100, cy = 100;
    const seeds = Array.from({ length: N }, () => ({
      freq: 0.00035 + Math.random() * 0.0004,
      amp: 10 + Math.random() * 16,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;

      const pts = seeds.map((s, i) => {
        const angle = (i / N) * Math.PI * 2;
        const r = R + Math.sin(t * s.freq + s.phase) * s.amp
                    + Math.sin(t * s.freq * 1.7 + s.phase * 1.3) * (s.amp * 0.4);
        return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
      });

      let d = '';
      for (let i = 0; i < N; i++) {
        const p0 = pts[(i - 1 + N) % N];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % N];
        const p3 = pts[(i + 2) % N];
        if (i === 0) d += `M ${p1[0].toFixed(2)} ${p1[1].toFixed(2)} `;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
      }
      d += 'Z';
      pathRef.current?.setAttribute('d', d);

      const cyclePeriod = 5200;
      const raw = (t / cyclePeriod) % palette.length;
      const idx = Math.floor(raw);
      const frac = raw - idx;
      const eased = frac < 0.5 ? 2 * frac * frac : 1 - Math.pow(-2 * frac + 2, 2) / 2;
      const cur = palette[idx];
      const nxt = palette[(idx + 1) % palette.length];
      const lerp = (a: string, b: string) => {
        const ah = a.replace('#', '');
        const bh = b.replace('#', '');
        const ar = parseInt(ah.slice(0, 2), 16), ag = parseInt(ah.slice(2, 4), 16), ab = parseInt(ah.slice(4, 6), 16);
        const br = parseInt(bh.slice(0, 2), 16), bg = parseInt(bh.slice(2, 4), 16), bb = parseInt(bh.slice(4, 6), 16);
        const r2 = Math.round(ar + (br - ar) * eased);
        const g2 = Math.round(ag + (bg - ag) * eased);
        const b2 = Math.round(ab + (bb - ab) * eased);
        return `rgb(${r2},${g2},${b2})`;
      };
      const ca = lerp(cur.a, nxt.a);
      const cb = lerp(cur.b, nxt.b);
      stopA.current?.setAttribute('stop-color', ca);
      stopB.current?.setAttribute('stop-color', cb);
      glowRef.current?.setAttribute('stop-color', ca);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [palette]);

  return (
    <div style={{
      position: 'relative',
      width: 200, height: 200,
      marginBottom: 34,
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(-12deg)',
      transition: 'all 1400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}>
      <svg viewBox="0 0 200 200" width="200" height="200" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="pace-blob-grad" cx="40%" cy="38%" r="70%">
            <stop ref={stopB} offset="0%" stopColor="#E3A678" />
            <stop ref={stopA} offset="100%" stopColor="#C4714A" />
          </radialGradient>
          <radialGradient id="pace-blob-glow" cx="50%" cy="50%" r="50%">
            <stop ref={glowRef} offset="0%" stopColor="#C4714A" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#C4714A" stopOpacity="0" />
          </radialGradient>
          <filter id="pace-blob-soft">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>
        <circle cx="100" cy="100" r="160" fill="url(#pace-blob-glow)" opacity="0.85" />
        <path ref={pathRef} fill="url(#pace-blob-grad)" filter="url(#pace-blob-soft)" />
      </svg>
    </div>
  );
};

export const LaunchScreen: React.FC<{
  theme: PaceTheme;
  onDone?: () => void;
  static?: boolean;
}> = ({ theme, onDone, static: isStatic }) => {
  const tagline = '少一點監控，多一點陪伴';
  const [phase, setPhase] = React.useState(isStatic ? 4 : 0);
  const [typed, setTyped] = React.useState(isStatic ? tagline : '');

  React.useEffect(() => {
    if (isStatic) return;
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => setPhase(4), 3800);
    return () => { [t1, t2, t3, t4].forEach(clearTimeout); };
  }, [isStatic]);

  React.useEffect(() => {
    if (isStatic) return;
    if (phase < 4) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setTyped(tagline.slice(0, i));
      if (i < tagline.length) {
        timer = setTimeout(tick, 140 + Math.random() * 80);
      } else {
        timer = setTimeout(() => setPhase(5), 1600);
        timer2 = setTimeout(() => onDone?.(), 2600);
      }
    };
    timer = setTimeout(tick, 150);
    return () => { clearTimeout(timer); clearTimeout(timer2); };
  }, [phase >= 4]); // eslint-disable-line

  const bgIn = phase >= 1;
  const markIn = phase >= 2;
  const wordIn = phase >= 3;
  const fadingOut = phase >= 5;

  const launchBg = theme.bg;
  const inkColor = theme.ink;
  const softInk = theme.inkSoft;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: launchBg,
      opacity: bgIn ? (fadingOut ? 0 : 1) : 0,
      transition: fadingOut
        ? 'opacity 900ms cubic-bezier(0.32, 0.72, 0, 1)'
        : 'opacity 900ms ease',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', zIndex: 10,
      pointerEvents: fadingOut ? 'none' : 'auto',
    }}>
      <LivingBlob theme={theme} visible={markIn} />

      <div style={{
        opacity: wordIn ? 1 : 0,
        transform: wordIn ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 1200ms cubic-bezier(0.32, 0.72, 0, 1)',
        marginBottom: 18,
      }}>
        <div style={{
          fontFamily: '"Noto Serif TC", serif',
          fontSize: 56, fontWeight: 500,
          letterSpacing: '0.04em',
          color: inkColor,
          lineHeight: 1,
        }}>Pace</div>
      </div>

      <div style={{
        height: 24, minWidth: 240, textAlign: 'center',
        opacity: wordIn ? 1 : 0,
        transition: 'opacity 600ms ease',
      }}>
        <span style={{
          fontFamily: '"Noto Serif TC", serif',
          fontStyle: 'italic',
          fontSize: 16, color: softInk,
          letterSpacing: '0.02em',
        }}>{typed}</span>
        <span style={{
          display: 'inline-block',
          width: 2, height: 18, marginLeft: 3,
          verticalAlign: 'middle',
          background: softInk,
          opacity: phase === 4 ? 1 : 0,
          animation: 'paceCaret 900ms steps(2, start) infinite',
        }} />
      </div>

      <div style={{
        position: 'absolute', bottom: 40,
        opacity: wordIn && !fadingOut ? 0.5 : 0,
        transition: 'opacity 800ms ease',
      }}>
        <div style={{
          width: 28, height: 3, borderRadius: 2,
          background: softInk, opacity: 0.4,
        }} />
      </div>
    </div>
  );
};
