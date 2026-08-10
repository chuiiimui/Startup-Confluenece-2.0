import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PEACH = '#FDBA74';
const AMBER = '#F59E0B';
const ORANGE = '#FF7A00';
const GOLD = '#E8B84A';
const GLASS = '#FFE8D1';

/* ─── Shared lights ─── */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} />
      <pointLight position={[-3, 2, -2]} intensity={0.7} color={AMBER} />
      <pointLight position={[3, 1, 2]} intensity={0.65} color={PEACH} />
    </>
  );
}

/* ─── 1. Funding Orb ─── */
export function FundingOrbScene() {
  const group = useRef<THREE.Group>(null);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * (hover || active ? 0.55 : 0.22);
    group.current.rotation.x = Math.sin(t * 0.4) * 0.12;
    const s = active ? 1.12 : hover ? 1.06 : 1;
    group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08);
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActive((v) => !v);
      }}
    >
      <SceneLights />
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshPhysicalMaterial
          color={GLASS}
          metalness={0.15}
          roughness={0.05}
          transmission={0.72}
          thickness={0.6}
          transparent
          opacity={0.92}
          clearcoat={1}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Inner KPI rings */}
      {[0.55, 0.72, 0.88].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.4 + i * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[r, 0.018, 8, 32]} />
          <meshStandardMaterial
            color={i === 2 ? ORANGE : i === 1 ? PEACH : AMBER}
            emissive={i === 2 ? ORANGE : PEACH}
            emissiveIntensity={hover || active ? 0.8 : 0.35}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
      {/* Mini bars inside */}
      {[0.35, 0.55, 0.45, 0.7, 0.9].map((h, i) => (
        <mesh key={i} position={[-0.4 + i * 0.2, -0.35 + h / 2, 0]}>
          <boxGeometry args={[0.12, h, 0.12]} />
          <meshStandardMaterial
            color={i === 4 ? ORANGE : PEACH}
            emissive={i === 4 ? ORANGE : PEACH}
            emissiveIntensity={active ? 0.7 : 0.25}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      ))}
      <Sparkles count={8} scale={3} size={2} speed={0.35} opacity={0.4} color={PEACH} />
    </group>
  );
}

/* ─── 2. Pitch Podium ─── */
export function PitchPodiumScene() {
  const group = useRef<THREE.Group>(null);
  const spot = useRef<THREE.SpotLight>(null);
  const [hover, setHover] = useState(false);
  const [pulse, setPulse] = useState(0);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.25;
    if (spot.current) {
      const target = hover ? 1.4 : 0.55;
      spot.current.intensity += (target - spot.current.intensity) * 0.08;
    }
    if (pulse > 0) setPulse((p) => Math.max(0, p - 0.03));
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPulse(1);
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      <spotLight
        ref={spot}
        position={[0, 3.2, 1]}
        angle={0.35}
        penumbra={0.5}
        intensity={0.55}
        color="#FFF4E5"
      />

      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.25, 0.22, 24]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.76, 0]}>
        <torusGeometry args={[1.12, 0.04, 8, 32]} />
        <meshStandardMaterial
          color={ORANGE}
          emissive={ORANGE}
          emissiveIntensity={0.4 + pulse * 1.2}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* Mic */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 12]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.45, 0.1]} rotation={[0.55, 0, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Deal ring pulse */}
      <mesh position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1 + pulse * 0.6}>
        <ringGeometry args={[1.2, 1.45, 48]} />
        <meshBasicMaterial
          color={ORANGE}
          transparent
          opacity={0.15 + pulse * 0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ─── 3. Orbiting Coins ─── */
export function OrbitingCoinsScene() {
  const group = useRef<THREE.Group>(null);
  const [paused, setPaused] = useState(false);
  const [flipped, setFlipped] = useState(0);
  const coins = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        radius: 1.35,
        color: i % 2 === 0 ? GOLD : '#C0C7D1',
      })),
    []
  );

  useFrame((state) => {
    if (!group.current || paused) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.35;
  });

  return (
    <group
      onPointerOver={() => {
        setPaused(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setPaused(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={() => setFlipped((f) => f + 1)}
    >
      <SceneLights />
      <group ref={group}>
        {coins.map((c, i) => (
          <Float key={i} speed={1.5} floatIntensity={0.3}>
            <mesh
              position={[
                Math.cos(c.angle) * c.radius,
                Math.sin(c.angle * 1.2) * 0.25,
                Math.sin(c.angle) * c.radius,
              ]}
              rotation={[0.4, flipped * Math.PI + i, 0.2]}
            >
              <cylinderGeometry args={[0.32, 0.32, 0.06, 40]} />
              <meshStandardMaterial
                color={c.color}
                metalness={0.96}
                roughness={0.12}
                emissive={c.color}
                emissiveIntensity={paused ? 0.25 : 0.08}
              />
            </mesh>
          </Float>
        ))}
      </group>
      <mesh>
        <torusGeometry args={[1.35, 0.01, 8, 64]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* ─── 4. Growth Chart ─── */
export function GrowthChartScene() {
  const bars = useMemo(() => [0.5, 0.85, 0.65, 1.15, 1.55], []);
  const [boost, setBoost] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <group
      ref={group}
      onClick={() => {
        setBoost(true);
        setTimeout(() => setBoost(false), 900);
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHoverIdx(null);
      }}
    >
      <SceneLights />
      {bars.map((h, i) => {
        const height = boost ? h * 1.2 : h;
        const lifted = hoverIdx === i ? 0.12 : 0;
        return (
          <mesh
            key={i}
            position={[-0.8 + i * 0.4, height / 2 + lifted - 0.6, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoverIdx(i);
            }}
          >
            <boxGeometry args={[0.28, height, 0.28]} />
            <meshStandardMaterial
              color={i === bars.length - 1 || hoverIdx === i ? ORANGE : PEACH}
              metalness={0.75}
              roughness={0.22}
              emissive={i === bars.length - 1 || hoverIdx === i ? ORANGE : PEACH}
              emissiveIntensity={hoverIdx === i ? 0.55 : 0.15}
            />
          </mesh>
        );
      })}
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[2.2, 0.08, 0.9]} />
        <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ─── 5. Holo Ticket ─── */
export function HoloTicketScene() {
  const group = useRef<THREE.Group>(null);
  const [stamp, setStamp] = useState(0);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.5) * 0.35;
    group.current.rotation.x = Math.sin(t * 0.35) * 0.12;
    if (stamp > 0) setStamp((s) => Math.max(0, s - 0.025));
  });

  return (
    <group
      ref={group}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
      onClick={() => setStamp(1)}
    >
      <SceneLights />
      <mesh>
        <boxGeometry args={[2.2, 1.25, 0.08]} />
        <meshPhysicalMaterial
          color="#E2E8F0"
          metalness={0.2}
          roughness={0.15}
          transmission={0.35}
          thickness={0.3}
          clearcoat={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.9, 0.95]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.15 + stamp * 0.35} />
      </mesh>
      {/* Accent stripe */}
      <mesh position={[-0.85, 0, 0.05]}>
        <boxGeometry args={[0.12, 1.1, 0.02]} />
        <meshStandardMaterial
          color={ORANGE}
          emissive={ORANGE}
          emissiveIntensity={0.5 + stamp}
        />
      </mesh>
      <mesh position={[0.7, 0.25, 0.06]} scale={0.7 + stamp * 0.3}>
        <ringGeometry args={[0.18, 0.28, 32]} />
        <meshBasicMaterial
          color={ORANGE}
          transparent
          opacity={0.35 + stamp * 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ─── 6. Node Constellation (lightweight backdrop) ─── */
export function NodeConstellationScene() {
  const group = useRef<THREE.Group>(null);
  const magnet = useRef({ x: 0, y: 0 });
  const isCoarse =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const nodeCount = isCoarse ? 8 : 12;

  const nodes = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => {
        const seed = Math.sin(i * 12.9898) * 43758.5453;
        const r = seed - Math.floor(seed);
        const r2 = Math.sin(i * 78.233) * 43758.5453;
        const r3 = r2 - Math.floor(r2);
        const r4 = Math.sin(i * 39.346) * 43758.5453;
        const r5 = r4 - Math.floor(r4);
        return {
          x: (r - 0.5) * 6,
          y: (r3 - 0.5) * 3.5,
          z: (r5 - 0.5) * 2.5,
          s: 0.045 + r * 0.05,
        };
      }),
    [nodeCount]
  );

  useEffect(() => {
    if (isCoarse) return;
    const onMove = (e: MouseEvent) => {
      magnet.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 1.2,
        y: -(e.clientY / window.innerHeight - 0.5) * 0.8,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isCoarse]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.04;
    if (!isCoarse) {
      group.current.position.x += (magnet.current.x - group.current.position.x) * 0.04;
      group.current.position.y += (magnet.current.y - group.current.position.y) * 0.04;
    }
  });

  const linkCount = Math.min(6, nodes.length);

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={0.65} color={PEACH} />
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[n.s, 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? ORANGE : i % 3 === 1 ? PEACH : AMBER}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      {nodes.slice(0, linkCount).map((n, i) => {
        const next = nodes[(i + 3) % nodes.length];
        const start = new THREE.Vector3(n.x, n.y, n.z);
        const end = new THREE.Vector3(next.x, next.y, next.z);
        const mid = start.clone().lerp(end, 0.5);
        const dist = start.distanceTo(end);
        return (
          <mesh
            key={`l-${i}`}
            position={mid.toArray()}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              end.clone().sub(start).normalize()
            )}
          >
            <cylinderGeometry args={[0.003, 0.003, dist, 3]} />
            <meshBasicMaterial color={AMBER} transparent opacity={0.22} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── 7. Profile Crystal ─── */
export function ProfileCrystalScene() {
  const ref = useRef<THREE.Mesh>(null);
  const [hot, setHot] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * (hot ? 0.9 : 0.35);
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    const s = hot ? 1.15 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      onPointerOver={() => {
        setHot(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHot(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={() => setHot((h) => !h)}
    >
      <SceneLights />
      <mesh ref={ref}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#FDBA74"
          metalness={0.15}
          roughness={0.05}
          transmission={0.7}
          thickness={0.5}
          clearcoat={1}
          emissive={AMBER}
          emissiveIntensity={hot ? 0.45 : 0.12}
        />
      </mesh>
      <Sparkles count={6} scale={2.5} size={2} speed={0.4} opacity={0.35} color={AMBER} />
    </group>
  );
}

/* ─── 8. Timeline Beads ─── */
export function TimelineBeadsScene({ onSelect }: { onSelect?: (i: number) => void }) {
  const [active, setActive] = useState(0);
  const beads = [0, 1, 2, 3, 4];

  useFrame(() => {});

  return (
    <group>
      <SceneLights />
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 4.2, 12]} />
        <meshStandardMaterial color="#64748B" metalness={0.6} roughness={0.3} />
      </mesh>
      {beads.map((i) => (
        <mesh
          key={i}
          position={[-1.8 + i * 0.9, 0, 0]}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            setActive(i);
            onSelect?.(i);
          }}
        >
          <sphereGeometry args={[active === i ? 0.22 : 0.16, 12, 12]} />
          <meshStandardMaterial
            color={active === i ? ORANGE : PEACH}
            emissive={active === i ? ORANGE : PEACH}
            emissiveIntensity={active === i ? 0.7 : 0.25}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── 9. Holographic Stock Ticker Ribbon ─── */
function useTickerTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#1C1917');
    gradient.addColorStop(0.5, '#7C2D12');
    gradient.addColorStop(1, '#1C1917');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,179,102,0.40)';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    const text =
      '  SEED ▲ 12%   SERIES A ▲ 28%   SERIES B ▲ 41%   IPO ● LIVE   DEAL FLOW ▲   RAISE $2.4M   ANGEL ROUND   UNICORN WATCH   CONFLUENCE 2.0   EXIT ▲   ';
    ctx.font = 'bold 36px Space Grotesk, Outfit, sans-serif';
    ctx.fillStyle = '#FFF7ED';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 20, 52);
    ctx.fillStyle = '#FF7A00';
    ctx.fillText('  ● LIVE MARKETS  ', 20, 95);
    ctx.fillStyle = 'rgba(253,186,116,0.9)';
    ctx.font = '600 24px Space Grotesk, Outfit, sans-serif';
    ctx.fillText(text, 20, 100);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(2, 1);
    texture.anisotropy = 4;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

export function HoloTickerRibbonScene() {
  const group = useRef<THREE.Group>(null);
  const texture = useTickerTexture();
  const [hot, setHot] = useState(false);

  useFrame((_, delta) => {
    texture.offset.x -= delta * (hot ? 0.22 : 0.08);
    if (group.current) {
      group.current.rotation.y += delta * (hot ? 0.35 : 0.12);
      group.current.rotation.x = Math.sin(performance.now() * 0.0006) * 0.18;
    }
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHot(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHot(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <SceneLights />
      <mesh rotation={[0.55, 0.15, -0.25]}>
        <torusGeometry args={[1.55, 0.11, 20, 120, Math.PI * 1.65]} />
        <meshPhysicalMaterial
          map={texture}
          color="#FFE8D1"
          metalness={0.7}
          roughness={0.18}
          clearcoat={1}
          emissive={hot ? ORANGE : AMBER}
          emissiveIntensity={hot ? 0.35 : 0.15}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh rotation={[0.55, 0.15, -0.25]} scale={1.04}>
        <torusGeometry args={[1.55, 0.02, 8, 100, Math.PI * 1.65]} />
        <meshBasicMaterial color={PEACH} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-0.4, 0.6, 0.2]} position={[0, -0.15, 0]}>
        <torusGeometry args={[1.1, 0.045, 12, 80, Math.PI * 1.2]} />
        <meshPhysicalMaterial
          map={texture}
          metalness={0.85}
          roughness={0.2}
          emissive={PEACH}
          emissiveIntensity={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>
      <Sparkles count={8} scale={4} size={1.8} speed={0.3} opacity={0.35} color={PEACH} />
    </group>
  );
}

/* ─── 11. Gravity-Defying Pitch Cards ─── */
const PITCH_LABELS = ['SEED', 'PITCH', 'TRACTION', 'ASK', 'TEAM', 'VISION', 'MARKET', 'EXIT'];

export function PitchCardSwarmScene() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [burst, setBurst] = useState(false);

  const cards = useMemo(
    () =>
      PITCH_LABELS.map((label, i) => {
        const a = (i / PITCH_LABELS.length) * Math.PI * 2;
        const r = 1.35 + (i % 3) * 0.22;
        return {
          label,
          pos: [
            Math.cos(a) * r,
            Math.sin(a * 1.3) * 0.75,
            Math.sin(a) * r * 0.55,
          ] as [number, number, number],
          rot: [
            (i % 3) * 0.25 - 0.2,
            a + 0.4,
            (i % 2) * 0.2 - 0.1,
          ] as [number, number, number],
          color: i % 3 === 0 ? ORANGE : i % 3 === 1 ? PEACH : AMBER,
          speed: 0.6 + (i % 4) * 0.15,
        };
      }),
    []
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * (burst ? 0.55 : 0.18) + mouse.current.x * 0.35;
    group.current.rotation.x = mouse.current.y * 0.22 + Math.sin(t * 0.35) * 0.08;
    const s = burst ? 1.12 : 1;
    group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.07);
  });

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation();
        setBurst((b) => !b);
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <SceneLights />
      {cards.map((card) => (
        <Float
          key={card.label}
          speed={card.speed}
          rotationIntensity={burst ? 1.4 : 0.55}
          floatIntensity={burst ? 1.1 : 0.45}
        >
          <group position={card.pos} rotation={card.rot}>
            <mesh>
              <boxGeometry args={[0.95, 1.25, 0.045]} />
              <meshPhysicalMaterial
                color="#E2E8F0"
                metalness={0.2}
                roughness={0.08}
                transmission={0.55}
                thickness={0.35}
                transparent
                opacity={0.88}
                clearcoat={1}
                emissive={card.color}
                emissiveIntensity={burst ? 0.28 : 0.1}
              />
            </mesh>
            {/* slide header bar */}
            <mesh position={[0, 0.42, 0.03]}>
              <planeGeometry args={[0.72, 0.12]} />
              <meshBasicMaterial color={card.color} transparent opacity={0.9} />
            </mesh>
            {/* fake content lines */}
            {[0.12, -0.05, -0.22].map((y, li) => (
              <mesh key={li} position={[0, y, 0.03]}>
                <planeGeometry args={[0.62 - li * 0.08, 0.05]} />
                <meshBasicMaterial color="#94A3B8" transparent opacity={0.55} />
              </mesh>
            ))}
            {/* mini chart */}
            {[0.28, 0.42, 0.55, 0.7, 0.9].map((h, bi) => (
              <mesh key={bi} position={[-0.28 + bi * 0.14, -0.42 + h * 0.2, 0.035]}>
                <boxGeometry args={[0.08, h * 0.35, 0.02]} />
                <meshStandardMaterial
                  color={bi === 4 ? ORANGE : card.color}
                  emissive={bi === 4 ? ORANGE : card.color}
                  emissiveIntensity={0.45}
                  metalness={0.7}
                  roughness={0.25}
                />
              </mesh>
            ))}
            <mesh position={[0, 0, -0.01]}>
              <boxGeometry args={[0.98, 1.28, 0.01]} />
              <meshBasicMaterial color={card.color} transparent opacity={0.18} />
            </mesh>
          </group>
        </Float>
      ))}
      <Sparkles count={8} scale={4.5} size={1.6} speed={0.3} opacity={0.3} color={AMBER} />
    </group>
  );
}

/* ─── Soft Halo — professional ambient background accent ─── */
export function SoftHaloScene() {
  const group = useRef<THREE.Group>(null);
  const BLUE = '#2563EB';
  const SKY = '#38BDF8';

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.08;
    group.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    group.current.position.y = Math.sin(t * 0.35) * 0.12;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 3]} intensity={0.9} color="#F8FAFC" />
      <pointLight position={[-2, 1, 2]} intensity={0.55} color={ORANGE} />
      <pointLight position={[3, -1, -1]} intensity={0.45} color={BLUE} />

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh>
          <torusGeometry args={[1.55, 0.055, 24, 96]} />
          <meshPhysicalMaterial
            color={ORANGE}
            roughness={0.28}
            metalness={0.45}
            clearcoat={0.8}
            transparent
            opacity={0.55}
            emissive={ORANGE}
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh rotation={[Math.PI / 2.6, 0.3, 0]} scale={0.92}>
          <torusGeometry args={[1.15, 0.035, 20, 80]} />
          <meshPhysicalMaterial
            color={SKY}
            roughness={0.35}
            metalness={0.35}
            transparent
            opacity={0.45}
            emissive={BLUE}
            emissiveIntensity={0.14}
          />
        </mesh>
      </Float>

      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshPhysicalMaterial
          color="#EFF6FF"
          roughness={0.2}
          metalness={0.15}
          clearcoat={1}
          transparent
          opacity={0.78}
          emissive={BLUE}
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}
