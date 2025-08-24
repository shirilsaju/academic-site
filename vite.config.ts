// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Relative base in production so GitHub Pages serves ./assets/... correctly
  base: mode === "production" ? "./" : "/",
}));
