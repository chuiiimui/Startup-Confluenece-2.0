import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sponsors } from '../data/sponsors';
import SectionHeading from '../components/SectionHeading';
import InteractiveCanvas from '../components/interactive3d/InteractiveCanvas';
import { usePerfMode } from '../hooks/usePerfMode';

function SponsorTile({ sponsor }: { sponsor: any }) {
  return (
    <div
      className="clay-card relative flex h-32 w-48 shrink-0 items-center justify-center overflow-hidden rounded-2xl border transition-colors sm:w-64"
      style={{ borderColor: 'var(--border)' }}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'linear-gradient(to bottom right, var(--surface), transparent)',
        }}
      />
      {sponsor.logo ? (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          loading="lazy"
          decoding="async"
          className="max-h-[60%] max-w-[70%] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span
          className="font-heading text-xl font-bold tracking-wide"
          style={{ color: 'var(--text-secondary)' }}
        >
          {sponsor.name}
        </span>
      )}
    </div>
  );
}

const MarqueeRow = ({
  sponsors: rowSponsors,
  speed,
  direction = 'left',
  tierClass,
  name,
}: {
  sponsors: any[];
  speed: number;
  direction?: 'left' | 'right';
  tierClass: string;
  name: string;
}) => {
  const [osReduceMotion, setOsReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setOsReduceMotion(mq.matches);
    const onChange = () => setOsReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Ensure each half is wide enough, then duplicate for a seamless -50% loop
  const half =
    rowSponsors.length < 4
      ? [...rowSponsors, ...rowSponsors, ...rowSponsors]
      : [...rowSponsors];
  const strip = [...half, ...half];
  const animate = !osReduceMotion && rowSponsors.length > 0;
  const animName = direction === 'left' ? 'sponsor-marquee-left' : 'sponsor-marquee-right';

  return (
    <div className="relative mb-16 w-full">
      <div className="mb-6 text-center">
        <span
          className={`clay-pill inline-block rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest ${tierClass}`}
          style={{ borderColor: 'var(--border)' }}
        >
          {name}
        </span>
      </div>

      {!animate ? (
        <div className="no-scrollbar flex gap-6 overflow-x-auto px-1">
          {rowSponsors.map((sponsor) => (
            <SponsorTile key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      ) : (
        <div className="sponsor-mask group flex overflow-hidden">
          <div
            className="flex w-max shrink-0 gap-6 will-change-transform group-hover:[animation-play-state:paused]"
            style={{
              animation: `${animName} ${speed}s linear infinite`,
            }}
          >
            {strip.map((sponsor, index) => (
              <SponsorTile key={`${sponsor.id}-${index}`} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Sponsors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { enableParallax } = usePerfMode();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="sponsors" className="relative overflow-hidden py-24" ref={containerRef}>
      {enableParallax && (
        <motion.div style={{ y }} className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent blur-[120px] mix-blend-screen" />
        </motion.div>
      )}

      <InteractiveCanvas
        scene="holoTickerRibbon"
        className="absolute left-1/2 top-[6%] z-[1] hidden h-[220px] w-[min(920px,92vw)] -translate-x-1/2 opacity-55 md:block"
        interactive={false}
        camera={{ position: [0, 0.1, 5.2], fov: 38 }}
      />
      <InteractiveCanvas
        scene="orbitingCoins"
        className="absolute right-[2%] top-[12%] z-[2] hidden h-[240px] w-[240px] opacity-90 lg:block"
        camera={{ position: [0, 0.2, 4.5], fov: 40 }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="Sponsors"
          title="Our Sponsors & Partners"
          alignment="center"
        />

        <div className="relative mt-16">
          <MarqueeRow
            name="Incubation & Technology Partners"
            sponsors={sponsors.filter(
              (s) => s.tier === 'incubation' || s.tier === 'technology'
            )}
            speed={35}
            direction="left"
            tierClass="border-orange-400/40 bg-orange-500/15 text-orange-200"
          />

          <MarqueeRow
            name="Media & Ecosystem Partners"
            sponsors={sponsors.filter(
              (s) => s.tier === 'media' || s.tier === 'ecosystem'
            )}
            speed={45}
            direction="right"
            tierClass="border-violet-400/40 bg-violet-500/15 text-violet-200"
          />

          <MarqueeRow
            name="Community Partners"
            sponsors={sponsors.filter((s) => s.tier === 'community')}
            speed={40}
            direction="left"
            tierClass="border-gray-500/20 bg-gray-500/10 text-[var(--text-secondary)]"
          />
        </div>
      </div>

      <style>{`
        .sponsor-mask {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        @keyframes sponsor-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes sponsor-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sponsor-mask > div {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Sponsors;
