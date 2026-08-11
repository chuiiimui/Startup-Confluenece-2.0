import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import { highlights } from '../data/highlights';
import { usePerfMode } from '../hooks/usePerfMode';

export default function EventHighlights() {
  const { enableHeavyBlur } = usePerfMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: enableHeavyBlur ? 0.15 : 0.08 },
    },
  };

  const cardVariants = enableHeavyBlur
    ? {
        hidden: { opacity: 0, x: 80, y: 24, filter: 'blur(10px)', scale: 0.96 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as const },
        },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <section className="py-24 relative overflow-hidden" id="highlights" >
      {/* Soft field accents — no giant live blur filters */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full"
          style={{ background: 'color-mix(in srgb, var(--brand-blue-deep) 18%, transparent)' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full"
          style={{ background: 'color-mix(in srgb, var(--brand-orange) 16%, transparent)' }}
        />
        <div
          className="absolute left-[60%] top-[40%] h-[30%] w-[30%] rounded-full"
          style={{ background: 'color-mix(in srgb, var(--brand-sky) 18%, transparent)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="mb-16">
          <SectionHeading 
            badge="Highlights"
            title="Event Highlights"
            align="center"
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[280px] md:auto-rows-[420px] lg:auto-rows-[480px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {highlights.map((highlight, index) => {
            const Icon = (LucideIcons as any)[highlight.icon] || LucideIcons.Star;
            
            // Bento logic: 
            // Index 0 (Keynote): spans 2 columns on lg
            // Index 1 (Pitching): spans 1 column
            // Index 2 (Expo): spans 1 column
            // Index 3 (To Be Revealed): spans 2 columns on lg
            const isLargeCard = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={isLargeCard ? 'lg:col-span-2' : 'lg:col-span-1'}
              >
              <TiltCard
                className="clay-card clay-card--media group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[32px] transition-all duration-500 md:min-h-[420px] lg:min-h-[480px]"
                intensity={10}
              >
                {highlight.image && (
                  <div className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-[32px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url('${highlight.image}')` }}
                    />
                  </div>
                )}

                <div className="media-card-copy relative z-30 m-5 mt-auto p-6 md:m-7 md:p-8">
                  <div className="clay-icon mb-3 flex h-12 w-12 items-center justify-center rounded-full md:mb-4 md:h-14 md:w-14">
                    <Icon
                      className="h-6 w-6 md:h-7 md:w-7"
                      style={{ color: 'var(--brand-orange)' }}
                    />
                  </div>

                  <h3 className="media-card-title mb-2 font-heading text-lg tracking-tight md:text-3xl">
                    {highlight.title}
                  </h3>

                  <p className="media-card-body font-body text-base leading-relaxed md:text-lg">
                    {highlight.description}
                  </p>
                </div>
              </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
