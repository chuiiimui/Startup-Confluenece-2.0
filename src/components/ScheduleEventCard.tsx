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
      case 'keynote':
        return 'bg-violet-500/15 text-[color:var(--badge-text)] border-violet-400/35';
      case 'workshop':
        return 'bg-sky-500/15 text-sky-700 border-sky-400/35';
      case 'networking':
        return 'bg-emerald-500/15 text-emerald-700 border-emerald-400/35';
      case 'pitch':
        return 'bg-violet-500/20 text-[color:var(--badge-text)] border-violet-400/40';
      case 'break':
        return 'bg-[color:var(--surface)] text-[color:var(--text-secondary)] border-[color:var(--border)]';
      default:
        return 'bg-violet-500/15 text-[color:var(--badge-text)] border-violet-400/35';
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
      {/* Desktop timeline */}
      <div className="hidden md:flex flex-col items-end w-48 shrink-0 pr-8 py-6 relative">
        <div
          className={`absolute right-0 top-0 w-px ${isLast ? 'bottom-0' : '-bottom-6'}`}
          style={{ backgroundColor: 'var(--border)' }}
        />

        <motion.div
          className={`absolute right-0 top-0 w-[2px] bg-accent origin-top shadow-[0_0_10px_rgba(255,122,0,0.8)] ${isLast ? 'bottom-0' : '-bottom-6'}`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'circOut' }}
          style={{ translateX: '0.5px' }}
        />

        <div
          className="absolute right-[-4px] top-8 w-2 h-2 rounded-full ring-4 z-10 transition-colors duration-300"
          style={
            {
              backgroundColor: isHovered ? '#FF7A00' : 'var(--accent)',
              '--tw-ring-color': 'var(--bg)',
              boxShadow: isHovered ? '0 0 15px rgba(255,122,0,0.8)' : 'none',
            } as React.CSSProperties
          }
        />

        <motion.div
          className="absolute right-[-7px] top-[29px] w-4 h-4 rounded-full bg-accent/30 pointer-events-none z-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute right-[-14px] top-[22px] w-7 h-7 rounded-full border border-accent pointer-events-none z-0"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        <motion.span
          className="text-accent font-mono font-medium text-lg relative z-20"
          animate={{ y: isHovered ? -4 : 0, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {event.time}
        </motion.span>
      </div>

      <div className="flex-1 md:pl-8 pb-6 md:pb-8">
        {/* Mobile clay card */}
        <div
          className={`clay-card md:hidden relative rounded-[24px] px-5 py-4 cursor-pointer ${isExpanded ? 'is-active' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="clay-card-highlight absolute inset-x-3 top-0 h-10 rounded-full opacity-70" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-1">
              <span
                className="font-mono font-bold text-sm tracking-widest"
                style={{ color: 'var(--badge-text)' }}
              >
                {event.time}
              </span>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FiChevronDown style={{ color: 'var(--text-muted)' }} />
              </motion.div>
            </div>
            <h3
              className="text-xl font-heading font-semibold mb-3 leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {event.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(event.type)}`}
              >
                {event.type}
              </span>
              {event.location && (
                <span
                  className="flex items-center text-xs font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
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
                  <p
                    className="text-sm mt-3"
                    style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}
                  >
                    {event.description}
                  </p>
                  {event.speaker && (
                    <p
                      className="text-sm mt-3 font-medium inline-block rounded-xl border px-3 py-1.5"
                      style={{
                        borderColor: 'var(--border-strong)',
                        background: 'var(--surface)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Speaker:{' '}
                      <span style={{ color: 'var(--text-primary)' }}>{event.speaker}</span>
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop clay card */}
        <motion.div
          className={`clay-card hidden md:block rounded-[28px] p-6 relative overflow-hidden ${isHovered ? 'is-active' : ''}`}
          animate={{
            y: isHovered ? -10 : 0,
            scale: isHovered ? 1.01 : 1,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="clay-card-highlight absolute inset-x-4 top-0 h-12 rounded-full opacity-65" />

          <motion.div
            className="absolute inset-0 z-0 pointer-events-none mix-blend-soft-light"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(196,181,253,0.4) 50%, transparent 100%)',
              width: '50%',
            }}
          />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2 gap-4">
              <motion.h3
                className="text-xl font-heading font-semibold"
                style={{ color: 'var(--text-primary)' }}
                animate={{ scale: isHovered ? 1.02 : 1, originX: 0 }}
                transition={{ duration: 0.4 }}
              >
                {event.title}
              </motion.h3>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(event.type)}`}
                >
                  {event.type}
                </span>
                <motion.div
                  animate={{
                    rotate: isHovered ? 45 : 0,
                    x: isHovered ? 4 : 0,
                    opacity: isHovered ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <FiArrowRight className="w-5 h-5" style={{ color: 'var(--badge-text)' }} />
                </motion.div>
              </div>
            </div>

            {event.speaker && (
              <motion.p
                className="text-sm font-medium mb-3"
                style={{ color: 'var(--text-secondary)' }}
                animate={{ opacity: isHovered ? 1 : 0.85 }}
                transition={{ duration: 0.4 }}
              >
                By <span style={{ color: 'var(--text-primary)' }}>{event.speaker}</span>
              </motion.p>
            )}

            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              {event.description}
            </p>

            {event.location && (
              <motion.div
                className="flex items-center text-sm"
                style={{ color: 'var(--badge-text)' }}
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.4 }}
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
