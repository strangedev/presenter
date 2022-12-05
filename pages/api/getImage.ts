import fs from 'fs/promises';
import mimeTypes from 'mime-types';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { getConfiguration } from '../../utils/getConfiguration';

export default async function getImage (
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { relativePath } = req.query;
	const { slidesDirectory } = getConfiguration();

	if (!relativePath || typeof relativePath !== 'string') {
		return res.status(400).end();
	}

	const absoluteImageFile = path.join(slidesDirectory, relativePath);

	if (!absoluteImageFile.startsWith(slidesDirectory)) {
		return res.status(400).end();
	}

	const image = await fs.readFile(absoluteImageFile);
	const mimeType = mimeTypes.contentType(absoluteImageFile) || 'application/octet-stream';

	res.setHeader('Content-Type', mimeType);
	return res.send(image);
};
