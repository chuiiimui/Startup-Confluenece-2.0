import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  const cinematicEase = [0.77, 0, 0.18, 1];

  const initials = speaker.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div
      className="speaker-card relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(155deg, var(--clay-blue-from), var(--clay-blue-mid), var(--clay-blue-to))',
        backdropFilter: 'blur(20px) saturate(170%)',
        WebkitBackdropFilter: 'blur(20px) saturate(170%)',
        border: '2px solid var(--clay-border)',
        boxShadow: 'var(--clay-shadow)',
        color: 'var(--clay-text)',
        isolation: 'isolate',
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => !isMobile && setIsHovered(!isHovered)}
    >
      {/* Clay sheen — replicates .clay-card::before */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          zIndex: 1,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 28%, transparent 52%)',
        }}
      />

      {/* 
        ==================================================
        REVEALED STATE (Background Layer) — z-index: 3
        ==================================================
      */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 3,
          background:
            'linear-gradient(145deg, color-mix(in srgb, var(--brand-blue-deep) 18%, transparent), color-mix(in srgb, var(--brand-orange) 12%, transparent))',
        }}
      >
        {/* Fallback initials watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-9xl font-bold font-heading">{initials}</span>
        </div>

        {/* Soft Spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: isRevealed ? 1 : 0,
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
          }}
        />

        {/* Glass overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        />

        {/* Bottom gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 60%)' }}
        />

        {/* Revealed Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8">
          {isMobile ? (
            /* ---- MOBILE: always visible, no animation ---- */
            <>
              <h3
                className="text-lg font-heading font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {speaker.name}
              </h3>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                {speaker.role}
              </p>
              <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">
                {speaker.company}
              </p>
              <div className="flex items-center gap-3">
                <a href="#" onClick={e => e.preventDefault()} className="clay-chip flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300" style={{ color: 'var(--brand-blue-deep)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" onClick={e => e.preventDefault()} className="clay-chip flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300" style={{ color: 'var(--brand-blue-deep)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" onClick={e => e.preventDefault()} className="clay-pill group flex h-9 flex-1 items-center justify-center gap-2 rounded-full transition-all duration-300" style={{ color: 'var(--text-primary)' }}>
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Profile</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </>
          ) : (
            /* ---- DESKTOP: fade in on hover, NO vertical movement ---- */
            <>
              <div
                className="transition-opacity duration-500"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transitionDelay: isRevealed ? '0.35s' : '0s',
                }}
              >
                <h3
                  className="text-xl md:text-3xl font-heading font-bold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {speaker.name}
                </h3>
              </div>

              <div
                className="transition-opacity duration-500"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transitionDelay: isRevealed ? '0.45s' : '0s',
                }}
              >
                <p className="text-base font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                  {speaker.role}
                </p>
                <p className="text-sm font-bold tracking-widest uppercase text-accent mb-6">
                  {speaker.company}
                </p>
              </div>

              <div
                className="flex items-center gap-3 transition-opacity duration-400"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transitionDelay: isRevealed ? '0.55s' : '0s',
                }}
              >
                <a href="#" onClick={e => e.preventDefault()} className="clay-chip flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-accent hover:text-[color:var(--text-inverse)]" style={{ color: 'var(--brand-blue-deep)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" onClick={e => e.preventDefault()} className="clay-chip flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-accent hover:text-[color:var(--text-inverse)]" style={{ color: 'var(--brand-blue-deep)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" onClick={e => e.preventDefault()} className="clay-pill group flex h-10 flex-1 items-center justify-center gap-2 rounded-full transition-all duration-300 hover:bg-accent hover:text-[color:var(--text-inverse)]" style={{ color: 'var(--text-primary)' }}>
                  <span className="text-xs font-semibold uppercase tracking-wider">Profile</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 
        ==================================================
        SLIDING PANELS (Desktop only) — z-index: 10
        Two panels sitting on top of the revealed content.
        On hover they slide apart in opposite directions.
        ==================================================
      */}
      {!isMobile && (
        <>
          {/* Left Panel */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full border-r"
            style={{
              zIndex: 10,
              background: 'var(--speaker-panel-left)',
              borderColor: 'var(--speaker-panel-border-l)',
            }}
            initial={false}
            animate={{ x: isRevealed ? '-100%' : '0%' }}
            transition={{ duration: 0.8, ease: cinematicEase }}
          />

          {/* Right Panel */}
          <motion.div
            className="absolute top-0 right-0 h-full w-1/2 border-l"
            style={{
              zIndex: 10,
              background: 'var(--speaker-panel-right)',
              borderColor: 'var(--speaker-panel-border-r)',
            }}
            initial={false}
            animate={{ x: isRevealed ? '100%' : '0%' }}
            transition={{ duration: 0.8, ease: cinematicEase }}
          />

          {/* Center Seam Glow */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-accent"
            style={{
              zIndex: 11,
              boxShadow: '0 0 20px rgba(255,122,0,0.8)',
            }}
            initial={false}
            animate={
              isRevealed
                ? { opacity: [0, 1, 0], scaleY: [0, 1, 1], width: [2, 4, 10] }
                : { opacity: 0, scaleY: 0 }
            }
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Default State Content (text on top of closed panels) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
            style={{
              zIndex: 15,
              opacity: isRevealed ? 0 : 1,
            }}
          >
            <div className="clay-pill clay-pill--coral mb-6 rounded-full px-6 py-3">
              <span className="text-accent font-bold tracking-widest uppercase text-xs">Featured</span>
            </div>

            <h3
              className="text-2xl md:text-4xl font-heading font-bold text-center tracking-tight leading-tight mb-6 md:mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              KEYNOTE<br />SPEAKER
            </h3>

            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: 'var(--text-muted)' }}>
                Hover To Reveal
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
