import { Fragment, useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import PillCta from '../components/PillCta';
import { useRouter } from 'next/navigation';
import { scrollToSection } from '../lib/utils';
import { SOCIAL_LINKS } from '../constants';

const ease = [0.22, 1, 0.36, 1] as const;

const MARQUEE_ITEMS = [
  'Pitch Arena',
  'Startup Expo',
  'Investor Lounge',
  'Mentorship',
  'Networking',
  'Keynotes',
  'UIH Prayagraj',
] as const;

/** Isolated so the 1s timer does not re-render the whole hero tree. */
const HeroCountdown = memo(function HeroCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-23T09:00:00').getTime();
    const updateTimer = () => {
      const difference = targetDate - Date.now();
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

  return (
    <div className="clay-card clay-card--blue inline-flex gap-2.5 rounded-[1.75rem] px-3.5 py-3.5 sm:gap-4 sm:rounded-[2rem] sm:px-6 sm:py-5">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hrs', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Sec', value: timeLeft.seconds },
      ].map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && (
            <span
              className="self-center font-heading text-xl font-bold sm:text-3xl"
              style={{ color: 'var(--text-muted)', opacity: 0.45 }}
            >
              :
            </span>
          )}
          <div className="flex min-w-[3.25rem] flex-col items-center sm:min-w-[4.5rem]">
            <span
              className="font-heading text-3xl font-extrabold tabular-nums leading-none sm:text-5xl md:text-6xl"
              style={{ color: 'var(--timer-value)' }}
            >
              {String(item.value).padStart(2, '0')}
            </span>
            <span
              className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.18em] sm:mt-2 sm:text-[11px]"
              style={{ color: 'var(--timer-label)' }}
            >
              {item.label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
});

const Hero = () => {
  const router = useRouter();

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden pb-28 pt-28 lg:pb-20 lg:pt-32"
    >
      {/* Soft center glow behind title */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{ background: 'var(--orb-1)' }}
      />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-4 flex flex-col items-center gap-1.5 text-center"
        >
          <p
            className="text-sm font-bold uppercase tracking-[0.16em] sm:text-base sm:tracking-[0.2em] md:text-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            United Institute of Technology
          </p>
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em] sm:text-sm sm:tracking-[0.32em] md:text-base"
            style={{ color: 'var(--brand-sky)' }}
          >
            Presents
          </p>
        </motion.div>

        {/* Single-line brand title — matches pin giant headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease }}
          className="w-full text-center font-heading font-black uppercase leading-[0.92] tracking-[-0.045em]"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="inline-block whitespace-nowrap text-[clamp(1.55rem,6.85vw,8rem)] font-black">
            <span
              className="font-black"
              style={{
                color: '#FF5F1F',
                textShadow:
                  '0 0 12px rgba(255, 95, 31, 0.65), 0 0 28px rgba(255, 122, 0, 0.45)',
              }}
            >
              Startup
            </span>{' '}
            Confluence{' '}
            <span
              className="bg-clip-text font-black text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(105deg, var(--hero-confluence-from) 0%, var(--hero-confluence-via) 45%, var(--hero-confluence-to) 100%)',
              }}
            >
              2.0
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease }}
          className="mx-auto mt-6 max-w-2xl text-center text-sm font-bold uppercase leading-relaxed tracking-[0.08em] sm:mt-8 sm:text-base md:text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          An Initiative of UNITED INCUBATION HUB
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="clay-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider sm:text-xs">
            <Calendar className="h-3.5 w-3.5" style={{ color: 'var(--brand-orange)' }} />
            23–24 Oct 2026
          </span>
          <span className="clay-pill clay-pill--sky inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider sm:text-xs">
            <MapPin className="h-3.5 w-3.5" style={{ color: 'var(--brand-sky)' }} />
            UIH, Prayagraj
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.3, ease }}
          className="mt-8 flex flex-col items-center gap-6 sm:mt-10 sm:gap-7"
        >
          <HeroCountdown />

          <PillCta
            tone="gradient"
            size="lg"
            onClick={() => router.push('/register')}
            icon={<ArrowRight className="h-6 w-6" />}
          >
            Register
          </PillCta>
        </motion.div>

        {/* Sliding marquee strip — CSS animation (cheaper than Framer infinite x) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="relative mt-14 w-full overflow-hidden py-3"
          style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
        >
          <div
            className="hero-marquee flex w-max gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.28em] sm:text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-10" aria-hidden={copy === 1}>
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center gap-10">
                    {item}
                    <span style={{ color: 'var(--brand-orange)', opacity: 0.75 }}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-5 z-30 flex gap-3 sm:right-8 lg:bottom-10 lg:right-12">
        {[
          { icon: <FaLinkedin className="h-4 w-4" />, href: SOCIAL_LINKS.linkedin },
          { icon: <FaInstagram className="h-4 w-4" />, href: SOCIAL_LINKS.instagram },
          {
            icon: <FaFacebook className="h-4 w-4" />,
            href: 'https://www.facebook.com/share/1B7u65PANq/',
          },
        ].map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-chip flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1"
            style={{ color: 'var(--text-secondary)' }}
            data-cursor="link"
          >
            {s.icon}
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToSection('about')}
        className="clay-chip absolute bottom-6 left-1/2 z-30 hidden h-[5.5rem] w-[5.5rem] -translate-x-1/2 items-center justify-center rounded-full md:flex"
        aria-label="Scroll to explore"
        data-cursor="link"
      >
        <span
          className="absolute inset-2 animate-[spin_12s_linear_infinite] rounded-full border border-dashed"
          style={{ borderColor: 'color-mix(in srgb, var(--brand-orange) 45%, transparent)' }}
        />
        <span
          className="absolute text-[8px] font-bold uppercase tracking-[0.18em]"
          style={{ color: 'var(--text-muted)' }}
        >
          Scroll
        </span>
        <ArrowDown
          className="relative z-10 mt-5 h-4 w-4"
          style={{ color: 'var(--brand-orange)' }}
        />
      </button>
    </section>
  );
};

export default Hero;
