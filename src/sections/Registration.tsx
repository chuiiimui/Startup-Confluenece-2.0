import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import InteractiveCanvas from '../components/interactive3d/InteractiveCanvas';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Registration: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="register" className="py-24 relative overflow-hidden">
      <InteractiveCanvas
        scene="holoTickerRibbon"
        className="absolute left-1/2 top-[8%] z-[1] hidden h-[200px] w-[min(720px,90vw)] -translate-x-1/2 opacity-50 md:block"
        interactive={false}
        camera={{ position: [0, 0.1, 5], fov: 38 }}
      />
      <InteractiveCanvas
        scene="holoTicket"
        className="absolute left-[2%] top-[22%] z-[2] hidden h-[220px] w-[280px] opacity-90 lg:block"
        camera={{ position: [0, 0, 4.2], fov: 38 }}
      />
      <InteractiveCanvas
        scene="orbitingCoins"
        className="absolute right-[2%] top-[28%] z-[2] hidden h-[200px] w-[200px] opacity-85 lg:block"
        camera={{ position: [0, 0.2, 4.5], fov: 40 }}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <SectionHeading badge="Register" title="Join the Confluence" />
        
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clay-card clay-card--coral inline-block w-full max-w-xl rounded-[28px] p-8 md:p-12"
          >
            <h3 className="mb-3 font-heading text-lg font-bold sm:mb-4 sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
              Ready to accelerate your startup journey?
            </h3>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              Secure your spot at India's premier startup summit. Connect with investors, founders, and industry leaders.
            </p>
            
            <Button
              size="lg"
              onClick={() => navigate('/register')}
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Register Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
