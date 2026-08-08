import { motion, AnimatePresence } from 'framer-motion';
import { Handshake } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';

/**
 * Always-visible bottom-left CTA — opens the dedicated Partner form modal.
 */
export default function BecomePartnerButton() {
  const { openPartnerModal, isOpen, isPartnerOpen } = useRegistration();
  const visible = !isOpen && !isPartnerOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={openPartnerModal}
          className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.75rem))] left-4 z-[65] flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[0_12px_28px_rgba(255,122,0,0.35)] md:bottom-8 md:left-6 md:px-5 md:py-3.5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          data-cursor="link"
          aria-label="Become a partner or sponsor"
        >
          <Handshake className="h-4 w-4 shrink-0" strokeWidth={2.2} />
          <span className="whitespace-nowrap">Partner / Sponsor</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
