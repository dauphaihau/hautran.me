/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'var(--c-light)',
          normal: 'var(--c-normal)',
          deep: 'var(--c-deep)',
          deeper: 'var(--c-deeper)',
        },
      },
    },
    container: {
      screens: {
        lg: '1140px',
        xl: '1140px',
        '2xl': '1140px',
      }
    }
  },
  plugins: [],
}

