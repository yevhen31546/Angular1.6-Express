import gulp from 'gulp';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import svgo from 'imagemin-svgo';

import { cnf } from '../cnf';

export function img(cb) {
  function favicon() {
    gulp.src(`${cnf.base}/favicon.ico`)
      .pipe(gulp.dest(cnf.dist))
      .on('end', cb);
  }

  return gulp.src(`${cnf.base}/images/**/*`)
    .pipe(cache(imagemin({
      progressive: true,
      use: [
        pngquant(),
        svgo({
          plugins: [{ removeViewBox: true }],
        }),
      ],
    })))
    .pipe(gulp.dest(`${cnf.dist}/images`))
    .on('end', favicon);
}

export default { img };
