import React from 'react';
import { motion } from 'framer-motion';
import RevealText from './RevealText';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  alignment?: 'left' | 'center';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align,
  alignment,
}) => {
  const resolvedAlign = align || alignment || 'center';
  const alignClasses =
    resolvedAlign === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <motion.div
      className={`mb-12 flex flex-col ${alignClasses}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35, margin: '0px 0px -8% 0px' }}
    >
      {badge && (
        <motion.div
          variants={itemVariants}
          className="mb-4 inline-flex items-center rounded-full px-3 py-1 backdrop-blur-md"
          style={{
            background: 'var(--badge-bg)',
            border: '1px solid var(--badge-border)',
          }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--badge-text)' }}
          >
            {badge}
          </span>
        </motion.div>
      )}

      <RevealText
        text={title}
        as="h2"
        className="mb-6 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
        style={{ color: 'var(--text-primary)' }}
        delay={0.05}
      />

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
