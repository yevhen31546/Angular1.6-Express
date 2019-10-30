import gulp from 'gulp';
import rename from 'gulp-rename';

import { cnf } from '../cnf';

export function copy(cb) {
  let t = this;

  if (typeof t === 'undefined') {
    t = { dev: false };
  }

  function htaccess() {
    return gulp.src(`${cnf.base}/.htaccess`)
      .pipe(gulp.dest(cnf.dist))
      .on('end', cb);
  }

  function privacyPolicy() {
    return gulp.src(`${cnf.base}/vendor/*`)
      .pipe(gulp.dest(`${cnf.dist}/vendor`))
      .on('end', htaccess);
  }

  function fonts() {
    return gulp.src(`${cnf.base}/fonts/**/*`)
      .pipe(gulp.dest(`${cnf.dist}/fonts`))
      .on('end', privacyPolicy);
  }

  return gulp.src(`${cnf.base}/fonts/**/*`)
    .pipe(gulp.dest(`${cnf.dist}/fonts`))
    .on('end', fonts);
}

export default { copy };
