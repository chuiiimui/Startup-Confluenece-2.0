import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Site-wide dark premium purple–blue gradient background.
 */
export default function PremiumBackground() {
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
  }, []);

  const hoverX = (mouse.x - 0.5) * (isHovering ? 48 : 0);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Deep navy–indigo base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 70% at 12% 8%, #4C1D95 0%, transparent 48%), radial-gradient(90% 60% at 88% 18%, #1E3A8A 0%, transparent 50%), radial-gradient(80% 70% at 50% 100%, #312E81 0%, transparent 55%), linear-gradient(165deg, #070B1A 0%, #0B1229 32%, #111827 68%, #0A0F1E 100%)',
        }}
      />

      {/* Soft atmospheric lift */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 50% at 50% 20%, rgba(99,102,241,0.18) 0%, transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(2,6,23,0.55) 100%)',
        }}
      />

      <motion.div
        className="absolute -left-[15%] top-[-10%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          y: y1,
          scale,
          x: hoverX * 0.6,
          background:
            'radial-gradient(circle, rgba(139,92,246,0.38) 0%, rgba(67,56,202,0.16) 42%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -right-[10%] top-[15%] h-[50vmax] w-[50vmax] rounded-full"
        style={{
          y: y2,
          x: -hoverX * 0.5,
          background:
            'radial-gradient(circle, rgba(37,99,235,0.36) 0%, rgba(30,64,175,0.16) 45%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        animate={{ opacity: [0.65, 0.9, 0.65] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="absolute bottom-[-20%] left-[25%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          y: y3,
          x: hoverX * 0.35,
          background:
            'radial-gradient(circle, rgba(168,85,247,0.28) 0%, rgba(59,130,246,0.14) 45%, transparent 70%)',
          filter: 'blur(52px)',
        }}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="absolute right-[20%] bottom-[10%] h-[30vmax] w-[30vmax] rounded-full"
        style={{
          y: y2,
          background:
            'radial-gradient(circle, rgba(255,122,0,0.12) 0%, transparent 65%)',
          filter: 'blur(36px)',
        }}
      />

      {/* Glass panels — darker translucent */}
      <motion.div
        className="absolute left-[8%] top-[22%] h-40 w-64 rounded-[28px] border border-white/10"
        style={{
          rotate,
          x: hoverX * 0.25,
          y: panelY1,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 55%, rgba(139,92,246,0.10) 100%)',
          backdropFilter: 'blur(18px)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.18), 0 20px 60px rgba(0,0,0,0.35)',
        }}
      />

      <motion.div
        className="absolute right-[12%] top-[48%] h-52 w-52 rounded-full border border-white/10"
        style={{
          rotate: rotateNeg,
          x: -hoverX * 0.3,
          y: panelY2,
          background:
            'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(59,130,246,0.08) 50%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.15), 0 24px 70px rgba(0,0,0,0.35)',
        }}
      />

      <motion.div
        className="absolute left-[55%] top-[70%] h-28 w-72 rounded-[24px] border border-white/10"
        style={{
          rotate: rotatePanel,
          x: hoverX * 0.2,
          background:
            'linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(129,140,248,0.10) 100%)',
          backdropFilter: 'blur(16px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      />

      <motion.div
        className="absolute inset-y-0 w-[28%] skew-x-[-18deg]"
        style={{
          x: sheenX,
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
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
            'radial-gradient(circle, rgba(167,139,250,0.22) 0%, rgba(96,165,250,0.10) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(2,6,23,0.55) 100%)',
        }}
      />
    </div>
  );
}
