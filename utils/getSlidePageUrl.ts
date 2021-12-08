import { Slide } from '../types/Slide';

const getSlidePageUrl = function (slide: Slide): string {
  return `/slide/${ slide.id }`;
};

export {
  getSlidePageUrl,
};
