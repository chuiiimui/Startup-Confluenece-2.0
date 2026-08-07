import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SEO,
  CursorGlow,
  ScrollProgress,
  Navbar,
  PremiumLoader,
} from './components';
import PremiumBackground from './components/PremiumBackground';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import SectionReveal from './components/SectionReveal';
import MobileRegisterDock from './components/MobileRegisterDock';
import {
  Hero,
  About,
  EventHighlights,
  WhyAttend,
  Speakers,
  ExperienceStrip,
  StartupExpo,
  PitchingArena,
  Schedule,
  Gallery,
  Sponsors,
  Team,
  Registration,
  Venue,
  FAQ,
  Contact,
  Footer,
} from './sections';
import { RegistrationProvider } from './context/RegistrationContext';
import RegistrationModal from './components/RegistrationModal';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <HelmetProvider>
      <RegistrationProvider>
        <SmoothScroll>
          <SEO />
          {isLoading && (
            <PremiumLoader onComplete={() => setIsLoading(false)} />
          )}
          <div
            className={`relative min-h-screen font-inter ${
              isLoading ? 'h-screen overflow-hidden' : 'overflow-clip'
            }`}
            style={{ color: 'var(--text-primary)' }}
          >
            <PremiumBackground />
            <ScrollProgress />
            <CursorGlow />
            <CustomCursor />
            <Navbar />

            <AnimatePresence mode="wait">
              {!isLoading && (
                <motion.main
                  key="page"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <Hero />
                  <SectionReveal>
                    <About />
                  </SectionReveal>
                  <SectionReveal>
                    <EventHighlights />
                  </SectionReveal>
                  <SectionReveal>
                    <WhyAttend />
                  </SectionReveal>
                  <SectionReveal>
                    <Speakers />
                  </SectionReveal>
                  <SectionReveal>
                    <ExperienceStrip />
                  </SectionReveal>
                  <SectionReveal>
                    <PitchingArena />
                  </SectionReveal>
                  <SectionReveal>
                    <StartupExpo />
                  </SectionReveal>
                  <SectionReveal>
                    <Schedule />
                  </SectionReveal>
                  <SectionReveal>
                    <Gallery />
                  </SectionReveal>
                  <SectionReveal>
                    <Sponsors />
                  </SectionReveal>
                  <SectionReveal>
                    <Team />
                  </SectionReveal>
                  <SectionReveal>
                    <Registration />
                  </SectionReveal>
                  <SectionReveal>
                    <Venue />
                  </SectionReveal>
                  <SectionReveal>
                    <FAQ />
                  </SectionReveal>
                  <SectionReveal>
                    <Contact />
                  </SectionReveal>
                </motion.main>
              )}
            </AnimatePresence>

            <div className="relative z-10">
              <RegistrationModal />
              {!isLoading && <Footer />}
            </div>

            {!isLoading && <MobileRegisterDock />}
          </div>
        </SmoothScroll>
      </RegistrationProvider>
    </HelmetProvider>
  );
}

export default App;
