import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Base path: leave "/" for custom domains and user/org GitHub Pages.
// For project pages (e.g. /nyeneng/), set VITE_BASE_PATH=/nyeneng/ in CI.
const rawBase = process.env.VITE_BASE_PATH ?? "/";
const basePath = rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { port: 8080, host: true },
  build: { outDir: "dist", emptyOutDir: true, sourcemap: false },
});
