import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hover = true, glow = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`relative rounded-2xl p-6 backdrop-blur-xl transition-colors ${
          glow ? 'hover:border-accent/[0.5]' : ''
        } ${className}`}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}
        whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        {glow && (
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-accent/20 blur-xl" />
          </div>
        )}
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
