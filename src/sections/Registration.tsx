import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { ArrowRight } from 'lucide-react';

export const Registration: React.FC = () => {
  return (
    <section id="register" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionHeading badge="Register" title="Join the Confluence" />
        
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl inline-block max-w-xl w-full"
          >
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Ready to accelerate your startup journey?</h3>
            <p className="text-text mb-8">Secure your spot at India's premier startup summit. Connect with investors, founders, and industry leaders.</p>
            
            <a 
              href="#" 
              className="inline-flex bg-accent hover:bg-accent/90 text-white rounded-xl px-8 py-4 font-semibold text-lg transition-all items-center justify-center space-x-2 w-full sm:w-auto hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,122,0,0.3)]"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
