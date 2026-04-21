import React from 'react';

// Animated enter wrapper — skips animation on revisited screens
export const AnimatedEnter: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  skip?: boolean;
}> = ({ children, delay = 0, y = 10, skip }) => {
  const [on, setOn] = React.useState(skip || false);
  React.useEffect(() => {
    if (skip) return;
    const t = setTimeout(() => setOn(true), delay + 20);
    return () => clearTimeout(t);
  }, [delay, skip]);
  return (
    <div style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${y}px)`,
      transition: skip ? 'none' : 'all 420ms cubic-bezier(0.32,0.72,0,1)',
    }}>{children}</div>
  );
};
