import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeTransition: React.FC = () => {
  const { isTransitioning, rippleOrigin, theme } = useTheme();

  // Calculate the max radius needed to cover the entire screen from the ripple origin
  const maxRadius = Math.ceil(
    Math.sqrt(
      Math.max(rippleOrigin.x, window.innerWidth - rippleOrigin.x) ** 2 +
      Math.max(rippleOrigin.y, window.innerHeight - rippleOrigin.y) ** 2
    )
  );

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="theme-transition-ripple"
          className="fixed inset-0 z-[99999] pointer-events-none"
          style={{
            backgroundColor: theme === 'dark' ? '#050505' : '#F7F9FC',
          }}
          initial={{
            clipPath: `circle(0px at ${rippleOrigin.x}px ${rippleOrigin.y}px)`,
            opacity: 1,
          }}
          animate={{
            clipPath: `circle(${maxRadius * 1.5}px at ${rippleOrigin.x}px ${rippleOrigin.y}px)`,
            opacity: [1, 1, 0],
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            clipPath: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 0.8,
              times: [0, 0.7, 1],
              ease: 'easeOut',
            },
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default ThemeTransition;
