import React from 'react';
import { motion } from 'framer-motion';

interface PillCtaProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  tone?: 'orange' | 'blue' | 'gradient';
  size?: 'md' | 'lg';
}

/** Pill CTA — deep violet → pink → orange hierarchy. */
export default function PillCta({
  children,
  icon,
  onClick,
  href,
  className = '',
  tone = 'gradient',
  size = 'md',
}: PillCtaProps) {
  const shell =
    tone === 'blue'
      ? 'text-white border border-violet-300/30 shadow-[0_14px_32px_rgba(124,58,237,0.35)]'
      : tone === 'orange'
        ? 'text-white border border-orange-300/40 shadow-[0_14px_32px_rgba(255,122,0,0.35)]'
        : 'text-white border border-white/15 shadow-[0_16px_40px_rgba(168,85,247,0.35)]';

  const shellStyle =
    tone === 'blue'
      ? {
          background: 'linear-gradient(105deg, #7C3AED 0%, #A855F7 100%)',
        }
      : tone === 'orange'
        ? {
            background: 'var(--brand-orange)',
          }
        : {
            background:
              'linear-gradient(105deg, #7C3AED 0%, #DB2777 48%, #FF7A00 100%)',
          };

  const circle =
    tone === 'blue'
      ? 'bg-white text-[#7C3AED]'
      : tone === 'orange'
        ? 'bg-white text-[color:var(--brand-orange)]'
        : 'bg-white text-[#7C3AED]';

  const isLg = size === 'lg';

  const content = (
    <>
      <span
        className={`relative z-10 pl-1 pr-2 font-bold uppercase tracking-[0.14em] ${
          isLg ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
        }`}
      >
        {children}
      </span>
      <span
        className={`relative z-10 flex shrink-0 items-center justify-center rounded-full shadow-[0_10px_22px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 ${
          isLg ? 'h-14 w-14' : 'h-11 w-11 sm:h-12 sm:w-12'
        } ${circle}`}
      >
        {icon}
      </span>
    </>
  );

  const classes = `group inline-flex items-center gap-3 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(168,85,247,0.35)] ${
    isLg ? 'gap-4 py-2 pl-8 pr-2' : 'py-1.5 pl-6 pr-1.5'
  } ${shell} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        style={shellStyle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-cursor="link"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      style={shellStyle}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="link"
    >
      {content}
    </motion.button>
  );
}
