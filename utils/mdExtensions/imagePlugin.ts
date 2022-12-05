import mdast from 'mdast';
import { Plugin } from 'unified';
import { is } from 'unist-util-is';
import { CONTINUE, visit } from 'unist-util-visit';
import { Slide } from '../../types/Slide';
import { getConfiguration } from '../getConfiguration';
import { getImageUrl } from '../getImageUrl';

const configuration = getConfiguration();

const getImagePlugin = (slide: Slide): Plugin<[], mdast.Root, mdast.Root> => () => {
	return (tree, file) => {
		visit(tree, (node, index, parent) => {
			if (!is<mdast.Image>(node, 'image')) {
				return CONTINUE;
			}

			node.url = getImageUrl(configuration.slidesDirectory, slide, node.url);

			return CONTINUE;
		});
	};
};

export {
	getImagePlugin,
};
