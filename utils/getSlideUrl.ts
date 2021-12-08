import { Slide } from '../types/Slide';

const getSlideUrl = function (slide: Slide): string {
  return `/slides/${ slide.path }`;
};

export {
  getSlideUrl,
};
