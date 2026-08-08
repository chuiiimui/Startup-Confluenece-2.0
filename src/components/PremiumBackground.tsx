import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePerfMode } from '../hooks/usePerfMode';

/**
 * Site-wide premium gradient background.
 * On low-end / Android / mobile: static CSS orbs only (no scroll springs or blur panels).
 */
export default function PremiumBackground() {
  const { enableParallax, enableHeavyBlur, isMobile } = usePerfMode();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.4,
  });

  const y1 = useTransform(smoothProgress, [0, 1], ['0%', '35%']);
  const y2 = useTransform(smoothProgress, [0, 1], ['0%', '-40%']);
  const y3 = useTransform(smoothProgress, [0, 1], ['0%', '25%']);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 18]);
  const rotateNeg = useTransform(smoothProgress, [0, 1], [0, -24]);
  const rotatePanel = useTransform(smoothProgress, [0, 1], [8, -8]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.08, 1.15]);
  const sheenX = useTransform(smoothProgress, [0, 1], ['-20%', '120%']);
  const panelY1 = useTransform(smoothProgress, [0, 1], [0, 120]);
  const panelY2 = useTransform(smoothProgress, [0, 1], [0, -90]);

  useEffect(() => {
    if (!enableParallax) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return;

    const onMove = (e: MouseEvent) => {
      setIsHovering(true);
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    const onLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enableParallax]);

  /* Lightweight static backdrop for phones / Android / low-end */
  if (!enableParallax) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0" style={{ background: 'var(--bg-base-gradient)' }} />
        <div className="absolute inset-0" style={{ background: 'var(--bg-atmosphere)' }} />
        <div
          className="absolute -left-[20%] top-[-8%] h-[45vmax] w-[45vmax] rounded-full opacity-80"
          style={{ background: 'var(--orb-1)' }}
        />
        <div
          className="absolute -right-[15%] top-[20%] h-[40vmax] w-[40vmax] rounded-full opacity-75"
          style={{ background: 'var(--orb-2)' }}
        />
        {!isMobile && (
          <div
            className="absolute bottom-[-15%] left-[30%] h-[40vmax] w-[40vmax] rounded-full opacity-70"
            style={{ background: 'var(--orb-3)' }}
          />
        )}
        <div className="absolute inset-0" style={{ background: 'var(--bg-vignette)' }} />
      </div>
    );
  }

  const hoverX = (mouse.x - 0.5) * (isHovering ? 48 : 0);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-500"
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: 'var(--bg-base-gradient)' }} />

      <div className="absolute inset-0" style={{ background: 'var(--bg-atmosphere)' }} />

      <motion.div
        className="absolute -left-[15%] top-[-10%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          y: y1,
          scale,
          x: hoverX * 0.6,
          background: 'var(--orb-1)',
          filter: enableHeavyBlur ? 'blur(40px)' : undefined,
        }}
        animate={{ opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -right-[10%] top-[15%] h-[50vmax] w-[50vmax] rounded-full"
        style={{
          y: y2,
          x: -hoverX * 0.5,
          background: 'var(--orb-2)',
          filter: enableHeavyBlur ? 'blur(48px)' : undefined,
        }}
        animate={{ opacity: [0.65, 0.9, 0.65] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="absolute bottom-[-20%] left-[25%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          y: y3,
          x: hoverX * 0.35,
          background: 'var(--orb-3)',
          filter: enableHeavyBlur ? 'blur(52px)' : undefined,
        }}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="absolute right-[20%] bottom-[10%] h-[30vmax] w-[30vmax] rounded-full"
        style={{
          y: y2,
          background: 'var(--orb-4)',
          filter: enableHeavyBlur ? 'blur(36px)' : undefined,
        }}
      />

      {enableHeavyBlur && (
        <>
          <motion.div
            className="absolute left-[8%] top-[22%] h-40 w-64 rounded-[28px]"
            style={{
              rotate,
              x: hoverX * 0.25,
              y: panelY1,
              background: 'var(--panel-glass)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(18px)',
              boxShadow: 'inset 0 1px 0 var(--glass-highlight), var(--shadow-card)',
            }}
          />

          <motion.div
            className="absolute right-[12%] top-[48%] h-52 w-52 rounded-full"
            style={{
              rotate: rotateNeg,
              x: -hoverX * 0.3,
              y: panelY2,
              background: 'var(--panel-glass)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(20px)',
              boxShadow: 'inset 0 1px 0 var(--glass-highlight), var(--shadow-card)',
            }}
          />

          <motion.div
            className="absolute left-[55%] top-[70%] h-28 w-72 rounded-[24px]"
            style={{
              rotate: rotatePanel,
              x: hoverX * 0.2,
              background: 'var(--panel-glass)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(16px)',
              boxShadow: 'inset 0 1px 0 var(--glass-highlight)',
            }}
          />
        </>
      )}

      <motion.div
        className="absolute inset-y-0 w-[28%] skew-x-[-18deg]"
        style={{
          x: sheenX,
          background: 'var(--sheen)',
          opacity: 0.5,
        }}
      />

      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full"
        animate={{
          left: `${mouse.x * 100}%`,
          top: `${mouse.y * 100}%`,
          opacity: isHovering ? 0.45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.35 }}
        style={{
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, var(--cursor-glow) 0%, transparent 70%)',
          filter: enableHeavyBlur ? 'blur(20px)' : undefined,
        }}
      />

      {!isMobile && (
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      )}

      <div className="absolute inset-0" style={{ background: 'var(--bg-vignette)' }} />
    </div>
  );
}
