import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ListSlidesResponse } from '../types/ListSlidesResponse';
import { compareSlides } from '../types/Slides';
import { getSlidePageUrl } from '../utils/getSlidePageUrl';

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery('listSlides',
    () => axios.get('/api/listSlides').then(({ data }) => data),
  );

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  const { slides } = data as any as ListSlidesResponse;

  return (
    <>
      <ol>
        {
          Object.values(slides).sort(compareSlides).map((slide) =>
            <li
              key={ slide.id }
              onClick={ () => router.push(getSlidePageUrl(slide)) }
            >
              { slide.id }{ ' ' }{ slide.path }
            </li>,
          )
        }
      </ol>
    </>
  );
};

export default Home;
