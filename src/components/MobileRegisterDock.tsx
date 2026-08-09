import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';

/**
 * Sticky mobile Register CTA — home page only.
 */
export default function MobileRegisterDock() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, isPartnerOpen, setMobileDockVisible } = useRegistration();
  const [show, setShow] = useState(false);
  const [overRegister, setOverRegister] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
    const section = document.getElementById('register');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverRegister(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isHome]);

  const visible =
    isHome && show && !isOpen && !isPartnerOpen && !overRegister;

  useEffect(() => {
    setMobileDockVisible(visible);
    return () => setMobileDockVisible(false);
  }, [visible, setMobileDockVisible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <div
            className="mx-auto flex max-w-md items-center gap-2.5 rounded-2xl px-3 py-2.5"
            style={{
              background: 'var(--nav-bg-scrolled)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--nav-shadow-scrolled)',
            }}
          >
            <div className="min-w-0 flex-1 pl-0.5">
              <p
                className="truncate text-sm font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Ready to join?
              </p>
              <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                Secure your spot at Confluence 2.0
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => navigate('/register')}
              className="min-h-11 shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white"
              whileTap={{ scale: 0.96 }}
              data-cursor="link"
            >
              Register
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
