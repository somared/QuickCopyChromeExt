import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for the Quick Copy MV3 Chrome extension (popup-only).
// Notes:
// - base './' keeps asset URLs relative so they resolve under chrome-extension://
// - modulePreload.polyfill: false prevents Vite from injecting an inline <script>,
//   which MV3's default CSP (script-src 'self') forbids. Replaces CRA's INLINE_RUNTIME_CHUNK=false.
// - outDir 'build' matches the directory name referenced by the README / load-unpacked steps.
//   React components live in .jsx files so Vite/Rolldown parses JSX without extra loader config.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: false,
    modulePreload: { polyfill: false },
  },
});
