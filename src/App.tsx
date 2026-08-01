import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { SEO, CursorGlow, ScrollProgress, Navbar } from './components';
import ThemeTransition from './components/ThemeTransition';
import { 
  Hero, ScrollStorytelling, Countdown, About, EventHighlights, 
  WhyAttend, Speakers, StartupExpo, PitchingArena, Schedule, 
  Gallery, Sponsors, Team, Registration, Venue, FAQ, Contact, Footer 
} from './sections';

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <SEO />
        <div className="min-h-screen overflow-clip font-inter" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
          <CursorGlow />
          <ScrollProgress />
          <Navbar />
          <ThemeTransition />
          
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
    </ThemeProvider>
  );
}

export default App;
