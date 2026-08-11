import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import GlassCard from '../components/GlassCard';
import PillCta from '../components/PillCta';
import SlideIn from '../components/SlideIn';

const stats = [
  { value: 1000, suffix: '+', label: 'Attendees' },
  { value: 50, suffix: '+', label: 'Startups' },
  { value: 5, suffix: '+', label: 'Speakers' },
  { value: 2, suffix: '', label: 'Days' },
];

const purposes = [
  'Networking with industry leaders',
  'Funding opportunities for startups',
  'Innovation showcases and demos',
  'Mentorship and collaboration',
];

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-[100dvh] items-center overflow-hidden py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute right-[-4%] top-1/2 z-0 -translate-y-1/2 select-none font-heading text-[clamp(5rem,22vw,16rem)] font-black uppercase leading-none tracking-tighter text-transparent"
        style={{
          WebkitTextStroke: '1.5px color-mix(in srgb, var(--text-primary) 12%, transparent)',
        }}
        aria-hidden
      >
        About
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-12">
        <SlideIn direction="left">
          <p
            className="mb-3 text-xs font-extrabold uppercase tracking-[0.32em]"
            style={{ color: 'var(--brand-orange)' }}
          >
            Who We Are
          </p>
          <h2
            className="max-w-3xl font-heading text-2xl font-black leading-tight tracking-tight sm:text-4xl lg:text-[2.65rem]"
            style={{ color: 'var(--text-primary)' }}
          >
            Providing a premier stage for founders, investors, and innovators to build the future.
          </h2>
        </SlideIn>

        <SlideIn direction="right" delay={0.1} className="mt-5">
          <p
            className="max-w-2xl text-sm font-semibold leading-relaxed sm:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Startup Confluence 2.0 brings together India&apos;s startup ecosystem for two days of
            pitches, mentorship, expo showcases, and high-signal networking at United Incubation Hub.
          </p>
        </SlideIn>

        <ul className="mt-8 space-y-3">
          {purposes.map((item, i) => (
            <SlideIn key={item} direction="up" delay={0.12 + i * 0.06}>
              <li className="clay-card group flex items-start gap-3 rounded-2xl px-4 py-3 transition-all duration-300 hover:-translate-x-1">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: 'var(--brand-blue-deep)', strokeWidth: 2.5 }}
                />
                <span
                  className="text-sm font-bold sm:text-base"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item}
                </span>
              </li>
            </SlideIn>
          ))}
        </ul>

        <SlideIn direction="up" delay={0.35} className="mt-8">
          <PillCta
            tone="gradient"
            href="https://www.unitedincubationhub.in/"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Know About UNITED INCUBATION HUB
          </PillCta>
        </SlideIn>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <SlideIn key={stat.label} direction="up" delay={0.2 + i * 0.08}>
              <GlassCard
                tilt={false}
                className="clay-card--sky flex aspect-auto flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-baseline">
                  <AnimatedCounter
                    value={stat.value}
                    className="font-heading text-2xl font-extrabold text-[color:var(--text-primary)] sm:text-3xl"
                  />
                  <span
                    className="font-heading text-xl font-extrabold"
                    style={{ color: 'var(--brand-orange)' }}
                  >
                    {stat.suffix}
                  </span>
                </div>
                <p
                  className="mt-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </p>
              </GlassCard>
            </SlideIn>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 right-8 z-10 hidden items-center gap-3 text-xs font-bold tracking-[0.2em] md:flex"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span>01</span>
        <span
          className="h-px w-16"
          style={{
            background:
              'linear-gradient(90deg, var(--brand-sky), var(--brand-orange))',
          }}
        />
      </motion.div>
    </section>
  );
}
