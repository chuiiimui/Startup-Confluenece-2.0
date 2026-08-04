import { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import GridPattern from '../components/GridPattern';



const Hero = () => {

  // Text reveal animation variants
  const wordVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const scaleFadeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[100dvh] w-full flex items-center pt-24 lg:pt-28 pb-[80px] overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background Elements */}
      <GridPattern parallax={true} />
      
      {/* Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Gradient fade at bottom for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-20 flex flex-col justify-center items-center h-full text-center">
          
          {/* Main Content */}
          <motion.div
            className="flex flex-col items-center max-w-[1200px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Monumental Headline */}
            <div 
              className="font-heading tracking-[-0.04em] leading-[0.95] flex flex-col uppercase mt-8 lg:mt-0 items-center"
              style={{ fontWeight: 900 }}
            >
              <div className="overflow-hidden pb-2 md:pb-4 w-full">
                <motion.div 
                  variants={wordVariants} 
                  className="text-primary drop-shadow-sm"
                  style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)" }}
                >
                  STARTUP
                </motion.div>
              </div>
              <div className="overflow-hidden pb-4 md:pb-6 flex flex-col md:flex-row md:items-baseline justify-center md:gap-x-6 w-full">
                <motion.div 
                  variants={wordVariants} 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 drop-shadow-sm"
                  style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
                >
                  CONFLUENCE
                </motion.div>
                <motion.div 
                  variants={scaleFadeVariants} 
                  className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-orange-400 drop-shadow-md mt-0 md:mt-0"
                  style={{ fontSize: "clamp(2.6rem, 7.5vw, 7.5rem)" }}
                >
                  2.0
                </motion.div>
              </div>
            </div>

            {/* Value Proposition */}
            <motion.div variants={wordVariants} className="mt-4 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 flex-wrap">
              <p className="text-lg md:text-3xl font-medium tracking-tight" style={{ color: 'var(--text-secondary)' }}>
                Fostering Collaboration.
              </p>
              <p className="hidden md:block text-2xl" style={{ color: 'var(--text-muted)' }}>•</p>
              <p className="text-lg md:text-3xl font-medium tracking-tight" style={{ color: 'var(--text-secondary)' }}>
                Driving Innovation.

              </p>
              <p className="hidden md:block text-2xl" style={{ color: 'var(--text-muted)' }}>•</p>
              <p className="text-lg md:text-3xl font-medium tracking-tight text-primary">
                Fueling Growth.
              </p>
            </motion.div>

            {/* Event Details Pills */}
            <motion.div 
              className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-4 w-full"
              variants={wordVariants}
            >
              <div className="flex items-center gap-2 md:gap-2.5 px-4 py-2 md:px-6 md:py-3 rounded-full border backdrop-blur-md bg-white/50" style={{ borderColor: 'var(--border)' }}>
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                <span className="text-sm md:text-base font-semibold" style={{ color: 'var(--text-primary)' }}>23–24 October 2026</span>
              </div>
              <div className="flex items-center gap-2 md:gap-2.5 px-4 py-2 md:px-6 md:py-3 rounded-full border backdrop-blur-md bg-white/50" style={{ borderColor: 'var(--border)' }}>
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                <span className="text-sm md:text-base font-semibold text-left leading-tight md:leading-normal" style={{ color: 'var(--text-primary)' }}>United Incubation Hub, Prayagraj</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0"
              variants={wordVariants}
            >
              <motion.button 
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary text-white font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3"
                whileHover={{ scale: 1.05, y: -4, boxShadow: '0 20px 40px -10px rgba(11,42,107,0.4)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                  }}
                />
                <span className="relative z-10">Register Now</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
};

export default Hero;
