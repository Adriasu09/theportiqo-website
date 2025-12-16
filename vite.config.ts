import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { tanstackRouter } from '@tanstack/router-plugin/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
