/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        matcha: '#3B5E2B',
        espresso: '#5C3A21',
        cream: '#FAF7F2',
        ochre: '#D4A359'
      },
      boxShadow: {
        soft: '0 12px 35px -18px rgba(91, 58, 33, 0.25)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
