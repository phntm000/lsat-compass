import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'LSAT Compass',
        short_name: 'Compass',
        description:
          'A serious, local-first LSAT preparation system. Learn reasoning from first principles.',
        theme_color: '#1e1b4b',
        background_color: '#faf9f7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        scope: '.',
        categories: ['education'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // SPA fallback so deep hash routes work offline after install.
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // All content is bundled locally; no external runtime caching needed.
        runtimeCaching: [],
        cleanupOutdatedCaches: true,
        // The bundled original content bank is split into per-area chunks
        // via advancedChunks above; allow each precached chunk up to 2MB
        // (largest is ~1.7MB of question data).
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
      },
    }),
  ],
  build: {
    // Small, dependency-free modules (icons, tiny helpers) are inlined as
    // data URLs below this threshold instead of extra HTTP requests.
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // NOTE: rolldown-vite (Vite 8) ignores output.manualChunks — the
        // function form is never invoked. Chunking must use advancedChunks.
        advancedChunks: {
          groups: [
            // Split the content bank so no single precached chunk is
            // oversized and content updates only invalidate one chunk.
            // Order matters: first matching group wins.
            { name: 'content-questions', test: /src\/content\/questions\// },
            { name: 'content-lessons', test: /src\/content\/lessons\// },
            { name: 'content-passages', test: /src\/content\/passages\// },
            { name: 'content-drills', test: /src\/content\/drills\// },
            { name: 'content-meta', test: /src\/content\// },
            { name: 'vendor', test: /node_modules/ },
          ],
        },
      },
    },
  },
})
