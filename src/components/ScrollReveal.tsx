import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const appleEase = [0.22, 1, 0.36, 1] as const;

const presets: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 72, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: appleEase },
    },
  },
  fade: {
    hidden: { opacity: 0, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: appleEase },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: appleEase },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -72, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: appleEase },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 72, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: appleEase },
    },
  },
  rise: {
    hidden: { opacity: 0, y: 96, scale: 0.96, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.15, ease: appleEase },
    },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof presets;
  delay?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const base = presets[variant];
  const variants: Variants = {
    hidden: base.hidden,
    visible: {
      ...(base.visible as object),
      transition: {
        ...((base.visible as { transition?: object }).transition || {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.18, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  );
}
