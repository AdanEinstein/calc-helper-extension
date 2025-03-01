import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        content: "src/content.ts",
        background: "src/background.ts",
        helper: "src/index.tsx"
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "helper") return "calc-helper.js";
          return "[name].js";
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "styles.css";
          }
          return "[name].[ext]";
        },
        format: "es",
      },
    }
  }
});
