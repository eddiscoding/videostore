import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  plugins: [
    tailwindcss(),
    // Please make sure that '@tanstack/router-plugin' is passed
    // before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react()
  ],
});
