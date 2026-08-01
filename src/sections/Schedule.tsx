import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { schedule } from '../data/schedule';
import SectionHeading from '../components/SectionHeading';
import ScheduleEventCard from '../components/ScheduleEventCard';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(schedule[0]?.id || 1);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const currentDayData = schedule.find((day) => day.id === activeDay);

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
                <ScheduleEventCard 
                  key={event.id}
                  event={event} 
                  index={index} 
                  isLast={index === currentDayData.events.length - 1} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
