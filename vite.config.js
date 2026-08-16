import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // Put all CSS in one place (do not split it).
    cssCodeSplit: false,
    // Do not convert small images or icons into base64 text.
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
