'use client';

import { ThemeProvider } from '../context/ThemeContext';
import { RegistrationProvider } from '../context/RegistrationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RegistrationProvider>{children}</RegistrationProvider>
    </ThemeProvider>
  );
}
