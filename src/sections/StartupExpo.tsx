import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, HeartPulse, Leaf, ShoppingCart, Zap, Globe, Coins, Layers, HardHat, BookOpen,
  ArrowRight, Briefcase, Users, Radio, Handshake, Rocket, CheckCircle2
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import DomainTile3D from '../components/interactive3d/DomainTile3D';
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
  const router = useRouter();
  const [activeCategoryId, setActiveCategoryId] = useState(expoCategories[0]?.id || 'cat-1');
  const [activeStepId, setActiveStepId] = useState(1);
  const activeStep = journeySteps.find(s => s.id === activeStepId) || journeySteps[0];

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
    <section id="expo" className="py-32 relative z-10 overflow-hidden" >
      {/* Premium Background Environment */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] mix-blend-multiply" />
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
                <DomainTile3D
                  key={category.id}
                  active={isActive}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`clay-chip group relative flex items-center gap-3 overflow-hidden rounded-2xl px-6 py-4 transition-colors duration-300 ${
                    isActive ? 'is-active border-accent/40' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${isActive ? 'opacity-100' : ''}`} />
                  <Icon className={`relative z-10 h-5 w-5 transition-colors ${isActive ? 'text-accent' : 'text-[color:var(--text-muted)] group-hover:text-[color:var(--text-primary)]'}`} />
                  <span className={`relative z-10 text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-[color:var(--text-primary)]' : 'text-[color:var(--text-secondary)] group-hover:text-[color:var(--text-primary)]'}`}>
                    {category.name}
                  </span>
                </DomainTile3D>
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
                  className="clay-card clay-card--media relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-3xl p-8 group md:min-h-[400px] md:p-16"
                >
                  <img 
                    src={activeCategory.image} 
                    alt={activeCategory.name} 
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="media-card-copy relative z-10 mt-auto flex w-full flex-col items-center gap-6 p-5 md:flex-row md:items-end md:p-6">
                    <div className="clay-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl md:h-20 md:w-20">
                      <ActiveIcon className="h-8 w-8 md:h-10 md:w-10" style={{ color: 'var(--brand-orange)' }} />
                    </div>
                    <div>
                      <h3 className="media-card-title mb-2 text-xl font-bold md:mb-3 md:text-4xl">
                        {activeCategory.name}
                      </h3>
                      <p className="media-card-body max-w-2xl text-sm leading-relaxed md:text-lg">
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
              
              {journeySteps.map((step) => {
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
                  className="clay-card clay-card--media group relative flex min-h-[200px] flex-col items-center gap-8 overflow-hidden rounded-3xl p-8 text-center md:flex-row md:p-12 md:text-left"
                >
                  <img 
                    src={activeStep.image} 
                    alt={activeStep.title} 
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                  />
                  
                  <div className="media-card-copy relative z-10 flex w-full flex-col items-center gap-6 p-5 text-center md:flex-row md:p-6 md:text-left">
                    <div
                      className="clay-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-heading text-2xl font-bold md:h-20 md:w-20 md:text-3xl"
                      style={{ color: 'var(--brand-orange)' }}
                    >
                      {activeStep.id}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="media-card-title mb-2 font-heading text-lg md:text-3xl">
                        {activeStep.title}
                      </h3>
                      <p className="media-card-body text-base font-medium md:text-lg">
                        {activeStep.desc}
                      </p>
                    </div>
                    
                    <div className="hidden shrink-0 md:flex">
                      <button 
                        onClick={() => {
                          if (activeStepId < journeySteps.length) {
                            setActiveStepId(activeStepId + 1);
                          } else {
                            setActiveStepId(1);
                          }
                        }}
                        className="clay-chip flex h-12 w-12 items-center justify-center rounded-full transition-all hover:border-accent hover:bg-accent hover:text-[color:var(--text-inverse)]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
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
            {expoBenefits.map((benefit) => {
              const Icon = iconMap[benefit.icon] || CheckCircle2;
              return (
                <motion.div
                  key={benefit.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`clay-card clay-card--media group relative flex flex-col justify-end overflow-hidden rounded-3xl p-6 md:p-8 ${
                    benefit.colSpan === 2 ? 'md:col-span-2' : ''
                  } ${benefit.rowSpan === 2 ? 'md:row-span-2' : ''}`}
                >
                  <img 
                    src={benefit.image} 
                    alt={benefit.title} 
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div
                    className="clay-icon absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ color: 'var(--brand-orange)' }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="media-card-copy relative z-10 mt-auto p-4 sm:p-5">
                    <h4 className="media-card-title mb-2 text-lg sm:text-2xl">
                      {benefit.title}
                    </h4>
                    <p className="media-card-body line-clamp-3 font-medium">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final Premium CTA */}
        <div className="clay-card relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] sm:rounded-[3rem]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, #7C3AED 0%, #DB2777 48%, #FF7A00 100%)',
            }}
          />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          
          <div className="relative z-10 p-8 text-center sm:p-12 md:p-20">
            <h2 className="media-card-title mb-4 text-2xl font-bold leading-tight sm:text-4xl md:mb-6 md:text-6xl">
              Ready to Showcase Your Startup?
            </h2>
            <p className="media-card-body mx-auto mb-6 max-w-2xl px-1 text-sm font-medium sm:text-lg md:mb-12 md:text-xl">
              Join 50+ innovative startups and connect with investors, mentors, and ecosystem leaders.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => router.push('/register?type=startup')}
                className="min-h-12 w-full rounded-full bg-white px-8 py-3.5 text-base font-bold shadow-xl transition-transform duration-300 hover:scale-105 sm:w-auto md:text-lg"
                style={{ color: 'var(--brand-orange)' }}
              >
                Register
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

