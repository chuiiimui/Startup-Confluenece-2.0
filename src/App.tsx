import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const PartnerPage = lazy(() => import('./pages/PartnerPage'));

function Section({ children }: { children: React.ReactNode }) {
  return (
    <SectionReveal>
      <Suspense fallback={null}>{children}</Suspense>
    </SectionReveal>
  );
}

function HomePage({ revealed }: { revealed: boolean }) {
  const { isMobile, reduceMotion } = usePerfMode();

  return (
    <>
      <SEO />
      {/* Avoid transform on <main> — it breaks sticky horizontal scroll */}
      <main
        className={`relative z-10 pb-[4.5rem] transition-opacity duration-500 md:pb-0 ${
          revealed || reduceMotion || isMobile ? 'opacity-100' : 'opacity-90'
        }`}
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
        {/* No SectionReveal wrapper — sticky pin needs a transform-free ancestor */}
        <Suspense fallback={null}>
          <ExperienceStrip />
        </Suspense>
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
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {!isMobile && <ScrollProgress />}
    </>
  );
}

function AppShell() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showLoader, setShowLoader] = React.useState(true);
  const [revealed, setRevealed] = React.useState(false);
  const { reduceMotion, isMobile } = usePerfMode();
  const lightEffects = !reduceMotion && !isMobile;

  const finishLoading = React.useCallback(() => {
    setIsLoading(false);
    requestAnimationFrame(() => setRevealed(true));
    window.setTimeout(() => setShowLoader(false), isMobile ? 400 : 700);
  }, [isMobile]);

  return (
    <SmoothScroll>
      {showLoader && <PremiumLoader onComplete={finishLoading} />}

      <div
        className={`relative min-h-[100dvh] font-inter ${
          isLoading ? 'h-[100dvh] overflow-hidden' : ''
        }`}
        style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg)' }}
      >
        <PremiumBackground />

        <AnimatePresence>
          {revealed && lightEffects && (
            <motion.div
              key="reveal-sweep"
              className="pointer-events-none fixed inset-0 z-[180]"
              initial={{ opacity: 0.55, x: '-30%' }}
              animate={{ opacity: 0, x: '40%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 48%, rgba(255,122,0,0.12) 52%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>

        <Navbar />

        <div className="relative z-10 min-w-0">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage revealed={revealed} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/partner" element={<PartnerPage />} />
            </Routes>
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <RegistrationModal />
        </Suspense>
        <Suspense fallback={null}>
          <PartnerModal />
        </Suspense>
      </div>

      {/* Fixed UI outside transformed shell */}
      {!isLoading && <BecomePartnerButton />}
      {!isLoading && <MobileRegisterDock />}
    </SmoothScroll>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RegistrationProvider>
          <AppShell />
        </RegistrationProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
