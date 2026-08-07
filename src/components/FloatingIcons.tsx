import { motion } from 'framer-motion';
import { Rocket, Sparkles, Zap, TrendingUp, Users, Lightbulb } from 'lucide-react';

const icons = [
  { Icon: Rocket, x: '8%', y: '22%', delay: 0, color: 'text-violet-500/40' },
  { Icon: Sparkles, x: '88%', y: '18%', delay: 0.4, color: 'text-blue-500/40' },
  { Icon: Zap, x: '12%', y: '72%', delay: 0.8, color: 'text-indigo-500/35' },
  { Icon: TrendingUp, x: '85%', y: '68%', delay: 1.2, color: 'text-violet-400/40' },
  { Icon: Users, x: '78%', y: '40%', delay: 0.6, color: 'text-sky-500/35' },
  { Icon: Lightbulb, x: '18%', y: '45%', delay: 1, color: 'text-amber-500/35' },
];

/**
 * Soft floating icons for hero / ambient presence.
 */
export default function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
      {icons.map(({ Icon, x, y, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color}`}
          style={{ left: x, top: y }}
          animate={{
            y: [0, -14, 0],
            rotate: [0, 6, -4, 0],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        >
          <div className="rounded-2xl border border-white/40 bg-white/30 p-3 shadow-[0_8px_30px_rgba(79,70,229,0.12)] backdrop-blur-md">
            <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.6} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
