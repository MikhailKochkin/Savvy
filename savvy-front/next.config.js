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

// module.exports = withOptimizedImages({
//   optimizeImagesInDev: true,
//   /* config for next-optimized-images */
//   // your config for other plugins or the general next.js here...
// });

const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};
