import React from 'react';

interface StrokeProps {
  size?: number;
  width?: number;
  children: React.ReactNode;
}

const Stroke: React.FC<StrokeProps> = ({ children, size = 24, width = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const Icons = {
  Sleep: (p?: { size?: number }) => (
    <Stroke {...p}>
      <path d="M19 13.5c-.3 3.4-3.2 6.1-6.7 6.1-3.7 0-6.7-3-6.7-6.7 0-3.3 2.4-6.1 5.6-6.6-.8 1-1.2 2.3-1.2 3.7 0 3.3 2.7 6 6 6 1.1 0 2.1-.2 3-.5z"/>
    </Stroke>
  ),
  Move: (p?: { size?: number }) => (
    <Stroke {...p}>
      <path d="M6 18c3-1 5-3 6-6s3-5 6-6"/>
      <path d="M8 18c4-.5 8-4 9-8"/>
      <circle cx="7" cy="7" r="1.5"/>
    </Stroke>
  ),
  Food: (p?: { size?: number }) => (
    <Stroke {...p}>
      <path d="M4 11h16c0 4.5-3.6 8-8 8s-8-3.5-8-8z"/>
      <path d="M9 8c.5-1.5 1.5-2.5 3-2.5s2.5 1 3 2.5"/>
    </Stroke>
  ),
  Mood: (p?: { size?: number }) => (
    <Stroke {...p}>
      <path d="M12 4c3 4 5 6.5 5 9.5 0 3-2.3 5.5-5 5.5s-5-2.5-5-5.5C7 10.5 9 8 12 4z"/>
    </Stroke>
  ),
  Home: (p?: { size?: number }) => (
    <Stroke {...p}>
      <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-8z"/>
    </Stroke>
  ),
  Insight: (p?: { size?: number }) => (
    <Stroke {...p}>
      <path d="M4 18c2-3 4-5 6-5s3 3 5 3 3-3 5-6"/>
      <circle cx="4" cy="18" r="0.8" fill="currentColor"/>
    </Stroke>
  ),
  Me: (p?: { size?: number }) => (
    <Stroke {...p}>
      <circle cx="12" cy="9" r="3.5"/>
      <path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5"/>
    </Stroke>
  ),
  Plus: (p?: { size?: number }) => (
    <Stroke {...p} width={2}>
      <path d="M12 5v14M5 12h14"/>
    </Stroke>
  ),
  ChevronR: (p?: { size?: number }) => (
    <Stroke {...p} width={2}>
      <path d="M9 6l6 6-6 6"/>
    </Stroke>
  ),
  Close: (p?: { size?: number }) => (
    <Stroke {...p} width={2}>
      <path d="M6 6l12 12M18 6L6 18"/>
    </Stroke>
  ),
  ChevronL: (p?: { size?: number }) => (
    <Stroke {...p} width={2}>
      <path d="M15 6l-6 6 6 6"/>
    </Stroke>
  ),
  Check: (p?: { size?: number }) => (
    <Stroke {...p} width={2}>
      <path d="M5 12l5 5 9-11"/>
    </Stroke>
  ),
  Spark: (p?: { size?: number }) => (
    <Stroke {...p}>
      <path d="M12 4c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5z"/>
    </Stroke>
  ),
  Clock: (p?: { size?: number }) => (
    <Stroke {...p}>
      <circle cx="12" cy="12" r="8"/>
      <path d="M12 7v5l3 2"/>
    </Stroke>
  ),
  Leaf: (p?: { size?: number }) => (
    <Stroke {...p}>
      <path d="M5 19c6-1 12-7 14-14-6 1-12 7-14 14z"/>
      <path d="M5 19c3-3 7-7 9-9"/>
    </Stroke>
  ),
};
