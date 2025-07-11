import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow access from outside
    port: 5173, // Replace with your actual port
    strictPort: true,
    allowedHosts: [".ngrok-free.app"], // Allow ngrok
  },
});
