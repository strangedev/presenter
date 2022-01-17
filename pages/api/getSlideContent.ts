import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { getConfiguration } from '../../utils/getConfiguration';

interface GetSlideContentResponse {
  content: string;
}

export default async function getSlideContent (
  req: NextApiRequest,
  res: NextApiResponse<GetSlideContentResponse>,
) {
  const { relativePath } = req.query;
  const { slidesDirectory } = getConfiguration();

  if (!relativePath || typeof relativePath !== 'string') {
    return res.status(400).end();
  }

  const absoluteSlideFile = path.join(slidesDirectory, relativePath);

  if (!absoluteSlideFile.startsWith(slidesDirectory)) {
    return res.status(400).end();
  }

  return res.json({
    content: await fs.readFile(absoluteSlideFile, 'utf-8'),
  });
};
