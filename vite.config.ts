import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

const httpsConfig = {
  key: fs.readFileSync("/etc/letsencrypt/live/unitrip.duckdns.org/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/unitrip.duckdns.org/fullchain.pem")
};

console.log("HTTPS 설정 적용됨");

export default defineConfig({
  plugins: [react()],
  server: {
    https: httpsConfig,
    host: true, // 외부에서 접근 가능하게
    port: 5173,
  },
});
