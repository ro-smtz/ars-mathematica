import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { rehypeInlineLatex } from './src/plugins/rehype-inline-latex.js';

export default defineConfig({
  site: "https://ro-smtz.github.io",
  base: "/ars-mathematica",
  output: 'static',
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeInlineLatex],
    }),
    shikiConfig: {
      theme: "github-light",
    },
  },
});