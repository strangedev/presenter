import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Slide } from '../components/Slide'
import { ListSlidesResponse } from '../types/ListSlidesResponse'

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery('listSlides',
    () => axios.get('/api/listSlides').then(({data}) => data)
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
    <ol>
      {
        Object.values(slides).map(({ id, path }) =>
          <li
            key={id}
            onClick={() => router.push(`/slide/${id}`)}
          >
            {id}{ ' ' }{path}
          </li>
        )
      }
    </ol>
  );
}

export default Home
