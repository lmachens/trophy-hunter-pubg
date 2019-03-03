/* eslint-disable */

const withTypescript = require('@zeit/next-typescript');
const fs = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = withTypescript({
  env: {
    TH_PUBG_API: process.env.TH_PUBG_API
  },
  exportPathMap: (defaultPathMap, { dev, dir, outDir, distDir, buildId }) => {
    if (dev) {
      return defaultPathMap;
    }

    const files = fs.readdirSync(join(dir, 'overwolf'));
    files.forEach(file => {
      fs.copyFileSync(join(dir, 'overwolf', file), join(outDir, file));
    });

    return {
      '/': { page: '/' },
      '/trophies': { page: '/trophies' },
      '/matches': { page: '/matches' }
    };
  },
  webpack(config, options) {
    config.resolve.modules.unshift(__dirname);
    return config;
  }
});
