import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { getLenisInstance, scrollToSection } from '../lib/utils';
import logo from '../assets/logo.png';
import { usePerfMode } from '../hooks/usePerfMode';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { enableHeavyBlur } = usePerfMode();
  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 120], [1, 0.97]);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

  // Lock page scroll while mobile menu is open
  useEffect(() => {
    const lenis = getLenisInstance();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      getLenisInstance()?.start();
    };
  }, [isOpen]);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    if (!isHome) {
      navigate('/');
      window.setTimeout(() => scrollToSection(id), 120);
      return;
    }
    setTimeout(() => {
      scrollToSection(id);
    }, 280);
  };

  const goRegister = () => {
    setIsOpen(false);
    navigate('/register');
  };

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex w-full justify-center px-3 sm:top-5 sm:px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            scale: isOpen ? 1 : navScale,
            background: isScrolled || isOpen ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
            backdropFilter: enableHeavyBlur
              ? isScrolled || isOpen
                ? 'blur(48px) saturate(180%)'
                : 'blur(28px) saturate(140%)'
              : 'none',
            WebkitBackdropFilter: enableHeavyBlur
              ? isScrolled || isOpen
                ? 'blur(48px) saturate(180%)'
                : 'blur(28px) saturate(140%)'
              : 'none',
            borderTop:
              isScrolled || isOpen
                ? '1px solid var(--nav-border-top-scrolled)'
                : '1px solid var(--nav-border-top)',
            borderLeft: '1px solid var(--border)',
            borderRight: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            boxShadow: isScrolled || isOpen ? 'var(--nav-shadow-scrolled)' : 'var(--nav-shadow)',
            color: 'var(--text-primary)',
          }}
          className={`pointer-events-auto flex flex-col items-center transition-[width,border-radius] duration-300 ${
            isOpen
              ? 'max-h-[min(88dvh,calc(100dvh-1.5rem))] w-full max-w-md overflow-hidden rounded-[24px]'
              : isScrolled
                ? 'w-[min(100%,980px)] max-w-[980px] overflow-hidden rounded-full lg:w-fit'
                : 'w-[min(100%,1100px)] max-w-[1100px] overflow-hidden rounded-full lg:w-fit'
          }`}
          layout
        >
          <motion.div
            className="flex w-full shrink-0 items-center justify-between"
            animate={{
              padding: isOpen
                ? '14px 16px'
                : isScrolled
                  ? '8px 18px'
                  : '14px 20px',
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            layout
          >
            <div
              className="flex flex-shrink-0 cursor-pointer items-center"
              onClick={() => {
                if (isHome) handleNavClick('home');
                else navigate('/');
              }}
              data-cursor="link"
            >
              <motion.img
                src={logo}
                alt="UIH Logo"
                className="w-auto object-contain"
                animate={{ height: isScrolled && !isOpen ? 26 : 30 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="mx-6 hidden items-center space-x-1 lg:flex">
              {NAV_ITEMS.map((item) => {
                const itemId = item.href.replace('#', '');
                const isActive = isHome && activeSection === itemId;
                return (
                  <button
                    key={itemId}
                    onClick={() => handleNavClick(itemId)}
                    data-cursor="link"
                    className="relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300"
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

            <div className="hidden items-center gap-2.5 lg:flex">
              <motion.button
                onClick={goRegister}
                data-cursor="link"
                className="relative overflow-hidden rounded-full bg-accent text-sm font-semibold text-white"
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
                  className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay"
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
              <button
                className="min-h-11 min-w-11 -mr-1 rounded-full p-2 transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                data-cursor="link"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full min-h-0"
              >
                <div
                  data-lenis-prevent
                  className="max-h-[calc(min(88dvh,100dvh-1.5rem)-3.75rem)] overflow-y-auto overscroll-contain px-3 pb-4 [-webkit-overflow-scrolling:touch] sm:px-5 sm:pb-5"
                >
                  <div className="mt-1 flex flex-col space-y-1">
                    {NAV_ITEMS.map((item, index) => {
                      const itemId = item.href.replace('#', '');
                      return (
                        <motion.button
                          key={itemId}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ delay: index * 0.03, duration: 0.25 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(itemId);
                          }}
                          data-cursor="link"
                          className="flex min-h-11 w-full items-center justify-between rounded-2xl p-3 transition-all"
                          style={{
                            background:
                              isHome && activeSection === itemId
                                ? 'var(--surface-hover)'
                                : 'transparent',
                            color:
                              isHome && activeSection === itemId
                                ? 'var(--text-primary)'
                                : 'var(--text-muted)',
                          }}
                        >
                          <span className="text-base font-medium sm:text-lg">{item.label}</span>
                          <ChevronRight size={18} style={{ opacity: 0.5 }} />
                        </motion.button>
                      );
                    })}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: NAV_ITEMS.length * 0.03, duration: 0.25 }}
                      onClick={(e) => {
                        e.preventDefault();
                        goRegister();
                      }}
                      data-cursor="link"
                      className="mt-3 flex min-h-12 w-full items-center justify-center space-x-2 rounded-2xl bg-accent py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#E66E00] sm:text-lg"
                    >
                      <span>Register Now</span>
                    </motion.button>
                  </div>
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
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
