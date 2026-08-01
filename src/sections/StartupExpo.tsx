import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, HeartPulse, Leaf, ShoppingCart, ShieldCheck, Zap, Globe, Coins, Layers, Smartphone, Code } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { expoCategories } from '../data/expoCategories';

const iconMap: Record<string, React.ElementType> = {
  Cpu, HeartPulse, Leaf, ShoppingCart, ShieldCheck, Zap, Globe, Coins, Layers, Smartphone, Code
};

type ExpoCategoryWithHighlights = {
  id: string;
  icon: string;
  name: string;
  description: string;
  highlights?: string[];
};

export default function StartupExpo() {
  const [activeCategoryId, setActiveCategoryId] = useState(expoCategories[0]?.id || '1');

  const activeCategory = (expoCategories.find((c: any) => c.id === activeCategoryId) || expoCategories[0]) as ExpoCategoryWithHighlights | undefined;
  const ActiveIcon = activeCategory ? (iconMap[activeCategory.icon] || Cpu) : Cpu;

  return (
    <section id="expo" className="py-24 relative z-10" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading badge="Expo" title="Startup Expo" />
        <p className="text-center max-w-2xl mx-auto mt-6 mb-16 text-lg" style={{ color: 'var(--text-muted)' }}>
          Explore innovations across cutting-edge domains. Discover the next big thing before it hits the mainstream.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {expoCategories.map((category: any) => {
            const Icon = iconMap[category.icon] || Cpu;
            const isActive = category.id === activeCategoryId;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                  isActive 
                    ? 'bg-accent border-accent shadow-[0_0_20px_rgba(255,122,0,0.3)]' 
                    : 'hover:bg-white/10'
                }`}
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  background: isActive ? undefined : 'var(--surface)',
                  borderColor: isActive ? undefined : 'var(--border)'
                }}
              >
                <Icon className={`w-4 h-4 group-hover:text-white`} style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }} />
                <span className="font-medium text-sm tracking-wide">{category.name}</span>
              </button>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="backdrop-blur-xl rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)'
                }}
              >
                <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none transform rotate-12">
                  <ActiveIcon className="w-96 h-96 text-accent" />
                </div>
                
                <div className="relative z-10 md:w-3/4">
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,122,0,0.15)]">
                    <ActiveIcon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-4xl font-heading font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {activeCategory.name}
                  </h3>
                  <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                    {activeCategory.description}
                  </p>
                  
                  {activeCategory.highlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {activeCategory.highlights.map((highlight: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                          <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
                          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
