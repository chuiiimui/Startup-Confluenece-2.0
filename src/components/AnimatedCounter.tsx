import React from 'react';
import ReactCountUp from 'react-countup';
import { useInView } from 'framer-motion';

let CountUpComponent: any = ReactCountUp;
while (CountUpComponent && typeof CountUpComponent === 'object' && CountUpComponent.default) {
  CountUpComponent = CountUpComponent.default;
}
const CountUp = CountUpComponent;

export interface AnimatedCounterProps {
  end?: number;
  value?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  value,
  suffix = '',
  duration = 2.5,
  className = '',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const targetNumber = end ?? value ?? 0;

  return (
    <div ref={ref} className={`font-heading font-bold ${className}`}>
      {isInView ? (
        <CountUp end={targetNumber} duration={duration} separator="," />
      ) : (
        <span>0</span>
      )}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;
