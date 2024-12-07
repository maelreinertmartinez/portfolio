/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        timberwolf: {
          50: '#f8f6f4',
          100: '#eeebe6',
          200: '#ddd6cc',
          300: '#c7bbaa',
          400: '#af9c88',
          500: '#9f8570',
          600: '#927664',
          700: '#7a6154',
          800: '#645048',
          900: '#52433c',
          950: '#2b231f',
        },
      },
    },
  },
  plugins: [],
}
