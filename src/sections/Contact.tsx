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
      title: 'Email',
      value: 'startupconfluence@united.ac.in',
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
    <section id="contact" className="py-24 relative overflow-hidden">
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
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent/50 rounded-3xl p-8 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,122,0,0.1)] hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-white/5 group-hover:bg-accent/10 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                {card.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{card.title}</h4>
              <p className="text-text">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center space-x-6"
        >
          {[
            { icon: <FaLinkedin className="w-6 h-6" />, href: "#" },
            { icon: <FaInstagram className="w-6 h-6" />, href: "#" },
            { icon: <FaFacebook className="w-6 h-6" />, href: "#" },
            { icon: <FaYoutube className="w-6 h-6" />, href: "#" },
          ].map((social, i) => (
            <a 
              key={i}
              href={social.href}
              className="w-12 h-12 bg-white/5 hover:bg-accent hover:text-white text-text border border-white/10 hover:border-accent rounded-full flex items-center justify-center transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
