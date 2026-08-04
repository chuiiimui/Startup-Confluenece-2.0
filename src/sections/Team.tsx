import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { teamMembers } from '../data/team';
import SectionHeading from '../components/SectionHeading';
import { FiLinkedin, FiTwitter } from 'react-icons/fi';

const Team = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Helper to get initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <section id="team" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <SectionHeading 
          badge="Team" 
          title="Organizing Team" 
          alignment="center"
        />

        {/* DESKTOP GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id}
              variants={itemVariants}
              className="glass rounded-2xl p-8 border hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-accent p-1 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative" style={{ backgroundColor: 'var(--bg)' }}>
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-heading font-bold" style={{ color: 'var(--text-muted)' }}>{getInitials(member.name)}</span>
                    )}
                  </div>
                </div>
                {/* Decoration ring */}
                <div className="absolute -inset-2 rounded-full border scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" style={{ borderColor: 'var(--border)' }} />
              </div>

              <h3 className="text-xl font-heading font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
              <p className="text-accent font-medium text-sm mb-4">{member.role}</p>
              
              {member.bio && (
                <p className="text-sm mb-6 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{member.bio}</p>
              )}

              <div className="flex items-center gap-4 mt-auto">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass border flex items-center justify-center hover:text-[var(--text-primary)] hover:border-white/30 hover:bg-white/10 transition-all" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                    <FiLinkedin size={18} />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass border flex items-center justify-center hover:text-[var(--text-primary)] hover:border-white/30 hover:bg-white/10 transition-all" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                    <FiTwitter size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* MOBILE SWIPER (INFINITE + MANUAL) */}
        <div className="md:hidden mt-16 overflow-hidden relative w-full pb-8">
          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-8 h-[calc(100%-3rem)] bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 h-[calc(100%-3rem)] bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView="auto"
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="w-full"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id} className="!w-[280px]">
                <div 
                  className="glass rounded-2xl p-8 border group flex flex-col items-center text-center relative overflow-hidden"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                  
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-accent p-1">
                      <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative" style={{ backgroundColor: 'var(--bg)' }}>
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl font-heading font-bold" style={{ color: 'var(--text-muted)' }}>{getInitials(member.name)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
                  <p className="text-accent font-medium text-sm mb-4">{member.role}</p>
                  
                  {member.bio && (
                    <p className="text-sm mb-6 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{member.bio}</p>
                  )}

                  <div className="flex items-center gap-4 mt-auto">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass border flex items-center justify-center text-[var(--text-primary)] border-white/30 bg-white/10" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                        <FiLinkedin size={18} />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass border flex items-center justify-center text-[var(--text-primary)] border-white/30 bg-white/10" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                        <FiTwitter size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Team;
