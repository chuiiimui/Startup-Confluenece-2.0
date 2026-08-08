import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import GridPattern from '../components/GridPattern';
import Button from '../components/Button';
import InteractiveCanvas from '../components/interactive3d/InteractiveCanvas';
import {
  LiquidMetalBlobScene,
  NodeConstellationScene,
} from '../components/interactive3d/scenes';
import { useRegistration } from '../context/RegistrationContext';

const appleEase = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const { openModal } = useRegistration();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-23T09:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  const wordVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -35 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.95, ease: appleEase },
    },
  };

  const scaleFadeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: appleEase },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden pb-8 pt-24 lg:pt-28"
    >
      <GridPattern parallax={true} />

      {/* Lightweight constellation — tablet/desktop only (skip on phones for scroll FPS) */}
      <InteractiveCanvas
        className="absolute inset-0 z-[1] hidden opacity-70 md:block"
        interactive={false}
        camera={{ position: [0, 0.35, 6.4], fov: 40 }}
      >
        <NodeConstellationScene />
      </InteractiveCanvas>

      {/* Liquid metal funding blob — desktop only */}
      <InteractiveCanvas
        className="absolute left-[-4%] top-[22%] z-[5] hidden h-[260px] w-[260px] opacity-80 lg:block xl:left-[1%] xl:h-[300px] xl:w-[300px]"
        camera={{ position: [0, 0, 4.2], fov: 40 }}
      >
        <LiquidMetalBlobScene />
      </InteractiveCanvas>

      {/* Soft hero glass wash */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--surface) 55%, transparent), transparent)',
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-32 w-full"
        style={{
          background: 'linear-gradient(to top, var(--page-fade), transparent)',
        }}
      />

      <div className="container relative z-20 mx-auto flex h-full flex-col items-center justify-center px-6 text-center lg:px-12">
        <motion.div
          className="flex max-w-[1200px] flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="hero-title-glow mt-4 flex flex-col items-center font-heading uppercase leading-[0.95] tracking-[-0.04em] lg:mt-0"
            style={{ fontWeight: 900 }}
          >
            <div className="w-full overflow-hidden pb-1 md:pb-2">
              <motion.div
                variants={wordVariants}
                className="hero-glow-startup"
                style={{ fontSize: 'clamp(2rem, 6.5vw, 6.5rem)' }}
              >
                STARTUP
              </motion.div>
            </div>
            <div className="flex w-full flex-col justify-center overflow-x-clip overflow-y-visible pb-2 md:flex-row md:items-baseline md:gap-x-6 md:pb-4">
              <motion.div
                variants={wordVariants}
                className="hero-glow-confluence"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 8.5rem)' }}
              >
                CONFLUENCE
              </motion.div>
              <motion.div
                variants={scaleFadeVariants}
                className="hero-glow-version"
                style={{ fontSize: 'clamp(1.8rem, 6vw, 6rem)' }}
              >
                2.0
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={wordVariants}
            className="mt-2 flex flex-col flex-wrap items-center justify-center gap-2 md:mt-4 md:flex-row md:gap-4"
          >
            <p
              className="text-sm font-medium tracking-tight md:text-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Fostering Collaboration.
            </p>
            <p
              className="text-sm font-medium tracking-tight md:text-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Driving Innovation.
            </p>
            <p
              className="text-sm font-medium tracking-tight md:text-2xl"
              style={{ color: 'var(--accent-link)' }}
            >
              Fueling Growth.
            </p>
          </motion.div>

          <motion.div
            className="mt-4 flex w-full flex-wrap justify-center gap-2 md:mt-6 md:gap-4"
            variants={wordVariants}
          >
            <div
              className="flex items-center gap-2 rounded-full border bg-white/10 px-3 py-1.5 backdrop-blur-md md:gap-2.5 md:px-5 md:py-2.5"
              style={{ borderColor: 'var(--border)' }}
            >
              <Calendar className="h-4 w-4 shrink-0 text-accent" />
              <span
                className="text-xs font-semibold md:text-sm"
                style={{ color: 'var(--text-primary)' }}
              >
                23–24 October 2026
              </span>
            </div>
            <div
              className="flex items-center gap-2 rounded-full border bg-white/10 px-3 py-1.5 backdrop-blur-md md:gap-2.5 md:px-5 md:py-2.5"
              style={{ borderColor: 'var(--border)' }}
            >
              <MapPin className="h-4 w-4 shrink-0" style={{ color: 'var(--accent-link)' }} />
              <span
                className="text-left text-xs font-semibold leading-tight md:text-sm md:leading-normal"
                style={{ color: 'var(--text-primary)' }}
              >
                United Incubation Hub, Prayagraj
              </span>
            </div>
          </motion.div>

          <motion.div
            className="clay-timer-shell mx-auto mt-5 w-full max-w-lg rounded-[28px] px-3 py-3 md:mt-7 md:rounded-[32px] md:px-5 md:py-4"
            variants={wordVariants}
          >
            <div className="flex items-center justify-center gap-2 md:gap-3">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center gap-2 md:gap-3">
                  <motion.div
                    className="flex flex-col items-center"
                    whileHover={{ y: -3, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  >
                    <div className="clay-timer-cell relative flex h-16 w-16 items-center justify-center rounded-[22px] md:h-[5.25rem] md:w-[5.25rem] md:rounded-[26px]">
                      <div
                        className="pointer-events-none absolute inset-x-2 top-1 h-1/3 rounded-full opacity-70"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0.28), transparent)',
                        }}
                      />
                      <span className="clay-timer-value relative z-10 font-heading text-2xl font-extrabold tabular-nums tracking-tight md:text-4xl">
                        {String(item.value).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="clay-timer-label mt-2 text-[10px] font-bold uppercase tracking-[0.18em] md:text-xs">
                      {item.label}
                    </span>
                  </motion.div>
                  {index < 3 && (
                    <span
                      className="mb-6 select-none font-heading text-xl font-bold md:mb-7 md:text-3xl"
                      style={{ color: 'var(--badge-text)' }}
                      aria-hidden
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-4 flex w-full flex-col items-center gap-3 px-4 sm:w-auto sm:flex-row sm:px-0 md:mt-6 md:gap-4"
            variants={wordVariants}
          >
            <Button
              size="lg"
              onClick={() => openModal()}
              icon={<ArrowRight className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              Register Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
