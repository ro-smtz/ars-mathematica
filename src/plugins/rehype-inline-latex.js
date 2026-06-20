import { visit } from "unist-util-visit";
import { codeToHtml } from "shiki";

export function rehypeInlineLatex() {
  return async function (tree) {
    const nodes = [];

    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "code" &&
        parent?.tagName !== "pre"
      ) {
        nodes.push({ node, index, parent });
      }
    });

    await Promise.all(
      nodes.map(async ({ node, index, parent }) => {
        const code = node.children?.[0]?.value;
        if (!code) return;

        const html = await codeToHtml(code, {
          lang: "latex",
          theme: "github-light",
        });

        // codeToHtml devuelve <pre><code>...</code></pre>
        // extraemos solo el <code> interior
        const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
        if (!match) return;

        node.properties = {
          ...node.properties,
          style: "background:#f6f8fa; padding:0.15em 0.35em; border-radius:4px; font-size:0.875em;",
        };
        node.children = [
          {
            type: "raw",
            value: match[1],
          },
        ];
      })
    );
  };
}