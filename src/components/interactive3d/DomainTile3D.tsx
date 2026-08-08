import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePerfMode } from '../../hooks/usePerfMode';

interface DomainTile3DProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

/** Expo domain chip with magnetic 3D tilt (desktop high-end only). */
export default function DomainTile3D({
  children,
  className = '',
  active,
  onClick,
}: DomainTile3DProps) {
  const { enableTilt } = usePerfMode();
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 16 });

  if (!enableTilt) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative shrink-0 snap-center ${className}`}
        style={{
          boxShadow: active
            ? '0 0 28px rgba(255,122,0,0.35)'
            : '0 8px 24px rgba(0,0,0,0.25)',
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`relative shrink-0 snap-center transform-gpu ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        boxShadow: active
          ? '0 0 28px rgba(255,122,0,0.35)'
          : '0 8px 24px rgba(0,0,0,0.25)',
      }}
    >
      {children}
    </motion.button>
  );
}
