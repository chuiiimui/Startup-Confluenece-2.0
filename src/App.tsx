import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO, CursorGlow, ScrollProgress, Navbar, PremiumLoader } from './components';
import { 
  Hero, About, EventHighlights, 
  WhyAttend, Speakers, StartupExpo, PitchingArena, Schedule, 
  Gallery, Sponsors, Team, Registration, Venue, FAQ, Contact, Footer 
} from './sections';
import { RegistrationProvider } from './context/RegistrationContext';
import RegistrationModal from './components/RegistrationModal';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <HelmetProvider>
    <RegistrationProvider>
      <SEO />
      {isLoading && <PremiumLoader onComplete={() => setIsLoading(false)} />}
      <div 
        className={`min-h-screen font-inter ${isLoading ? 'h-screen overflow-hidden' : 'overflow-clip'}`} 
        style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
      >
        <CursorGlow />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <EventHighlights />
          <WhyAttend />
          <Speakers />
          <PitchingArena />
          <StartupExpo />
          <Schedule />
          <Gallery />
          <Sponsors />
          <Team />
          <Registration />
          <Venue />
          <FAQ />
          <Contact />
        </main>
        
        <RegistrationModal />
        <Footer />
      </div>
    </RegistrationProvider>
    </HelmetProvider>
  );
}

export default App;
