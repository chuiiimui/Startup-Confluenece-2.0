import { useEffect, useRef, useState, type ReactNode } from 'react';
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

function shouldUseNativeScroll() {
  if (typeof window === 'undefined') return true;
  // Native touch scroll is crisp; Lenis fights momentum on mobile/low-end
  if (window.matchMedia('(pointer: coarse)').matches) return true;
  if (window.matchMedia('(max-width: 768px)').matches) return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return false;
}

/**
 * Lenis on desktop only. Mobile/touch uses native scroll for crisp 60fps feel.
 */
export default function SmoothScroll({ children, enabled = true }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);
  const [allowSmooth, setAllowSmooth] = useState(false);

  useEffect(() => {
    setAllowSmooth(enabled && !shouldUseNativeScroll());
  }, [enabled]);

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
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.92,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
