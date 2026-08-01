import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO, CursorGlow, ScrollProgress, Navbar } from './components';
import { 
  Hero, ScrollStorytelling, Countdown, About, EventHighlights, 
  WhyAttend, Speakers, StartupExpo, PitchingArena, Schedule, 
  Gallery, Sponsors, Team, Registration, Venue, FAQ, Contact, Footer 
} from './sections';

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <div className="min-h-screen overflow-clip font-inter" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        
        <main>
          <Hero />
          <ScrollStorytelling />
          <Countdown />
          <About />
          <EventHighlights />
          <WhyAttend />
          <Speakers />
          <StartupExpo />
          <PitchingArena />
          <Schedule />
          <Gallery />
          <Sponsors />
          <Team />
          <Registration />
          <Venue />
          <FAQ />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
