import { FunctionComponent } from 'react';
import rehypeStringify from 'rehype-stringify/lib';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import styled from 'styled-components';
import { unified } from 'unified';

const StyledDiv = styled.div`
  & h1 {
    font-size: 26px;
  }
`;

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
    <StyledDiv dangerouslySetInnerHTML={{ __html: String(vfile) }} />
  )
}; 

export {
  Slide
}
