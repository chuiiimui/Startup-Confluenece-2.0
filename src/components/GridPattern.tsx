import React from 'react';

export interface GridPatternProps {
  className?: string;
}

const GridPattern: React.FC<GridPatternProps> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity: 'var(--grid-opacity)' }}
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
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--grid-line)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
};

export default GridPattern;
