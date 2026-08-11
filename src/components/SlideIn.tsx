import { motion, type HTMLMotionProps } from 'framer-motion';
import { usePerfMode } from '../hooks/usePerfMode';

type Direction = 'up' | 'down' | 'left' | 'right';

interface SlideInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  className?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 56 },
  down: { x: 0, y: -56 },
  left: { x: 72, y: 0 },
  right: { x: -72, y: 0 },
};

/** Scroll-triggered slide reveal used across homepage sections. */
export default function SlideIn({
  children,
  direction = 'up',
  delay = 0,
  distance,
  className = '',
  ...props
}: SlideInProps) {
  const { reduceMotion, enableHeavyBlur } = usePerfMode();
  const base = offsets[direction];
  const x = distance != null ? Math.sign(base.x || 1) * (base.x ? distance : 0) : base.x;
  const y = distance != null ? Math.sign(base.y || 1) * (base.y ? distance : 0) : base.y;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const travelX = enableHeavyBlur ? x : x * 0.45;
  const travelY = enableHeavyBlur ? y : y * 0.45;

  return (
    <motion.div
      className={className}
      initial={
        enableHeavyBlur
          ? { opacity: 0, x: travelX, y: travelY, filter: 'blur(8px)' }
          : { opacity: 0, x: travelX, y: travelY }
      }
      whileInView={
        enableHeavyBlur
          ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
          : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: enableHeavyBlur ? 0.85 : 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
