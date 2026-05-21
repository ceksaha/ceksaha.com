/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        'navy-light': 'var(--navy-light)',
        'navy-mid': 'var(--navy-mid)',
        'navy-dark': 'var(--navy-dark)',
        'red-accent': 'var(--red-accent)',
        'red-light': 'var(--red-light)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 8px)',
        '2xl': 'calc(var(--radius) + 16px)',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            a: { color: 'var(--accent)' },
            h1: { color: 'var(--foreground)' },
            h2: { color: 'var(--foreground)' },
            h3: { color: 'var(--foreground)' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};