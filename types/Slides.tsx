import { Slide } from './Slide';

type Slides = Record<string, Slide>;

const compareSlides = function (slide: Slide, other: Slide): number {
  return slide.ordinal - other.ordinal;
};

const areSlidesEqual = function (slide: Slide, other: Slide): boolean {
  return slide.id === other.id;
};

export type {
  Slides,
};
export {
  areSlidesEqual,
  compareSlides,
};