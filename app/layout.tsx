import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Providers from '@/components/Providers';
import AppShell from '@/components/AppShell';
import 'lenis/dist/lenis.css';
import '@/index.css';

const THEME_BOOT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('sc-theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F8EBCF' : '#050508');
  } catch (e) {}
  try {
    var coarse = window.matchMedia('(pointer: coarse)').matches;
    var narrow = window.matchMedia('(max-width: 768px)').matches;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var android = /Android/i.test(navigator.userAgent);
    var cores = navigator.hardwareConcurrency || 4;
    var mem = navigator.deviceMemory || 8;
    var saveData = !!(navigator.connection && navigator.connection.saveData);
    var mobile = coarse || narrow;
    var low =
      reduce ||
      saveData ||
      mem <= 2 ||
      cores <= 2 ||
      (android && mobile) ||
      (mobile && (mem <= 4 || cores <= 4));
    document.documentElement.setAttribute('data-perf', low || mobile ? 'low' : 'high');
    document.documentElement.setAttribute('data-mobile', mobile ? 'true' : 'false');
    if (android) document.documentElement.setAttribute('data-android', 'true');
  } catch (e2) {
    document.documentElement.setAttribute('data-perf', 'low');
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL('https://startupconfluence.com'),
  title: {
    default: "Startup Confluence 2.0 | India's Premier Startup Summit",
    template: '%s | Startup Confluence 2.0',
  },
  description:
    "Join India's premier startup summit. Connect with founders, investors, and innovators at Startup Confluence 2.0.",
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://startupconfluence.com',
    title: "Startup Confluence 2.0 | India's Premier Startup Summit",
    description:
      'Join the biggest startup ecosystem gathering in India. Discover, connect, and grow with top founders, investors, and mentors at United Incubation Hub.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Startup Confluence 2.0 | India's Premier Startup Summit",
    description:
      'Join the biggest startup ecosystem gathering in India. Discover, connect, and grow with top founders, investors, and mentors at United Incubation Hub.',
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F8EBCF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="antialiased"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
      >
        <Script id="theme-perf-boot" strategy="beforeInteractive">
          {THEME_BOOT_SCRIPT}
        </Script>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
