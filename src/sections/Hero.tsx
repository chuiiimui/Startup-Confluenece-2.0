import { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { EVENT_DATE } from '../constants';
import GridPattern from '../components/GridPattern';

const StatBlock = ({ value, label }: { value: string, label: string }) => {
  // Extract number and suffix from string like "1000+"
  const match = value.match(/(\d+)(.*)/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, targetNumber, {
      duration: 2,
      ease: "easeOut",
      onUpdate(val) {
        setCount(Math.floor(val));
      }
    });
    return () => controls.stop();
  }, [targetNumber]);

  return (
    <div className="flex flex-col">
      <span className="text-3xl font-extrabold text-primary">
        {count}{suffix}
      </span>
      <span className="text-sm font-medium text-text-secondary mt-1">{label}</span>
    </div>
  );
};

const Hero = () => {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

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

  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  // Format countdown
  const formatTime = (time: number) => time < 10 ? `0${time}` : time;

  return (
    <section id="home" className="relative h-[100dvh] w-full flex items-center pt-32 lg:pt-32 pb-8 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background Elements */}
      <GridPattern parallax={true} />
      
      {/* Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Gradient fade at bottom for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 lg:gap-8 items-center h-full">
          
          {/* Left Column (Typography) */}
          <motion.div
            className="flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Massive Headline */}
            <div 
              className="font-heading tracking-[-0.08em] leading-[0.85] flex flex-col uppercase mt-8 lg:mt-0"
              style={{ fontWeight: 900, fontSize: "clamp(2.75rem, 7vw, 7.5rem)" }}
            >
              <div className="overflow-hidden">
                <motion.div variants={wordVariants} className="text-primary">
                  STARTUP
                </motion.div>
              </div>
              <div className="overflow-hidden flex flex-wrap items-end gap-x-4 lg:gap-x-8">
                <motion.div variants={wordVariants} className="text-primary">
                  CONFLUENCE
                </motion.div>
                <motion.div variants={scaleFadeVariants} className="text-accent">
                  2.0
                </motion.div>
              </div>
            </div>

            {/* Value Proposition */}
            <motion.div variants={wordVariants} className="mt-8 flex flex-col space-y-1">
              <p className="text-2xl md:text-3xl font-medium tracking-tight" style={{ color: 'var(--text-secondary)' }}>
                Fostering Collaboration.
              </p>
              <p className="text-2xl md:text-3xl font-medium tracking-tight" style={{ color: 'var(--text-secondary)' }}>
                Driving Innovation.
              </p>
              <p className="text-2xl md:text-3xl font-medium tracking-tight text-primary">
                Fueling Growth.
              </p>
            </motion.div>

            {/* Event Details Pills */}
            <motion.div 
              className="mt-6 flex flex-wrap gap-4"
              variants={wordVariants}
            >
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-md bg-white/50" style={{ borderColor: 'var(--border)' }}>
                <Calendar className="w-5 h-5 text-accent" />
                <span className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>23–24 October 2026</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-md bg-white/50" style={{ borderColor: 'var(--border)' }}>
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>United Incubation Hub, Prayagraj</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              variants={wordVariants}
            >
              <motion.button 
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg flex items-center justify-center gap-3"
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
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-full border-2 font-semibold text-lg backdrop-blur-sm"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                whileHover={{ scale: 1.05, y: -4, backgroundColor: 'rgba(0,0,0,0.03)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Explore Event
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column (Floating Info Panel) */}
          <motion.div 
            className="hidden lg:block w-full relative z-30"
            variants={floatAnimation}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="glass-card rounded-[2rem] p-5 md:p-6 lg:p-8 relative overflow-hidden border border-white/40 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              whileHover={{
                y: -15,
                scale: 1.02,
                boxShadow: '0 40px 80px -20px rgba(11, 42, 107, 0.2), 0 0 0 1px rgba(255, 122, 0, 0.3) inset',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,255,255,0.8))'
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 40px rgba(11, 42, 107, 0.05)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)'
              }}
            >
              {/* Internal subtle glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

              {/* Countdown Section */}
              <div className="mb-6 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                  <h3 className="text-lg font-bold tracking-wide uppercase text-text-secondary">Event Begins In</h3>
                </div>

                <div className="grid grid-cols-4 gap-2 md:gap-4">
                  {[
                    { value: days, label: 'Days' },
                    { value: hours, label: 'Hours' },
                    { value: minutes, label: 'Mins' },
                    { value: seconds, label: 'Secs' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-full aspect-square rounded-xl md:rounded-2xl bg-white border shadow-sm flex items-center justify-center mb-2" style={{ borderColor: 'var(--border)' }}>
                        <span className="text-2xl md:text-4xl font-heading font-bold text-black">
                          {formatTime(item.value)}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-black uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">
                <StatBlock value="50+" label="Startups" />
                <StatBlock value="1000+" label="Attendees" />
                <StatBlock value="20+" label="Speakers" />
                <StatBlock value="10+" label="Investors" />
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
