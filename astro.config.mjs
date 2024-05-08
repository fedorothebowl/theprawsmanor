import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpine from "@astrojs/alpinejs";
import astroI18next from "astro-i18next";

export default defineConfig({
  integrations: [astroI18next(), tailwind(), alpine()],
  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

