import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlassChip3D from '../components/interactive3d/GlassChip3D';
import { faqs } from '../data/faqs';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading badge="FAQ" title="Frequently Asked Questions" />
        
        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassChip3D
                  active={!!isActive}
                  onClick={() => toggleAccordion(index)}
                  className="cursor-pointer"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAccordion(index);
                    }}
                  >
                    <span
                      className={`pr-4 font-medium ${isActive ? 'text-accent' : ''}`}
                      style={{ color: isActive ? undefined : 'var(--text-primary)' }}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`shrink-0 ${isActive ? 'text-accent' : ''}`}
                      style={{ color: isActive ? undefined : 'var(--text-muted)' }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div
                          className="border-t px-6 pb-5 pt-4"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassChip3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
