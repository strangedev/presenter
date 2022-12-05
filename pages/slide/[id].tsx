import axios from 'axios';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Navbar } from '../../components/Navbar/Navbar';
import { Slide } from '../../components/Slide/Slide';
import { areSlidesEqual, compareSlides, Slides } from '../../types/Slides';
import { getSlidePageUrl } from '../../utils/getSlidePageUrl';

const SlidePage: FunctionComponent = () => {
  const listSlidesQuery = useQuery('listSlides',
    () => axios.get('/api/listSlides').then(({ data }) => data),
  );

  const router = useRouter();
  const id = router.query['id'] as string;

  const slides: Slides | undefined = listSlidesQuery.isFetched ? listSlidesQuery.data.slides : undefined;
  const slide = slides ? slides[id] : undefined;
  const relativePath = slide ? slide.relativePath : undefined;

  const slideQuery = useQuery(id,
    () => axios
      .get(`/api/getSlideContent`, { params: { relativePath } })
      .then(({ data }) => data.content),
    {
      enabled: relativePath !== undefined,
    },
  );

  if (slideQuery.isLoading || !slides) {
    return <div>Loading...</div>;
  }

  if (slideQuery.error) {
    return <div>Error!</div>;
  }

  const sourceCode = slideQuery.data;
  const sortedSlides = Object.values(slides!).sort(compareSlides);
  const currentSlideIndex = sortedSlides.findIndex((someSlide) => areSlidesEqual(someSlide, slide!));
  const numberOfSlides = Object.values(slides!).length;
  let nextSlideIndex = currentSlideIndex + 1;
  if (nextSlideIndex === numberOfSlides) {
    nextSlideIndex = currentSlideIndex;
  }
  let previousSlideIndex = currentSlideIndex - 1;
  if (previousSlideIndex < 0) {
    previousSlideIndex = 0;
  }
  const nextSlide = sortedSlides[nextSlideIndex];
  const previousSlide = sortedSlides[previousSlideIndex];

  return (
    <>
      <Slide
        slide={ slide }
        source={ sourceCode }
      />
      <Navbar
        slides={ slides! }
        currentSlide={ slide! }
        onNext={ () => {
          router.push(getSlidePageUrl(nextSlide));
        } }
        onPrevious={ () => {
          router.push(getSlidePageUrl(previousSlide));
        } }
      />
    </>
  );
};

export default SlidePage;
