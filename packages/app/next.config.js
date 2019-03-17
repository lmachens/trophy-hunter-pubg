/* eslint-disable */
// Typescript workaround: https://github.com/zeit/next.js/issues/5750#issuecomment-442313585
const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants'); // Get values from `next-server` package when building on now v2

module.exports = phase => {
  const withTypescript = require('@zeit/next-typescript');
  const withCSS = require('@zeit/next-css');
  const fs = require('fs');
  const { join } = require('path');
  const dotenv = require('dotenv');
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

  dotenv.config();

  return withTypescript(
    withCSS({
      env: {
        TH_PUBG_API: process.env.TH_PUBG_API,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN
      },
      exportPathMap: (defaultPathMap, { dev, dir, outDir, distDir, buildId }) => {
        if (dev || phase === PHASE_PRODUCTION_SERVER) {
          return defaultPathMap;
        }

        const files = fs.readdirSync(join(dir, 'overwolf'));
        files.forEach(file => {
          fs.copyFileSync(join(dir, 'overwolf', file), join(outDir, file));
        });

        return defaultPathMap;
      },
      webpack(config, options) {
        config.plugins = [...config.plugins, new MonacoWebpackPlugin()];
        const originalEntry = config.entry;
        config.entry = () => {
          return originalEntry().then(entry => {
            entry = {
              ...entry,
              'static/editor.worker.js': 'monaco-editor/esm/vs/editor/editor.worker.js',
              'static/json.worker.js': 'monaco-editor/esm/vs/language/json/json.worker',
              'static/css.worker.js': 'monaco-editor/esm/vs/language/css/css.worker',
              'static/html.worker.js': 'monaco-editor/esm/vs/language/html/html.worker',
              'static/ts.worker.js': 'monaco-editor/esm/vs/language/typescript/ts.worker'
            };
            return entry;
          });
        };
        config.output = {
          ...config.output,
          globalObject: 'self'
        };

        if (phase === PHASE_PRODUCTION_SERVER) {
          return config;
        }
        config.resolve.modules.unshift(__dirname);
        return config;
      },
      target: 'serverless'
    })
  );
};
