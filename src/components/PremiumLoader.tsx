import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

type PremiumLoaderProps = {
  /** Fires when the intro sequence ends — page should already be underneath */
  onComplete: () => void;
};

/**
 * Full brand intro. Reveals the page as soon as the sequence ends,
 * then fades itself out (no blank gap after the loader).
 */
export const PremiumLoader = ({ onComplete }: PremiumLoaderProps) => {
  const [step, setStep] = useState(0);
  const [lite, setLite] = useState(false);
  const [visible, setVisible] = useState(true);
  const sequenceDoneRef = useRef(false);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const compact =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 768px)').matches;

    setLite(compact || prefersReducedMotion);

    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const revealPage = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onCompleteRef.current();
    };

    const endIntro = () => {
      if (cancelled || sequenceDoneRef.current) return;
      sequenceDoneRef.current = true;
      // Reveal page first, then fade the loader — no blank frame
      revealPage();
      setVisible(false);
    };

    if (prefersReducedMotion) {
      setStep(5);
      void wait(900).then(endIntro);
      return () => {
        cancelled = true;
        timers.forEach((id) => clearTimeout(id));
      };
    }

    const beat = compact ? 0.72 : 1;

    const sequence = async () => {
      await wait(200 * beat);
      if (cancelled) return;
      setStep(1);
      await wait(850 * beat);
      if (cancelled) return;
      setStep(2);
      await wait(850 * beat);
      if (cancelled) return;
      setStep(3);
      await wait(900 * beat);
      if (cancelled) return;
      setStep(4);
      await wait(700 * beat);
      if (cancelled) return;
      setStep(5);
      await wait(1500 * beat);
      if (cancelled) return;
      endIntro();
    };

    void sequence();

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;
  const titleWords = ['STARTUP', 'CONFLUENCE'];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#ffffff' }}
          initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(14px)',
          }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Soft accent bloom during finale / exit */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 0.4 : 0 }}
            exit={{ opacity: 0.7 }}
            transition={{ duration: 0.5 }}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,122,0,0.22) 0%, rgba(99,102,241,0.12) 42%, transparent 70%)',
            }}
          />
          {!lite && (
            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-primary/20"
                  style={{
                    left: `${(i * 17 + 8) % 100}%`,
                    top: `${(i * 23 + 11) % 100}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0, 0.35, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 4 ? 1 : 0 }}
            transition={{ duration: 1.2, ease }}
          >
            <div className="absolute left-1/4 top-1/4 h-[40vw] w-[40vw] rounded-full bg-primary/5 blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[40vw] w-[40vw] rounded-full bg-accent/5 blur-[100px]" />
          </motion.div>

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  key="logo"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: step >= 3 ? (lite ? -110 : -180) : 0,
                  }}
                  transition={{ duration: 1, ease }}
                  className="absolute"
                >
                  <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-primary/20 bg-white/80 shadow-2xl backdrop-blur-md md:h-32 md:w-32 md:rounded-3xl">
                    <img
                      src={logo}
                      alt="UIH Logo"
                      className="h-12 w-12 object-contain md:h-24 md:w-24"
                    />
                  </div>
                  <div className="absolute inset-0 scale-150 rounded-full bg-primary/20 blur-xl" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 1 && step < 3 && (
                <motion.div
                  key="uih-text"
                  className="absolute mt-36 flex flex-col items-center text-center md:mt-56"
                  initial={{ opacity: 0, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(12px)', y: -20 }}
                  transition={{ duration: 1, ease }}
                >
                  <h2 className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-text-primary md:text-base">
                    United Incubation Hub
                  </h2>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.9, ease }}
                    className="text-xs tracking-widest text-text-muted"
                  >
                    PRESENTS
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  key="main-title"
                  className="absolute mt-20 flex w-full flex-col items-center justify-center px-3 text-center md:mt-32 md:px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <div className="flex flex-col items-center justify-center font-heading font-black leading-[0.9] tracking-tighter">
                    <div
                      className="flex flex-nowrap items-center justify-center gap-x-1.5 whitespace-nowrap sm:gap-x-3 md:gap-x-6"
                      style={{ fontSize: 'clamp(1.05rem, 5.4vw, 6rem)' }}
                    >
                      {titleWords.map((word, wordIndex) => (
                        <div key={word} className="flex overflow-hidden">
                          {word.split('').map((char, charIndex) => (
                            <motion.span
                              key={`${word}-${charIndex}`}
                              initial={{ opacity: 0, y: 100 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 1,
                                ease,
                                delay: (wordIndex * 10 + charIndex) * 0.04,
                              }}
                              className="inline-block text-primary"
                            >
                              {char}
                            </motion.span>
                          ))}
                        </div>
                      ))}
                    </div>

                    {step >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease }}
                        className="mt-3 bg-gradient-to-br from-accent to-orange-400 bg-clip-text text-transparent md:mt-4"
                        style={{
                          fontSize: 'clamp(2rem, 10vw, 9rem)',
                          lineHeight: 0.8,
                        }}
                      >
                        2.0
                      </motion.div>
                    )}
                  </div>

                  {step >= 5 && (
                    <motion.div className="mt-8 flex flex-wrap justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary md:mt-12 md:gap-6 md:text-base">
                      {['Innovate', 'Collaborate', 'Elevate'].map((word, i) => (
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
