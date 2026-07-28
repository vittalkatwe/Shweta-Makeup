import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Expose both default VITE_* and legacy REACT_APP_* env vars to the frontend.
  envPrefix: ['VITE_', 'REACT_APP_'],
})
