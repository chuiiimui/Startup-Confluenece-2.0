import React, { createContext, useContext, useState, useCallback } from 'react';

type RegistrationType = 'startup' | 'sponsor' | 'speaker' | null;

interface RegistrationContextValue {
  isOpen: boolean;
  registrationType: RegistrationType;
  openModal: (type?: RegistrationType) => void;
  closeModal: () => void;
}

const RegistrationContext = createContext<RegistrationContextValue | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<RegistrationType>(null);

  const openModal = useCallback((type?: RegistrationType) => {
    setRegistrationType(type ?? null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <RegistrationContext.Provider value={{ isOpen, registrationType, openModal, closeModal }}>
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
