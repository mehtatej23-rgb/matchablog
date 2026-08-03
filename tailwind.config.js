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
        // Full scales for the brand palette so we're no longer reaching for
        // one-off arbitrary hex values ( bg-[#3B5E2B]/10 etc ) all over the JSX.
        matcha: {
          50: '#F1F6ED',
          100: '#E1EBD9',
          200: '#C3D7B3',
          300: '#A0BE87',
          400: '#7CA25E',
          500: '#5C8442',
          600: '#3B5E2B', // original brand green
          700: '#2F4B22',
          800: '#24391A',
          900: '#192712',
          DEFAULT: '#3B5E2B'
        },
        espresso: {
          50: '#FAF5F0',
          100: '#F0E3D6',
          200: '#DFC3A6',
          300: '#C89D74',
          400: '#A6754C',
          500: '#85582F',
          600: '#5C3A21', // original brand brown
          700: '#4A2E1A',
          800: '#382214',
          900: '#26170D',
          DEFAULT: '#5C3A21'
        },
        ochre: {
          50: '#FDF8F0',
          100: '#FAEED9',
          200: '#F3DBAF',
          300: '#E4BD84',
          400: '#DCAE6E',
          500: '#D4A359', // original brand gold
          600: '#BE8A3C',
          700: '#9C6F2E',
          800: '#7A5623',
          900: '#583D19',
          DEFAULT: '#D4A359'
        },
        cream: {
          50: '#FFFFFF',
          100: '#FDFCFA',
          200: '#FAF7F2', // original brand cream
          300: '#F3ECE1',
          400: '#EADFCC',
          DEFAULT: '#FAF7F2'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 12px 35px -18px rgba(91, 58, 33, 0.25)',
        lift: '0 24px 48px -20px rgba(59, 94, 43, 0.35)',
        glow: '0 0 0 4px rgba(212, 163, 89, 0.25)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.4s ease-out both'
      }
    }
  },
  plugins: []
};
