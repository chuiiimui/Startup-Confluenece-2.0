'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type RegistrationType = 'startup' | 'speaker' | 'delegate' | null;

interface RegistrationContextValue {
  isOpen: boolean;
  isPartnerOpen: boolean;
  isSponsorOpen: boolean;
  registrationType: RegistrationType;
  mobileDockVisible: boolean;
  setMobileDockVisible: (visible: boolean) => void;
  openModal: (type?: RegistrationType) => void;
  closeModal: () => void;
  openPartnerModal: () => void;
  closePartnerModal: () => void;
  openSponsorModal: () => void;
  closeSponsorModal: () => void;
}

const RegistrationContext = createContext<RegistrationContextValue | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<RegistrationType>(null);
  const [mobileDockVisible, setMobileDockVisible] = useState(false);

  const openModal = useCallback((type?: RegistrationType) => {
    setIsPartnerOpen(false);
    setIsSponsorOpen(false);
    setRegistrationType(type ?? null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openPartnerModal = useCallback(() => {
    setIsOpen(false);
    setIsSponsorOpen(false);
    setIsPartnerOpen(true);
  }, []);

  const closePartnerModal = useCallback(() => {
    setIsPartnerOpen(false);
  }, []);

  const openSponsorModal = useCallback(() => {
    setIsOpen(false);
    setIsPartnerOpen(false);
    setIsSponsorOpen(true);
  }, []);

  const closeSponsorModal = useCallback(() => {
    setIsSponsorOpen(false);
  }, []);

  return (
    <RegistrationContext.Provider
      value={{
        isOpen,
        isPartnerOpen,
        isSponsorOpen,
        registrationType,
        mobileDockVisible,
        setMobileDockVisible,
        openModal,
        closeModal,
        openPartnerModal,
        closePartnerModal,
        openSponsorModal,
        closeSponsorModal,
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
