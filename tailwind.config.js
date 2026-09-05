 /** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#059473',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059473',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 12px 28px -8px rgb(5 148 115 / 0.22), 0 8px 12px -8px rgb(0 0 0 / 0.12)',
        soft: '0 6px 24px -10px rgb(15 23 42 / 0.18)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'scale-in': 'scale-in 0.3s ease-out both',
      },
    },
    screens: {
      'xl': {'max': '1200px'},
      'lg': {'max': '1080px'},
      'md-lg': {'max': '991px'},
      'md': {'max': '768px'},
      'sm': {'max': '576px'},
      'xs': {'max': '480px'},
      '2xs': {'max': '340px'},
    }
  },
  plugins: [],
}
