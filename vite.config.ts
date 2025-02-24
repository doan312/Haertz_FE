import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // 자동 업데이트 설정
      devOptions: {
        enabled: true, // 개발 환경에서도 PWA 기능 활성화
      },
      manifest: {
        name: "8hz-FE",
        short_name: "8hz-FE",
        description: "8hz-FE",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/", // GitHub Pages 레포지토리 이름
});