// next.config.js

const { i18n } = require("./next-i18next.config");

module.exports = {
  // reactStrictMode: true,
  // swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
    localeDetection: true, // Ensure auto-detection works
  }, // include any other configuration options here
};
