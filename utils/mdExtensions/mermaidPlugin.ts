import mdast from 'mdast';
import mermaid from 'mermaid';
import { Plugin } from 'unified';
import { is } from 'unist-util-is';
import { CONTINUE, SKIP, visit } from 'unist-util-visit';

mermaid.initialize({ startOnLoad: true });

const mermaidPlugin: Plugin<[], mdast.Root, mdast.Root> = function () {
  return async (tree, file) => {
    visit(tree, (node, index, parent) => {
      if (!is<mdast.Code>(node, 'code')) {
        return CONTINUE;
      }
      if (node.lang !== 'mermaid') {
        return CONTINUE;
      }

      const svg = await new Promise(resolve => {
        mermaid.render('graph', node.value, result => resolve(result))
      });

      parent.children.splice(index, 1, {
        type: 'html',
        value: svg,
      });

      return [ SKIP, index ];
    });
  };
};

export {
  mermaidPlugin,
};