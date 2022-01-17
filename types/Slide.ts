import { SlideId } from './SlideId';

export interface Slide {
  id: SlideId;
  relativePath: string;
  ordinal: number;
}