import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassChip3DProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/** FAQ clay chip — lift, glow, ripple click */
export default function GlassChip3D({
  children,
  active,
  onClick,
  className = '',
}: GlassChip3DProps) {
  return (
    <motion.div
      className={`clay-chip relative overflow-hidden rounded-2xl ${active ? 'is-active' : ''} ${className}`}
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
            'radial-gradient(circle at 30% 20%, rgba(255,122,0,0.18), transparent 55%)',
        }}
      />
      {children}
    </motion.div>
  );
}
