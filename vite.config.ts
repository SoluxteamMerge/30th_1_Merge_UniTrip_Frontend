// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 외부 접근 허용
    port: 5173,       // 원하는 포트 유지
    https: true,      // HTTPS 활성화
  },
})
