import { Slide } from './Slide';
import { SlideId } from './SlideId';

type Slides = Record<string, {
  id: SlideId;
  path: string;
  ordinal: number;
}>;

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