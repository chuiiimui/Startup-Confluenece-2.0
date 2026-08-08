import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export const Contact: React.FC = () => {
  const cards = [
    {
      icon: <Phone className="w-8 h-8 text-accent" />,
      title: 'Phone',
      value: '+91 98765 43210',
      delay: 0.1
    },
    {
      icon: <Mail className="w-8 h-8 text-accent" />,
      title: 'Email Us',
      value: (
        <div className="flex flex-col gap-2 text-sm mt-1">
          <div><span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Participants Queries:</span><br/>startupconfluence@ugi.edu.in</div>
          <div><span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Administration:</span><br/>incubation@united.edu.in</div>
        </div>
      ),
      delay: 0.2
    },
    {
      icon: <MapPin className="w-8 h-8 text-accent" />,
      title: 'Location',
      value: 'United Institute of Technology, Prayagraj',
      delay: 0.3
    }
  ];

  return (
    <section id="contact" className="hidden md:block pt-24 pb-12 md:pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading badge="Contact" title="Get In Touch" />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay }}
              className="clay-card group flex flex-col items-center rounded-[28px] p-8 text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/25 bg-white/10 transition-colors group-hover:bg-accent/15">
                {card.icon}
              </div>
              <h4 className="mb-2 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{card.title}</h4>
              <div style={{ color: 'var(--text-secondary)' }}>{card.value}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
