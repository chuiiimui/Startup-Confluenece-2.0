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
import CursorTrail from './components/CursorTrail';
import SmoothScroll from './components/SmoothScroll';
import { Section } from './components/PageLayout';
import MobileRegisterDock from './components/MobileRegisterDock';
import BecomePartnerButton from './components/BecomePartnerButton';
import { Hero } from './sections';
import { RegistrationProvider } from './context/RegistrationContext';
import { ThemeProvider } from './context/ThemeContext';
import { usePerfMode } from './hooks/usePerfMode';

const About = lazy(() => import('./sections/About'));
const EventHighlights = lazy(() => import('./sections/EventHighlights'));
const WhyAttend = lazy(() => import('./sections/WhyAttend'));
const Team = lazy(() => import('./sections/Team'));
const Registration = lazy(() =>
  import('./sections/Registration').then((m) => ({ default: m.Registration }))
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
const SpeakersPage = lazy(() => import('./pages/SpeakersPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const SchedulePage = lazy(() => import('./pages/SchedulePage'));
const ExpoPage = lazy(() => import('./pages/ExpoPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const SponsorsPage = lazy(() => import('./pages/SponsorsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const VenuePage = lazy(() => import('./pages/VenuePage'));

function HomePage({ revealed }: { revealed: boolean }) {
  const { isMobile, reduceMotion } = usePerfMode();

  return (
    <>
      <SEO />
      <main
        className={`relative z-10 pb-[4.5rem] transition-opacity duration-500 md:pb-0 ${
          revealed || reduceMotion || isMobile ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <Hero />
        <Section band="cream">
          <About />
        </Section>
        <Section band="cyan">
          <EventHighlights />
        </Section>
        <Section band="peach">
          <WhyAttend />
        </Section>
        <Section band="cream">
          <Team />
        </Section>
        <Section band="cyan">
          <Registration />
        </Section>
        <Section band="peach">
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
        className={`relative min-h-[100dvh] font-body ${
          isLoading ? 'h-[100dvh] overflow-hidden' : ''
        }`}
        style={{
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg)',
        }}
      >
        <PremiumBackground />
        {!isMobile && <CursorTrail />}

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
              <Route path="/speakers" element={<SpeakersPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/expo" element={<ExpoPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/venue" element={<VenuePage />} />
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

      {!isLoading && <BecomePartnerButton />}
      {!isLoading && <MobileRegisterDock />}
    </SmoothScroll>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <RegistrationProvider>
            <AppShell />
          </RegistrationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
