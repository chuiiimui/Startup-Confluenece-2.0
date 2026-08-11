/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: 'var(--brand-orange-deep)',
        accent: 'var(--brand-orange)',
        secondary: 'var(--brand-blue)',
        skybrand: 'var(--brand-sky)',
        light: '#FFFFFF',
        dark: 'var(--text-primary)',
        surface: {
          glass: 'var(--surface)',
          glassBorder: 'var(--border)',
        },
        text: {
          main: 'var(--text-primary)',
          muted: 'var(--text-muted)',
        },
        success: '#22C55E',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
