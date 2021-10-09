// next.config.js
// const withCSS = require("@zeit/next-css");
// const withOptimizedImages = require("next-optimized-images");

// module.exports = withCSS({
//   cssModules: true,
//   //   cssLoaderOptions: {
//   //     importLoaders: 1,
//   //     localIdentName: "[local]___[hash:base64:5]"
//   //   }
// });

const localeSubpaths = {};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};

module.exports = {
  images: {
    domains: [
      "images.unsplash.com",
      "sun9-14.userapi.com",
      "sun9-24.userapi.com",
      "res.cloudinary.com",
      "media-exp1.licdn.com",
      "sun9-37.userapi.com",
      "sun9-20.userapi.com",
    ],
  },
};
