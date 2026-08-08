import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import type { PerfProfile } from '../../lib/perf';
import type { SceneId } from './InteractiveCanvas';
import {
  FundingOrbScene,
  GrowthChartScene,
  HoloTicketScene,
  HoloTickerRibbonScene,
  LiquidMetalBlobScene,
  NodeConstellationScene,
  OrbitingCoinsScene,
  PitchCardSwarmScene,
  PitchPodiumScene,
  ProfileCrystalScene,
  TimelineBeadsScene,
} from './scenes';

interface InteractiveCanvasImplProps {
  scene: SceneId;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  interactive?: boolean;
  perf: PerfProfile;
  onSelect?: (index: number) => void;
}

function SceneContent({
  scene,
  onSelect,
}: {
  scene: SceneId;
  onSelect?: (index: number) => void;
}) {
  switch (scene) {
    case 'nodeConstellation':
      return <NodeConstellationScene />;
    case 'liquidMetalBlob':
      return <LiquidMetalBlobScene />;
    case 'pitchPodium':
      return <PitchPodiumScene />;
    case 'profileCrystal':
      return <ProfileCrystalScene />;
    case 'timelineBeads':
      return <TimelineBeadsScene onSelect={onSelect} />;
    case 'holoTicket':
      return <HoloTicketScene />;
    case 'holoTickerRibbon':
      return <HoloTickerRibbonScene />;
    case 'orbitingCoins':
      return <OrbitingCoinsScene />;
    case 'fundingOrb':
      return <FundingOrbScene />;
    case 'growthChart':
      return <GrowthChartScene />;
    case 'pitchCardSwarm':
      return <PitchCardSwarmScene />;
    default:
      return null;
  }
}

/**
 * Actual WebGL canvas — only imported when perf.enable3D is true.
 */
export default function InteractiveCanvasImpl({
  scene,
  className = '',
  camera = { position: [0, 0.2, 5.2], fov: 40 },
  interactive = true,
  perf,
  onSelect,
}: InteractiveCanvasImplProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!hostRef.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const show = entry.isIntersecting;
        setInView(show);
        if (show) setVisible(true);
      },
      { rootMargin: '40px', threshold: 0.01 }
    );

    io.observe(hostRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={`${className} ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!interactive}
    >
      {visible && (
        <Canvas
          camera={camera}
          dpr={perf.dpr}
          frameloop={inView ? 'always' : 'never'}
          gl={{
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl, scene: threeScene }) => {
            gl.setClearColor(0x000000, 0);
            threeScene.background = null;
          }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <SceneContent scene={scene} onSelect={onSelect} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
