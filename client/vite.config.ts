/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

//@ts-ignore
// // For lazy loading modules 
// import packageConfig from './package.json'  assert { type: 'json' }

// function renderChunks(deps: Record<string, string>) {
//   let chunks : Record<any, any> = {} ;
//   Object.keys(deps).forEach((key) => {
//     if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
//     chunks[key] = [key];
//   });
//   return chunks;
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), pluginRewriteAll()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts']
  },
  // build: {
  //   sourcemap: false,
  //   rollupOptions: {
  //     output: {
  //       manualChunks: (path) => path.split('/').reverse()[path.split('/').reverse().indexOf('node_modules') -1],
  //     },
  //   },
  // },
});
