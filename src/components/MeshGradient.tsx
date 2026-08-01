import React from 'react';
import { motion } from 'framer-motion';

const MeshGradient: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-50" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Primary blob */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full blur-[120px]"
        style={{ background: 'var(--gradient-mesh-1)' }}
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
      {/* Accent blob */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full blur-[120px]"
        style={{ background: 'var(--gradient-mesh-2)' }}
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
      {/* Tertiary blob */}
      <motion.div
        className="absolute left-1/4 top-1/3 h-1/3 w-1/3 rounded-full blur-[100px]"
        style={{ background: 'var(--gradient-mesh-3)' }}
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
      {/* Ambient white-blue glow */}
      <motion.div
        className="absolute top-0 left-1/3 w-2/3 h-1/2 rounded-full blur-[150px]"
        style={{ background: 'rgba(224, 236, 255, 0.5)' }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default MeshGradient;
