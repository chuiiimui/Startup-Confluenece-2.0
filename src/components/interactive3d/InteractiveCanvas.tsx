'use client';

import dynamic from 'next/dynamic';
import { usePerfMode } from '../../hooks/usePerfMode';

export type SceneId =
  | 'nodeConstellation'
  | 'pitchPodium'
  | 'profileCrystal'
  | 'timelineBeads'
  | 'holoTicket'
  | 'holoTickerRibbon'
  | 'orbitingCoins'
  | 'fundingOrb'
  | 'growthChart'
  | 'pitchCardSwarm'
  | 'softHalo';

interface InteractiveCanvasProps {
  scene: SceneId;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  interactive?: boolean;
  onSelect?: (index: number) => void;
}

const InteractiveCanvasImpl = dynamic(() => import('./InteractiveCanvasImpl'), {
  ssr: false,
  loading: () => null,
});

/**
 * Gate for WebGL. Returns null on low-end / Android / mobile
 * so three.js is never downloaded on those devices.
 */
export default function InteractiveCanvas({
  scene,
  className = '',
  camera = { position: [0, 0.2, 5.2], fov: 40 },
  interactive = true,
  onSelect,
}: InteractiveCanvasProps) {
  const perf = usePerfMode();

  if (!perf.enable3D) return null;

  return (
    <InteractiveCanvasImpl
      scene={scene}
      className={className}
      camera={camera}
      interactive={interactive}
      perf={perf}
      onSelect={onSelect}
    />
  );
}
