import { useRef, useState, MouseEvent } from 'react';

export function useMagneticEffect() {
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    const pull = 0.2;
    setPosition({ x: middleX * pull, y: middleY * pull });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 && position.y === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
  };

  return {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    style,
  };
}
