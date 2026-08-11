'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { teamMembers, extendedTeamMembers } from '../data/team';
import { organizers } from '../data/organizers';
import SectionHeading from '../components/SectionHeading';
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
    <div
      className="clay-card clay-card--media group relative mx-auto flex h-full w-full max-w-[260px] flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{ background: 'var(--clay-mid)' }}
    >
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

      <div className="relative z-10 flex flex-col items-center gap-0.5 px-3 py-3 text-center sm:px-4 sm:py-3.5">
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

function OrganizingTeamSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mt-24">
      <SectionHeading badge="Team" title="Organizing Team" alignment="center" />
      <PeopleGrid people={teamMembers} size="md" />

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          className="clay-pill inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-colors"
          style={{ color: 'var(--text-primary)' }}
          aria-expanded={showMore}
        >
          {showMore ? 'View Less' : 'View More'}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
            style={{ color: 'var(--brand-orange)' }}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showMore && (
          <motion.div
            key="extended-team"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <PeopleGrid people={extendedTeamMembers} size="md" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Team = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <SectionHeading badge="Leadership" title="Organizers" alignment="center" />
        <PeopleGrid people={organizers} size="lg" />
        <OrganizingTeamSection />
      </div>
    </section>
  );
};

export default Team;
