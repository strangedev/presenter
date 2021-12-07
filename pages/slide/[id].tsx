import axios from 'axios';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Slide } from '../../components/Slide';

const SlidePage: FunctionComponent = () => {
  const listSlidesQuery = useQuery('listSlides',
    () => axios.get('/api/listSlides').then(({data}) => data)
  );

  const router = useRouter();
  const id = router.query['id'] as string;

  const path: string | undefined = listSlidesQuery.isFetched ?
    listSlidesQuery.data.slides[id].path :
    undefined;

  const { isLoading, error, data } = useQuery(id,
    () => axios
      .get(`/slides/${path}`)
      .then(({ data }) => data),
      {
        enabled: path !== undefined
      }
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <Slide source={ data } />
  );
};

export default SlidePage;