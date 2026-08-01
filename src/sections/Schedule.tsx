import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { schedule } from '../data/schedule';
import SectionHeading from '../components/SectionHeading';
import { FiClock, FiMapPin, FiChevronDown } from 'react-icons/fi';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(schedule[0]?.id || 1);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const currentDayData = schedule.find((day) => day.id === activeDay);

  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'keynote':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'workshop':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'networking':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pitch':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'break':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-accent/20 text-accent border-accent/30';
    }
  };

  return (
    <section id="schedule" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <SectionHeading 
          badge="Schedule" 
          title="Event Schedule" 
          alignment="center"
        />

        {/* Day Tabs */}
        <div className="flex justify-center items-center gap-4 mb-16">
          {schedule.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className="relative px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 z-10"
            >
              {activeDay === day.id && (
                <motion.div
                  layoutId="activeScheduleTab"
                  className="absolute inset-0 bg-accent rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10`} style={{ color: activeDay === day.id ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {day.title} - {day.date}
              </span>
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {currentDayData?.events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative flex flex-col md:flex-row group"
                >
                  {/* Desktop Timeline */}
                  <div className="hidden md:flex flex-col items-end w-48 shrink-0 pr-8 py-6 relative">
                    <div className="absolute right-0 top-0 bottom-0 w-px group-last:bottom-auto group-last:h-full" style={{ backgroundColor: 'var(--border)' }} />
                    <div className="absolute right-[-4px] top-8 w-2 h-2 rounded-full bg-accent ring-4" style={{ '--tw-ring-color': 'var(--bg)' } as React.CSSProperties} />
                    <span className="text-accent font-mono font-medium text-lg">{event.time}</span>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 md:pl-8 pb-6 md:pb-8">
                    {/* Mobile View / Accordion */}
                    <div 
                      className="md:hidden glass rounded-xl p-5 border cursor-pointer"
                      style={{ borderColor: 'var(--border)' }}
                      onClick={() => setExpandedItem(expandedItem === event.id ? null : event.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-accent font-mono font-medium">{event.time}</span>
                        <motion.div
                          animate={{ rotate: expandedItem === event.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiChevronDown style={{ color: 'var(--text-muted)' }} />
                        </motion.div>
                      </div>
                      <h3 className="text-lg font-heading font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(event.type)}`}>
                          {event.type}
                        </span>
                        {event.location && (
                          <span className="flex items-center text-xs" style={{ color: 'var(--text-muted)' }}>
                            <FiMapPin className="mr-1" /> {event.location}
                          </span>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {expandedItem === event.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm mt-3 pt-3 border-t" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                              {event.description}
                            </p>
                            {event.speaker && (
                              <p className="text-sm mt-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                                Speaker: <span style={{ color: 'var(--text-primary)' }}>{event.speaker}</span>
                              </p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block glass rounded-xl p-6 border transition-colors duration-300" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-heading font-semibold group-hover:text-accent transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      
                      {event.speaker && (
                        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                          By <span style={{ color: 'var(--text-primary)' }}>{event.speaker}</span>
                        </p>
                      )}
                      
                      <p className="mb-4" style={{ color: 'var(--text-muted)' }}>{event.description}</p>
                      
                      {event.location && (
                        <div className="flex items-center text-sm" style={{ color: 'var(--text-muted)' }}>
                          <FiMapPin className="mr-1.5" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
