import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [react()],
    // В production используем /szggk-ui/, в development - корень
    base: isProduction ? '/szggk-ui/' : '/',
  }
})