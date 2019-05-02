/* eslint-disable */
// Typescript workaround: https://github.com/zeit/next.js/issues/5750#issuecomment-442313585
const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants'); // Get values from `next-server` package when building on now v2

const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const fs = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = phase => {
  dotenv.config({
    path: `${process.env.NODE_ENV}.env`
  });

  return withTypescript(
    withOffline(
      withCSS({
        env: {
          TH_PUBG_API: process.env.TH_PUBG_API,
          GITHUB_TOKEN: process.env.GITHUB_TOKEN,
          MATOMO_ID: process.env.MATOMO_ID,
          MATOMO_URL: process.env.MATOMO_URL
        },
        exportPathMap: (defaultPathMap, { dev, dir, outDir, distDir, buildId }) => {
          if (!dev && phase !== PHASE_PRODUCTION_SERVER && !process.env.NOW_REGION) {
            const files = fs.readdirSync(join(dir, 'overwolf'));
            files.forEach(file => {
              fs.copyFileSync(join(dir, 'overwolf', file), join(outDir, file));
            });

            rmDir(join(dir, 'static/legacy'));
          }

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
        target: process.env.NEXT_TARGET || 'serverless',
        workboxOpts: {
          swDest: 'static/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /.png$/,
              handler: 'cacheFirst'
            },
            {
              urlPattern: /.webp$/,
              handler: 'cacheFirst'
            },
            {
              urlPattern: /^https?.*/,
              handler: 'networkFirst'
            }
          ]
        }
      })
    )
  );
};

const rmDir = dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const path = join(dir, file);
      if (fs.statSync(path).isDirectory()) {
        rmDir(path);
      } else {
        fs.unlinkSync(path);
      }
    });
    fs.rmdirSync(dir);
  }
};
