import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePerfMode } from '../hooks/usePerfMode';

const appleEase = [0.22, 1, 0.36, 1] as const;

const heavyPresets: Record<string, Variants> = {
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

const lightPresets: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: appleEase } },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35, ease: appleEase } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: appleEase } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: appleEase } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: appleEase } },
  },
  rise: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: appleEase } },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof heavyPresets;
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
  const { reduceMotion } = usePerfMode();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const presets = lightPresets; // avoid filter:blur animations globally for scroll FPS
  const base = presets[variant] ?? heavyPresets[variant];
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
