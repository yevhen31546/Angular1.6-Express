import gulp from 'gulp';

import { cnf } from '../cnf';

export function html(cb) {
  function templates() {
    gulp.src([
      `${cnf.base}/**/*.html`,
      `!${cnf.base}/index.html`,
    ])
      .pipe(gulp.dest(`${cnf.dist}/views`))
      .on('end', cb);
  }

  return gulp.src([
    `${cnf.base}/index.html`,
  ])
    .pipe(gulp.dest(cnf.dist))
    .on('end', templates);
}

export default { html };
