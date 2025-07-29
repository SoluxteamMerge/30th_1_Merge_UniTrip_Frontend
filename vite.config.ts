import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import fs from "fs";
import path from "path";

const httpsConfig = {
  key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "localhost-cert.pem")),
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
