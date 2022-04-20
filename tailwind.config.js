module.exports = {
  content: ["./src/**/*.{html,js,jsx}", ".src/components/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d8f3dcff",
          200: "#b7e4c7ff",
          300: "#95d5b2ff",
          400: "#74c69dff",
          500: "#52b788ff",
          600: "#40916cff",
          700: "#2d6a4fff",
          800: "#1b4332ff",
          900: "#081c15ff",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"],
    },
  },
  plugins: [],
};
