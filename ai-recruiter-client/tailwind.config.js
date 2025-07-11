/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/img/hero-pattern.svg')",
        "footer-texture": "url('/img/footer-texture.png')",
        "app-gradient":
          "linear-gradient(180deg, #ffffff 0%, #eeebff 69.79%, #ebe8ff 99.99%, #e1deff 100%)",
        "app-gradient-dark":
          "linear-gradient(180deg, #212126 0%, #212126 69.79%, #212126 99.99%, #212126 100%)",
      },
      backgroundColor: {
        darkCard: "#292930",
      },
      textColor: {
        primary500: "#6851FF",
        darkColor: "#D3D3D3",
      },
      textFillColor: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-fill-white': {
          '-webkit-text-fill-color': 'white',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};
