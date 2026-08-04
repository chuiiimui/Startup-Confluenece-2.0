import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import AnimatedCounter from '../components/AnimatedCounter';
import GlassCard from '../components/GlassCard';

const stats = [
  { value: 1000, suffix: '+', label: 'Expected Attendees' },
  { value: 50, suffix: '+', label: 'Startups' },
  { value: 5, suffix: '+', label: 'Keynote Speakers' },
  { value: 5, suffix: '+', label: 'Investors' },
  { value: 2, suffix: '', label: 'Days' },
  { value: 4, suffix: '', label: 'Events' },
];

const purposes = [
  'Networking with industry leaders',
  'Funding opportunities for startups',
  'Innovation showcases and demos',
  'Collaboration across sectors',
  'Startup Growth and mentoring',
];

const organizers = [
  'United Incubation Hub',
  'United Institute of Technology'
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 relative min-h-[100dvh] flex items-center justify-center" id="about" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <SectionHeading 
              badge="About"
              title="About Startup Confluence 2.0"
              align="left"
            />
            
            <motion.p variants={itemVariants} className="font-body text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Startup Confluence 2.0 is the premier gathering for innovators, entrepreneurs, and investors. 
              Join us for two days of groundbreaking ideas, transformative networking, and unparalleled opportunities to accelerate your startup journey.
            </motion.p>

            <div className="space-y-4 mb-10">
              {purposes.map((purpose, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center space-x-3">
                  <CheckCircle2 className="text-[#22C55E] w-6 h-6 flex-shrink-0" />
                  <span className="font-body" style={{ color: 'var(--text-primary)' }}>{purpose}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <h3 className="text-[#FF7A00] font-heading font-bold text-xl mb-4">Organized By</h3>
              <div className="flex flex-wrap gap-4">
                {organizers.map((org, index) => (
                  <div key={index} className="px-4 py-2 rounded-full border text-sm font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    {org}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="p-6 flex flex-col items-center justify-center text-center h-full aspect-square">
                  <div className="flex items-baseline mb-2">
                    <AnimatedCounter 
                      value={stat.value} 
                      prefix={stat.prefix}
                      className="font-heading font-extrabold text-4xl text-black"
                    />
                    <span className="font-heading font-extrabold text-2xl text-[#FF7A00]">{stat.suffix}</span>
                  </div>
                  <p className="font-body text-sm uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
