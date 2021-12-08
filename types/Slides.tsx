import { Slide } from './Slide';
import { SlideId } from './SlideId';

type Slides = Record<string, {
  id: SlideId;
  path: string;
}>;

const compareSlides = function (slide: Slide, other: Slide): number {
  return slide.path.localeCompare(other.path);
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