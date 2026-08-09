import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'link' | 'image' | 'drag';

/**
 * Custom cursor with interactive states for links, images, and drag surfaces.
 * Visual ring/dot only — no text labels on hover.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const resolveMode = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) return 'default';
      const el = target.closest(
        '[data-cursor], a, button, [role="button"], input, textarea, select, label, img, video, canvas, .swiper, [draggable="true"]'
      );
      if (!el) return 'default';

      const explicit = el.getAttribute('data-cursor') as CursorMode | null;
      if (explicit === 'link' || explicit === 'image' || explicit === 'drag') return explicit;

      if (el.matches('.swiper, [draggable="true"]') || el.closest('[data-cursor="drag"]')) {
        return 'drag';
      }
      if (el.matches('img, video, canvas') || el.closest('[data-cursor="image"]')) {
        return 'image';
      }
      if (
        el.matches('a, button, [role="button"], input, textarea, select, label') ||
        el.closest('[data-cursor="link"]')
      ) {
        return 'link';
      }
      return 'default';
    };

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setMode(resolveMode(e.target));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringScale = pressed ? 0.72 : mode === 'default' ? 1 : mode === 'drag' ? 1.45 : 1.28;
  const dotScale = pressed ? 0.55 : mode === 'link' ? 0.4 : 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      <motion.div
        className="absolute top-0 left-0 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: mode === 'image' ? 52 : 36,
          height: mode === 'image' ? 52 : 36,
          borderColor:
            mode === 'drag'
              ? 'rgba(255,122,0,0.55)'
              : mode === 'image'
                ? 'rgba(253,186,116,0.55)'
                : 'rgba(255,122,0,0.40)',
          background:
            mode === 'default'
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(15,23,42,0.28)',
          backdropFilter: 'blur(6px)',
          boxShadow:
            mode === 'drag'
              ? '0 0 28px rgba(255,122,0,0.28)'
              : '0 0 24px rgba(255,122,0,0.22)',
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale: ringScale }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      />

      <motion.div
        className="absolute top-0 left-0 h-2 w-2 rounded-full"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          background:
            mode === 'drag'
              ? 'rgb(255,122,0)'
              : 'linear-gradient(135deg, #FF7A00, #FDBA74)',
          boxShadow: '0 0 12px rgba(255,122,0,0.50)',
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale: dotScale }}
        transition={{ type: 'spring', stiffness: 480, damping: 30 }}
      />
    </div>
  );
}
