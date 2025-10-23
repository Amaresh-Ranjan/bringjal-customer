/** @type {import('tailwindcss').Config} */
export default {
  important: true, // This enables the !important modifier
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*.{html,js}",
    "./src/**/*.component.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
