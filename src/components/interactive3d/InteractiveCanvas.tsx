import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';

interface InteractiveCanvasProps {
  children: ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  interactive?: boolean;
}

function getPerfProfile() {
  if (typeof window === 'undefined') {
    return { isMobile: false, lowEnd: false, dpr: [1, 1.25] as [number, number] };
  }

  const isMobile =
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 768px)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const lowEnd = isMobile || cores <= 4 || memory <= 4;
  const dpr: [number, number] = lowEnd ? [1, 1] : [1, 1.25];

  return { isMobile, lowEnd, dpr };
}

/**
 * Lazy-mount WebGL canvas when in view.
 * Disabled entirely in light mode for a cleaner, faster UI.
 */
export default function InteractiveCanvas({
  children,
  className = '',
  camera = { position: [0, 0.2, 5.2], fov: 40 },
  interactive = true,
}: InteractiveCanvasProps) {
  const { isLight } = useTheme();
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [perf, setPerf] = useState(() => getPerfProfile());

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setPerf(getPerfProfile());
  }, []);

  useEffect(() => {
    if (!mounted || reduced || isLight || !hostRef.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const show = entry.isIntersecting;
        setInView(show);
        if (show) setVisible(true);
      },
      { rootMargin: '80px', threshold: 0.01 }
    );

    io.observe(hostRef.current);
    return () => io.disconnect();
  }, [mounted, reduced, isLight]);

  // Tear down WebGL when switching to light
  useEffect(() => {
    if (isLight) {
      setVisible(false);
      setInView(false);
    }
  }, [isLight]);

  if (isLight) return null;

  return (
    <div
      ref={hostRef}
      className={`${className} ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!interactive}
    >
      {mounted && visible && !reduced && (
        <Canvas
          camera={camera}
          dpr={perf.dpr}
          frameloop={inView ? 'always' : 'never'}
          gl={{
            antialias: !perf.lowEnd,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0);
            scene.background = null;
          }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
    </div>
  );
}
