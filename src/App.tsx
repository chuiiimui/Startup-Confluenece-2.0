import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SEO,
  ScrollProgress,
  Navbar,
  PremiumLoader,
} from './components';
import PremiumBackground from './components/PremiumBackground';
import SmoothScroll from './components/SmoothScroll';
import SectionReveal from './components/SectionReveal';
import MobileRegisterDock from './components/MobileRegisterDock';
import BecomePartnerButton from './components/BecomePartnerButton';
import { Hero } from './sections';
import { RegistrationProvider } from './context/RegistrationContext';
import { usePerfMode } from './hooks/usePerfMode';

const About = lazy(() => import('./sections/About'));
const EventHighlights = lazy(() => import('./sections/EventHighlights'));
const WhyAttend = lazy(() => import('./sections/WhyAttend'));
const Speakers = lazy(() => import('./sections/Speakers'));
const ExperienceStrip = lazy(() => import('./sections/ExperienceStrip'));
const StartupExpo = lazy(() => import('./sections/StartupExpo'));
const PitchingArena = lazy(() => import('./sections/PitchingArena'));
const Schedule = lazy(() => import('./sections/Schedule'));
const Gallery = lazy(() => import('./sections/Gallery'));
const Sponsors = lazy(() => import('./sections/Sponsors'));
const Team = lazy(() => import('./sections/Team'));
const Registration = lazy(() =>
  import('./sections/Registration').then((m) => ({ default: m.Registration }))
);
const Venue = lazy(() =>
  import('./sections/Venue').then((m) => ({ default: m.Venue }))
);
const FAQ = lazy(() =>
  import('./sections/FAQ').then((m) => ({ default: m.FAQ }))
);
const Contact = lazy(() =>
  import('./sections/Contact').then((m) => ({ default: m.Contact }))
);
const Footer = lazy(() =>
  import('./sections/Footer').then((m) => ({ default: m.Footer }))
);
const RegistrationModal = lazy(() => import('./components/RegistrationModal'));
const PartnerModal = lazy(() => import('./components/PartnerModal'));

function Section({ children }: { children: React.ReactNode }) {
  return (
    <SectionReveal>
      <Suspense fallback={null}>{children}</Suspense>
    </SectionReveal>
  );
}

function AppShell() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { reduceMotion, isMobile } = usePerfMode();

  return (
    <SmoothScroll>
      <SEO />
      {isLoading && (
        <PremiumLoader onComplete={() => setIsLoading(false)} />
      )}
      <div
        className={`relative min-h-screen font-inter ${
          isLoading ? 'h-screen overflow-hidden' : 'overflow-clip'
        }`}
        style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg)' }}
      >
        <PremiumBackground />
        {!isMobile && <ScrollProgress />}
        <Navbar />

        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.main
              key="page"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10"
            >
              <Hero />
              <Section>
                <About />
              </Section>
              <Section>
                <EventHighlights />
              </Section>
              <Section>
                <WhyAttend />
              </Section>
              <Section>
                <Speakers />
              </Section>
              <Section>
                <ExperienceStrip />
              </Section>
              <Section>
                <PitchingArena />
              </Section>
              <Section>
                <StartupExpo />
              </Section>
              <Section>
                <Schedule />
              </Section>
              <Section>
                <Gallery />
              </Section>
              <Section>
                <Sponsors />
              </Section>
              <Section>
                <Team />
              </Section>
              <Section>
                <Registration />
              </Section>
              <Section>
                <Venue />
              </Section>
              <Section>
                <FAQ />
              </Section>
              <Section>
                <Contact />
              </Section>
            </motion.main>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {!isLoading && (
            <Suspense fallback={null}>
              <RegistrationModal />
            </Suspense>
          )}
          {!isLoading && (
            <Suspense fallback={null}>
              <PartnerModal />
            </Suspense>
          )}
          {!isLoading && (
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          )}
        </div>

        {!isLoading && <MobileRegisterDock />}
        {!isLoading && <BecomePartnerButton />}
      </div>
    </SmoothScroll>
  );
}

function App() {
  return (
    <HelmetProvider>
      <RegistrationProvider>
        <AppShell />
      </RegistrationProvider>
    </HelmetProvider>
  );
}

export default App;
