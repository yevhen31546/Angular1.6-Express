import gulp from 'gulp';

import { html } from './html';
import { img } from './img';
import { js } from './js';
import { scss } from './scss';

import { cnf } from '../cnf';

export function watch() {
  gulp.watch([
    `${cnf.base}/index.html`,
    `${cnf.base}/**/*.html`,
  ], gulp.parallel(html));
  gulp.watch(`${cnf.base}/images/**/*`, gulp.parallel(img));
  gulp.watch(`${cnf.base}/**/*.js`, gulp.parallel(js));
  gulp.watch(`${cnf.base}/**/*.scss`, gulp.parallel(scss));
}

export default { watch };
