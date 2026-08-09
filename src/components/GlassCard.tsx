import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import TiltCard from './TiltCard';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  tilt?: boolean;
}

/** Claymorphic panel (kept as GlassCard for import compatibility). */
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className = '',
      hover = true,
      glow = false,
      tilt = true,
      ...props
    },
    ref
  ) => {
    const inner = (
      <motion.div
        ref={ref}
        className={`clay-card group relative overflow-hidden rounded-2xl p-6 ${
          glow ? 'hover:border-orange-400/40' : ''
        } ${className}`}
        whileHover={hover && !tilt ? { scale: 1.02, y: -5 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        <div className="clay-card-highlight absolute inset-x-0 top-0 h-1/2 opacity-70" />
        <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[120%] group-hover:opacity-100" />
        {glow && (
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-orange-400/20 blur-xl" />
          </div>
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );

    if (!tilt) return inner;
    return (
      <TiltCard className="rounded-2xl" intensity={10}>
        {inner}
      </TiltCard>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
