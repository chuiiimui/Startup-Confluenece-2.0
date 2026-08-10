'use client';

import { createContext, useContext } from 'react';

const RevealContext = createContext(true);

export function RevealProvider({
  value,
  children,
}: {
  value: boolean;
  children: React.ReactNode;
}) {
  return (
    <RevealContext.Provider value={value}>{children}</RevealContext.Provider>
  );
}

export function useRevealed() {
  return useContext(RevealContext);
}
