import path from 'path';
import { processenv } from 'processenv';
import { Configuration } from '../types/Configuration';

const getConfiguration = function (): Configuration {
  const applicationRoot = process.env.ROOT!;
  const relativeSlidesDirectory = processenv(
    'SLIDES_DIRECTORY',
    path.join('public', 'slides'),
  ) as string;

  const configuration: Configuration = {
    slidesDirectory: path.join(applicationRoot, relativeSlidesDirectory)
  };

  return configuration;
};

export {
  getConfiguration,
};
