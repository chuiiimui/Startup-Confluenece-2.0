import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Search, CheckCircle, Mic, Users, Star, Trophy } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import VisionCard from '../components/VisionCard';
import RewardCard from '../components/RewardCard';
import { pitchSteps } from '../data/pitchSteps';

const MentorshipIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 3L4 7v10l8 4 8-4V7l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7v10M8 10l4-3 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IncubationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const FundingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10h18M3 14h18" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
  </svg>
);

const RecognitionIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 15l-3 2 1-4-3-3 4-.5L12 6l1.5 3.5 4 .5-3 3 1 4-3-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
  </svg>
);

const rewards = [
  { id: 1, title: 'Mentorship', desc: 'Guidance from industry veterans', icon: MentorshipIcon },
  { id: 2, title: 'Incubation Support', desc: 'Space & resources to grow', icon: IncubationIcon },
  { id: 3, title: 'Funding Opportunities', desc: 'Seed capital & investor access', icon: FundingIcon },
  { id: 4, title: 'Certificates & Recognition', desc: 'Validation and media coverage', icon: RecognitionIcon },
];

const stepIcons = [FileText, Search, CheckCircle, Mic, Users, Star, Trophy];

export default function PitchingArena() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <section id="pitching-arena" className="py-24 relative z-10 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading badge="Pitch" title="Pitching Arena" />
        
        {/* Timeline */}
        <div ref={timelineRef} className="max-w-5xl mx-auto mt-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] md:-translate-x-1/2 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent/80 via-accent to-accent/20 shadow-[0_0_15px_rgba(255,122,0,0.5)] rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-16 md:space-y-32 relative z-10">
            {pitchSteps.map((step: any, index: number) => {
              const isEven = index % 2 !== 0;
              const StepIcon = stepIcons[index];
              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className={`pl-24 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-20' : 'md:pr-20 text-left md:text-right'}`}
                  >
                    <VisionCard className="p-8 group hover:border-accent/40 hover:bg-white/[0.05] transition-colors duration-300">
                      {/* Decorative Background Icon (Layer Z = 10px) */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl" style={{ transform: 'translateZ(10px)' }}>
                        <StepIcon className={`absolute -bottom-4 -right-4 w-32 h-32 text-black/[0.03] group-hover:text-accent/[0.05] transition-colors duration-500 transform group-hover:scale-110 ${isEven ? 'md:-left-4 md:right-auto' : ''}`} />
                      </div>
                      
                      {/* Main Content (Layer Z = 40px) */}
                      <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
                        <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                          {/* Inner Icon Box (Layer Z = 50px for pop) */}
                          <div 
                            className="p-3 rounded-xl border group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-300 shadow-sm" 
                            style={{ background: 'var(--bg-alt)', borderColor: 'var(--border)', transform: 'translateZ(50px)' }}
                          >
                            <StepIcon className="w-6 h-6 text-accent" />
                          </div>
                          <h4 className="text-2xl font-heading font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {step.description}
                        </p>
                      </div>
                    </VisionCard>
                  </motion.div>

                  {/* Number Badge */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="absolute left-3 md:left-1/2 w-12 h-12 -translate-x-1/2 border-2 border-accent rounded-full flex items-center justify-center z-20 shadow-[0_0_20px_rgba(255,122,0,0.4)] mt-6 md:mt-0" style={{ backgroundColor: 'var(--bg)' }}
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="font-bold text-lg font-heading" style={{ color: 'var(--text-primary)' }}>{index + 1}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mt-40 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-wider uppercase mb-2 block">Rewards</span>
            <h3 className="text-3xl md:text-4xl font-heading font-bold" style={{ color: 'var(--text-primary)' }}>Prizes & Support</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="h-full"
              >
                <RewardCard reward={reward} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
