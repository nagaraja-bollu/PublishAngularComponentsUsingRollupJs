import config from './rollup.config.umd.js';
import { nameLibrary, PATH_DIST } from './config-library.js'
config.output = {
  file: PATH_DIST + nameLibrary + '.esm.js',
  format: 'es'
};

export default config;
