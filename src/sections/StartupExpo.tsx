import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, HeartPulse, Leaf, ShoppingCart, Zap, Globe, Coins, Layers, HardHat, BookOpen,
  ArrowRight, Briefcase, Users, Radio, Handshake, Rocket, CheckCircle2
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { expoCategories } from '../data/expoCategories';
import { featuredStartups } from '../data/featuredStartups';
import { expoBenefits } from '../data/expoBenefits';

const iconMap: Record<string, React.ElementType> = {
  Cpu, HeartPulse, Leaf, ShoppingCart, Zap, Globe, Coins, Layers, HardHat, BookOpen,
  Briefcase, Users, Radio, Handshake, Rocket
};

const journeySteps = [
  { id: 1, title: 'Apply', desc: 'Submit your startup details.' },
  { id: 2, title: 'Get Shortlisted', desc: 'Expert panel review.' },
  { id: 3, title: 'Showcase Startup', desc: 'Exhibit at the prime venue.' },
  { id: 4, title: 'Meet Investors', desc: 'Exclusive networking sessions.' },
  { id: 5, title: 'Build Connections', desc: 'Interact with ecosystem leaders.' },
  { id: 6, title: 'Funding Opportunities', desc: 'Secure potential investments.' },
];

export default function StartupExpo() {
  const [activeCategoryId, setActiveCategoryId] = useState(expoCategories[0]?.id || 'cat-1');
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
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mt-12">
            {expoCategories.map((category: any) => {
              const Icon = iconMap[category.icon] || Cpu;
              const isActive = category.id === activeCategoryId;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${
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
                  className="rounded-3xl p-8 md:p-16 border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-end min-h-[400px] group"
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
          <div className="mt-16 w-full overflow-x-auto pb-8 hide-scrollbar">
            <div className="flex items-center min-w-[1000px] relative px-4">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-gray-200 -translate-y-1/2 z-0" />
              
              {journeySteps.map((step, idx) => (
                <div key={step.id} className="flex-1 relative z-10 flex flex-col items-center group cursor-pointer">
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center mb-6 group-hover:border-accent transition-colors duration-300 relative"
                  >
                    <span className="text-gray-500 font-medium group-hover:text-accent transition-colors">{step.id}</span>
                    <div className="absolute inset-0 rounded-full bg-accent/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <h4 className="text-gray-900 font-semibold mb-2 text-center">{step.title}</h4>
                  <p className="text-gray-500 text-sm text-center max-w-[140px] leading-relaxed">{step.desc}</p>
                </div>
              ))}
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

        {/* Featured Startups Carousel */}
        <div className="mb-32 relative">
          <SectionHeading badge="Showcase" title="Featured Startups" />
          <div className="mt-16 w-full overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
            <div className="flex gap-6 w-max px-4">
              {featuredStartups.map((startup, idx) => (
                <motion.div
                  key={startup.id}
                  whileHover={{ y: -10 }}
                  className="w-[320px] md:w-[400px] h-[480px] rounded-[2rem] border border-black/10 bg-white overflow-hidden shrink-0 snap-center relative group shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
                >
                  <img src={startup.image} alt={startup.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl mb-6 border border-white/30 shadow-sm">
                      {startup.logo}
                    </div>
                    <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-2 block drop-shadow-sm">{startup.domain}</span>
                    <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-md">{startup.name}</h3>
                    <p className="text-gray-200 line-clamp-2 drop-shadow-sm">{startup.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-accent font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl">
                Apply for Expo
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/10 text-white font-bold text-lg border border-white/30 hover:bg-black/20 transition-colors duration-300 backdrop-blur-md">
                Become a Partner
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

