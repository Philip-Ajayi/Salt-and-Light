/** @type {import('tailwindcss').Config} */
export default {
  important: true, // This ensures all Tailwind classes get `!important` automatically
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#de2c4d', // Customize primary color
        secondary: '#fb923c', // Customize secondary color
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins font
        averia: ['Averia Serif Libre', 'serif'], // Add Averia font
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem', // Custom container padding
        },
      },
    },
  },
  plugins: [],
}
