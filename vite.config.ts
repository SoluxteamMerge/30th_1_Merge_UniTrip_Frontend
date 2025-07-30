// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
    host: true,
    port: 5173,
    allowedHosts: ["unitrip.duckdns.org"], //수정 부분
    
  },
});
