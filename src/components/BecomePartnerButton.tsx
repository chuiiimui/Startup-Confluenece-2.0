import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Handshake } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';

/**
 * Fixed Partner / Sponsor CTA.
 * Sits at the bottom when the mobile register dock is hidden;
 * lifts above the dock when that CTA is visible.
 */
export default function BecomePartnerButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, isPartnerOpen, mobileDockVisible } = useRegistration();
  const [isDesktop, setIsDesktop] = useState(false);
  const onPartnerPage = location.pathname.startsWith('/partner');
  const onRegisterPage = location.pathname.startsWith('/register');
  const visible = !isOpen && !isPartnerOpen && !onPartnerPage && !onRegisterPage;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const bottom = isDesktop
    ? 32
    : mobileDockVisible
      ? 'max(5.75rem, calc(env(safe-area-inset-bottom) + 5rem))'
      : 'max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))';

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => navigate('/partner')}
          className="fixed left-3 z-[65] flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full bg-accent px-3.5 py-3 text-sm font-semibold text-white shadow-lg shadow-[0_12px_28px_rgba(255,122,0,0.35)] transition-[bottom] duration-300 ease-out md:left-6 md:px-5 md:py-3.5"
          style={{ bottom }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          data-cursor="link"
          aria-label="Become a partner or sponsor"
        >
          <Handshake className="h-4 w-4 shrink-0" strokeWidth={2.2} />
          <span className="truncate">
            <span className="sm:hidden">Partner</span>
            <span className="hidden sm:inline">Partner / Sponsor</span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
