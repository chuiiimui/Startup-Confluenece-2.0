import React, { useEffect, useState } from 'react';

export interface GridPatternProps {
  className?: string;
  parallax?: boolean;
}

const GridPattern: React.FC<GridPatternProps> = ({ className = '', parallax = false }) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (!parallax) return;
    
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.15); // Subtle parallax
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: 'var(--grid-opacity)' }}
    >
      <div 
        className="w-full h-[150%] absolute top-[-25%] left-0"
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 17 20 L 23 20 M 20 17 L 20 23"
                fill="none"
                stroke="var(--grid-line)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  );
};

export default GridPattern;
