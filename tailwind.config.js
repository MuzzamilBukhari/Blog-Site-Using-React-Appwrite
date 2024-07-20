/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#17153B',
        green: '#2E236C',
        purple: '#433D8B',
        lightBlue: '#C8ACD6',
      },
    },
  },
  plugins: [],
}

