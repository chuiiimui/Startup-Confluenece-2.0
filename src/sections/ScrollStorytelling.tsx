import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const scenes = [
  { value: '1000+', subtitle: 'Innovators' },
  { value: '50+', subtitle: 'Startups' },
  { value: '20+', subtitle: 'Speakers' },
  { value: '10+', subtitle: 'Investors' },
  { value: 'Infinite', subtitle: 'Possibilities' },
];

export default function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#050505]">
      {/* Background orbs */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.25, 0.5, 0.75, 1],
              [
                'radial-gradient(circle, #0B2A6B 0%, transparent 70%)',
                'radial-gradient(circle, #FF7A00 0%, transparent 70%)',
                'radial-gradient(circle, #22C55E 0%, transparent 70%)',
                'radial-gradient(circle, #0B2A6B 0%, transparent 70%)',
                'radial-gradient(circle, #FF7A00 0%, transparent 70%)',
              ]
            ),
          }}
        />

        {scenes.map((scene, index) => {
          // Each scene gets 20% of the scroll space
          const start = index * 0.2;
          const end = (index + 1) * 0.2;
          const peak = start + 0.1;

          // Fade in, hold briefly, fade out
          const opacity = useTransform(
            scrollYProgress,
            [start, peak - 0.05, peak + 0.05, end],
            [0, 1, 1, 0]
          );

          const scale = useTransform(
            scrollYProgress,
            [start, peak, end],
            [0.8, 1, 1.2]
          );

          const y = useTransform(
            scrollYProgress,
            [start, peak, end],
            [50, 0, -50]
          );

          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
              style={{ opacity, scale, y }}
            >
              <h2 className="font-heading font-extrabold text-[5rem] md:text-[8rem] lg:text-[12rem] text-white leading-none tracking-tighter mb-4">
                {scene.value}
              </h2>
              <p className="font-body text-2xl md:text-4xl text-[#FF7A00] font-medium tracking-wide uppercase">
                {scene.subtitle}
              </p>
              
              {index === 4 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Particles for the last scene */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-[#FF7A00]"
                      initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0,
                      }}
                      animate={{
                        y: [null, Math.random() * window.innerHeight - 200],
                        opacity: [0, Math.random() * 0.5 + 0.5, 0],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
