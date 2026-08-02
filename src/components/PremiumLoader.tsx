import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export const PremiumLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStep(5);
      setTimeout(() => {
        setStep(6);
        setTimeout(onComplete, 1000);
      }, 1500);
      return;
    }

    const sequence = async () => {
      // Step 1: Wait for initial blank screen and particles
      await new Promise(r => setTimeout(r, 200));
      
      // Step 2: "UNITED INCUBATION HUB" + "Presents"
      setStep(1);
      
      // Step 3: Logo scale up
      await new Promise(r => setTimeout(r, 800));
      setStep(2);
      
      // Step 4: Fade text, Logo moves up, "STARTUP CONFLUENCE"
      await new Promise(r => setTimeout(r, 800));
      setStep(3);
      
      // Step 5: "2.0", gradients
      await new Promise(r => setTimeout(r, 800));
      setStep(4);
      
      // Step 6: Tagline
      await new Promise(r => setTimeout(r, 600));
      setStep(5);
      
      // Step 7: Morph/fade out
      await new Promise(r => setTimeout(r, 1200));
      setStep(6);
      
      await new Promise(r => setTimeout(r, 1000));
      
      // Done
      onComplete();
    };

    sequence();
  }, [onComplete]);

  // Cubic bezier for premium Apple-like transitions
  const ease = [0.22, 1, 0.36, 1];

  const titleWords = ["STARTUP", "CONFLUENCE"];

  return (
    <AnimatePresence>
      {step < 6 && (
        <motion.div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease }}
        >
          {/* Ambient Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -60, 0],
                  x: [0, Math.random() * 30 - 15, 0],
                  opacity: [0, 0.3, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Gradients appearing in Step 4 */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 4 ? 1 : 0 }}
            transition={{ duration: 1.5, ease }}
          >
             <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/5 blur-[100px] rounded-full" />
             <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-accent/5 blur-[100px] rounded-full" />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            
            {/* LOGO */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  key="logo"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: step >= 3 ? -180 : 0
                  }}
                  transition={{ duration: 1, ease }}
                  className="absolute"
                >
                  <div className="w-32 h-32 border border-primary/20 rounded-3xl flex items-center justify-center relative bg-white/80 backdrop-blur-md shadow-2xl z-10">
                    <img src={logo} alt="UIH Logo" className="w-24 h-24 object-contain" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* UIH Text */}
            <AnimatePresence>
              {step >= 1 && step < 3 && (
                <motion.div
                  key="uih-text"
                  className="absolute flex flex-col items-center text-center mt-48"
                  initial={{ opacity: 0, filter: "blur(12px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
                  transition={{ duration: 1, ease }}
                >
                  <h2 className="text-sm md:text-base font-medium tracking-[0.3em] text-text-primary uppercase mb-2">
                    United Incubation Hub
                  </h2>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease }}
                    className="text-xs tracking-widest text-text-muted"
                  >
                    PRESENTS
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Title Sequence */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                   key="main-title"
                   className="absolute flex flex-col items-center justify-center text-center px-4 mt-12 w-full"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 0.8, ease }}
                >
                  <div className="font-heading font-black tracking-tighter leading-[0.9] flex flex-col items-center justify-center">
                    
                    {/* STARTUP CONFLUENCE - Word by Word with staggered letters */}
                    <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-2" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>
                      {titleWords.map((word, wordIndex) => (
                        <div key={wordIndex} className="overflow-hidden flex">
                          {word.split('').map((char, charIndex) => (
                            <motion.span
                              key={`${wordIndex}-${charIndex}`}
                              initial={{ opacity: 0, y: 100 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 1,
                                ease,
                                delay: (wordIndex * 10 + charIndex) * 0.04
                              }}
                              className="text-primary inline-block"
                            >
                              {char}
                            </motion.span>
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    {/* 2.0 Reveal */}
                    {step >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease }}
                        className="text-accent mt-4 bg-clip-text text-transparent bg-gradient-to-br from-accent to-orange-400"
                        style={{ fontSize: "clamp(4rem, 10vw, 9rem)", lineHeight: 0.8 }}
                      >
                        2.0
                      </motion.div>
                    )}
                  </div>

                  {/* Tagline */}
                  {step >= 5 && (
                    <motion.div
                      className="mt-12 flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-base font-semibold tracking-[0.2em] text-text-secondary uppercase"
                    >
                      {["Innovate", "Collaborate", "Elevate"].map((word, i) => (
                        <motion.span
                          key={word}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, ease, delay: i * 0.15 }}
                        >
                          {word}.
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
