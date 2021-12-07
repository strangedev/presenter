import { createHash } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { EntryType, walk } from 'walk-file-tree'
import { ListSlidesResponse } from '../../types/ListSlidesResponse';

const slidesDirectory = path.join(process.env.ROOT!, 'public', 'slides');

export default async function listSlides(
  req: NextApiRequest,
  res: NextApiResponse<ListSlidesResponse>
) {
  const slides: ListSlidesResponse['slides'] = {};

  for await (const file of walk({
    directory: slidesDirectory,
    yields: [ EntryType.files ],
    matches: (filename) => filename.endsWith('md'),
    maximumDepth: 1
  })) {
    const relativeFilename = path.relative(slidesDirectory, file);
    const id = createHash('sha1').update(relativeFilename).digest('hex');

    slides[id] = {
      id,
      path: relativeFilename,
    };
  }

  return res.json({ slides });
};
