import gulp from 'gulp';
import cache from 'gulp-cache';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';

import { cnf } from '../cnf';

export function scss(cb) {
  let t = this;

  if (typeof t === 'undefined') {
    t = { dev: false };
  }

  return gulp.src(`${cnf.base}/scss/main.scss`)
    .pipe(gulpif(t.dev, sourcemaps.init()))
    .pipe(sass({ includePaths: cnf.includePaths })
      .on('error', sass.logError))
    .pipe(cache(postcss([
      cssnext({ warnForDuplicates: false }),
      cssnano(),
    ])))
    .pipe(gulpif(t.dev, sourcemaps.write('./')))
    .pipe(gulp.dest(`${cnf.dist}/css`))
    .on('end', cb);
}

export default { scss };
