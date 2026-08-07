import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const BLUE = '#93C5FD';
const VIOLET = '#A78BFA';
const ORANGE = '#FF7A00';
const GOLD = '#E8B84A';
const GLASS = '#BFDBFE';

/* ─── Shared lights ─── */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} />
      <pointLight position={[-3, 2, -2]} intensity={0.7} color={VIOLET} />
      <pointLight position={[3, 1, 2]} intensity={0.65} color={BLUE} />
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
          <torusGeometry args={[r, 0.018, 12, 64]} />
          <meshStandardMaterial
            color={i === 2 ? ORANGE : i === 1 ? BLUE : VIOLET}
            emissive={i === 2 ? ORANGE : BLUE}
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
            color={i === 4 ? ORANGE : BLUE}
            emissive={i === 4 ? ORANGE : BLUE}
            emissiveIntensity={active ? 0.7 : 0.25}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      ))}
      <Sparkles count={24} scale={3} size={2} speed={0.4} opacity={0.45} color={BLUE} />
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
        <cylinderGeometry args={[1.1, 1.25, 0.22, 48]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.76, 0]}>
        <torusGeometry args={[1.12, 0.04, 12, 64]} />
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
        <sphereGeometry args={[0.12, 20, 20]} />
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
        <meshBasicMaterial color={VIOLET} transparent opacity={0.25} />
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
              color={i === bars.length - 1 || hoverIdx === i ? ORANGE : BLUE}
              metalness={0.75}
              roughness={0.22}
              emissive={i === bars.length - 1 || hoverIdx === i ? ORANGE : BLUE}
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
        <meshBasicMaterial color={VIOLET} transparent opacity={0.15 + stamp * 0.35} />
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

/* ─── 6. Node Constellation ─── */
export function NodeConstellationScene() {
  const group = useRef<THREE.Group>(null);
  const magnet = useRef({ x: 0, y: 0 });
  const nodes = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 3.5,
        z: (Math.random() - 0.5) * 2.5,
        s: 0.04 + Math.random() * 0.06,
      })),
    []
  );

  // Follow cursor even when canvas has pointer-events: none
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      magnet.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 1.2,
        y: -(e.clientY / window.innerHeight - 0.5) * 0.8,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.05;
    group.current.position.x += (magnet.current.x - group.current.position.x) * 0.04;
    group.current.position.y += (magnet.current.y - group.current.position.y) * 0.04;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={0.8} color={BLUE} />
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[n.s, 12, 12]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? ORANGE : i % 3 === 1 ? BLUE : VIOLET}
            emissive={i % 3 === 0 ? ORANGE : BLUE}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      {/* Link lines */}
      {nodes.slice(0, 12).map((n, i) => {
        const next = nodes[(i + 3) % nodes.length];
        const start = new THREE.Vector3(n.x, n.y, n.z);
        const end = new THREE.Vector3(next.x, next.y, next.z);
        const mid = start.clone().lerp(end, 0.5);
        const dist = start.distanceTo(end);
        return (
          <mesh key={`l-${i}`} position={mid.toArray()} quaternion={new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            end.clone().sub(start).normalize()
          )}>
            <cylinderGeometry args={[0.004, 0.004, dist, 4]} />
            <meshBasicMaterial color={VIOLET} transparent opacity={0.25} />
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
          color="#C4B5FD"
          metalness={0.15}
          roughness={0.05}
          transmission={0.7}
          thickness={0.5}
          clearcoat={1}
          emissive={VIOLET}
          emissiveIntensity={hot ? 0.45 : 0.12}
        />
      </mesh>
      <Sparkles count={16} scale={2.5} size={2} speed={0.5} opacity={0.4} color={VIOLET} />
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
          <sphereGeometry args={[active === i ? 0.22 : 0.16, 24, 24]} />
          <meshStandardMaterial
            color={active === i ? ORANGE : BLUE}
            emissive={active === i ? ORANGE : BLUE}
            emissiveIntensity={active === i ? 0.7 : 0.25}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── 9. Liquid Metal Funding Blob ─── */
export function LiquidMetalBlobScene() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [hot, setHot] = useState(false);

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
    const pull = hot ? 0.55 : 0.32;
    group.current.rotation.y = t * 0.28 + mouse.current.x * 0.45;
    group.current.rotation.x = Math.sin(t * 0.55) * 0.18 + mouse.current.y * 0.3;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      mouse.current.x * pull,
      0.045
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      mouse.current.y * pull * 0.7,
      0.045
    );
    const s = hot ? 1.08 : 1;
    group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08);
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
      <mesh>
        <icosahedronGeometry args={[1.12, 24]} />
        <MeshDistortMaterial
          color="#D4D4F7"
          emissive={hot ? ORANGE : '#6366F1'}
          emissiveIntensity={hot ? 0.55 : 0.28}
          metalness={0.98}
          roughness={0.08}
          distort={hot ? 0.58 : 0.42}
          speed={hot ? 3.2 : 2.1}
        />
      </mesh>
      <mesh scale={1.1}>
        <icosahedronGeometry args={[1.12, 6]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.14} />
      </mesh>
      <mesh scale={0.42}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={ORANGE}
          emissive={ORANGE}
          emissiveIntensity={hot ? 1.1 : 0.55}
          metalness={1}
          roughness={0.15}
        />
      </mesh>
      <Sparkles
        count={28}
        scale={3.2}
        size={2.2}
        speed={0.55}
        opacity={0.5}
        color={hot ? ORANGE : BLUE}
      />
    </group>
  );
}

/* ─── 10. Holographic Stock Ticker Ribbon ─── */
function useTickerTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#0B1229');
    gradient.addColorStop(0.5, '#1E1B4B');
    gradient.addColorStop(1, '#0B1229');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(147,197,253,0.35)';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

    const text =
      '  SEED ▲ 12%   SERIES A ▲ 28%   SERIES B ▲ 41%   IPO ● LIVE   DEAL FLOW ▲   RAISE $2.4M   ANGEL ROUND   UNICORN WATCH   CONFLUENCE 2.0   EXIT ▲   ';
    ctx.font = 'bold 72px Space Grotesk, Inter, sans-serif';
    ctx.fillStyle = '#E0E7FF';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 40, 110);
    ctx.fillStyle = '#FF7A00';
    ctx.fillText('  ● LIVE MARKETS  ', 40, 190);
    ctx.fillStyle = 'rgba(167,139,250,0.85)';
    ctx.font = '600 48px Space Grotesk, Inter, sans-serif';
    ctx.fillText(text, 40, 200);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(2, 1);
    texture.anisotropy = 8;
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
          color="#BFDBFE"
          metalness={0.7}
          roughness={0.18}
          clearcoat={1}
          emissive={hot ? ORANGE : VIOLET}
          emissiveIntensity={hot ? 0.35 : 0.15}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh rotation={[0.55, 0.15, -0.25]} scale={1.04}>
        <torusGeometry args={[1.55, 0.02, 8, 100, Math.PI * 1.65]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-0.4, 0.6, 0.2]} position={[0, -0.15, 0]}>
        <torusGeometry args={[1.1, 0.045, 12, 80, Math.PI * 1.2]} />
        <meshPhysicalMaterial
          map={texture}
          metalness={0.85}
          roughness={0.2}
          emissive={BLUE}
          emissiveIntensity={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>
      <Sparkles count={18} scale={4} size={1.8} speed={0.35} opacity={0.4} color={BLUE} />
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
          color: i % 3 === 0 ? ORANGE : i % 3 === 1 ? BLUE : VIOLET,
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
      {cards.map((card, i) => (
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
      <Sparkles count={20} scale={4.5} size={1.6} speed={0.4} opacity={0.35} color={VIOLET} />
    </group>
  );
}

/* ─── 12. Neon Wireframe City of Startups ─── */
function seeded(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function NeonWireframeCityScene() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const buildings = useMemo(() => {
    const items: {
      pos: [number, number, number];
      size: [number, number, number];
      color: string;
      pulse: number;
      beacon: boolean;
    }[] = [];

    // Compact outer ring — smaller towers, clearer silhouette
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2 + seeded(i) * 0.12;
      const r = 1.85 + seeded(i + 3) * 0.55;
      const h = 0.22 + seeded(i + 7) * 0.55 + (i % 6 === 0 ? 0.22 : 0);
      const w = 0.08 + seeded(i + 11) * 0.07;
      const d = 0.08 + seeded(i + 13) * 0.07;
      const color = i % 7 === 0 ? ORANGE : i % 3 === 0 ? VIOLET : BLUE;
      items.push({
        pos: [Math.cos(a) * r, h / 2 - 0.95, Math.sin(a) * r * 0.78],
        size: [w, h, d],
        color,
        pulse: seeded(i + 19),
        beacon: h > 0.55,
      });
    }

    // Sparse inner low-rises
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.35;
      const r = 1.05 + seeded(i + 40) * 0.28;
      const h = 0.14 + seeded(i + 45) * 0.28;
      const w = 0.07 + seeded(i + 50) * 0.05;
      items.push({
        pos: [Math.cos(a) * r, h / 2 - 0.95, Math.sin(a) * r * 0.76],
        size: [w, h, w],
        color: i % 2 === 0 ? BLUE : VIOLET,
        pulse: seeded(i + 60),
        beacon: false,
      });
    }

    return items;
  }, []);

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
    group.current.rotation.y = t * 0.035 + mouse.current.x * 0.1;
    group.current.rotation.x = -0.22 + mouse.current.y * 0.05;
    group.current.position.y = Math.sin(t * 0.35) * 0.03;
  });

  return (
    <group ref={group} position={[0, -0.55, 0]} scale={0.92}>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 2.2, 2]} intensity={0.85} color={BLUE} />
      <pointLight position={[-2, 1.2, -1]} intensity={0.65} color={VIOLET} />
      <pointLight position={[2, 0.8, 1]} intensity={0.45} color={ORANGE} />

      {/* Ground neon ring — light, high-contrast, no heavy dark disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.96, 0]}>
        <ringGeometry args={[0.95, 2.55, 72]} />
        <meshBasicMaterial color="#A5B4FC" wireframe transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.955, 0]}>
        <ringGeometry args={[1.05, 2.45, 64]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.08} />
      </mesh>

      {buildings.map((b, i) => (
        <group key={i} position={b.pos}>
          {/* Bright wireframe shell */}
          <mesh>
            <boxGeometry args={b.size} />
            <meshBasicMaterial
              color={b.color}
              wireframe
              transparent
              opacity={0.95}
              depthWrite={false}
            />
          </mesh>
          {/* Soft neon core for readability */}
          <mesh scale={[0.78, 0.92, 0.78]}>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={0.55 + b.pulse * 0.45}
              transparent
              opacity={0.28}
              metalness={0.4}
              roughness={0.25}
              depthWrite={false}
            />
          </mesh>
          {b.beacon && (
            <mesh position={[0, b.size[1] / 2 + 0.035, 0]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshStandardMaterial
                color={ORANGE}
                emissive={ORANGE}
                emissiveIntensity={1.6}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Slim deal-flow arcs */}
      {[0, 1].map((i) => (
        <mesh
          key={`arc-${i}`}
          rotation={[0.08, (i * Math.PI) / 2 + 0.3, 0.04]}
          position={[0, -0.45 + i * 0.1, 0]}
        >
          <torusGeometry args={[2.05 + i * 0.2, 0.006, 6, 64, Math.PI * 0.9]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? BLUE : VIOLET}
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      ))}

      <Sparkles
        count={16}
        scale={[5.5, 1.4, 4.2]}
        size={1.1}
        speed={0.2}
        opacity={0.45}
        color={BLUE}
      />
    </group>
  );
}
