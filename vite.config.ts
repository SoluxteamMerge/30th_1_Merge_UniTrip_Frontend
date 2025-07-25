import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

console.log('🛠️ HTTPS 설정 적용됨')

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost-cert.pem'),
    },
    host: '0.0.0.0',
    port: 5173,
  },
})
