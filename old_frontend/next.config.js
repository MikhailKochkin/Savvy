// next.config.js
const withOptimizedImages = require("next-optimized-images");
// const withCSS = require("@zeit/next-css");

module.exports = withOptimizedImages();

const localeSubpaths = {};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};
