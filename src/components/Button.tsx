import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  magnetic?: boolean;
  ripple?: boolean;
}

type Ripple = { id: number; x: number; y: number };

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      className = '',
      icon,
      disabled,
      type = 'button',
      magnetic = true,
      ripple = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (!buttonRef.current || disabled || !magnetic) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.35;
      const y = (clientY - (top + height / 2)) * 0.35;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    const spawnRipple = (e: React.MouseEvent<HTMLElement>) => {
      if (!ripple || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      spawnRipple(e);
      onClick?.(e);
    };

    const baseClasses =
      'relative inline-flex items-center justify-center font-medium overflow-hidden rounded-full select-none';

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {},
      secondary: {
        color: 'var(--text-primary)',
      },
      ghost: {
        background: 'transparent',
        color: 'var(--text-primary)',
      },
    };

    const variantClasses = {
      primary:
        'bg-accent text-white shadow-[0_0_28px_rgba(229,119,52,0.40)] hover:bg-primary hover:shadow-[0_0_40px_rgba(196,90,26,0.50)] border border-[color-mix(in_srgb,var(--brand-orange)_35%,white)]',
      secondary: 'clay-pill border',
      ghost: 'hover:bg-[color:var(--surface-hover)]',
    };

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer';

    const commonProps = {
      ref: (node: HTMLElement | null) => {
        (buttonRef as React.MutableRefObject<HTMLElement | null>).current = node;
        if (typeof ref === 'function') ref(node as never);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`,
      style: variantStyles[variant],
      animate: { x: position.x, y: position.y },
      transition: { type: 'spring', stiffness: 220, damping: 16, mass: 0.2 },
      whileHover: {
        scale: disabled ? 1 : 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      },
      whileTap: { scale: disabled ? 1 : 0.96 },
    };

    const content = (
      <>
        <span className="relative z-10 flex items-center">
          {children}
          {icon && <span className="ml-2">{icon}</span>}
        </span>
        {/* Glass sheen */}
        <span className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/25 to-transparent opacity-60" />
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="pointer-events-none absolute z-20 rounded-full bg-white/45"
              style={{ left: r.x, top: r.y, x: '-50%', y: '-50%' }}
              initial={{ width: 0, height: 0, opacity: 0.55 }}
              animate={{ width: 220, height: 220, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </AnimatePresence>
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          {...(commonProps as object)}
          onClick={(e) => spawnRipple(e as unknown as React.MouseEvent<HTMLElement>)}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        type={type}
        disabled={disabled}
        {...(commonProps as object)}
        onClick={handleClick}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
