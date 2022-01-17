import { createHash } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { EntryType, walk } from 'walk-file-tree';
import { ListSlidesResponse } from '../../types/ListSlidesResponse';
import { Slide } from '../../types/Slide';
import { getConfiguration } from '../../utils/getConfiguration';

const startsWithOrdinal = function (name: string): boolean {
  return /\d+((\.)\d+)*-/ug.test(name);
};

const getOrdinal = function (name: string): number[] {
  return name.split('-')[0].split('.').map((text): number => Number.parseInt(text));
};

const compareOrdinals = function (left: number[], right: number[]): number {
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    const leftNumber = left[i];
    const rightNumber = right[i];

    if (leftNumber - rightNumber !== 0) {
      return leftNumber - rightNumber;
    }
  }

  return left.length > right.length ? 1 : right.length > left.length ? -1 : 0;
};

const compareSlideNames = function (left: string, right: string): number {
  if (startsWithOrdinal(left) && startsWithOrdinal(right)) {
    return compareOrdinals(getOrdinal(left), getOrdinal(right));
  }

  return left.localeCompare(right);
};

export default async function listSlides (
  req: NextApiRequest,
  res: NextApiResponse<ListSlidesResponse>,
) {
  const slides: Slide[] = [];
  const { slidesDirectory } = getConfiguration();

  for await (const file of walk({
    directory: slidesDirectory,
    yields: [ EntryType.files ],
    matches: (filename) => filename.endsWith('md'),
    maximumDepth: 1,
  })) {
    const relativePath = path.relative(slidesDirectory, file);
    const id = createHash('sha1').update(relativePath).digest('hex');

    slides.push({
      id,
      relativePath,
      ordinal: 0,
    });
  }

  const sortedSlides = slides.sort(
    (left, right) => compareSlideNames(
      path.basename(left.relativePath),
      path.basename(right.relativePath),
    ),
  );

  return res.json({
    slides: Object.fromEntries(
      sortedSlides.map(
        (slide, index) =>
          [
            slide.id,
            {
              ...slide,
              ordinal: index,
            },
          ],
      ),
    ),
  });
};
