import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/** Compact sun/moon control for the floating navbar. */
export default function ThemeToggle() {
  const { theme, toggleTheme, isLight } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      data-cursor="link"
      className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors"
      style={{
        background: isLight
          ? 'linear-gradient(145deg, rgba(229,119,52,0.18) 0%, rgba(1,117,122,0.14) 100%)'
          : 'linear-gradient(145deg, rgba(255,122,0,0.2) 0%, rgba(168,85,247,0.16) 100%)',
        boxShadow: isLight
          ? '0 0 0 1px rgba(229,119,52,0.35), 0 8px 18px rgba(62,41,34,0.12)'
          : '0 0 0 1px rgba(255,122,0,0.35), 0 8px 18px rgba(0,0,0,0.35)',
        color: isLight ? '#E57734' : '#FFB26B',
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -40, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="flex"
      >
        {isLight ? <Moon size={18} strokeWidth={2.2} /> : <Sun size={18} strokeWidth={2.2} />}
      </motion.span>
    </motion.button>
  );
}
