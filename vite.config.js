import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'styled-components': 'styled-components'
    }
  },
  optimizeDeps: {
    include: ['styled-components']
  }
})
