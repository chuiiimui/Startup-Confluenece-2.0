import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionHeading from '../components/SectionHeading';
import { speakers } from '../data/speakers';

export default function Speakers() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const renderSpeaker = (speaker: any) => {
    const initials = speaker.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2);

    return (
      <motion.div
        variants={itemVariants}
        className="group bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-accent/20"
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#0B2A6B]/50 to-accent/20 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent z-10" />
          
          <span className="text-7xl font-heading font-bold text-white/10 group-hover:scale-110 transition-transform duration-500 z-0">
            {initials}
          </span>
          
          <div className="absolute bottom-0 left-0 w-full p-6 z-20">
            <h3 className="text-xl font-heading font-semibold text-white mb-1 group-hover:text-accent transition-colors">
              {speaker.name}
            </h3>
            <p className="text-sm text-gray-400 font-medium">{speaker.role}</p>
            <p className="text-xs text-accent mt-2 tracking-wider uppercase font-semibold">{speaker.company}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="speakers" className="py-24 bg-dark relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading badge="Speakers" title="Featured Speakers" />
        
        {isMobile ? (
          <div className="mt-16 -mx-4">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1.2}
              spaceBetween={20}
              centeredSlides={true}
              pagination={{ clickable: true }}
              className="pb-16 px-4"
            >
              {speakers.map((speaker: any) => (
                <SwiperSlide key={speaker.id}>
                  {renderSpeaker(speaker)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {speakers.map((speaker: any) => (
              <React.Fragment key={speaker.id}>
                {renderSpeaker(speaker)}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
