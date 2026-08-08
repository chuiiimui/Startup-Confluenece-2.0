import { motion, type Variants } from 'framer-motion';
import { usePerfMode } from '../hooks/usePerfMode';

const appleEase = [0.22, 1, 0.36, 1] as const;

interface RevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  mode?: 'words' | 'chars' | 'lines';
  once?: boolean;
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const child: Variants = {
  hidden: { y: '110%', opacity: 0, rotateX: -40 },
  visible: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.85, ease: appleEase },
  },
};

const lightChild: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: appleEase },
  },
};

/**
 * Staggered text reveal. Simplified on low-end / Android.
 */
export default function RevealText({
  text,
  as: Tag = 'h2',
  className = '',
  style,
  delay = 0,
  mode = 'words',
  once = true,
}: RevealTextProps) {
  const { reduceMotion } = usePerfMode();

  if (reduceMotion) {
    const StaticTag = Tag;
    return (
      <StaticTag className={className} style={style}>
        {text}
      </StaticTag>
    );
  }

  const parts =
    mode === 'chars'
      ? text.split('')
      : mode === 'lines'
        ? text.split('\n')
        : text.split(' ');

  const MotionTag = motion[Tag] as typeof motion.h2;
  const useLight = mode !== 'chars';
  const childVariant = useLight ? lightChild : child;

  return (
    <MotionTag
      className={className}
      style={useLight ? style : { perspective: 600, ...style }}
      variants={container(mode === 'chars' ? 0.02 : 0.06, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      aria-label={text}
    >
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.1em]">
          <motion.span className="inline-block origin-bottom" variants={childVariant}>
            {part === ' ' ? '\u00A0' : part}
            {mode === 'words' && i < parts.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
