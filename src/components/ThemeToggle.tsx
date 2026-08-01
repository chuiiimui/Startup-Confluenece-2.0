import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, setToggleRef } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setToggleRef(containerRef.current);
    }
  }, [setToggleRef]);

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label="Theme selection"
      className="relative flex items-center h-[40px] rounded-full p-[3px] theme-toggle-container"
      style={{
        background: 'var(--toggle-bg)',
        border: '1px solid var(--toggle-border)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
      }}
    >
      {/* Light option */}
      <button
        role="radio"
        aria-checked={!isDark}
        aria-label="Light theme"
        onClick={() => setTheme('light')}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            setTheme('dark');
          }
        }}
        tabIndex={!isDark ? 0 : -1}
        className="relative z-10 flex items-center gap-1.5 px-4 h-[34px] rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer select-none"
        style={{
          color: !isDark ? 'var(--toggle-active-text)' : 'var(--toggle-inactive-text)',
        }}
      >
        <span className="text-base">☀️</span>
        <span className="hidden sm:inline">Light</span>
      </button>

      {/* Dark option */}
      <button
        role="radio"
        aria-checked={isDark}
        aria-label="Dark theme"
        onClick={() => setTheme('dark')}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            setTheme('light');
          }
        }}
        tabIndex={isDark ? 0 : -1}
        className="relative z-10 flex items-center gap-1.5 px-4 h-[34px] rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer select-none"
        style={{
          color: isDark ? 'var(--toggle-active-text)' : 'var(--toggle-inactive-text)',
        }}
      >
        <span className="text-base">🌙</span>
        <span className="hidden sm:inline">Dark</span>
      </button>

      {/* Sliding indicator thumb */}
      <motion.div
        layoutId="theme-toggle-thumb"
        className="absolute top-[3px] h-[34px] rounded-full"
        style={{
          background: 'var(--toggle-thumb-bg)',
          boxShadow: 'var(--toggle-thumb-shadow)',
        }}
        initial={false}
        animate={{
          left: isDark ? 'calc(50%)' : '3px',
          width: isDark ? 'calc(50% - 3px)' : 'calc(50% - 3px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 0.8,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      />
    </div>
  );
};

export default ThemeToggle;
