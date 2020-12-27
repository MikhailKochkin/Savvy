// next.config.js
const withOptimizedImages = require("next-optimized-images");
// const withCSS = require("@zeit/next-css");

module.exports = withOptimizedImages();

const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};
