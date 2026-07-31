import React from 'react';
import { motion } from 'framer-motion';

const MeshGradient: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-dark -z-50">
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/30 blur-[120px]"
        animate={{
          x: ['0%', '20%', '0%'],
          y: ['0%', '20%', '0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-accent/20 blur-[120px]"
        animate={{
          x: ['0%', '-20%', '0%'],
          y: ['0%', '-20%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute left-1/4 top-1/3 h-1/3 w-1/3 rounded-full bg-blue-600/20 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default MeshGradient;
