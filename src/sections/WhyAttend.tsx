import React from 'react';
import { motion } from 'framer-motion';
import { Users, Banknote, Network, Briefcase, Lightbulb, Rocket, Target, Zap, Globe, Shield, Star, Award, BookOpen, Coffee, Cpu, Activity } from 'lucide-react';
import { benefits } from '../data/benefits';
import SectionHeading from '../components/SectionHeading';

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
    <section id="why-attend" className="py-24 relative z-10 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-4 max-w-7xl">
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
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                className="group relative p-8 rounded-[2rem] border backdrop-blur-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-[0_20px_40px_rgba(255,122,0,0.15)]"
                style={{ background: 'linear-gradient(145deg, var(--surface) 0%, rgba(255,255,255,0.02) 100%)', borderColor: 'var(--border)' }}
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] transition-colors duration-500 z-0" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20 flex items-center justify-center mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,122,0,0.1)]">
                    <IconComponent className="w-8 h-8 text-accent drop-shadow-[0_0_10px_rgba(255,122,0,0.5)]" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-accent transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {benefit.description}
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
