import RevealText from '../components/RevealText';
import TiltCard from '../components/TiltCard';
import HorizontalScroll from '../components/HorizontalScroll';
import { Rocket, Handshake, Mic2, Trophy, Network, Lightbulb } from 'lucide-react';
import { assetSrc } from '../lib/utils';
import pitchLiveImg from '../assets/experience/pitch-live.jpg';
import raiseCapitalImg from '../assets/experience/raise-capital.jpg';
import launchFasterImg from '../assets/experience/launch-faster.jpg';
import winRecognitionImg from '../assets/experience/win-recognition.jpg';
import growNetworkImg from '../assets/experience/grow-network.jpg';
import sparkIdeasImg from '../assets/experience/spark-ideas.jpg';

const cards = [
  {
    title: 'Pitch Live',
    copy: 'Present to investors on a Shark Tank–style stage.',
    icon: Mic2,
    image: assetSrc(pitchLiveImg),
  },
  {
    title: 'Raise Capital',
    copy: 'Connect with angels, VCs, and incubation partners.',
    icon: Handshake,
    image: assetSrc(raiseCapitalImg),
  },
  {
    title: 'Launch Faster',
    copy: 'Ship ideas with mentorship, tools, and community.',
    icon: Rocket,
    image: assetSrc(launchFasterImg),
  },
  {
    title: 'Win Recognition',
    copy: 'Compete for awards, media, and ecosystem visibility.',
    icon: Trophy,
    image: assetSrc(winRecognitionImg),
  },
  {
    title: 'Grow Network',
    copy: 'Meet founders, operators, and industry leaders.',
    icon: Network,
    image: assetSrc(growNetworkImg),
  },
  {
    title: 'Spark Ideas',
    copy: 'Absorb keynotes designed to stretch your thinking.',
    icon: Lightbulb,
    image: assetSrc(sparkIdeasImg),
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
        {cards.map(({ title, copy, icon: Icon, image }) => (
          <TiltCard
            key={title}
            className="h-[300px] w-[240px] shrink-0 rounded-[28px] sm:h-[360px] sm:w-[280px] sm:rounded-[32px] md:h-[420px] md:w-[340px]"
            intensity={14}
          >
            <div className="clay-card clay-card--media group relative flex h-full flex-col justify-end overflow-hidden rounded-[28px] sm:rounded-[32px]">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <div className="media-card-copy relative z-10 m-3 mt-auto p-4 sm:m-4 sm:p-5 md:m-5 md:p-6">
                <div
                  className="clay-icon mb-2.5 flex h-10 w-10 items-center justify-center rounded-2xl sm:mb-3 sm:h-12 sm:w-12"
                  style={{ color: 'var(--brand-orange)' }}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
                </div>
                <h3 className="media-card-title font-heading text-lg font-bold sm:text-xl md:text-2xl">
                  {title}
                </h3>
                <p className="media-card-body mt-1.5 text-xs leading-relaxed sm:mt-2 sm:text-sm md:text-base">
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
