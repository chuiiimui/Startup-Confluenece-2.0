import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePerfMode } from '../hooks/usePerfMode';

interface ImageRevealProps {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Force lightweight path (no clip/scale animation) */
  lite?: boolean;
  sizes?: string;
}

/**
 * Scroll-triggered image reveal. On mobile / Android / low-end:
 * skips heavy clip-path animation and only attaches src near viewport.
 */
export default function ImageReveal({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  style,
  children,
  lite,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: ImageRevealProps) {
  const { isLowEnd, isMobile, isAndroid, reduceMotion } = usePerfMode();
  const useLite = lite ?? (isLowEnd || isMobile || isAndroid || reduceMotion);
  const ref = useRef<HTMLDivElement>(null);
  const [loadSrc, setLoadSrc] = useState<string | null>(useLite ? null : src);

  useEffect(() => {
    if (!useLite) {
      setLoadSrc(src);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let done = false;
    const activate = () => {
      if (done) return;
      done = true;
      setLoadSrc(src);
    };

    if (typeof IntersectionObserver === 'undefined') {
      activate();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          io.disconnect();
        }
      },
      { rootMargin: isAndroid || isLowEnd ? '80px 0px' : '200px 0px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, useLite, isAndroid, isLowEnd]);

  if (useLite) {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        style={{
          ...style,
          contentVisibility: 'auto',
          containIntrinsicSize: '400px 300px',
        }}
      >
        {loadSrc ? (
          <img
            src={loadSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            sizes={sizes}
            className={`h-full w-full object-cover ${imgClassName}`}
            draggable={false}
          />
        ) : (
          <div
            className="absolute inset-0 animate-pulse"
            style={{ background: 'var(--surface-hover, rgba(148,163,184,0.2))' }}
            aria-hidden
          />
        )}
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ clipPath: 'inset(12% 12% 12% 12% round 24px)', opacity: 0.4 }}
      whileInView={{
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        opacity: 1,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-1000 group-hover:left-[120%]" />
      </div>
      {children}
    </motion.div>
  );
}
