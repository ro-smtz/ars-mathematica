import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { rehypeInlineLatex } from './src/plugins/rehype-inline-latex.js';
import { remarkLatexDemo } from './src/plugins/remark-latex-demo.js';

export default defineConfig({
  site: "https://ro-smtz.github.io",
  base: "/ars-mathematica",
  output: 'static',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkLatexDemo],
      rehypePlugins: [rehypeInlineLatex],
    }),
    shikiConfig: {
      theme: "github-light",
    },
  },
});