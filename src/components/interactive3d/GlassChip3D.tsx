import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassChip3DProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/** FAQ glass chip — lift, glow, ripple click */
export default function GlassChip3D({
  children,
  active,
  onClick,
  className = '',
}: GlassChip3DProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border ${className}`}
      style={{
        background: active
          ? 'linear-gradient(145deg, rgba(255,122,0,0.16), rgba(255,255,255,0.06))'
          : 'var(--surface)',
        borderColor: active ? 'rgba(255,122,0,0.5)' : 'var(--border)',
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(167,139,250,0.2), transparent 55%)',
        }}
      />
      {children}
    </motion.div>
  );
}
