import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { scrollToSection } from '../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll detection for shrinking navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle intersection observer to detect active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
      threshold: 0,
    };

    NAV_ITEMS.forEach((item) => {
      const itemId = item.href.replace('#', '');
      const element = document.getElementById(itemId);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex flex-col items-center bg-white/[0.08] backdrop-blur-[30px] border border-white/[0.15] shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden ${
            isOpen ? 'rounded-[32px] w-full max-w-md' : 'rounded-full w-fit max-w-[1100px]'
          }`}
          layout
        >
          {/* Main Navbar Row */}
          <motion.div
            className="flex items-center justify-between w-full"
            animate={{
              padding: isOpen 
                ? '24px' 
                : isScrolled ? '12px 24px' : '16px 32px',
            }}
            transition={{ duration: 0.3 }}
            layout
          >
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
              <span className="text-xl font-bold font-heading text-white tracking-tight">
                UIH<span className="text-accent">.</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 mx-8">
              {NAV_ITEMS.map((item) => {
                const itemId = item.href.replace('#', '');
                const isActive = activeSection === itemId;
                return (
                  <button
                    key={itemId}
                    onClick={() => handleNavClick(itemId)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Action Button */}
            <div className="hidden lg:flex items-center">
              <button 
                onClick={() => handleNavClick('register')}
                className="bg-accent hover:bg-[#E66E00] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_30px_rgba(255,122,0,0.5)] transform hover:-translate-y-0.5"
              >
                Register Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 -mr-2 text-white/80 hover:text-white rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>

          {/* Mobile Menu Expansion (Dynamic Island style) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full px-6 pb-6"
                layout
              >
                <div className="flex flex-col space-y-2 mt-4">
                  {NAV_ITEMS.map((item, index) => {
                    const itemId = item.href.replace('#', '');
                    return (
                    <motion.button
                      key={itemId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => handleNavClick(itemId)}
                      className={`flex items-center justify-between w-full p-3 rounded-2xl transition-all ${
                        activeSection === itemId 
                          ? 'bg-white/10 text-white' 
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-lg font-medium">{item.label}</span>
                      <ChevronRight size={18} className="opacity-50" />
                    </motion.button>
                  );
                  })}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                    onClick={() => handleNavClick('register')}
                    className="mt-4 w-full bg-accent hover:bg-[#E66E00] text-white py-4 rounded-2xl text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Register Now</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Mobile Menu Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
