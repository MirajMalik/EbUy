import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000, 
    proxy: {
      "/api": {              // any request starting with /api will be forwarded to backend
        target: "http://localhost:3001", 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


