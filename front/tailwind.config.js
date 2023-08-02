/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'bg': '#FAFAFA',
      'header': '#F5AFA2',
      'container-1': '#7BA879',
      'text-1': '#D6F5D5',
      'container-2': '#79A4A8',
      'text-2': '#BCEFF5',
      'white': '#ffffff'
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}