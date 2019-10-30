import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';

import { cnf } from '../cnf';

export function vendors(cb) {
  let t = this;

  if (typeof t === 'undefined') {
    t = { dev: false };
  }

  gulp.src(cnf.vendors)
    .pipe(concat('vendors.js'))
    .pipe(gulpif(!t.dev, uglify()))
    .pipe(rename('vendors.min.js'))
    .pipe(gulp.dest(`${cnf.dist}/js`))
    .on('end', cb);
}

export default { vendors };
