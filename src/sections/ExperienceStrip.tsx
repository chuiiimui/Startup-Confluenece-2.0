import RevealText from '../components/RevealText';
import TiltCard from '../components/TiltCard';
import HorizontalScroll from '../components/HorizontalScroll';
import { Rocket, Handshake, Mic2, Trophy, Network, Lightbulb } from 'lucide-react';

const cards = [
  {
    title: 'Pitch Live',
    copy: 'Present to investors on a Shark Tank–style stage.',
    icon: Mic2,
    tint: 'from-violet-500/20 to-indigo-500/10',
  },
  {
    title: 'Raise Capital',
    copy: 'Connect with angels, VCs, and incubation partners.',
    icon: Handshake,
    tint: 'from-blue-500/20 to-sky-500/10',
  },
  {
    title: 'Launch Faster',
    copy: 'Ship ideas with mentorship, tools, and community.',
    icon: Rocket,
    tint: 'from-indigo-500/20 to-purple-500/10',
  },
  {
    title: 'Win Recognition',
    copy: 'Compete for awards, media, and ecosystem visibility.',
    icon: Trophy,
    tint: 'from-amber-500/20 to-orange-500/10',
  },
  {
    title: 'Grow Network',
    copy: 'Meet founders, operators, and industry leaders.',
    icon: Network,
    tint: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    title: 'Spark Ideas',
    copy: 'Absorb keynotes designed to stretch your thinking.',
    icon: Lightbulb,
    tint: 'from-fuchsia-500/20 to-violet-500/10',
  },
];

export default function ExperienceStrip() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-16 z-20 px-6 md:px-12">
        <RevealText
          text="The Confluence Experience"
          className="font-heading text-3xl font-bold md:text-5xl"
          style={{ color: 'var(--text-primary)' }}
        />
        <p className="mt-3 max-w-xl text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
          Scroll to move horizontally through the moments that define Startup Confluence 2.0.
        </p>
      </div>

      <HorizontalScroll height="260vh" className="pt-8">
        {cards.map(({ title, copy, icon: Icon, tint }) => (
          <TiltCard
            key={title}
            className="h-[360px] w-[280px] shrink-0 rounded-[32px] md:h-[420px] md:w-[340px]"
            intensity={14}
          >
            <div
              className={`flex h-full flex-col justify-between overflow-hidden rounded-[32px] border bg-gradient-to-br ${tint} p-8 backdrop-blur-xl`}
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-alt)',
                boxShadow:
                  'inset 0 1px 0 var(--glass-highlight), var(--shadow-card)',
              }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border text-sky-700 shadow-sm"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--surface)',
                }}
              >
                <Icon className="h-7 w-7" strokeWidth={1.6} />
              </div>
              <div>
                <h3
                  className="font-heading text-2xl font-bold md:text-3xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed md:text-base"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {copy}
                </p>
              </div>
            </div>
          </TiltCard>
        ))}
      </HorizontalScroll>
    </div>
  );
}
