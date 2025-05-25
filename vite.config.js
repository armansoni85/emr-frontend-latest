import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    mainFields: [],
    alias: {
      '@root': path.resolve(__dirname, './'),
      '@public': path.resolve(__dirname, './public'),
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),

      stream: 'stream-browserify',
      util: 'util',
      // 'axios': 'axios/dist/browser/axios.cjs'
      // Allow moment.js to be used as an ESM module
    },

  },
  optimizeDeps: {
    include: ['stream', 'util']
  }
})