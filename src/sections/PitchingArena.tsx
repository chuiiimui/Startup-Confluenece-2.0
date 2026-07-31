import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Coins, FileText, Search, Mic, Users, Trophy } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { pitchSteps } from '../data/pitchSteps';

const rewards = [
  { id: 1, title: 'Mentorship', desc: 'Guidance from industry veterans', icon: GraduationCap },
  { id: 2, title: 'Incubation Support', desc: 'Space & resources to grow', icon: Briefcase },
  { id: 3, title: 'Funding Opportunities', desc: 'Seed capital & investor access', icon: Coins },
  { id: 4, title: 'Certificates & Recognition', desc: 'Validation and media coverage', icon: Award },
];

const stepIcons = [FileText, Search, Mic, Users, Trophy];

export default function PitchingArena() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <section id="pitching-arena" className="py-24 bg-dark relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading badge="Pitch" title="Pitching Arena" />
        
        {/* Timeline */}
        <div ref={timelineRef} className="max-w-5xl mx-auto mt-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/10 md:-translate-x-1/2 rounded-full">
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
                    <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 rounded-3xl hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-300 shadow-xl relative overflow-hidden group">
                      {/* Large background SVG */}
                      <StepIcon className={`absolute -bottom-4 -right-4 w-32 h-32 text-white/[0.03] group-hover:text-accent/[0.05] transition-colors duration-500 transform group-hover:scale-110 ${isEven ? 'md:-left-4 md:right-auto' : ''}`} />
                      
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-300">
                          <StepIcon className="w-6 h-6 text-accent" />
                        </div>
                        <h4 className="text-2xl font-heading font-bold text-white tracking-tight">{step.title}</h4>
                      </div>
                      <p className="text-gray-400 text-base leading-relaxed relative z-10">{step.description}</p>
                    </div>
                  </motion.div>

                  {/* Number Badge */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="absolute left-3 md:left-1/2 w-12 h-12 -translate-x-1/2 bg-dark border-2 border-accent rounded-full flex items-center justify-center z-20 shadow-[0_0_20px_rgba(255,122,0,0.4)] mt-6 md:mt-0"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg font-heading">{index + 1}</span>
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
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">Prizes & Support</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/[0.05] hover:border-accent/30 transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#0B2A6B] to-accent/20 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <reward.icon className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-heading font-bold text-white mb-3">{reward.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{reward.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
