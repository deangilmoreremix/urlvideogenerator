import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isTest = process.env.VITEST === 'true';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ffmpeg/ffmpeg': isTest
        ? path.resolve(__dirname, './tests/stubs/ffmpeg.ts')
        : '@ffmpeg/ffmpeg/dist/ffmpeg.mjs',
      '@ffmpeg/ffmpeg/dist/ffmpeg.mjs': isTest
        ? path.resolve(__dirname, './tests/stubs/ffmpeg.ts')
        : '@ffmpeg/ffmpeg/dist/ffmpeg.mjs',
      '@ffmpeg/util': isTest
        ? path.resolve(__dirname, './tests/stubs/ffmpeg-util.ts')
        : '@ffmpeg/util/dist/util.mjs'
    }
  },
  optimizeDeps: {
    include: [
      '@ffmpeg/ffmpeg',
      '@ffmpeg/util',
      '@ffmpeg/core'
    ],
    exclude: [
      '@remotion/compositor-win32-x64-msvc',
      '@remotion/compositor-darwin-x64',
      '@remotion/compositor-linux-x64-gnu',
      '@remotion/renderer',
    ]
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    }
  },
  build: {
    commonjsOptions: {
      exclude: [
        '@remotion/compositor-win32-x64-msvc',
        '@remotion/compositor-darwin-x64',
        '@remotion/compositor-linux-x64-gnu',
        '@remotion/renderer'
      ]
    }
  },
  envPrefix: 'VITE_',
  test: {
    environment: 'node'
  }
});