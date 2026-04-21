export const deckCSS = `
  .deck-root {
    --bg: #EFE7D8;
    --surface: #F7F1E5;
    --elevated: #FBF6EC;
    --ink: #3D342A;
    --inkSoft: #6E6456;
    --inkMuted: #9A8F7E;
    --sage: #9AA590;
    --dust: #C4A898;
    --terracotta: #A8734F;
    --amber: #8B5E3C;
    --line: rgba(61,52,42,0.09);
    --lineStrong: rgba(61,52,42,0.18);
    --serif: "Noto Serif TC", "Songti TC", serif;
    --sans: "Noto Sans TC", -apple-system, system-ui, sans-serif;
  }

  .deck-root .slide {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--sans);
    position: relative;
    overflow: hidden;
  }

  .deck-root .chrome {
    position: absolute; top: 56px; left: 96px; right: 96px;
    display: flex; justify-content: space-between; align-items: center;
    font-family: var(--sans); font-size: 24px; color: var(--inkMuted);
    font-weight: 400; letter-spacing: 0.04em;
    z-index: 2; white-space: nowrap;
  }
  .deck-root .chrome .wm { display: flex; align-items: center; gap: 14px; white-space: nowrap; }
  .deck-root .chrome .wm span, .deck-root .chrome .page { white-space: nowrap; }
  .deck-root .chrome .wm-dot {
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--terracotta);
  }
  .deck-root .chrome .page { font-variant-numeric: tabular-nums; }

  .deck-root .foot {
    position: absolute; bottom: 52px; left: 96px; right: 96px;
    display: flex; justify-content: space-between; align-items: baseline;
    font-family: var(--sans); font-size: 24px; color: var(--inkMuted);
    letter-spacing: 0.04em;
  }

  .deck-root .display {
    font-family: var(--serif); font-weight: 500;
    font-size: 108px; line-height: 1.08; letter-spacing: -0.015em;
    color: var(--ink); text-wrap: balance;
  }
  .deck-root .h1 {
    font-family: var(--serif); font-weight: 500;
    font-size: 76px; line-height: 1.1; letter-spacing: -0.01em;
    color: var(--ink); text-wrap: balance;
  }
  .deck-root .h2 {
    font-family: var(--serif); font-weight: 500;
    font-size: 52px; line-height: 1.15; color: var(--ink);
    text-wrap: balance;
  }
  .deck-root .body {
    font-family: var(--sans); font-weight: 400;
    font-size: 24px; line-height: 1.7; color: var(--inkSoft);
    text-wrap: pretty;
  }
  .deck-root .lead {
    font-family: var(--sans); font-weight: 400;
    font-size: 26px; line-height: 1.6; color: var(--inkSoft);
    text-wrap: pretty;
  }
  .deck-root .small {
    font-family: var(--sans); font-weight: 400;
    font-size: 20px; line-height: 1.6; color: var(--inkMuted);
  }
  .deck-root .kicker {
    font-family: var(--sans); font-size: 24px; font-weight: 500;
    letter-spacing: 0.04em; color: var(--terracotta);
  }
  .deck-root .eyebrow {
    font-family: var(--sans); font-size: 24px; font-weight: 500;
    letter-spacing: 0.04em; color: var(--inkMuted);
  }
  .deck-root .num {
    font-family: var(--serif); font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .deck-root .cover-a {
    display: flex; flex-direction: column;
    padding: 120px 160px;
  }
  .deck-root .cover-a .top {
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .deck-root .cover-a .quote-block {
    flex: 1; display: flex; align-items: center;
  }
  .deck-root .cover-a .big-quote {
    font-family: var(--serif); font-weight: 400;
    font-size: 132px; line-height: 1.05; letter-spacing: -0.02em;
    color: var(--ink); max-width: 1400px; text-wrap: balance;
  }
  .deck-root .cover-a .big-quote em {
    font-style: italic; font-weight: 400; color: var(--terracotta);
  }
  .deck-root .cover-a .bottom {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-top: auto;
  }
  .deck-root .dot-logo {
    display: inline-flex; align-items: center; gap: 16px;
    font-family: var(--serif); font-size: 42px; font-weight: 500;
    color: var(--ink); letter-spacing: 0.01em;
  }
  .deck-root .dot-logo .dot {
    width: 16px; height: 16px; border-radius: 50%;
    background: var(--terracotta);
    display: inline-block;
  }
  .deck-root .cover-a .meta-row {
    font-family: var(--sans); font-size: 22px; color: var(--inkMuted);
    letter-spacing: 0.04em; font-weight: 400;
  }

  .deck-root .cover-b {
    display: grid; grid-template-columns: 1fr 1fr;
    padding: 0;
  }
  .deck-root .cover-b .left {
    padding: 120px 80px 120px 160px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: var(--bg);
  }
  .deck-root .cover-b .right {
    background: var(--surface);
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .deck-root .cover-b .issue {
    font-family: var(--sans); font-size: 24px; color: var(--inkMuted);
    font-weight: 400; letter-spacing: 0.04em;
    display: grid; grid-template-columns: 1fr 1fr; gap: 28px 60px; max-width: 620px;
  }
  .deck-root .cover-b .issue div strong {
    display: block; color: var(--ink); font-weight: 500; margin-top: 8px;
    font-size: 26px; letter-spacing: 0;
  }
  .deck-root .cover-b .quote-b {
    font-family: var(--serif); font-weight: 500;
    font-size: 84px; line-height: 1.12; letter-spacing: -0.01em;
    color: var(--ink); text-wrap: balance; max-width: 720px;
  }
  .deck-root .cover-b .quote-b em { font-style: italic; color: var(--terracotta); font-weight: 400; }
  .deck-root .cover-b .lockup {
    display: flex; align-items: baseline; gap: 20px;
  }
  .deck-root .cover-b .lockup .brand {
    font-family: var(--serif); font-size: 64px; font-weight: 500;
    color: var(--ink); letter-spacing: 0.01em;
  }
  .deck-root .cover-b .lockup .rule {
    flex: 1; height: 1px; background: var(--lineStrong);
  }
  .deck-root .cover-b .lockup .meta {
    font-family: var(--sans); font-size: 24px; color: var(--inkMuted);
    font-weight: 400; letter-spacing: 0.04em; white-space: nowrap;
  }
  .deck-root .big-circle {
    width: 560px; height: 560px; border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, var(--dust), var(--terracotta));
    opacity: 0.85;
    position: relative;
  }
  .deck-root .big-circle::after {
    content: ''; position: absolute; inset: -160px;
    border: 1px solid var(--line); border-radius: 50%;
  }
  .deck-root .cover-b .mood-strip {
    position: absolute; bottom: 72px; left: 80px; right: 80px;
    display: flex; gap: 8px;
  }
  .deck-root .cover-b .mood-strip span {
    flex: 1; height: 6px; border-radius: 3px;
  }

  .deck-root .section-open {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  }
  .deck-root .section-open .left {
    padding: 160px 96px; background: var(--ink); color: var(--bg);
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .deck-root .section-open .idx {
    font-family: var(--serif); font-size: 220px; line-height: 1; color: var(--bg);
    font-weight: 400;
  }
  .deck-root .section-open .right {
    padding: 160px 96px; background: var(--bg);
    display: flex; flex-direction: column; justify-content: center;
  }
  .deck-root .section-open .zh {
    font-family: var(--serif); font-weight: 500;
    font-size: 104px; line-height: 1.1; color: var(--ink); margin: 0 0 32px;
    letter-spacing: -0.01em;
  }
  .deck-root .section-open .desc {
    font-family: var(--sans); font-size: 26px; line-height: 1.6;
    color: var(--inkSoft); max-width: 640px; text-wrap: pretty;
  }
  .deck-root .section-open .brand-mini {
    font-family: var(--sans); font-size: 24px; font-weight: 400;
    color: rgba(239,231,216,0.75);
    display: flex; align-items: center; gap: 14px;
  }
  .deck-root .section-open .brand-mini .dot {
    width: 12px; height: 12px; border-radius: 50%; background: var(--terracotta);
  }
  .deck-root .section-open .chapter-num {
    font-family: var(--sans); font-size: 24px; font-weight: 400;
    color: rgba(239,231,216,0.75); letter-spacing: 0.04em;
  }

  .deck-root .stage-content {
    position: absolute; inset: 150px 96px 130px;
    display: flex; flex-direction: column;
  }
  .deck-root .title-block { margin-bottom: 64px; }
  .deck-root .title-block .eyebrow { display: block; margin-bottom: 16px; }

  .deck-root .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .deck-root .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
  .deck-root .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }

  .deck-root .card {
    background: var(--surface); border-radius: 32px; padding: 44px;
    border: 1px solid var(--line);
    display: flex; flex-direction: column;
  }
  .deck-root .card .n {
    font-family: var(--sans); font-size: 24px; color: var(--terracotta);
    font-weight: 500; letter-spacing: 0.04em; margin-bottom: 24px;
  }
  .deck-root .card h4 {
    font-family: var(--serif); font-weight: 500; font-size: 34px;
    color: var(--ink); margin: 0 0 16px; letter-spacing: -0.005em;
  }
  .deck-root .card .card-body { font-family: var(--sans); font-size: 24px; line-height: 1.65; color: var(--inkSoft); }

  .deck-root .swatch { width: 40px; height: 40px; border-radius: 10px; margin-bottom: 18px; }

  .deck-root .stat { display: flex; flex-direction: column; gap: 10px; }
  .deck-root .stat .big { font-family: var(--serif); font-weight: 500; font-size: 96px; color: var(--terracotta); line-height: 1; letter-spacing: -0.02em; }
  .deck-root .stat .label { font-family: var(--sans); font-size: 24px; color: var(--inkSoft); max-width: 380px; text-wrap: pretty; line-height: 1.55; }

  .deck-root .pull-quote {
    font-family: var(--serif); font-weight: 400; font-style: italic;
    font-size: 44px; line-height: 1.35; color: var(--ink);
    text-wrap: balance;
    position: relative;
  }
  .deck-root .pull-quote::before {
    content: '"'; position: absolute; left: -48px; top: -30px;
    font-family: var(--serif); font-size: 180px; color: var(--terracotta);
    opacity: 0.35; line-height: 1;
  }

  .deck-root .phone {
    width: 360px; height: 740px; border-radius: 56px;
    background: var(--bg);
    box-shadow: 0 60px 120px rgba(61,52,42,0.18), 0 0 0 1px rgba(61,52,42,0.12);
    position: relative; overflow: hidden;
    flex-shrink: 0;
    border: 10px solid #2a241d;
  }
  .deck-root .phone .island {
    position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
    width: 110px; height: 32px; border-radius: 22px; background: #0a0805; z-index: 10;
  }
  .deck-root .phone .pane {
    position: absolute; inset: 0; padding: 56px 22px 28px;
    display: flex; flex-direction: column;
  }
  .deck-root .phone .statusbar {
    display: flex; justify-content: space-between; font-family: var(--sans);
    font-weight: 500; font-size: 14px; color: var(--ink); padding: 0 4px 14px;
  }

  .deck-root .mini-card {
    background: var(--surface); border-radius: 22px; padding: 16px;
    border: 1px solid var(--line);
  }

  .deck-root .kv-table { width: 100%; border-collapse: collapse; }
  .deck-root .kv-table td { padding: 22px 0; border-bottom: 1px solid var(--line); vertical-align: top; }
  .deck-root .kv-table td:first-child { width: 280px; font-family: var(--sans); font-size: 24px; font-weight: 500; letter-spacing: 0.02em; color: var(--inkMuted); padding-right: 32px; padding-top: 24px; }
  .deck-root .kv-table td.v { font-family: var(--sans); font-size: 26px; color: var(--ink); line-height: 1.6; }
  .deck-root .kv-table tr:last-child td { border-bottom: 0; }

  .deck-root .list-row {
    display: grid; grid-template-columns: 100px 280px 1fr; gap: 32px;
    padding: 28px 0; border-bottom: 1px solid var(--line);
    align-items: center;
  }
  .deck-root .list-row:last-child { border-bottom: 0; }
  .deck-root .list-row .idx { font-family: var(--serif); font-size: 28px; color: var(--terracotta); font-weight: 500; }
  .deck-root .list-row .nm { font-family: var(--serif); font-size: 30px; color: var(--ink); font-weight: 500; }
  .deck-root .list-row .desc { font-family: var(--sans); font-size: 24px; color: var(--inkSoft); line-height: 1.65; padding-top: 4px; }

  .deck-root .persona {
    background: var(--surface); border-radius: 28px; padding: 36px;
    border: 1px solid var(--line);
    display: flex; flex-direction: column; gap: 20px;
    min-height: 600px;
  }
  .deck-root .persona .portrait {
    width: 72px; height: 72px; border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, var(--dust), var(--terracotta));
  }
  .deck-root .persona h4 { font-family: var(--serif); font-size: 32px; font-weight: 500; color: var(--ink); margin: 0; }
  .deck-root .persona .meta { font-family: var(--sans); font-size: 24px; font-weight: 500; color: var(--inkMuted); letter-spacing: 0.04em; }
  .deck-root .persona .role { font-family: var(--serif); font-style: italic; font-size: 26px; color: var(--terracotta); }
  .deck-root .persona .line { height: 1px; background: var(--line); margin: 8px 0; }
  .deck-root .persona .field { display: grid; grid-template-columns: 130px 1fr; gap: 18px; font-size: 24px; line-height: 1.6; }
  .deck-root .persona .field .k { font-family: var(--sans); font-size: 24px; font-weight: 500; letter-spacing: 0.04em; color: var(--inkMuted); padding-top: 3px; }
  .deck-root .persona .field .v { color: var(--inkSoft); font-size: 24px; line-height: 1.6; }

  .deck-root .speech-row {
    display: grid; grid-template-columns: 260px 1fr 1fr; gap: 36px;
    padding: 28px 0; border-bottom: 1px solid var(--line);
    align-items: start;
  }
  .deck-root .speech-row:last-child { border-bottom: 0; }
  .deck-root .speech-row .ctx { font-family: var(--sans); font-size: 24px; font-weight: 500; color: var(--inkMuted); padding-top: 14px; }
  .deck-root .bubble { padding: 22px 26px; border-radius: 20px; font-family: var(--sans); font-size: 24px; line-height: 1.55; }
  .deck-root .bubble.no { background: transparent; border: 1px dashed var(--lineStrong); color: var(--inkMuted); }
  .deck-root .bubble.yes { background: var(--elevated); color: var(--ink); border: 1px solid var(--line); }
  .deck-root .bubble .label { font-family: var(--sans); font-size: 20px; font-weight: 500; letter-spacing: 0.04em; display: block; margin-bottom: 8px; }
  .deck-root .bubble.no .label { color: var(--inkMuted); }
  .deck-root .bubble.yes .label { color: var(--terracotta); }

  .deck-root .swatch-big {
    height: 96px; border-radius: 16px; padding: 18px;
    display: flex; flex-direction: column; justify-content: space-between;
    font-family: var(--sans); font-size: 20px; font-weight: 500; color: var(--ink);
  }
  .deck-root .swatch-big em { font-family: var(--sans); font-style: normal; font-size: 18px; color: var(--inkMuted); font-weight: 400; }

  .deck-root .flow-step { display: grid; grid-template-columns: 52px 1fr; gap: 22px; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--line); }
  .deck-root .flow-step:last-child { border-bottom: 0; padding-bottom: 0; }
  .deck-root .flow-step:first-child { padding-top: 0; }
  .deck-root .sn { width: 44px; height: 44px; border-radius: 50%; background: var(--bg); font-family: var(--serif); font-size: 24px; display: flex; align-items: center; justify-content: center; color: var(--inkSoft); font-weight: 500; }
  .deck-root .st { font-family: var(--serif); font-size: 24px; color: var(--ink); font-weight: 500; margin-bottom: 4px; }
  .deck-root .sd { font-family: var(--sans); font-size: 20px; color: var(--inkSoft); }

  .deck-root .toc-row { font-family: var(--serif); font-size: 34px; color: var(--ink); padding: 20px 0; border-bottom: 1px solid var(--line); display: flex; align-items: baseline; }

  @media print { .deck-root { background: white; } }
`;
