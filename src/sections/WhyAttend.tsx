import React from 'react';
import { motion } from 'framer-motion';
import { Users, Banknote, Network, Briefcase, Lightbulb, Rocket, Target, Zap, Globe, Shield, Star, Award, BookOpen, Coffee, Cpu, Activity } from 'lucide-react';
import { benefits } from '../data/benefits';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';

const iconMap: Record<string, React.ElementType> = {
  Users, Banknote, Network, Briefcase, Lightbulb, Rocket, Target, Zap, Globe, Shield, Star, Award, BookOpen, Coffee, Cpu, Activity
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
          {benefits.map((benefit: any) => {
            const IconComponent = iconMap[benefit.icon] || Star;
            return (
              <motion.div key={benefit.id} variants={itemVariants}>
              <TiltCard
                className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[32px] md:min-h-[380px]"
                intensity={11}
                style={{
                  boxShadow: '0 20px 60px rgba(79,70,229,0.12)',
                }}
              >
                {/* Background Image */}
                {benefit.image && (
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[32px] z-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                      style={{ 
                        backgroundImage: `url('${benefit.image}')`,
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
                <div className="relative z-30 p-8 flex flex-col items-start transition-colors duration-500 mt-auto">
                  {/* Glass Icon Badge */}
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-white/40"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-[#FFFFFF]" />
                  </div>

                  <h3 
                    className="font-heading font-bold text-base md:text-2xl mb-2 tracking-tight transition-transform duration-500 group-hover:-translate-y-1" 
                    style={{ 
                      color: '#FFFFFF',
                      textShadow: '0 4px 20px rgba(0,0,0,0.35)'
                    }}
                  >
                    {benefit.title}
                  </h3>
                  
                  <p 
                    className="font-body text-sm md:text-base leading-relaxed transition-opacity duration-500 opacity-90 group-hover:opacity-100" 
                    style={{ 
                      color: 'rgba(255,255,255,0.92)',
                      textShadow: '0 2px 12px rgba(0,0,0,0.25)'
                    }}
                  >
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
