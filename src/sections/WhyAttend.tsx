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
    <section id="why-attend" className="py-24 bg-dark relative z-10 overflow-hidden">
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
                className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden hover:scale-[1.03] transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.05] transition-colors duration-500 z-0" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
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
