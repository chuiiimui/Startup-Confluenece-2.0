import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface VisionCardProps {
  children: React.ReactNode;
  className?: string;
}

const VisionCard: React.FC<VisionCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Mouse position values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotations (to remove jitter)
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Map 0-1 range to degrees:
  // mouse at 0 (left edge) -> rotateY(-6deg)
  // mouse at 1 (right edge) -> rotateY(6deg)
  // mouse at 0 (top edge) -> rotateX(4deg)  (tilt up)
  // mouse at 1 (bottom edge) -> rotateX(-4deg) (tilt down)
  const rotateY = useTransform(smoothMouseX, [0, 1], [-6, 6]);
  const rotateX = useTransform(smoothMouseY, [0, 1], [4, -4]);
  
  // Spotlight position (in percentage for radial gradient)
  const spotlightX = useTransform(smoothMouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(smoothMouseY, [0, 1], [0, 100]);
  
  // Opacity of the spotlight (fade in when hovered)
  const spotlightOpacity = useMotionValue(0);
  const smoothOpacity = useSpring(spotlightOpacity, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position as a normalized value between 0 and 1
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    spotlightOpacity.set(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to center smoothly
    mouseX.set(0.5);
    mouseY.set(0.5);
    spotlightOpacity.set(0);
  };

  return (
    <div 
      className="relative [perspective:1300px] w-full"
      style={{ WebkitPerspective: 1300 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? '0 30px 60px -12px rgba(11, 42, 107, 0.15), 0 0 0 1px rgba(11, 42, 107, 0.1) inset' 
            : '0 10px 40px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03) inset'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative w-full rounded-3xl border-2 [transform-style:preserve-3d] transition-colors duration-300 ${className}`}
        style={{
          rotateX,
          rotateY,
          background: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Animated Border Draw (Two-Way) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-50" 
          style={{ padding: '1px' }} // Accommodate the 2px stroke
        >
          {/* Line 1: Starts Top-Left, draws clockwise to Bottom-Right */}
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="23"
            fill="none"
            stroke="#E66E00"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isHovered ? 0.51 : 0, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Line 2: Starts Bottom-Right, draws clockwise to Top-Left */}
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="23"
            fill="none"
            stroke="#E66E00"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isHovered ? 0.51 : 0, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: "50%", originY: "50%", rotate: 180 }}
          />
        </svg>

        {/* Dynamic Spotlight Layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: smoothOpacity,
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,122,0,0.15), transparent 40%)`
            )
          }}
        />

        {/* Content Layer Container */}
        <div className="relative z-10 w-full h-full [transform-style:preserve-3d]">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default VisionCard;
