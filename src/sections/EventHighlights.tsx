import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { highlights } from '../data/highlights';

export default function EventHighlights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 relative" id="highlights" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <SectionHeading 
            badge="Highlights"
            title="Event Highlights"
            align="center"
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {highlights.map((highlight, index) => {
            // Dynamically get the icon component
            const Icon = (LucideIcons as any)[highlight.icon] || LucideIcons.Star;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: '0 20px 40px -15px rgba(255, 122, 0, 0.2)'
                }}
                className="relative flex flex-col p-8 rounded-3xl backdrop-blur-md border overflow-hidden group transition-colors duration-300 hover:border-[#FF7A00]/50"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-[#0B2A6B]/20 flex items-center justify-center mb-6 group-hover:bg-[#FF7A00]/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#FF7A00]" />
                </div>

                <h3 className="font-heading font-bold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>
                  {highlight.title}
                </h3>
                
                <p className="font-body text-sm leading-relaxed flex-grow" style={{ color: 'var(--text-secondary)' }}>
                  {highlight.description}
                </p>

                {/* Bottom gradient glow */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FF7A00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
