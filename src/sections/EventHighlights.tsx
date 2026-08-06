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
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };



  return (
    <section className="py-24 relative overflow-hidden" id="highlights" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Mesh Gradient Background Effect */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0A2E6D]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#FF7A1A]/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-[#16B8CC]/10 blur-[120px]" />
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
                className={`relative rounded-[32px] overflow-hidden group flex flex-col justify-end bg-white ${
                  isLargeCard ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
                whileHover={{ 
                  y: -12,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  boxShadow: '0 20px 60px rgba(15,23,42,0.08)'
                }}
              >
                {/* Background Image */}
                {highlight.image && (
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[32px] z-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                      style={{ 
                        backgroundImage: `url('${highlight.image}')`,
                        filter: 'brightness(0.9) contrast(1.05)'
                      }}
                    />
                  </div>
                )}

                {/* Subtle Image Overlay for text readability */}
                <div 
                  className="absolute inset-0 z-10 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 40%, rgba(10,46,109,0.35) 100%)'
                  }}
                />
                
                {/* Additional Hover Darkening */}
                <div className="absolute inset-0 z-10 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Reflection Sweep */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[32px]">
                  <div className="absolute -top-[100%] -bottom-[100%] left-[-100%] w-[30%] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 group-hover:left-[200%] transition-all duration-[1.2s] ease-in-out opacity-0 group-hover:opacity-100" />
                </div>

                {/* Text Content */}
                <div className="relative z-30 p-8 md:p-10 flex flex-col items-start transition-colors duration-500 mt-auto">
                  {/* Glass Icon Badge */}
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-white/40"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#FFFFFF]" />
                  </div>

                  <h3 
                    className="font-heading font-bold text-2xl md:text-3xl mb-2 tracking-tight transition-transform duration-500 group-hover:-translate-y-1" 
                    style={{ 
                      color: '#FFFFFF',
                      textShadow: '0 4px 20px rgba(0,0,0,0.35)'
                    }}
                  >
                    {highlight.title}
                  </h3>
                  
                  <p 
                    className="font-body text-base md:text-lg leading-relaxed transition-opacity duration-500 opacity-90 group-hover:opacity-100" 
                    style={{ 
                      color: 'rgba(255,255,255,0.92)',
                      textShadow: '0 2px 12px rgba(0,0,0,0.25)'
                    }}
                  >
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
