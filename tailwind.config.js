export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dana: {
          blue: '#118EEA',
          dark: '#0052CC',
          light: '#E3F2FD',
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 23, 42, 0.25)',
        'dana-sm': '0 2px 8px rgba(17, 142, 234, 0.08)',
        'dana-md': '0 4px 16px rgba(17, 142, 234, 0.12)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(192, 132, 252, 0.28), transparent 28%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.24), transparent 32%)',
        'dana-gradient': 'linear-gradient(135deg, #118EEA 0%, #0052CC 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
