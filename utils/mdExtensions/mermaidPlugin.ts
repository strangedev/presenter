import mdast from 'mdast';
import mermaid from 'mermaid';
import { Plugin } from 'unified';
import { is } from 'unist-util-is';
import { CONTINUE, SKIP, visit } from 'unist-util-visit';

const mermaidPlugin: Plugin<[], mdast.Root, mdast.Root> = function () {
  return (tree, file) => {
    visit(tree, (node, index, parent) => {
      if (!is<mdast.Code>(node, 'code')) {
        return CONTINUE;
      }
      if (node.lang !== 'mermaid') {
        return CONTINUE;
      }

      parent.children.splice(index, 1, {
        type: 'html',
        value: `<div class="mermaid">${ node.value }</div>`,
      });

      return [ SKIP, index ];
    });
  };
};

export {
  mermaidPlugin,
};