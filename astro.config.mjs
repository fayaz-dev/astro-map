import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-blog.netlify.app',
  integrations: [
    tailwind(),
    preact(),
    sitemap()
  ],
  output: 'static',
  adapter: netlify(),
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    optimizeDeps: {
      include: ['three', 'three-forcegraph']
    }
  }
});