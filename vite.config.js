import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './'),
      '@public': path.resolve(__dirname, './public'),
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),

      // ✅ ADD THIS LINE:
      // This forces Vite to use the CJS-compatible dist file for moment,
      // which is more reliable in production builds.
      'moment': path.resolve(__dirname, 'node_modules/moment/moment.js'),
    },
  },
})