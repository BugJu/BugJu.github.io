// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Deine GitHub-Pages-URL (wichtig für Sitemap, RSS & absolute Links)
  site: 'https://bugju.github.io',

  integrations: [sitemap()],
});
