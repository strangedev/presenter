import path from 'path';
import { Slide } from '../types/Slide';

const getImageUrl = (slidesDirectory: string, slide: Slide, imagePathRelativeToSlide: string): string => {
	const absoluteSlidePath = path.join(slidesDirectory, slide.relativePath);
	const absoluteImagePath = path.join(path.dirname(absoluteSlidePath), imagePathRelativeToSlide);
	const imagePathRelativeToSlidesDirectory = path.relative(slidesDirectory, absoluteImagePath);

	return `/api/getImage?relativePath=${ imagePathRelativeToSlidesDirectory }`;
};

export {
	getImageUrl,
};
