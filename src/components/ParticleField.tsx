import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export interface ParticleFieldProps {
  count?: number;
  className?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ count = 50, className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: isDark
              ? `rgba(255, 255, 255, 0.2)`
              : `rgba(11, 42, 107, 0.15)`,
          }}
          animate={{
            y: ['-20px', '20px', '-20px'],
            opacity: [0.1, isDark ? 0.4 : 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
