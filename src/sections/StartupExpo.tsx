import React, { useState, useEffect } from 'react';
import { useRegistration } from '../context/RegistrationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, HeartPulse, Leaf, ShoppingCart, Zap, Globe, Coins, Layers, HardHat, BookOpen,
  ArrowRight, Briefcase, Users, Radio, Handshake, Rocket, CheckCircle2
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { expoCategories } from '../data/expoCategories';

import { expoBenefits } from '../data/expoBenefits';

const iconMap: Record<string, React.ElementType> = {
  Cpu, HeartPulse, Leaf, ShoppingCart, Zap, Globe, Coins, Layers, HardHat, BookOpen,
  Briefcase, Users, Radio, Handshake, Rocket
};

const journeySteps = [
  { id: 1, title: 'Apply', desc: 'Submit your startup details.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'Get Shortlisted', desc: 'Expert panel review.', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1200' },
  { id: 3, title: 'Showcase Startup', desc: 'Exhibit at the prime venue.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200' },
  { id: 4, title: 'Meet Investors', desc: 'Exclusive networking sessions.', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200' },
  { id: 5, title: 'Build Connections', desc: 'Interact with ecosystem leaders.', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200' },
  { id: 6, title: 'Funding Opportunities', desc: 'Secure potential investments.', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200' },
];

export default function StartupExpo() {
  const [activeCategoryId, setActiveCategoryId] = useState(expoCategories[0]?.id || 'cat-1');
  const [activeStepId, setActiveStepId] = useState(1);
  const activeStep = journeySteps.find(s => s.id === activeStepId) || journeySteps[0];
  const { openModal } = useRegistration();

  // Auto-advance the Exhibitor Journey step every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepId((prev) => (prev < journeySteps.length ? prev + 1 : 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  const activeCategory = expoCategories.find((c: any) => c.id === activeCategoryId) || expoCategories[0];
  const ActiveIcon = activeCategory ? (iconMap[activeCategory.icon] || Cpu) : Cpu;

  return (
    <section id="expo" className="py-32 relative z-10 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Premium Background Environment */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        


        {/* Expo Domains Showcase */}
        <div className="mb-32">
          <SectionHeading badge="Sectors" title="Expo Domains" />
          <div className="flex md:flex-wrap overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory justify-start md:justify-center gap-3 md:gap-4 max-w-5xl mx-auto mt-12 px-4 md:px-0 pb-4">
            {expoCategories.map((category: any) => {
              const Icon = iconMap[category.icon] || Cpu;
              const isActive = category.id === activeCategoryId;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center shrink-0 snap-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-white border-accent/30 shadow-[0_10px_40px_rgba(255,122,0,0.15)]' 
                      : 'bg-white/60 border-black/5 hover:bg-white hover:border-black/10 shadow-sm'
                  } backdrop-blur-md overflow-hidden group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive ? 'opacity-100' : ''}`} />
                  <Icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-accent' : 'text-gray-500 group-hover:text-gray-900'}`} />
                  <span className={`font-medium text-sm tracking-wide relative z-10 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                    {category.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto mt-12 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl p-8 md:p-16 border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-end min-h-[280px] md:min-h-[400px] group"
                >
                  <img 
                    src={activeCategory.image} 
                    alt={activeCategory.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                  
                  <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
                    <ActiveIcon className="w-[400px] h-[400px] text-white" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 mt-auto">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-sm">
                      <ActiveIcon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">{activeCategory.name}</h3>
                      <p className="text-xl text-gray-200 leading-relaxed drop-shadow-sm max-w-2xl">
                        {activeCategory.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Exhibitor Journey */}
        <div className="mb-32">
          <SectionHeading badge="Process" title="Exhibitor Journey" />
          
          <div className="mt-16 max-w-5xl mx-auto px-4 md:px-8">
            {/* Interactive Timeline */}
            <div className="relative w-full flex justify-between items-center mb-16">
              {/* Background Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 z-0 rounded-full" style={{ background: 'var(--border)' }} />
              
              {/* Progress Line */}
              <motion.div 
                className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 z-0 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((activeStepId - 1) / (journeySteps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
              
              {journeySteps.map((step, idx) => {
                const isActive = step.id === activeStepId;
                const isPast = step.id < activeStepId;
                
                return (
                  <div 
                    key={step.id} 
                    onClick={() => setActiveStepId(step.id)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-sm md:text-lg transition-all duration-300 shadow-lg ${
                        isActive || isPast 
                          ? 'bg-accent text-white border-none' 
                          : 'border-2 hover:border-accent/50'
                      }`}
                      style={!(isActive || isPast) ? { backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' } : {}}
                    >
                      {step.id}
                      
                      {/* Outer pulse ring for active step */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-accent"
                          initial={{ opacity: 0.8, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.5 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    
                    {/* Step Title (visible on desktop, hidden on small screens unless active) */}
                    <div className={`absolute top-full mt-4 text-center w-24 md:w-32 transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none md:opacity-60 md:translate-y-0'}`}>
                      <h4 className={`text-xs md:text-sm font-semibold ${isActive ? 'text-accent' : ''}`} style={!isActive ? { color: 'var(--text-secondary)' } : {}}>
                        {step.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Active Step Content Card */}
            <div className="mt-24 md:mt-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepId}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className="p-8 md:p-12 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative overflow-hidden group min-h-[200px]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <img 
                    src={activeStep.image} 
                    alt={activeStep.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/40" />
                  
                  <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white text-3xl font-bold font-heading relative z-10 shadow-lg">
                    {activeStep.id}
                  </div>
                  
                  <div className="flex-1 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-white drop-shadow-md">
                      {activeStep.title}
                    </h3>
                    <p className="text-lg text-gray-200 drop-shadow-sm font-medium">
                      {activeStep.desc}
                    </p>
                  </div>
                  
                  <div className="hidden md:flex relative z-10 shrink-0">
                    <button 
                      onClick={() => {
                        if (activeStepId < journeySteps.length) {
                          setActiveStepId(activeStepId + 1);
                        } else {
                          setActiveStepId(1);
                        }
                      }}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center transition-all shadow-sm text-white"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Why Exhibit (Bento Grid) */}
        <div className="mb-32">
          <SectionHeading badge="Benefits" title="Why Exhibit?" />
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[180px] gap-4 md:gap-6 mt-16 max-w-6xl mx-auto">
            {expoBenefits.map((benefit, idx) => {
              const Icon = iconMap[benefit.icon] || CheckCircle2;
              return (
                <motion.div
                  key={benefit.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`relative p-6 md:p-8 rounded-3xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group flex flex-col justify-end ${
                    benefit.colSpan === 2 ? 'md:col-span-2' : ''
                  } ${benefit.rowSpan === 2 ? 'md:row-span-2' : ''}`}
                >
                  <img 
                    src={benefit.image} 
                    alt={benefit.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-500 text-white shadow-sm z-10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3 relative z-10 drop-shadow-md">{benefit.title}</h4>
                  <p className="text-gray-200 relative z-10 line-clamp-3 drop-shadow-sm font-medium">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final Premium CTA */}
        <div className="relative rounded-[3rem] overflow-hidden max-w-5xl mx-auto shadow-[0_20px_50px_rgba(255,122,0,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-20" />
          
          <div className="relative z-10 p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">Ready to Showcase Your Startup?</h2>
            <p className="text-xl text-white/95 max-w-2xl mx-auto mb-12 drop-shadow-sm font-medium">
              Join 50+ innovative startups and connect with investors, mentors, and ecosystem leaders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => openModal('startup')} className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-accent font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl">
                Register
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

