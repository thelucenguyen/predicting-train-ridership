const { copyFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev && !isServer) {
      // Copy routes-manifest.json to the output directory during build
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('CopyRoutesManifest', (compilation) => {
            const srcPath = join(process.cwd(), 'routes-manifest.json');
            const outDir = join(process.cwd(), '.next');
            const destPath = join(outDir, 'routes-manifest.json');
            
            if (existsSync(srcPath)) {
              if (!existsSync(outDir)) {
                mkdirSync(outDir, { recursive: true });
              }
              copyFileSync(srcPath, destPath);
              console.log('✓ Copied routes-manifest.json');
            }
          });
        },
      });
    }
    return config;
  },
};

module.exports = nextConfig;
