import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

interface ImageRevealProps {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Scroll-triggered image reveal with clip-path wipe + soft scale.
 */
export default function ImageReveal({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  style,
  children,
}: ImageRevealProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ clipPath: 'inset(12% 12% 12% 12% round 24px)', opacity: 0.4 }}
      whileInView={{
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        opacity: 1,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Glass reflection sweep on hover */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-1000 group-hover:left-[120%]" />
      </div>
      {children}
    </motion.div>
  );
}
