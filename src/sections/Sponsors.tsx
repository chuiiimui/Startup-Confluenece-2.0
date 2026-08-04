import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sponsors } from '../data/sponsors';
import SectionHeading from '../components/SectionHeading';

const MarqueeRow = ({ sponsors, speed, direction = 'left', tierClass, name }: { sponsors: any[], speed: number, direction?: 'left' | 'right', tierClass: string, name: string }) => {
  // Duplicate array for infinite scroll effect
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="relative mb-16 w-full">
      <div className="text-center mb-6">
        <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border glass ${tierClass}`} style={{ borderColor: 'var(--border)' }}>
          {name}
        </span>
      </div>
      
      <div className="flex overflow-hidden group mask-horizontal">
        <motion.div
          animate={{
            x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%']
          }}
          transition={{
            duration: speed,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex gap-6 shrink-0 group-hover:[animation-play-state:paused]"
          style={{ width: 'fit-content' }}
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`${sponsor.id}-${index}`}
              className="w-48 sm:w-64 h-32 shrink-0 glass rounded-2xl border hover:border-white/30 transition-colors flex items-center justify-center relative overflow-hidden"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Fallback styling for sponsor logo */}
              <div className="absolute inset-0 opacity-50" style={{ background: 'linear-gradient(to bottom right, var(--surface), transparent)' }} />
              {sponsor.logo ? (
                <img src={sponsor.logo} alt={sponsor.name} className="max-w-[70%] max-h-[60%] object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              ) : (
                <span className="font-heading font-bold text-xl tracking-wide" style={{ color: 'var(--text-secondary)' }}>{sponsor.name}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Sponsors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="sponsors" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} ref={containerRef}>
      {/* Background Elements */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px] mix-blend-screen" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <SectionHeading 
          badge="Sponsors" 
          title="Our Sponsors & Partners" 
          alignment="center"
        />

        <div className="mt-16 relative">
          <MarqueeRow 
            name="Incubation & Technology Partners" 
            sponsors={sponsors.filter(s => s.tier === 'incubation' || s.tier === 'technology')} 
            speed={35} 
            direction="left"
            tierClass="text-purple-400 bg-purple-500/10 border-purple-500/20"
          />
          
          <MarqueeRow 
            name="Media & Ecosystem Partners" 
            sponsors={sponsors.filter(s => s.tier === 'media' || s.tier === 'ecosystem')} 
            speed={45} 
            direction="right"
            tierClass="text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
          />
          
          <MarqueeRow 
            name="Community Partners" 
            sponsors={sponsors.filter(s => s.tier === 'community')} 
            speed={40} 
            direction="left"
            tierClass="bg-gray-500/10 border-gray-500/20 text-[var(--text-secondary)]"
          />
        </div>
      </div>
      
      {/* Global CSS for the fade mask on edges of marquee */}
      <style>{`
        .mask-horizontal {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
};

export default Sponsors;
