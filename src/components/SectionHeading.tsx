import React from 'react';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
}) => {
  const alignClasses = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <motion.div
      className={`flex flex-col mb-12 ${alignClasses}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {badge && (
        <motion.div
          variants={itemVariants}
          className="mb-4 inline-flex items-center rounded-full border border-accent/50 bg-accent/10 px-3 py-1"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            {badge}
          </span>
        </motion.div>
      )}
      
      <motion.h2
        variants={itemVariants}
        className="mb-6 font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
