import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, Handshake } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useRegistration } from '../context/RegistrationContext';

/**
 * Fixed left-side CTAs: Sponsor Us (top) + Become a Partner (bottom).
 * Hidden on register/partner/sponsors pages and when the footer is in view.
 */
export default function BecomePartnerButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, isPartnerOpen, isSponsorOpen, mobileDockVisible } = useRegistration();
  const [isDesktop, setIsDesktop] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const onPartnerPage = pathname.startsWith('/partner');
  const onSponsorsPage = pathname.startsWith('/sponsors');
  const onRegisterPage = pathname.startsWith('/register');
  const isHome = pathname === '/';
  const visible =
    !isOpen &&
    !isPartnerOpen &&
    !isSponsorOpen &&
    !onPartnerPage &&
    !onSponsorsPage &&
    !onRegisterPage &&
    !overFooter;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setOverFooter(false);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let intervalId = 0;

    const attach = () => {
      const footer = document.getElementById('footer');
      if (!footer) return false;
      observer = new IntersectionObserver(
        ([entry]) => setOverFooter(entry.isIntersecting),
        { threshold: 0.12, rootMargin: '0px' }
      );
      observer.observe(footer);
      return true;
    };

    if (!attach()) {
      intervalId = window.setInterval(() => {
        if (attach()) window.clearInterval(intervalId);
      }, 400);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      observer?.disconnect();
    };
  }, [isHome]);

  const bottom = isDesktop
    ? 32
    : mobileDockVisible
      ? 'max(5.75rem, calc(env(safe-area-inset-bottom) + 5rem))'
      : 'max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))';

  const btnClass =
    'flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full px-3.5 py-3 text-sm font-semibold text-white shadow-lg transition-colors md:px-5 md:py-3.5';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed left-3 z-[65] flex flex-col items-start gap-2.5 md:left-6"
          style={{ bottom }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        >
          <motion.button
            type="button"
            onClick={() => router.push('/sponsors')}
            className={`${btnClass} shadow-[0_12px_28px_rgba(124,58,237,0.35)]`}
            style={{
              background:
                'linear-gradient(105deg, #7C3AED 0%, #DB2777 55%, #FF7A00 100%)',
            }}
            whileTap={{ scale: 0.97 }}
            data-cursor="link"
            aria-label="Sponsor us"
          >
            <Banknote className="h-4 w-4 shrink-0" strokeWidth={2.2} />
            <span className="truncate">Sponsor Us</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => router.push('/partner')}
            className={`${btnClass} bg-accent shadow-[0_12px_28px_rgba(255,122,0,0.35)]`}
            whileTap={{ scale: 0.97 }}
            data-cursor="link"
            aria-label="Become a partner"
          >
            <Handshake className="h-4 w-4 shrink-0" strokeWidth={2.2} />
            <span className="truncate">Become a Partner</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
