import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const appleEase = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    filter: 'blur(10px)',
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.05,
      ease: appleEase,
    },
  },
};

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Stronger full-section entrance used for page rhythm.
 */
export default function SectionReveal({
  children,
  className = '',
  delay = 0,
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -8% 0px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
