import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  height?: string;
}

/**
 * Scroll-linked horizontal gallery (Apple-style pinned track).
 */
export default function HorizontalScroll({
  children,
  className = '',
  height = '280vh',
}: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);

  return (
    <section
      ref={ref}
      className={`relative ${className}`}
      style={{ height }}
      data-cursor="drag"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6 md:gap-8 md:px-12 will-change-transform">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
