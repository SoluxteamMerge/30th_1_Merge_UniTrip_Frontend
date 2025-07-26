import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log("🛠️ HTTPS 설정 적용됨");

export default defineConfig({
  plugins: [react()],
});
