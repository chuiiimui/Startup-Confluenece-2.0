import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';
import { setLenisInstance } from '../lib/utils';

interface SmoothScrollProps {
  children: ReactNode;
  enabled?: boolean;
}

function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    setLenisInstance(lenis ?? null);
    return () => setLenisInstance(null);
  }, [lenis]);

  return null;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Lenis smooth scroll synced to Framer Motion's frame loop.
 */
export default function SmoothScroll({ children, enabled = true }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);
  const allowSmooth = enabled && !prefersReducedMotion();

  useEffect(() => {
    if (!allowSmooth) {
      setLenisInstance(null);
      return;
    }

    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [allowSmooth]);

  if (!allowSmooth) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
