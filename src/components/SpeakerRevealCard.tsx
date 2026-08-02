import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface SpeakerRevealCardProps {
  speaker: {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    bio: string;
  };
  isMobile?: boolean;
}

export default function SpeakerRevealCard({ speaker, isMobile = false }: SpeakerRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isRevealed = isMobile || isHovered;

  // Custom cinematic easing
  const cinematicEase = [0.77, 0, 0.18, 1];

  const initials = speaker.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <motion.div
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-xl border"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={() => !isMobile && setIsHovered(!isHovered)}
    >
      {/* 
        ==================================================
        REVEALED STATE (Background Layer)
        ==================================================
      */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B2A6B]/20 to-accent/10"
        initial={{ scale: 1 }}
        animate={{ scale: isRevealed ? 1.05 : 1 }}
        transition={{ duration: 10, ease: "linear" }}
      >
        {/* Fallback pattern/initials if image is not fully opaque */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-9xl font-bold font-heading">{initials}</span>
        </div>

        {/* Soft Spotlight Effect */}
        <motion.div 
          className="absolute inset-0 opacity-0"
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
        />

        {/* Glass Overlay for Text Readability */}
        <div 
          className="absolute inset-0 bg-white/5" 
          style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }} 
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 60%)' }} />

        {/* Revealed Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.3, ease: cinematicEase }}
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {speaker.name}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.4, ease: cinematicEase }}
          >
            <p className="text-base font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              {speaker.role}
            </p>
            <p className="text-sm font-bold tracking-widest uppercase text-accent mb-6">
              {speaker.company}
            </p>
          </motion.div>

          {/* Social Icons & Actions */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          >
            <a href="#" onClick={e => e.preventDefault()} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors duration-300" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" onClick={e => e.preventDefault()} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors duration-300" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" onClick={e => e.preventDefault()} className="flex-1 h-10 rounded-full border flex items-center justify-center gap-2 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 group" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)', background: 'var(--surface-hover)' }}>
              <span className="text-xs font-semibold uppercase tracking-wider">Profile</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* 
        ==================================================
        DEFAULT STATE (Sliding Panels Layer)
        ==================================================
      */}
      {/* Left Panel - Only render if not mobile to save performance since it's always open on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full z-20 border-r"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'rgba(255,122,0,0.1)' }}
          initial={{ x: 0 }}
          animate={{ x: isRevealed ? '-100%' : 0 }}
          transition={{ duration: 0.8, ease: cinematicEase, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-white/40" style={{ backdropFilter: 'blur(20px)' }} />
        </motion.div>
      )}

      {/* Right Panel */}
      {!isMobile && (
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full z-20 border-l"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'rgba(255,122,0,0.1)' }}
          initial={{ x: 0 }}
          animate={{ x: isRevealed ? '100%' : 0 }}
          transition={{ duration: 0.8, ease: cinematicEase, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-white/40" style={{ backdropFilter: 'blur(20px)' }} />
        </motion.div>
      )}

      {/* Center Seam Glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-30 bg-accent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isRevealed ? { opacity: [0, 1, 0], scaleY: [0, 1, 1], width: [2, 4, 10] } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ boxShadow: '0 0 20px rgba(255,122,0,0.8)' }}
      />

      {/* Default State Content (Typography) */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isRevealed ? 0 : 1, scale: isRevealed ? 1.1 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="border border-accent/20 px-6 py-3 rounded-full mb-6 bg-accent/5 backdrop-blur-md">
            <span className="text-accent font-bold tracking-widest uppercase text-xs">Featured</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-center tracking-tight leading-tight mb-8" style={{ color: 'var(--text-primary)' }}>
            KEYNOTE<br />SPEAKER
          </h3>

          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: 'var(--text-muted)' }}>
              Hover To Reveal
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
