import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { scrollToSection } from '../lib/utils';
import { useRegistration } from '../context/RegistrationContext';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { openModal } = useRegistration();
  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 120], [1, 0.97]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      rootMargin: '-50% 0px -50% 0px',
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
    setIsOpen(false);
    setTimeout(() => {
      scrollToSection(id);
    }, 280);
  };

  return (
    <>
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            scale: isOpen ? 1 : navScale,
            background: isScrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
            backdropFilter: isScrolled
              ? 'blur(48px) saturate(180%)'
              : 'blur(28px) saturate(140%)',
            WebkitBackdropFilter: isScrolled
              ? 'blur(48px) saturate(180%)'
              : 'blur(28px) saturate(140%)',
            borderTop: isScrolled
              ? '1px solid var(--nav-border-top-scrolled)'
              : '1px solid var(--nav-border-top)',
            borderLeft: '1px solid var(--border)',
            borderRight: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            boxShadow: isScrolled ? 'var(--nav-shadow-scrolled)' : 'var(--nav-shadow)',
            color: 'var(--text-primary)',
          }}
          className={`pointer-events-auto flex flex-col items-center overflow-hidden transition-[width] duration-300 ${
            isOpen
              ? 'rounded-[32px] w-full max-w-md'
              : isScrolled
                ? 'rounded-full w-fit max-w-[980px]'
                : 'rounded-full w-fit max-w-[1100px]'
          }`}
          layout
        >
          <motion.div
            className="flex items-center justify-between w-full"
            animate={{
              padding: isOpen
                ? '24px'
                : isScrolled
                  ? '8px 18px'
                  : '16px 32px',
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            layout
          >
            <div
              className="flex-shrink-0 cursor-pointer flex items-center"
              onClick={() => handleNavClick('home')}
              data-cursor="link"
            >
              <motion.img
                src={logo}
                alt="UIH Logo"
                className="w-auto object-contain"
                animate={{ height: isScrolled && !isOpen ? 26 : 32 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="hidden lg:flex items-center space-x-1 mx-6">
              {NAV_ITEMS.map((item) => {
                const itemId = item.href.replace('#', '');
                const isActive = activeSection === itemId;
                return (
                  <button
                    key={itemId}
                    onClick={() => handleNavClick(itemId)}
                    data-cursor="link"
                    className="relative px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'var(--surface-hover)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2.5">
              <ThemeToggle />
              <motion.button
                onClick={() => openModal()}
                data-cursor="link"
                className="bg-accent text-white rounded-full text-sm font-semibold relative overflow-hidden"
                animate={{
                  paddingLeft: isScrolled ? 18 : 24,
                  paddingRight: isScrolled ? 18 : 24,
                  paddingTop: isScrolled ? 8 : 10,
                  paddingBottom: isScrolled ? 8 : 10,
                }}
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -5px rgba(255,122,0,0.5)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  }}
                />
                <span className="relative z-10">Register Now</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-1.5 lg:hidden">
              <ThemeToggle />
              <button
                className="p-2 -mr-2 rounded-full transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                data-cursor="link"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </motion.div>

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
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(itemId);
                        }}
                        data-cursor="link"
                        className="flex items-center justify-between w-full p-3 rounded-2xl transition-all"
                        style={{
                          background:
                            activeSection === itemId ? 'var(--surface-hover)' : 'transparent',
                          color:
                            activeSection === itemId
                              ? 'var(--text-primary)'
                              : 'var(--text-muted)',
                        }}
                      >
                        <span className="text-lg font-medium">{item.label}</span>
                        <ChevronRight size={18} style={{ opacity: 0.5 }} />
                      </motion.button>
                    );
                  })}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      openModal();
                    }}
                    data-cursor="link"
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
            style={{ backgroundColor: 'var(--overlay-bg)' }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
