import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { teamMembers } from '../data/team';
import { organizers } from '../data/organizers';
import SectionHeading from '../components/SectionHeading';
import { FiLinkedin, FiTwitter } from 'react-icons/fi';
import type { TeamMember } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

function PersonCard({
  member,
  size = 'md',
}: {
  member: TeamMember;
  size?: 'md' | 'lg';
}) {
  const photoHeight = size === 'lg' ? 'min-h-[220px] aspect-square' : 'min-h-[200px] aspect-square';

  return (
    <div className="clay-card group relative mx-auto flex h-full w-full max-w-[260px] flex-col overflow-hidden rounded-2xl transition-all duration-300">
      {/* Full-bleed rectangular photo */}
      <div
        className={`relative w-full overflow-hidden ${photoHeight}`}
        style={{ background: 'var(--bg-elevated)' }}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="font-heading text-3xl font-bold"
              style={{ color: 'var(--brand-orange)' }}
            >
              {getInitials(member.name)}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
      </div>

      {/* Footer: name + role */}
      <div
        className="relative z-10 flex flex-col items-center gap-0.5 px-3 py-3 text-center sm:px-4 sm:py-3.5"
        style={{ background: 'var(--bg-elevated)' }}
      >
        <h3
          className="font-heading text-base font-semibold leading-snug sm:text-lg"
          style={{ color: 'var(--text-primary)' }}
        >
          {member.name}
        </h3>
        <p className="text-accent text-xs font-medium sm:text-sm">{member.role}</p>

        {member.bio && (
          <p className="mt-1 line-clamp-2 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            {member.bio}
          </p>
        )}

        {(member.social?.linkedin || member.social?.twitter) && (
          <div className="mt-2 flex items-center gap-3">
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-chip flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
              >
                <FiLinkedin size={16} />
              </a>
            )}
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-chip flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
              >
                <FiTwitter size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PeopleGrid({
  people,
  size = 'md',
}: {
  people: TeamMember[];
  size?: 'md' | 'lg';
}) {
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className={`hidden md:grid justify-items-center gap-6 mt-12 ${
          people.length <= 4
            ? 'md:grid-cols-2 lg:grid-cols-4'
            : 'md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {people.map((member) => (
          <motion.div key={member.id} variants={itemVariants}>
            <PersonCard member={member} size={size} />
          </motion.div>
        ))}
      </motion.div>

      <div className="md:hidden mt-12 overflow-hidden relative w-full pb-8">
        <div className="absolute top-0 left-0 w-8 h-[calc(100%-3rem)] bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-[calc(100%-3rem)] bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={people.length > 1}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {people.map((member) => (
            <SwiperSlide key={member.id} className="!w-[240px]">
              <PersonCard member={member} size={size} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

const Team = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Organizers */}
        <SectionHeading badge="Leadership" title="Organizers" alignment="center" />
        <PeopleGrid people={organizers} size="lg" />

        {/* Organizing Team */}
        <div className="mt-24">
          <SectionHeading badge="Team" title="Organizing Team" alignment="center" />
          <PeopleGrid people={teamMembers} size="md" />
        </div>
      </div>
    </section>
  );
};

export default Team;
