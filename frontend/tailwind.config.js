 // tailwind.config.js
 module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FEF3E2',
        yellow: '#F3C623',
        orange: '#FFB22C',
        darkOrange: '#FA812F',
        dark: '#1f2937',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
    },
  },
  plugins: [],
};