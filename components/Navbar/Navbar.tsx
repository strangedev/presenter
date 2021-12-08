import React, { FunctionComponent, ReactElement } from 'react';
import { Slide } from '../../types/Slide';
import { areSlidesEqual, compareSlides, Slides } from '../../types/Slides';
import { Button } from './Button/Button';

interface NavbarProps {
  slides: Slides;
  currentSlide: Slide;
  onNext: () => void;
  onPrevious: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = function ({
  slides,
  currentSlide,
  onNext,
  onPrevious,
}): ReactElement {
  const sortedSlides = Object.values(slides).sort(compareSlides);
  const currentSlideIndex = sortedSlides.findIndex((slide) => areSlidesEqual(slide, currentSlide));
  const numberOfSlides = Object.values(slides).length;

  return (
    <footer
      className="w-screen h-12 bg-black fixed bottom-0"
    >
      <div className="flex flex-row min-h-full justify-between items-center px-8">
        <Button
          onClick={ onPrevious }
          label="Back"
        />
        <div className="container flex flex-row justify-center">
          { currentSlideIndex !== -1 ?
            (<span> { currentSlideIndex + 1 } of { numberOfSlides }</span>) :
            (<span>{ numberOfSlides } Slides</span>)
          }
        </div>
        <Button
          onClick={ onNext }
          label="Forward"
        />
      </div>
    </footer>
  );
};

export {
  Navbar,
};