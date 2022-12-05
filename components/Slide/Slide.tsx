import { FunctionComponent } from 'react';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify/lib';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { Slide as SlideType } from '../../types/Slide';
import { getImagePlugin } from '../../utils/mdExtensions/imagePlugin';
import { mermaidPlugin } from '../../utils/mdExtensions/mermaidPlugin';
import styles from './Slide.module.scss';

interface SlideProps {
	slide: SlideType;
	source: string;
}

const Slide: FunctionComponent<SlideProps> = ({ source, slide }) => {
	const vfile = unified()
		.use(remarkParse)
		.use(getImagePlugin(slide))
		.use(mermaidPlugin)
		.use(remarkRehype, {
			allowDangerousHtml: true,
		})
		.use(rehypeHighlight)
		.use(rehypeStringify, {
			allowDangerousHtml: true,
		})
		.processSync(source);

	return (
		<div
			className={ styles.markdown }
			dangerouslySetInnerHTML={ { __html: String(vfile) } }
		/>
	);
};

export {
	Slide,
};
