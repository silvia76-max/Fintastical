import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "gi6sbw",

  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.js",
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // Aquí puedes agregar eventos personalizados si los necesitas
      return config;
    },
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});