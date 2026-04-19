import React from 'react';

// Horizontal page slider — keeps all pages mounted and slides between them
export const PageSlider: React.FC<{
  activeIndex: number;
  children: React.ReactNode[];
}> = ({ activeIndex, children }) => {
  const count = children.length;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        width: `${count * 100}%`,
        height: '100%',
        transform: `translateX(-${activeIndex * (100 / count)}%)`,
        transition: 'transform 400ms cubic-bezier(0.32,0.72,0,1)',
      }}>
        {React.Children.map(children, (child, i) => (
          <div key={i} style={{ width: `${100 / count}%`, height: '100%', position: 'relative', flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
