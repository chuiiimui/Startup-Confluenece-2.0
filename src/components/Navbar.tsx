'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_ITEMS } from '../constants';
import {
  getLenisInstance,
  parseNavHref,
  scrollToSection,
  scrollToTop,
  assetSrc,
} from '../lib/utils';
import logo from '../assets/logo.png';
import { usePerfMode } from '../hooks/usePerfMode';
import ThemeToggle from './ThemeToggle';

function navKey(href: string) {
  const { path, hashId } = parseNavHref(href);
  return hashId ? `${path}#${hashId}` : path;
}

/** Homepage sections → matching nav hash keys (Home uses `home`). */
const HOME_SCROLL_SPY: { id: string; nav: string }[] = [
  { id: 'home', nav: 'home' },
  { id: 'about', nav: 'about' },
  { id: 'highlights', nav: 'highlights' },
  { id: 'why-attend', nav: 'why-attend' },
  { id: 'team', nav: 'team' },
  { id: 'register', nav: 'register' },
  { id: 'contact', nav: 'contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { enableHeavyBlur } = usePerfMode();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const syncHomeActive = useCallback(() => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    setIsScrolled(y > 32);

    if (!isHome) return;

    // Pin Contact while footer fills the lower viewport.
    if (docHeight - (y + vh) <= 140) {
      setActiveSection((prev) => (prev === 'contact' ? prev : 'contact'));
      return;
    }

    // Marker just under the floating nav
    const marker = y + Math.min(160, vh * 0.25);
    let next = 'home';

    for (const section of HOME_SCROLL_SPY) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + y;
      if (top <= marker) next = section.nav;
    }

    setActiveSection((prev) => (prev === next ? prev : next));
  }, [isHome]);

  // Lenis scroll (desktop) + native scroll (mobile) — rAF throttled
  useLenis(() => {
    syncHomeActive();
  });

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        syncHomeActive();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    syncHomeActive();
    // Lazy sections mount after first paint — re-sync a few times
    const retries = [120, 400, 900, 1600].map((ms) =>
      window.setTimeout(syncHomeActive, ms)
    );

    return () => {
      window.removeEventListener('scroll', onScroll);
      retries.forEach(clearTimeout);
    };
  }, [syncHomeActive]);

  // Keep the active link visible inside the nav strip (not the page)
  useEffect(() => {
    if (!isHome || isOpen) return;
    const active = document.querySelector(
      'nav button[aria-current="page"]'
    ) as HTMLElement | null;
    const parent = active?.parentElement;
    if (!active || !parent) return;

    // Everything fits — reset any leftover horizontal offset.
    if (parent.scrollWidth <= parent.clientWidth + 2) {
      if (parent.scrollLeft !== 0) parent.scrollLeft = 0;
      return;
    }

    const parentRect = parent.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const pad = 16;

    if (activeRect.left < parentRect.left + pad) {
      parent.scrollBy({
        left: activeRect.left - parentRect.left - pad,
        behavior: 'smooth',
      });
    } else if (activeRect.right > parentRect.right - pad) {
      parent.scrollBy({
        left: activeRect.right - parentRect.right + pad,
        behavior: 'smooth',
      });
    }
  }, [activeSection, isHome, isOpen]);

  // Route pages: highlight from path; home hash from location
  useEffect(() => {
    if (isHome) {
      const hashId = window.location.hash.replace('#', '');
      if (hashId) setActiveSection(hashId);
      return;
    }
    setActiveSection('');
  }, [isHome, pathname]);

  // Scroll to top (or hash) when route changes
  useEffect(() => {
    const hashId = window.location.hash.replace('#', '');
    if (hashId) {
      window.setTimeout(() => scrollToSection(hashId), 160);
      return;
    }
    scrollToTop();
  }, [pathname]);

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

  const handleNavHref = (href: string) => {
    const { path, hashId } = parseNavHref(href);
    setIsOpen(false);

    if (path === '/' && hashId) {
      setActiveSection(hashId);
      if (!isHome) {
        router.push(`/#${hashId}`);
        return;
      }
      window.setTimeout(() => scrollToSection(hashId), 80);
      return;
    }

    if (path === '/') {
      setActiveSection('home');
      if (!isHome) {
        router.push('/');
        return;
      }
      window.setTimeout(() => scrollToSection('home'), 80);
      return;
    }

    router.push(path);
  };

  const isItemActive = (href: string) => {
    const { path, hashId } = parseNavHref(href);
    if (path !== '/' && pathname === path) return true;
    if (path === '/' && isHome && hashId) return activeSection === hashId;
    if (path === '/' && !hashId && isHome) return activeSection === 'home';
    return false;
  };

  const goRegister = () => {
    setIsOpen(false);
    router.push('/register');
  };

  const compact = isScrolled && !isOpen;

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex w-full justify-center px-3 sm:top-4 sm:px-5">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background:
              isScrolled || isOpen ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
            backdropFilter: enableHeavyBlur
              ? isScrolled || isOpen
                ? 'blur(28px) saturate(160%)'
                : 'blur(18px) saturate(140%)'
              : 'none',
            WebkitBackdropFilter: enableHeavyBlur
              ? isScrolled || isOpen
                ? 'blur(28px) saturate(160%)'
                : 'blur(18px) saturate(140%)'
              : 'none',
            borderTop:
              isScrolled || isOpen
                ? '1px solid var(--nav-border-top-scrolled)'
                : '1px solid var(--nav-border-top)',
            borderLeft: '1px solid var(--border)',
            borderRight: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            boxShadow:
              isScrolled || isOpen
                ? 'var(--nav-shadow-scrolled)'
                : 'var(--nav-shadow)',
            color: 'var(--text-primary)',
          }}
          className={`pointer-events-auto flex flex-col items-center transition-[width,border-radius,padding] duration-300 ${
            isOpen
              ? 'max-h-[min(88dvh,calc(100dvh-1.5rem))] w-full max-w-md overflow-hidden rounded-[24px]'
              : compact
                ? 'w-[min(calc(100%-1.5rem),1520px)] max-w-[1520px] overflow-hidden rounded-full'
                : 'w-[min(calc(100%-1.5rem),1560px)] max-w-[1560px] overflow-hidden rounded-full'
          }`}
        >
          <div
            className={`flex w-full shrink-0 items-center justify-between gap-2 transition-[padding] duration-300 ${
              isOpen
                ? 'px-4 py-3'
                : compact
                  ? 'px-4 py-3 sm:px-5'
                  : 'px-5 py-3.5 sm:px-6'
            }`}
          >
            <div
              className="flex flex-shrink-0 cursor-pointer items-center"
              onClick={() => handleNavHref('/')}
              data-cursor="link"
            >
              <img
                src={assetSrc(logo)}
                alt="UIH Logo"
                className={`brand-logo w-auto object-contain transition-[height] duration-300 ${
                  compact ? 'h-[30px]' : 'h-[34px]'
                }`}
              />
            </div>

            <div className="mx-2 hidden min-w-0 flex-1 items-stretch justify-evenly lg:flex xl:mx-3">
              {NAV_ITEMS.map((item) => {
                const key = navKey(item.href);
                const isActive = isItemActive(item.href);
                return (
                  <button
                    key={key}
                    onClick={() => handleNavHref(item.href)}
                    data-cursor="link"
                    aria-current={isActive ? 'page' : undefined}
                    className="relative flex min-w-0 flex-1 items-center justify-center rounded-full px-1.5 py-2.5 text-sm font-semibold tracking-tight transition-colors duration-200 xl:px-2 xl:text-[15px]"
                    style={{
                      color: isActive
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-y-1 inset-x-0.5 rounded-full"
                        transition={{
                          type: 'spring',
                          bounce: 0.18,
                          duration: 0.45,
                        }}
                        style={{
                          background:
                            'linear-gradient(135deg, var(--nav-active-from) 0%, var(--nav-active-to) 100%)',
                          boxShadow:
                            '0 0 0 1px var(--nav-active-ring), 0 0 18px var(--nav-active-glow), inset 0 1px 0 rgba(255,255,255,0.12)',
                        }}
                      />
                    )}
                    <span
                      className="relative z-10 whitespace-nowrap"
                      style={
                        isActive
                          ? {
                              textShadow: '0 0 18px var(--nav-active-glow)',
                            }
                          : undefined
                      }
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <ThemeToggle />
              <motion.button
                onClick={goRegister}
                data-cursor="link"
                className={`relative overflow-hidden rounded-full text-sm font-semibold text-white transition-[padding] duration-300 ${
                  compact ? 'px-5 py-2.5' : 'px-6 py-3'
                }`}
                style={{
                  background:
                    'linear-gradient(105deg, #7C3AED 0%, #DB2777 48%, #FF7A00 100%)',
                }}
                whileHover={{
                  scale: 1.04,
                  y: -1,
                  boxShadow: '0 12px 28px -5px rgba(168,85,247,0.55)',
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span className="relative z-10">Register Now</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-1.5 lg:hidden">
              <ThemeToggle />
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
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full min-h-0"
              >
                <div
                  data-lenis-prevent
                  className="max-h-[calc(min(88dvh,100dvh-1.5rem)-3.75rem)] overflow-y-auto overscroll-contain px-3 pb-4 [-webkit-overflow-scrolling:touch] sm:px-5 sm:pb-5"
                >
                  <div className="mt-1 flex flex-col space-y-1">
                    {NAV_ITEMS.map((item, index) => {
                      const key = navKey(item.href);
                      const isActive = isItemActive(item.href);
                      return (
                        <motion.button
                          key={key}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ delay: index * 0.02, duration: 0.2 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavHref(item.href);
                          }}
                          data-cursor="link"
                          aria-current={isActive ? 'page' : undefined}
                          className="flex min-h-11 w-full items-center justify-between rounded-2xl p-3 transition-all"
                          style={{
                            background: isActive
                              ? 'linear-gradient(135deg, var(--nav-active-from) 0%, var(--nav-active-to) 100%)'
                              : 'transparent',
                            boxShadow: isActive
                              ? '0 0 0 1px var(--nav-active-ring), 0 0 16px var(--nav-active-glow)'
                              : undefined,
                            color: isActive
                              ? 'var(--text-primary)'
                              : 'var(--text-muted)',
                          }}
                        >
                          <span className="text-base font-medium sm:text-lg">
                            {item.label}
                          </span>
                          <ChevronRight
                            size={18}
                            style={{ opacity: isActive ? 0.85 : 0.45 }}
                          />
                        </motion.button>
                      );
                    })}
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{
                        delay: NAV_ITEMS.length * 0.02,
                        duration: 0.2,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        goRegister();
                      }}
                      data-cursor="link"
                      className="mt-3 flex min-h-12 w-full items-center justify-center rounded-2xl py-3.5 text-base font-semibold text-white sm:text-lg"
                      style={{
                        background:
                          'linear-gradient(105deg, #7C3AED 0%, #DB2777 48%, #FF7A00 100%)',
                      }}
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
            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
