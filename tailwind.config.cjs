const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      pink: {
        DEFAULT: '#feefeb',
      },
      purple: {
        DEFAULT: '#5b4b5c',
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
    require('tailwindcss-rtl'),
  ],
};

module.exports = config;
