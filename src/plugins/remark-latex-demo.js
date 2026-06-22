import { codeToHtml } from "shiki";
import { visit } from "unist-util-visit";

export function remarkLatexDemo() {
  return async function (tree) {
    const nodes = [];

    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "latex-demo") {
        nodes.push({ node, index, parent });
      }
    });

    await Promise.all(
      nodes.map(async ({ node, index, parent }) => {
        const code = node.value;

        const highlighted = await codeToHtml(code, {
          lang: "latex",
          theme: "github-light",
        });

        const codeMatch = highlighted.match(/<code[^>]*>([\s\S]*?)<\/code>/);
        const highlightedCode = codeMatch ? codeMatch[1] : code;

        // Codificamos el LaTeX en base64 para evitar que el parser lo escape
        const encoded = Buffer.from(code).toString("base64");

        const html = `
<div class="latex-demo">
  <div class="latex-demo-source"><pre class="astro-code github-light" style="background-color:#fff;color:#24292e;overflow-x:auto"><code>${highlightedCode}</code></pre></div>
  <div class="latex-demo-result" data-latex="${encoded}"></div>
</div>`;

        parent.children.splice(index, 1, {
          type: "html",
          value: html,
        });
      })
    );
  };
}