/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'jet-primary': '#3B82F6',     // Modern blue
        'jet-secondary': '#06B6D4',   // Cyan
        'jet-accent': '#8B5CF6',      // Purple
        'jet-gold': '#F59E0B',        // Amber/Gold
        'jet-dark': '#0F172A',        // Slate 900
        'jet-gray': '#475569',        // Slate 600
        'jet-light': '#F8FAFC',       // Slate 50
        'jet-rose': '#F43F5E',        // Rose
        'luxury-blue': '#1E40AF',     // Deep blue
        'luxury-purple': '#7C3AED',   // Violet
        'luxury-gold': '#D97706',     // Orange (gold tone)
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))',
        'hero-bg': "url('https://images.unsplash.com/photo-1583500178671-6778b4e14771?w=1920&h=1080&fit=crop&q=80')",
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-reverse': 'float 25s ease-in-out infinite reverse',
        'slide-up': 'slideUp 1s ease-out both',
        'fade-in': 'fadeIn 1.5s ease-out',
        'scale-in': 'scaleIn 0.8s ease-out',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        slideUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(50px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        scaleIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
