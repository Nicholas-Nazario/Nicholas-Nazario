import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://nicholas-nazario.github.io",
  base: "/Nicholas-Nazario",
  integrations: [react()],
});
