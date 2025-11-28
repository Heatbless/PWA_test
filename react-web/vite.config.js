import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'React PWA Tasks',
        short_name: 'Tasks',
        description: 'A task management PWA that works offline and installs as a native app',
        theme_color: '#2196f3',
        background_color: '#2196f3',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="%232196f3"/><text x="96" y="110" font-family="Arial" font-size="80" fill="white" text-anchor="middle">📝</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="%232196f3"/><text x="256" y="300" font-family="Arial" font-size="200" fill="white" text-anchor="middle">📝</text></svg>',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  // Static site configuration for Vercel
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Development server configuration
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,
    strictPort: false, // Try next port if 5173 is taken
    // cors: true, // Enable CORS for mobile access
  },
  // Ensure all routes work in SPA mode for Vercel
  preview: {
    host: '0.0.0.0',
    port: 5173,
    // cors: true
  }
})