import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionHeading from '../components/SectionHeading';
import SpeakerRevealCard from '../components/SpeakerRevealCard';
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
    return (
      <motion.div variants={itemVariants}>
        <SpeakerRevealCard speaker={speaker} isMobile={isMobile} />
      </motion.div>
    );
  };

  return (
    <section id="speakers" className="py-24 relative z-10 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading badge="Speakers" title="Featured Speakers" />
        
        {isMobile ? (
          <div className="mt-16 -mx-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={1.2}
              spaceBetween={20}
              centeredSlides={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
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
