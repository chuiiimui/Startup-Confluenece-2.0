import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

export interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = '',
  duration = 2.5,
  className = '',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`font-heading font-bold text-white ${className}`}>
      {isInView ? (
        <CountUp end={end} duration={duration} separator="," />
      ) : (
        <span>0</span>
      )}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;
