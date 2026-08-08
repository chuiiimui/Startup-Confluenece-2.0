import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { schedule } from '../data/schedule';
import SectionHeading from '../components/SectionHeading';
import ScheduleEventCard from '../components/ScheduleEventCard';
import InteractiveCanvas from '../components/interactive3d/InteractiveCanvas';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(schedule[0]?.id || 1);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const currentDayData = schedule.find((day) => day.id === activeDay);

  return (
    <section id="schedule" className="py-24 relative overflow-hidden" >
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <SectionHeading 
          badge="Schedule" 
          title="Event Schedule" 
          alignment="center"
        />

        <div className="mx-auto mb-8 hidden h-[120px] w-full max-w-xl md:block">
          <InteractiveCanvas
            scene="timelineBeads"
            className="h-full w-full"
            camera={{ position: [0, 0, 5], fov: 35 }}
            onSelect={(i) => {
              const day = schedule[Math.min(i, schedule.length - 1)];
              if (day) setActiveDay(day.id);
            }}
          />
        </div>

        {/* Day Tabs */}
        <div className="flex flex-nowrap justify-center items-center gap-2 mb-12 max-w-fit mx-auto p-1.5 rounded-full border bg-surface/30 backdrop-blur-sm" style={{ borderColor: 'var(--border)' }}>
          {schedule.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className="relative flex-1 px-4 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-colors duration-300 z-10 whitespace-nowrap text-center"
            >
              {activeDay === day.id && (
                <motion.div
                  layoutId="activeScheduleTab"
                  className="absolute inset-0 bg-accent rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 block`} style={{ color: activeDay === day.id ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {day.title} <span className="hidden sm:inline">- {day.date}</span>
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
