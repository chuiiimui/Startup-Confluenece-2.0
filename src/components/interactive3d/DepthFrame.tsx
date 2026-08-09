import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePerfMode } from '../../hooks/usePerfMode';

interface DepthFrameProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  'data-cursor'?: string;
}

/** Gallery depth frame — 3D tilt on desktop; plain press target on mobile. */
export default function DepthFrame({
  children,
  className = '',
  style,
  onClick,
  'data-cursor': dataCursor,
}: DepthFrameProps) {
  const { enableTilt } = usePerfMode();
  const ref = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 18,
  });

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 350);
    onClick?.();
  };

  if (!enableTilt) {
    return (
      <div
        className={`relative ${className}`}
        style={{
          ...style,
          boxShadow: pressed
            ? '0 0 40px rgba(255,122,0,0.45)'
            : '0 12px 28px rgba(0,0,0,0.22)',
        }}
        data-cursor={dataCursor}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative transform-gpu ${className}`}
      data-cursor={dataCursor}
      style={{
        ...style,
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
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
      onClick={handleClick}
      whileHover={{ y: -8, scale: 1.02 }}
      animate={{
        boxShadow: pressed
          ? '0 0 40px rgba(255,122,0,0.45)'
          : '0 20px 50px rgba(0,0,0,0.35)',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
      <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-white/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      {children}
    </motion.div>
  );
}
