import { useEffect, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { usePerfMode } from '../hooks/usePerfMode';
import { useTheme } from '../context/ThemeContext';
import {
  getBackgroundDecor,
  type Bubble,
  type DataBar,
  type NeonShape,
  type Node,
  type Stripe,
} from './premiumBackgroundTheme';

function CursorBubble({
  bubble,
  mx,
  my,
  parallax,
  reduceMotion,
}: {
  bubble: Bubble;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  parallax: boolean;
  reduceMotion: boolean;
}) {
  const x = useTransform(mx, (v) => (parallax ? (v - 0.5) * bubble.depth : 0));
  const y = useTransform(my, (v) => (parallax ? (v - 0.5) * bubble.depth * 0.8 : 0));

  return (
    <motion.div className="absolute" style={{ left: bubble.left, top: bubble.top, x, y }}>
      <motion.div
        className="rounded-full"
        style={{
          width: bubble.size,
          height: bubble.size,
          background: bubble.color,
          boxShadow: bubble.glow,
        }}
        animate={reduceMotion ? undefined : { y: [0, -14, 0], scale: [1, 1.1, 1] }}
        transition={{
          duration: bubble.duration,
          delay: bubble.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

function NeonShapeEl({
  shape,
  mx,
  my,
  parallax,
  reduceMotion,
}: {
  shape: NeonShape;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  parallax: boolean;
  reduceMotion: boolean;
}) {
  const x = useTransform(mx, (v) => (parallax ? (v - 0.5) * shape.depthX : 0));
  const y = useTransform(my, (v) => (parallax ? (v - 0.5) * shape.depthY : 0));
  const baseRotate = shape.rotate ?? 0;

  const radius =
    shape.kind === 'ring'
      ? '50%'
      : shape.kind === 'chip'
        ? '0.75rem'
        : shape.kind === 'diamond'
          ? '0.35rem'
          : '0';

  const clip =
    shape.kind === 'hex'
      ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
      : shape.kind === 'cross'
        ? 'polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)'
        : shape.kind === 'triangle'
          ? 'polygon(50% 0%, 100% 100%, 0% 100%)'
          : undefined;

  const spins = shape.kind === 'ring' || shape.kind === 'hex';

  return (
    <motion.div
      className="absolute"
      style={{
        left: shape.left,
        top: shape.top,
        width: shape.w,
        height: shape.h,
        x,
        y,
        borderRadius: radius,
        border: shape.border,
        boxShadow: shape.glow,
        background: shape.fill ?? 'transparent',
        clipPath: clip,
      }}
      animate={
        reduceMotion
          ? { rotate: baseRotate }
          : spins
            ? { rotate: [baseRotate, baseRotate + 360] }
            : { rotate: baseRotate, opacity: [0.5, 0.95, 0.5] }
      }
      transition={
        spins
          ? { duration: 28 + shape.id * 3, repeat: Infinity, ease: 'linear' }
          : { duration: 5 + shape.id, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  );
}

function CircuitNode({
  node,
  mx,
  my,
  parallax,
}: {
  node: Node;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  parallax: boolean;
}) {
  const x = useTransform(mx, (v) => (parallax ? (v - 0.5) * node.depth : 0));
  const y = useTransform(my, (v) => (parallax ? (v - 0.5) * node.depth * 0.75 : 0));

  return (
    <motion.div
      className="absolute h-2 w-2 rounded-full"
      style={{
        left: node.left,
        top: node.top,
        x,
        y,
        background: node.color,
        boxShadow: `0 0 14px ${node.color}`,
      }}
    />
  );
}

function NeonStripe({
  stripe,
  mx,
  my,
  parallax,
  reduceMotion,
}: {
  stripe: Stripe;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  parallax: boolean;
  reduceMotion: boolean;
}) {
  const x = useTransform(mx, (v) => (parallax ? (v - 0.5) * stripe.depth : 0));
  const y = useTransform(my, (v) => (parallax ? (v - 0.5) * stripe.depth * 0.6 : 0));

  return (
    <motion.div
      className="absolute origin-center"
      style={{
        left: stripe.left,
        top: stripe.top,
        width: stripe.w,
        height: stripe.h,
        rotate: stripe.rotate,
        background: stripe.color,
        boxShadow: stripe.glow,
        x,
        y,
      }}
      animate={
        reduceMotion
          ? undefined
          : { opacity: [0.35, 0.95, 0.35], scaleX: [0.85, 1.05, 0.85] }
      }
      transition={{
        duration: 4.5 + stripe.id * 0.4,
        delay: stripe.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function AtomOrbital({
  className,
  sizeClass,
  mx,
  my,
  parallax,
  reduceMotion,
  reverse = false,
  depthX = 22,
  depthY = 18,
}: {
  className: string;
  sizeClass: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  parallax: boolean;
  reduceMotion: boolean;
  reverse?: boolean;
  depthX?: number;
  depthY?: number;
}) {
  const x = useTransform(mx, (v) => (parallax ? (v - 0.5) * depthX : 0));
  const y = useTransform(my, (v) => (parallax ? (v - 0.5) * depthY : 0));

  return (
    <motion.div className={`absolute ${className} ${sizeClass}`} style={{ x, y }}>
      <motion.svg
        viewBox="0 0 120 120"
        className="h-full w-full overflow-visible"
        animate={reduceMotion ? undefined : { rotate: reverse ? -360 : 360 }}
        transition={{ duration: reverse ? 18 : 24, repeat: Infinity, ease: 'linear' }}
      >
        <ellipse cx="60" cy="60" rx="48" ry="18" fill="none" stroke="var(--bg-atom-1)" strokeWidth="1.5" />
        <ellipse cx="60" cy="60" rx="48" ry="18" fill="none" stroke="var(--bg-atom-2)" strokeWidth="1.5" transform="rotate(60 60 60)" />
        <ellipse cx="60" cy="60" rx="48" ry="18" fill="none" stroke="var(--bg-atom-3)" strokeWidth="1.5" transform="rotate(-60 60 60)" />
        <circle cx="60" cy="60" r="6" fill={reverse ? 'var(--bg-atom-core-alt)' : 'var(--bg-atom-core)'} />
      </motion.svg>
    </motion.div>
  );
}

function DataBarEl({
  bar,
  mx,
  my,
  parallax,
  reduceMotion,
}: {
  bar: DataBar;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  parallax: boolean;
  reduceMotion: boolean;
}) {
  const x = useTransform(mx, (v) => (parallax ? (v - 0.5) * bar.depth : 0));
  const y = useTransform(my, (v) => (parallax ? (v - 0.5) * 12 : 0));

  return (
    <motion.div
      className="absolute w-1 origin-bottom rounded-full"
      style={{
        left: bar.left,
        top: bar.top,
        height: bar.h,
        background: bar.color,
        boxShadow: `0 0 12px ${bar.color}`,
        x,
        y,
      }}
      animate={reduceMotion ? undefined : { scaleY: [1, 1.45, 0.8, 1] }}
      transition={{
        duration: 2.4 + bar.id * 0.35,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: bar.id * 0.2,
      }}
    />
  );
}

function TechCurves({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      initial={false}
    >
      {/* Sine / signal waves */}
      <motion.path
        d="M -40 180 C 160 80, 320 280, 520 180 S 880 60, 1100 180 S 1380 300, 1520 180"
        fill="none"
        stroke="var(--bg-curve-1)"
        strokeWidth="1.6"
        style={{ filter: 'drop-shadow(0 0 6px var(--bg-curve-1))' }}
        animate={reduceMotion ? undefined : { pathLength: [0.3, 1, 0.3], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M -40 260 C 180 360, 360 160, 560 260 S 920 380, 1140 240 S 1400 140, 1520 260"
        fill="none"
        stroke="var(--bg-curve-2)"
        strokeWidth="1.5"
        style={{ filter: 'drop-shadow(0 0 6px var(--bg-curve-2))' }}
        animate={reduceMotion ? undefined : { pathLength: [0.25, 1, 0.25], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.path
        d="M -20 620 C 200 520, 400 720, 640 600 S 1000 480, 1220 620 S 1420 740, 1520 600"
        fill="none"
        stroke="var(--bg-curve-3)"
        strokeWidth="1.5"
        style={{ filter: 'drop-shadow(0 0 6px var(--bg-curve-3))' }}
        animate={reduceMotion ? undefined : { pathLength: [0.35, 1, 0.35], opacity: [0.3, 0.75, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.path
        d="M -30 740 C 220 820, 420 660, 680 760 S 1040 860, 1280 720 S 1460 640, 1540 760"
        fill="none"
        stroke="var(--bg-curve-4)"
        strokeWidth="1.4"
        style={{ filter: 'drop-shadow(0 0 5px var(--bg-curve-4))' }}
        animate={reduceMotion ? undefined : { opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* DNA-like twin curves */}
      <motion.path
        d="M 1100 120 C 1180 220, 1260 120, 1340 220 S 1460 120, 1540 220"
        fill="none"
        stroke="var(--bg-curve-5)"
        strokeWidth="1.4"
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 1100 220 C 1180 120, 1260 220, 1340 120 S 1460 220, 1540 120"
        fill="none"
        stroke="var(--bg-curve-6)"
        strokeWidth="1.4"
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />

      {/* Radar / orbital arcs */}
      <motion.circle
        cx="220"
        cy="680"
        r="90"
        fill="none"
        stroke="var(--bg-arc-1)"
        strokeWidth="1.2"
        strokeDasharray="8 10"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        style={{ transformOrigin: '220px 680px' }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx="220"
        cy="680"
        r="130"
        fill="none"
        stroke="var(--bg-arc-2)"
        strokeWidth="1"
        strokeDasharray="4 12"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        style={{ transformOrigin: '220px 680px' }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx="1200"
        cy="240"
        r="70"
        fill="none"
        stroke="var(--bg-arc-3)"
        strokeWidth="1.2"
        strokeDasharray="6 8"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        style={{ transformOrigin: '1200px 240px' }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx="1200"
        cy="240"
        r="110"
        fill="none"
        stroke="var(--bg-arc-4)"
        strokeWidth="1"
        strokeDasharray="3 10"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        style={{ transformOrigin: '1200px 240px' }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />

      {/* Circuit / constellation links */}
      <line x1="16%" y1="18%" x2="28%" y2="26%" stroke="var(--bg-curve-1)" strokeWidth="1" />
      <line x1="28%" y1="26%" x2="22%" y2="34%" stroke="var(--bg-curve-3)" strokeWidth="1" />
      <line x1="16%" y1="18%" x2="22%" y2="34%" stroke="var(--bg-curve-2)" strokeWidth="1" />
      <line x1="70%" y1="66%" x2="80%" y2="74%" stroke="var(--bg-curve-5)" strokeWidth="1" />
      <line x1="80%" y1="74%" x2="76%" y2="60%" stroke="var(--bg-curve-4)" strokeWidth="1" />
      <line x1="70%" y1="66%" x2="76%" y2="60%" stroke="var(--bg-curve-6)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="58%" y2="56%" stroke="var(--bg-curve-3)" strokeWidth="1" />
      <line x1="58%" y1="56%" x2="70%" y2="66%" stroke="var(--bg-curve-2)" strokeWidth="1" />
      <line x1="38%" y1="42%" x2="50%" y2="50%" stroke="var(--bg-curve-5)" strokeWidth="1" />
      <line x1="86%" y1="28%" x2="76%" y2="60%" stroke="var(--bg-curve-4)" strokeWidth="1" />
      <line x1="8%" y1="48%" x2="22%" y2="34%" stroke="var(--bg-curve-6)" strokeWidth="1" />

      {/* Angular circuit traces */}
      <polyline
        points="980,520 1040,520 1040,580 1120,580 1120,640"
        fill="none"
        stroke="var(--bg-curve-3)"
        strokeWidth="1.3"
      />
      <polyline
        points="160,420 220,420 220,480 300,480"
        fill="none"
        stroke="var(--bg-curve-2)"
        strokeWidth="1.3"
      />
      <polyline
        points="720,120 720,180 800,180 800,240"
        fill="none"
        stroke="var(--bg-curve-1)"
        strokeWidth="1.3"
      />
    </motion.svg>
  );
}

/**
 * Dense cinematic tech/science neon field:
 * waves, stripes, curves, atoms, hex/chips, circuit nodes.
 */
export default function PremiumBackground() {
  const { enableParallax, isMobile, reduceMotion } = usePerfMode();
  const { isLight } = useTheme();
  const decor = useMemo(() => getBackgroundDecor(isLight), [isLight]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18, mass: 0.4 });

  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 28,
    mass: 0.5,
  });

  const fieldY1 = useTransform(smoothScroll, [0, 1], ['0%', '16%']);
  const fieldY2 = useTransform(smoothScroll, [0, 1], ['0%', '-12%']);
  const fieldY3 = useTransform(smoothScroll, [0, 1], ['0%', '10%']);
  useEffect(() => {
    // Always track cursor on fine-pointer devices so neon follower stays alive
    // even when perf mode disables parallax transforms.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const bubbles = isMobile ? decor.bubbles.slice(0, 6) : decor.bubbles;
  const shapes = isMobile ? decor.shapes.slice(0, 5) : decor.shapes;
  const nodes = isMobile ? decor.nodes.slice(0, 6) : decor.nodes;
  const stripes = isMobile ? decor.stripes.slice(0, 3) : decor.stripes;
  const bars = isMobile ? decor.bars.slice(0, 3) : decor.bars;
  const hexStroke = isLight ? '%2306B6D4' : '%23A855F7';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: 'var(--bg-canvas)' }} />

      <motion.div
        className="absolute -left-[18%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full"
        style={{
          y: enableParallax ? fieldY1 : 0,
          background: 'var(--bg-field-1)',
          filter: 'blur(28px)',
        }}
        animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[14%] top-[4%] h-[52vmax] w-[52vmax] rounded-full"
        style={{
          y: enableParallax ? fieldY2 : 0,
          background: 'var(--bg-field-2)',
          filter: 'blur(26px)',
        }}
        animate={reduceMotion ? undefined : { opacity: [0.65, 0.95, 0.65] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[24%] h-[50vmax] w-[50vmax] rounded-full"
        style={{
          y: enableParallax ? fieldY3 : 0,
          background: 'var(--bg-field-3)',
          filter: 'blur(30px)',
        }}
        animate={reduceMotion ? undefined : { opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Hex science grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='64' viewBox='0 0 56 64'%3E%3Cpath d='M28 2 L52 16 L52 48 L28 62 L4 48 L4 16 Z' fill='none' stroke='${hexStroke}' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '56px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        }}
      />

      {/* Diagonal stripe wash */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'var(--bg-stripe-wash)',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 78%)',
        }}
      />

      {/* Waves, DNA curves, radar arcs, circuit traces */}
      <TechCurves reduceMotion={reduceMotion} />

      {/* Neon stripes */}
      {stripes.map((stripe) => (
        <NeonStripe
          key={stripe.id}
          stripe={stripe}
          mx={springX}
          my={springY}
          parallax={enableParallax}
          reduceMotion={reduceMotion}
        />
      ))}

      {shapes.map((shape) => (
        <NeonShapeEl
          key={shape.id}
          shape={shape}
          mx={springX}
          my={springY}
          parallax={enableParallax}
          reduceMotion={reduceMotion}
        />
      ))}

      {nodes.map((node) => (
        <CircuitNode
          key={node.id}
          node={node}
          mx={springX}
          my={springY}
          parallax={enableParallax}
        />
      ))}

      {!isMobile && (
        <>
          <AtomOrbital
            className="left-[8%] top-[62%] sm:left-[10%]"
            sizeClass="h-36 w-36"
            mx={springX}
            my={springY}
            parallax={enableParallax}
            reduceMotion={reduceMotion}
          />
          <AtomOrbital
            className="right-[14%] top-[34%]"
            sizeClass="h-24 w-24"
            mx={springX}
            my={springY}
            parallax={enableParallax}
            reduceMotion={reduceMotion}
            reverse
            depthX={-18}
            depthY={20}
          />
          {bars.map((bar) => (
            <DataBarEl
              key={bar.id}
              bar={bar}
              mx={springX}
              my={springY}
              parallax={enableParallax}
              reduceMotion={reduceMotion}
            />
          ))}
        </>
      )}

      {bubbles.map((bubble) => (
        <CursorBubble
          key={bubble.id}
          bubble={bubble}
          mx={springX}
          my={springY}
          parallax={enableParallax}
          reduceMotion={reduceMotion}
        />
      ))}

      {/* Soft readability veil */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--bg-veil)' }}
      />
    </div>
  );
}
