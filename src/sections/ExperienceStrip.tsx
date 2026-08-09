import RevealText from '../components/RevealText';
import TiltCard from '../components/TiltCard';
import HorizontalScroll from '../components/HorizontalScroll';
import { Rocket, Handshake, Mic2, Trophy, Network, Lightbulb } from 'lucide-react';

const cards = [
  {
    title: 'Pitch Live',
    copy: 'Present to investors on a Shark Tank–style stage.',
    icon: Mic2,
    tint: 'from-orange-500/25 to-amber-400/10',
  },
  {
    title: 'Raise Capital',
    copy: 'Connect with angels, VCs, and incubation partners.',
    icon: Handshake,
    tint: 'from-blue-500/25 to-sky-400/10',
  },
  {
    title: 'Launch Faster',
    copy: 'Ship ideas with mentorship, tools, and community.',
    icon: Rocket,
    tint: 'from-sky-500/20 to-blue-500/10',
  },
  {
    title: 'Win Recognition',
    copy: 'Compete for awards, media, and ecosystem visibility.',
    icon: Trophy,
    tint: 'from-amber-400/25 to-orange-500/10',
  },
  {
    title: 'Grow Network',
    copy: 'Meet founders, operators, and industry leaders.',
    icon: Network,
    tint: 'from-secondary/20 to-skybrand/10',
  },
  {
    title: 'Spark Ideas',
    copy: 'Absorb keynotes designed to stretch your thinking.',
    icon: Lightbulb,
    tint: 'from-orange-400/20 to-blue-500/10',
  },
];

export default function ExperienceStrip() {
  return (
    <div id="experience" className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-16 z-20 px-4 sm:px-6 md:px-12">
        <RevealText
          text="The Confluence Experience"
          className="font-heading text-2xl font-bold md:text-5xl"
          style={{ color: 'var(--text-primary)' }}
        />
        <p
          className="mt-2 max-w-xl text-sm md:mt-3 md:text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          Scroll to move horizontally through the moments that define Startup Confluence 2.0.
        </p>
      </div>

      <HorizontalScroll height="320vh" className="pt-8">
        {cards.map(({ title, copy, icon: Icon, tint }, i) => (
          <TiltCard
            key={title}
            className="h-[300px] w-[240px] shrink-0 rounded-[28px] sm:h-[360px] sm:w-[280px] sm:rounded-[32px] md:h-[420px] md:w-[340px]"
            intensity={14}
          >
            <div
              className={`clay-card ${
                i % 3 === 0
                  ? 'clay-card--coral'
                  : i % 3 === 1
                    ? 'clay-card--blue'
                    : 'clay-card--sky'
              } flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-6 sm:rounded-[32px] sm:p-8`}
            >
              <div
                className="clay-icon flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14"
                style={{ color: 'var(--brand-orange)' }}
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />
              </div>
              <div>
                <h3
                  className="font-heading text-lg font-bold sm:text-xl md:text-3xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </h3>
                <p
                  className="mt-2 text-xs leading-relaxed sm:mt-3 sm:text-sm md:text-base"
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
