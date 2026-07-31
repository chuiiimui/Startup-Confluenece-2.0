import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9999] h-[2px] w-full origin-left bg-gradient-to-r from-primary to-accent"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
