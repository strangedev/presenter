import { FunctionComponent } from 'react';
import rehypeStringify from 'rehype-stringify/lib';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import styles from './Slide.module.scss';

interface SlideProps {
  source: string;
}

const Slide: FunctionComponent<SlideProps> = ({ source }) => {
  const vfile = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
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
