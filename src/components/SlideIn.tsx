import { motion, type HTMLMotionProps } from 'framer-motion';

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
  const base = offsets[direction];
  const x = distance != null ? Math.sign(base.x || 1) * (base.x ? distance : 0) : base.x;
  const y = distance != null ? Math.sign(base.y || 1) * (base.y ? distance : 0) : base.y;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
