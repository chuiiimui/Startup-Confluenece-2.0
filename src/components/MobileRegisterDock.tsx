import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistration } from '../context/RegistrationContext';

/**
 * Sticky mobile Register CTA that stays available while browsing.
 */
export default function MobileRegisterDock() {
  const { openModal, isOpen } = useRegistration();
  const [show, setShow] = useState(false);
  const [overRegister, setOverRegister] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const section = document.getElementById('register');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverRegister(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const visible = show && !isOpen && !overRegister;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <div
            className="mx-auto flex max-w-md items-center gap-3 rounded-2xl px-3 py-3"
            style={{
              background: 'var(--nav-bg-scrolled)',
              backdropFilter: 'blur(28px) saturate(160%)',
              WebkitBackdropFilter: 'blur(28px) saturate(160%)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--nav-shadow-scrolled)',
            }}
          >
            <div className="min-w-0 flex-1 pl-1">
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
              onClick={() => openModal()}
              className="shrink-0 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white"
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
