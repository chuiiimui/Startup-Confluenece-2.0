import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type TrailDot = { id: number; x: number; y: number };

/**
 * Soft Apple-style cursor trail + glow ring.
 */
export default function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const [dots, setDots] = useState<TrailDot[]>([]);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.35 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);

    let id = 0;
    let last = 0;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const now = performance.now();
      if (now - last < 28) return;
      last = now;
      const next: TrailDot = { id: id++, x: e.clientX, y: e.clientY };
      setDots((prev) => [...prev.slice(-10), next]);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => {
      setDots((prev) => prev.slice(1));
    }, 60);
    return () => clearInterval(t);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      <AnimatePresence>
        {dots.map((d, i) => (
          <motion.div
            key={d.id}
            className="absolute h-2.5 w-2.5 rounded-full"
            style={{
              left: d.x,
              top: d.y,
              background:
                'radial-gradient(circle, rgba(139,92,246,0.55), rgba(59,130,246,0.15))',
              boxShadow: '0 0 12px rgba(124,58,237,0.35)',
            }}
            initial={{ opacity: 0.7, scale: 1, x: -5, y: -5 }}
            animate={{ opacity: 0.15 + i * 0.04, scale: 0.4 + i * 0.05 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute h-8 w-8 rounded-full border border-violet-400/40"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 24px rgba(139,92,246,0.25)',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(4px)',
        }}
      />
    </div>
  );
}
