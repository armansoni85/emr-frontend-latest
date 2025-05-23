/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002952',
        danger: '#CF0000',
        warning: '#FBB040',
        info: '#00AEEF',
        success: '#00C49F',
        purple: '#DF00FF',
        heading: '#242424',
        body: '#585858',
        grey: '#F4F7F9',
        grey2: '#EAECEF',
        darkBlue: '#002952',
        black: '#111111',
        muted: '#8A94A4'
      },
    },
  },
  plugins: [],
}

