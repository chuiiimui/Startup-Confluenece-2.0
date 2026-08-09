import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { getLenisInstance } from '../lib/utils';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  height?: string;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Smoothstep — soft ease in/out for the pinned progress */
function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

/**
 * Apple-style pinned horizontal gallery driven by vertical scroll.
 * Uses eased progress + light lerp for a silkier track than a spring.
 */
export default function HorizontalScroll({
  children,
  className = '',
  height = '300vh',
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef(0);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const [travel, setTravel] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.max(0, track.scrollWidth - window.innerWidth + 24);
      travelRef.current = next;
      setTravel(next);
    };

    measure();
    // Remeasure after layout settles
    const t = window.setTimeout(measure, 80);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [children]);

  useEffect(() => {
    const section = containerRef.current;
    let active = false;
    let raf = 0;

    const readProgress = () => {
      const el = containerRef.current;
      const dist = travelRef.current;
      if (!el || dist <= 0) {
        targetXRef.current = 0;
        return;
      }

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        targetXRef.current = 0;
        return;
      }

      const raw = clamp(-rect.top / scrollable, 0, 1);
      const eased = smoothstep(raw);
      targetXRef.current = -eased * dist;
    };

    const tick = () => {
      if (!active) return;
      readProgress();
      const lerp = 0.14;
      currentXRef.current += (targetXRef.current - currentXRef.current) * lerp;
      if (Math.abs(targetXRef.current - currentXRef.current) < 0.15) {
        currentXRef.current = targetXRef.current;
      }
      x.set(currentXRef.current);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (active) return;
      active = true;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      active = false;
      cancelAnimationFrame(raf);
      // Settle to final target when leaving
      readProgress();
      currentXRef.current = targetXRef.current;
      x.set(currentXRef.current);
    };

    const onScroll = () => {
      if (active) readProgress();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const lenis = getLenisInstance();
    lenis?.on('scroll', onScroll);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: '20% 0px' }
    );
    if (section) io.observe(section);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      lenis?.off('scroll', onScroll);
    };
  }, [travel, x]);

  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height }}
      data-cursor="drag"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 px-6 will-change-transform md:gap-8 md:px-12"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
