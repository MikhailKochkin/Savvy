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

// module.exports = {
//   images: {
//     domains: [
//       "images.unsplash.com",
//       "sun9-14.userapi.com",
//       "sun9-24.userapi.com",
//       "res.cloudinary.com",
//       "media-exp1.licdn.com",
//       "sun9-37.userapi.com",
//       "sun9-20.userapi.com",
//     ],
//   },
// };
