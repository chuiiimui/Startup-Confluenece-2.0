import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', href, className = '', icon, disabled, type = 'button', ...props }, ref) => {
    const buttonRef = useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (!buttonRef.current || disabled) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.2;
      const y = (clientY - (top + height / 2)) * 0.2;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const baseClasses = "relative inline-flex items-center justify-center font-medium transition-colors overflow-hidden rounded-full";
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    const variantClasses = {
      primary: "bg-accent text-white hover:bg-[#FF8C20] shadow-[0_0_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_30px_rgba(255,122,0,0.5)] border border-transparent",
      secondary: "bg-white/[0.08] text-white border border-white/[0.15] backdrop-blur-xl hover:bg-white/[0.12] hover:border-white/[0.3]",
      ghost: "bg-transparent text-white hover:bg-white/[0.08]"
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer";

    const commonProps = {
      ref: (node: any) => {
        (buttonRef as any).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as any).current = node;
      },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`,
      animate: { x: position.x, y: position.y },
      transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
      whileHover: { scale: disabled ? 1 : 1.05 },
      whileTap: { scale: disabled ? 1 : 0.95 },
    };

    const content = (
      <>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </>
    );

    if (href) {
      return (
        <motion.a href={href} {...(commonProps as any)}>
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button type={type} disabled={disabled} {...commonProps} {...props}>
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
