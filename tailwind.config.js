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
        heading: 'var(--heading-color, #242424)',
        body: 'var(--body-text-color, #585858)',
        link: 'var(--link-color, #00AEEF)',
        grey: '#F4F7F9',
        grey2: '#EAECEF',
        darkBlue: '#002952',
        black: '#111111',
        muted: '#8A94A4'
      },
      fontFamily: {
        base: 'var(--font-family, sans-serif)',
      },
      fontSize: {
        base: 'var(--font-size, 1rem)',
      },
      fontWeight: {
        base: 'var(--font-weight, 400)',
      }
    },
  },
  plugins: [],
}
