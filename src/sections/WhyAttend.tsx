import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Banknote,
  Network,
  Briefcase,
  Rocket,
  Globe,
  Shield,
  Star,
  BookOpen,
} from 'lucide-react';
import { benefits } from '../data/benefits';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';

const iconMap: Record<string, React.ElementType> = {
  Users,
  Banknote,
  Network,
  Briefcase,
  Rocket,
  Globe,
  Shield,
  Star,
  BookOpen,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, x: -24 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyAttend() {
  return (
    <section id="why-attend" className="py-24 relative z-10 overflow-hidden" >
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <SectionHeading badge="Why Attend" title="Why You Should Be There" />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefits.map((benefit) => {
            const IconComponent = iconMap[benefit.icon] || Star;
            return (
              <motion.div key={benefit.id} variants={itemVariants}>
              <TiltCard
                className="clay-card clay-card--media group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[32px] transition-all duration-500 hover:border-orange-300/45 md:min-h-[380px]"
                intensity={11}
              >
                {benefit.image && (
                  <div className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-[32px]">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 35%, color-mix(in srgb, var(--bg) 55%, transparent) 100%)',
                      }}
                    />
                  </div>
                )}

                <div className="media-card-copy relative z-30 m-4 mt-auto p-5 md:m-5 md:p-6">
                  <div className="clay-icon mb-3 flex h-11 w-11 items-center justify-center rounded-full md:mb-4 md:h-12 md:w-12">
                    <IconComponent
                      className="h-5 w-5 md:h-6 md:w-6"
                      style={{ color: 'var(--brand-orange)' }}
                    />
                  </div>

                  <h3 className="media-card-title mb-2 font-heading text-base tracking-tight md:text-xl">
                    {benefit.title}
                  </h3>

                  <p className="media-card-body font-body text-sm leading-relaxed md:text-[0.95rem]">
                    {benefit.description}
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
