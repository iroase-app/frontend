/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      pink: {
        DEFAULT: '#feefeb',
        darker: '#ddced2'
      },
      purple: {
        DEFAULT: '#5b4b5c',
        lighter: '#978891',
      },
      dark: {
        DEFAULT: '#212121',
      }
    },
    fontFamily: {
      display: ['"Space Mono"', '"IBM Plex Mono"', 'monospace'],
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

module.exports = config;

