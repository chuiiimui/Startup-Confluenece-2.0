import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

type Point = { x: number; y: number; t: number };

const MAX_POINTS = 28;
const FADE_MS = 280;

/** Sharp single-stroke neon cursor trail — desktop only. */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef(0);
  const { isLight } = useTheme();
  const strokeRef = useRef('#BF00FF');
  const glowRef = useRef('rgba(191,0,255,0.95)');

  useEffect(() => {
    strokeRef.current = isLight ? '#A020F0' : '#BF00FF';
    glowRef.current = isLight ? 'rgba(160,32,240,0.9)' : 'rgba(191,0,255,0.95)';
  }, [isLight]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.classList.remove('hidden');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastSample = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSample < 8) return;
      lastSample = now;
      const pts = pointsRef.current;
      const last = pts[pts.length - 1];
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 2) return;
      pts.push({ x: e.clientX, y: e.clientY, t: now });
      if (pts.length > MAX_POINTS) pts.shift();
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      const now = performance.now();
      const pts = pointsRef.current.filter((p) => now - p.t < FADE_MS);
      pointsRef.current = pts;
      const stroke = strokeRef.current;
      const glow = glowRef.current;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (pts.length >= 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i];
          const prev = pts[i - 1];
          ctx.quadraticCurveTo(
            prev.x,
            prev.y,
            (prev.x + p.x) / 2,
            (prev.y + p.y) / 2
          );
        }
        const tip = pts[pts.length - 1];
        ctx.lineTo(tip.x, tip.y);

        ctx.strokeStyle = glow;
        ctx.lineWidth = 5.5;
        ctx.shadowColor = glow;
        ctx.shadowBlur = 16;
        ctx.globalAlpha = 0.4;
        ctx.stroke();

        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1.75;
        ctx.shadowColor = stroke;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#3E2922' : '#fff7ed';
        ctx.shadowColor = stroke;
        ctx.shadowBlur = 12;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[70] hidden"
      aria-hidden
    />
  );
}
