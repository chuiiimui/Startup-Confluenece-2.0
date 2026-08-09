import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const cards = [
    {
      icon: <Phone className="h-6 w-6 text-accent sm:h-8 sm:w-8" />,
      title: 'Phone',
      value: (
        <div className="mt-1 flex flex-col gap-1.5 text-xs sm:gap-2 sm:text-sm">
          <a href="tel:+916390903018" className="transition-colors hover:text-accent">
            +91-6390903018
          </a>
          <a href="tel:+918953615232" className="transition-colors hover:text-accent">
            +91-89536 15232
          </a>
        </div>
      ),
      delay: 0.1,
    },
    {
      icon: <Mail className="h-6 w-6 text-accent sm:h-8 sm:w-8" />,
      title: 'Email Us',
      value: (
        <div className="mt-1 flex flex-col gap-2 text-xs sm:text-sm">
          <div>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Participants Queries:
            </span>
            <br />
            <a
              href="mailto:startupconfluence@ugi.edu.in"
              className="break-all transition-colors hover:text-accent"
            >
              startupconfluence@ugi.edu.in
            </a>
          </div>
          <div>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Administration:
            </span>
            <br />
            <a
              href="mailto:incubation@united.edu.in"
              className="break-all transition-colors hover:text-accent"
            >
              incubation@united.edu.in
            </a>
          </div>
        </div>
      ),
      delay: 0.2,
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent sm:h-8 sm:w-8" />,
      title: 'Location',
      value: (
        <a
          href="https://maps.google.com/?q=United+Institute+of+Technology,+Prayagraj"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block text-xs leading-relaxed transition-colors hover:text-accent sm:text-sm"
        >
          United Institute of Technology, Prayagraj
        </a>
      ),
      delay: 0.3,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden pb-16 pt-16 sm:pb-12 sm:pt-20 md:pb-24 md:pt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading badge="Contact" title="Get In Touch" />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:mt-16 md:grid-cols-3">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay }}
              className="clay-card clay-card--blue group flex flex-col items-center rounded-[22px] p-5 text-center transition-transform duration-300 sm:rounded-[28px] sm:p-8 sm:hover:-translate-y-2"
            >
              <div className="clay-icon mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors group-hover:border-[color:var(--clay-border-hover)] sm:mb-6 sm:h-16 sm:w-16">
                {card.icon}
              </div>
              <h4
                className="mb-1.5 text-base font-semibold sm:mb-2 sm:text-xl"
                style={{ color: 'var(--text-primary)' }}
              >
                {card.title}
              </h4>
              <div style={{ color: 'var(--text-secondary)' }}>{card.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
