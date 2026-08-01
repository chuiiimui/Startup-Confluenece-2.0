import { motion } from 'framer-motion';
import { MapPin, Calendar, Building2, Rocket, Lightbulb, TrendingUp, Zap, Target } from 'lucide-react';
import MeshGradient from '../components/MeshGradient';
import GridPattern from '../components/GridPattern';
import ParticleField from '../components/ParticleField';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const floatingVariants = (delay: number) => ({
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }
    }
  });

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background Elements */}
      <MeshGradient />
      <GridPattern />
      <ParticleField />
      
      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Text) */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border backdrop-blur-md" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-xs sm:text-sm font-medium tracking-wide uppercase" style={{ color: 'var(--text-secondary)' }}>
                  23-24 October 2026 · Prayagraj
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="font-heading font-extrabold text-transparent bg-clip-text tracking-tighter leading-[0.9]"
              style={{ 
                fontSize: "clamp(3rem, 10vw, 7.5rem)",
                backgroundImage: 'linear-gradient(to bottom right, var(--text-primary), var(--text-primary), var(--text-muted))'
              }}
              variants={itemVariants}
            >
              STARTUP<br/>
              CONFLUENCE 2.0
            </motion.h1>

            {/* Subheading */}
            <motion.h2 
              className="mt-6 text-xl md:text-3xl font-medium text-accent tracking-tight"
              variants={itemVariants}
            >
              Innovate. Collaborate. Elevate.
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="mt-4 text-lg md:text-xl max-w-lg"
              style={{ color: 'var(--text-muted)' }}
              variants={itemVariants}
            >
              The Flagship Startup & Innovation Summit of Uttar Pradesh
            </motion.p>

            {/* Buttons Row */}
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              variants={itemVariants}
            >
              <button 
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent font-medium text-lg transition-all hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] hover:-translate-y-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Register Now
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-full border font-medium text-lg backdrop-blur-sm transition-all hover:-translate-y-1"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface)'}
              >
                Explore Experience
              </button>
            </motion.div>

            {/* Event Details Pills */}
            <motion.div 
              className="mt-12 flex flex-wrap justify-center lg:justify-start gap-3"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border backdrop-blur-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <Building2 className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>United Incubation Hub</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border backdrop-blur-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <Calendar className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>23-24 Oct 2026</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border backdrop-blur-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <MapPin className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Prayagraj, UP</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column (Visual) */}
          <div className="hidden lg:block relative w-full h-[600px]">
            {/* Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/40 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/30 rounded-full blur-[80px]" />
            
            {/* Concentric Circles */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-dashed"
              style={{ borderColor: 'var(--border)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-dashed"
              style={{ borderColor: 'var(--border)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />

            {/* Central Element */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-[0_0_50px_rgba(255,122,0,0.3)]"
              variants={floatingVariants(0)}
              initial="initial"
              animate="animate"
            >
              <div className="w-full h-full backdrop-blur-md rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--bg)', opacity: 0.9, borderColor: 'var(--border)' }}>
                <Rocket className="w-12 h-12" style={{ color: 'var(--text-primary)' }} />
              </div>
            </motion.div>

            {/* Floating Icons */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full border backdrop-blur-md flex items-center justify-center shadow-lg"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              variants={floatingVariants(0.5)}
              initial="initial"
              animate="animate"
            >
              <Lightbulb className="w-7 h-7 text-yellow-400" />
            </motion.div>

            <motion.div 
              className="absolute bottom-1/4 left-1/3 w-14 h-14 rounded-full border backdrop-blur-md flex items-center justify-center shadow-lg"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              variants={floatingVariants(1)}
              initial="initial"
              animate="animate"
            >
              <TrendingUp className="w-6 h-6 text-green-400" />
            </motion.div>

            <motion.div 
              className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full border backdrop-blur-md flex items-center justify-center shadow-lg"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              variants={floatingVariants(1.5)}
              initial="initial"
              animate="animate"
            >
              <Zap className="w-10 h-10 text-accent" />
            </motion.div>

            <motion.div 
              className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full border backdrop-blur-md flex items-center justify-center shadow-lg"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              variants={floatingVariants(2)}
              initial="initial"
              animate="animate"
            >
              <Target className="w-8 h-8 text-red-400" />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
