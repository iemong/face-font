const tailwindcss = require("tailwindcss");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [
    tailwindcss(),
    postcssPresetEnv({ browsers: "last 2 versions", stage: 1 }),
  ],
};
