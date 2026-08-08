import React, { createContext, useContext, useState, useCallback } from 'react';

type RegistrationType = 'startup' | 'sponsor' | 'speaker' | null;

interface RegistrationContextValue {
  isOpen: boolean;
  isPartnerOpen: boolean;
  registrationType: RegistrationType;
  openModal: (type?: RegistrationType) => void;
  closeModal: () => void;
  openPartnerModal: () => void;
  closePartnerModal: () => void;
}

const RegistrationContext = createContext<RegistrationContextValue | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<RegistrationType>(null);

  const openModal = useCallback((type?: RegistrationType) => {
    setIsPartnerOpen(false);
    setRegistrationType(type ?? null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openPartnerModal = useCallback(() => {
    setIsOpen(false);
    setIsPartnerOpen(true);
  }, []);

  const closePartnerModal = useCallback(() => {
    setIsPartnerOpen(false);
  }, []);

  return (
    <RegistrationContext.Provider
      value={{
        isOpen,
        isPartnerOpen,
        registrationType,
        openModal,
        closeModal,
        openPartnerModal,
        closePartnerModal,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextValue => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

export default RegistrationContext;
