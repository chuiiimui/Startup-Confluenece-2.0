import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiChevronDown, FiArrowRight } from 'react-icons/fi';

interface EventData {
  id: string;
  time: string;
  title: string;
  type: string;
  description: string;
  speaker?: string;
  location?: string;
}

interface ScheduleEventCardProps {
  event: EventData;
  index: number;
  isLast: boolean;
}

export default function ScheduleEventCard({ event, index, isLast }: ScheduleEventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'keynote': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'workshop': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'networking': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pitch': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'break': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-accent/20 text-accent border-accent/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex flex-col md:flex-row group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 
        ========================================
        DESKTOP TIMELINE (Left Column)
        ========================================
      */}
      <div className="hidden md:flex flex-col items-end w-48 shrink-0 pr-8 py-6 relative">
        {/* Vertical Line Base */}
        <div 
          className={`absolute right-0 top-0 w-px ${isLast ? 'bottom-0' : '-bottom-6'}`} 
          style={{ backgroundColor: 'var(--border)' }} 
        />
        
        {/* Animated Energy Flow Line */}
        <motion.div
          className={`absolute right-0 top-0 w-[2px] bg-accent origin-top shadow-[0_0_10px_rgba(255,122,0,0.8)] ${isLast ? 'bottom-0' : '-bottom-6'}`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          style={{ translateX: '0.5px' }} // 0.5px to center the 2px line over the 1px base
        />

        {/* Timeline Node Base Dot */}
        <div 
          className="absolute right-[-4px] top-8 w-2 h-2 rounded-full ring-4 z-10 transition-colors duration-300" 
          style={{ 
            backgroundColor: isHovered ? '#FF7A00' : 'var(--accent)', 
            '--tw-ring-color': 'var(--bg)',
            boxShadow: isHovered ? '0 0 15px rgba(255,122,0,0.8)' : 'none'
          } as React.CSSProperties} 
        />

        {/* Glowing Orb Overlay */}
        <motion.div
          className="absolute right-[-7px] top-[29px] w-4 h-4 rounded-full bg-accent/30 pointer-events-none z-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Infinite Ripple Rings */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute right-[-14px] top-[22px] w-7 h-7 rounded-full border border-accent pointer-events-none z-0"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Time Element */}
        <motion.span 
          className="text-accent font-mono font-medium text-lg relative z-20"
          animate={{ y: isHovered ? -4 : 0, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {event.time}
        </motion.span>
      </div>

      {/* 
        ========================================
        CONTENT CARD (Right Column)
        ========================================
      */}
      <div className="flex-1 md:pl-8 pb-6 md:pb-8">
        
        {/* MOBILE VIEW (Fluid Editorial Timeline) */}
        <div 
          className="md:hidden relative pl-6 py-4 cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Mobile Timeline Line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/30 to-transparent" />
          {/* Mobile Node Dot */}
          <div className="absolute left-0 top-[26px] w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>

          <div className="flex justify-between items-start mb-1">
            <span className="text-accent font-mono font-bold text-sm tracking-widest">{event.time}</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <FiChevronDown style={{ color: 'var(--text-muted)' }} />
            </motion.div>
          </div>
          <h3 className="text-xl font-heading font-semibold mb-3 leading-tight" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
          
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(event.type)}`}>
              {event.type}
            </span>
            {event.location && (
              <span className="flex items-center text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                <FiMapPin className="mr-1" /> {event.location}
              </span>
            )}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm mt-3" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {event.description}
                </p>
                {event.speaker && (
                  <p className="text-sm mt-3 font-medium bg-surface/50 inline-block px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
                    Speaker: <span style={{ color: 'var(--text-primary)' }}>{event.speaker}</span>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DESKTOP VIEW (Premium Hover Enhanced) */}
        <motion.div 
          className="hidden md:block rounded-xl p-6 border relative overflow-hidden"
          animate={{
            y: isHovered ? -12 : 0,
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.75)',
            borderColor: isHovered ? 'rgba(255, 122, 0, 0.25)' : 'var(--border)',
            boxShadow: isHovered ? '0 20px 40px -10px rgba(0,0,0,0.1), 0 0 20px rgba(255,122,0,0.1)' : '0 4px 20px -10px rgba(0,0,0,0.05)',
            backdropFilter: isHovered ? 'blur(32px)' : 'blur(16px)'
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ 
            WebkitBackdropFilter: isHovered ? 'blur(32px)' : 'blur(16px)' 
          }}
        >
          {/* Light Sweep Reflection */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
              width: '50%'
            }}
          />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <motion.h3 
                className="text-xl font-heading font-semibold"
                animate={{ scale: isHovered ? 1.02 : 1, originX: 0 }}
                transition={{ duration: 0.4 }}
                style={{ color: 'var(--text-primary)' }}
              >
                {event.title}
              </motion.h3>
              
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(event.type)}`}>
                  {event.type}
                </span>
                <motion.div
                  animate={{ rotate: isHovered ? 45 : 0, x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }}
                  transition={{ duration: 0.4 }}
                >
                  <FiArrowRight className="text-accent w-5 h-5" />
                </motion.div>
              </div>
            </div>
            
            {event.speaker && (
              <motion.p 
                className="text-sm font-medium mb-3"
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.4 }}
                style={{ color: 'var(--text-secondary)' }}
              >
                By <span style={{ color: 'var(--text-primary)' }}>{event.speaker}</span>
              </motion.p>
            )}
            
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>{event.description}</p>
            
            {event.location && (
              <motion.div 
                className="flex items-center text-sm"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ color: 'var(--text-muted)' }}
              >
                <FiMapPin className="mr-1.5" />
                {event.location}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
