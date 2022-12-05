import mdast from 'mdast';
import mermaid from 'mermaid';
import { Plugin } from 'unified';
import { is } from 'unist-util-is';
import { CONTINUE, SKIP, visit } from 'unist-util-visit';

mermaid.initialize({ startOnLoad: true, theme: 'dark' });

const mermaidPlugin: Plugin<[], mdast.Root, mdast.Root> = function () {
	// Due to SSR, we need to reset this on every run.
	let diagramCounter = 0;

	return (tree, file) => {
		visit(tree, (node, index, parent) => {
			if (!is<mdast.Code>(node, 'code')) {
				return CONTINUE;
			}
			if (node.lang !== 'mermaid') {
				return CONTINUE;
			}

			const containerId = `diagram-${ diagramCounter++ }`;

			if (parent === null || index === null) {
				return CONTINUE;
			}

			mermaid.render('graph', node.value, svg => {
				const mountSvg = () => {
					const container = document.getElementById(containerId);
					if (container !== null) {
						container.innerHTML = svg;
					} else {
						setTimeout(mountSvg, 100);
					}
				};

				mountSvg();
			});

			parent.children.splice(index, 1, {
				type: 'html',
				value: `<div class="diagram" id="${ containerId }"/>`,
			});

			return [ SKIP, index ];
		});
	};
};

export {
	mermaidPlugin,
};
