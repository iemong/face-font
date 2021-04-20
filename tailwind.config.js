module.exports = {
  purge: {
    layers: ["components", "utilities"],
    content: ["./src/**/*.tsx"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", "Helvetica Neue", "Helvetica", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
