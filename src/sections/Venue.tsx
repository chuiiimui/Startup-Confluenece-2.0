import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { Building, MapPin, ExternalLink } from 'lucide-react';

export const Venue: React.FC = () => {
  return (
    <section id="venue" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading badge="Venue" title="Join Us At" />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="clay-card rounded-3xl p-8 md:p-10">
              <h3 className="text-xl sm:text-3xl font-space font-bold mb-4 sm:mb-6" style={{ color: 'var(--text-primary)' }}>United Incubation Hub</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="clay-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>B-Block, 2nd Floor</p>
                    <p className="text-text mt-1">United Institute of Technology</p>
                    <p className="text-text">Naini, Prayagraj, Uttar Pradesh 211010</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="clay-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                    <Building className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>State-of-the-art Facility</p>
                    <p className="text-text mt-1">Fully equipped auditorium, networking zones, and dedicated pitching rooms.</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://maps.google.com/?q=United+Institute+of+Technology,+Prayagraj" 
                target="_blank" 
                rel="noreferrer"
                className="clay-pill inline-flex items-center space-x-2 rounded-xl px-6 py-3 font-medium transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="clay-card relative hidden h-[500px] w-full overflow-hidden rounded-3xl lg:block"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.123!2d81.8!3d25.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMjXCsDIxJzAwLjAiTiA4McKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
