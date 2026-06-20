// @ts-check
import { defineConfig } from 'astro/config';
import { rehypeInlineLatex } from './src/plugins/rehype-inline-latex.js';

// https://astro.build/config
export default defineConfig({
  site: "https://ro-smtz.github.io",
  base: "/ars-mathematica",
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
    rehypePlugins: [rehypeInlineLatex],
  },
});