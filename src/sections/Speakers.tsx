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
        <SectionHeading badge="Keynote" title="Chief Guest Spotlight" />
        
        {/* Chief Guest Spotlight */}
        <div className="mb-20 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative p-[1px] rounded-[2rem] bg-gradient-to-r from-accent/50 to-primary/50 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-white to-primary opacity-30 group-hover:opacity-60 transition-opacity duration-700 rounded-[2rem]" style={{ filter: 'blur(15px)' }}></div>
            
            <div className="relative rounded-[2rem] p-8 md:p-12 lg:p-16 border z-10" style={{ background: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                
                {/* Text Content */}
                <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-sm tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(255,122,0,0.2)]">
                    Chief Guest
                  </span>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
                    To Be <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FF9F43]">Revealed</span>
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                    We're bringing in a visionary leader who has fundamentally reshaped the tech landscape. Stay tuned for an announcement that will elevate Startup Confluence 2.0 to new heights.
                  </p>
                  <button className="px-8 py-3 rounded-full border hover:bg-black/5 transition-colors duration-300 font-semibold" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                    Get Notified
                  </button>
                </div>

                {/* Mystery Silhouette Image */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border flex items-center justify-center overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="absolute inset-0 flex items-center justify-center text-8xl md:text-9xl font-heading font-bold opacity-10" style={{ color: 'var(--text-primary)' }}>
                      ?
                    </div>
                    <svg className="w-1/2 h-1/2 opacity-20" style={{ color: 'var(--text-primary)' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="currentColor" />
                      <path d="M6.00293 21.0001C5.99203 19.8973 6.6433 18.8741 7.64966 18.4116C9.02235 17.7807 10.5056 17.5 11.9961 17.5C13.4866 17.5 14.9698 17.7807 16.3425 18.4116C17.3489 18.8741 18.0001 19.8973 17.9892 21.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border border-accent/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>
        </div>

        <SectionHeading badge="Speakers" title="Featured Speakers" />
        
        {isMobile ? (
          <div className="mt-16 -mx-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView="auto"
              spaceBetween={24}
              centeredSlides={true}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full pb-16 px-4"
            >
              {speakers.map((speaker: any) => (
                <SwiperSlide key={speaker.id} className="!w-[280px]">
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
