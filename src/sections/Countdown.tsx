import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { EVENT_DATE } from '../constants';
import SectionHeading from '../components/SectionHeading';

function FlipCard({ value, label }: { value: number; label: string }) {
  const formattedValue = value < 10 ? `0${value}` : value.toString();

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative w-24 h-32 md:w-32 md:h-40 rounded-2xl backdrop-blur-md border flex items-center justify-center overflow-hidden [perspective:1000px] shadow-lg"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Top half */}
        <div className="absolute top-0 left-0 w-full h-1/2 z-10" style={{ backgroundColor: 'var(--bg)', opacity: 0.2, borderBottom: '1px solid var(--border)' }} />
        
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedValue}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="font-heading font-bold text-5xl md:text-7xl z-20"
            style={{ transformOrigin: 'bottom center', color: 'var(--text-primary)' }}
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>

        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF7A00]/10 to-transparent opacity-50" />
      </div>
      <span className="mt-2 md:mt-4 text-sm md:text-base font-body uppercase tracking-widest font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

  return (
    <section className="py-12 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#0B2A6B]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-8 md:mb-16">
          <SectionHeading 
            badge="Mark Your Calendar"
            title="The Countdown Begins"
            align="center"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          <FlipCard value={days} label="Days" />
          <FlipCard value={hours} label="Hours" />
          <FlipCard value={minutes} label="Minutes" />
          <FlipCard value={seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
