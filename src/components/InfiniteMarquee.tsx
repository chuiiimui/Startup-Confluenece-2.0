import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Seamless infinite marquee with edge fade masks.
 */
export default function InfiniteMarquee({
  children,
  speed = 40,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <motion.div
        className="flex w-max gap-6"
        animate={
          paused
            ? undefined
            : {
                x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
              }
        }
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <div className="flex shrink-0 gap-6">{children}</div>
        <div className="flex shrink-0 gap-6" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
