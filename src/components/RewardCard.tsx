import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Reward {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
}

interface RewardCardProps {
  reward: Reward;
}

export default function RewardCard({ reward }: RewardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for dynamic spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const spotlightX = useTransform(smoothMouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(smoothMouseY, [0, 1], [0, 100]);

  // Easing and Timing defined by user
  const appleEase = [0.22, 1, 0.36, 1];
  const duration = 0.6;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const Icon = reward.icon;

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full rounded-3xl overflow-hidden cursor-pointer flex flex-col"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={{
        y: isHovered ? -20 : 0,
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered
          ? '0 30px 60px -12px rgba(255, 122, 0, 0.15), 0 0 0 1px rgba(255, 122, 0, 0.4) inset'
          : '0 10px 40px -12px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05) inset',
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'var(--surface)',
      }}
      transition={{ duration, ease: appleEase }}
    >
      {/* 4. Soft orange spotlight appears behind content */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,122,0,0.15), transparent 60%)`
          ),
        }}
      />

      {/* 5. Reflection sweep passes across the surface */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
        initial={{ x: '-100%', y: '100%', opacity: 0 }}
        animate={{
          x: isHovered ? '100%' : '-100%',
          y: isHovered ? '-100%' : '100%',
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
        }}
      />

      <div className="relative z-20 p-8 text-center flex flex-col items-center h-full justify-center">
        {/* 8. Content layers move independently (Icon moves more) */}
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/20 border rounded-2xl flex items-center justify-center mb-6 relative z-10"
          style={{ borderColor: 'var(--border)' }}
          animate={{ y: isHovered ? -12 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration, ease: appleEase }}
        >
          <Icon className="w-8 h-8 text-accent drop-shadow-md" />
        </motion.div>

        {/* Text Content moves slightly */}
        <motion.div
          className="relative z-10"
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration, ease: appleEase }}
        >
          <h4 className="text-xl font-heading font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {reward.title}
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {reward.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
