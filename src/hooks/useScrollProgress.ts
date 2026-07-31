import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        setScrollProgress(currentScrollY / scrollHeight);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return scrollProgress;
}
