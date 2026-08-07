import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

interface InteractiveCanvasProps {
  children: ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  interactive?: boolean;
}

/**
 * Lazy-mount WebGL canvas when in view. Transparent, dark-scene friendly.
 */
export default function InteractiveCanvas({
  children,
  className = '',
  camera = { position: [0, 0.2, 5.2], fov: 40 },
  interactive = true,
}: InteractiveCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!mounted || reduced || !hostRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '140px' }
    );
    io.observe(hostRef.current);
    return () => io.disconnect();
  }, [mounted, reduced]);

  return (
    <div
      ref={hostRef}
      className={`${className} ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!interactive}
    >
      {mounted && visible && !reduced && (
        <Canvas
          camera={camera}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: 'high-performance',
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
