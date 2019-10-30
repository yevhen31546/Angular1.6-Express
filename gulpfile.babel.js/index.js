import gulp from 'gulp';

import { clean } from './tasks/clean';
import { copy } from './tasks/copy';
import { html } from './tasks/html';
import { img } from './tasks/img';
import { js } from './tasks/js';
import { scss } from './tasks/scss';
import { vendors } from './tasks/vendors';
import { watch } from './tasks/watch';


gulp.task('copy', gulp.parallel(copy));
gulp.task('clean', gulp.parallel(clean));
gulp.task('html', gulp.parallel(html));
gulp.task('img', gulp.parallel(img));
gulp.task('js', gulp.parallel(js));
gulp.task('scss', gulp.parallel(scss));
gulp.task('vendors', gulp.parallel(vendors));
gulp.task('watch', gulp.parallel(watch));

gulp.task('build', gulp.series(
  clean,
  gulp.parallel(
    copy.bind({ dev: true }),
    html,
    img,
    js.bind({ dev: true }),
    scss.bind({ dev: true }),
    vendors,
  ),
));

gulp.task('build:watch', gulp.series(
  clean,
  gulp.parallel(
    copy.bind({ dev: true }),
    html,
    img,
    js.bind({ dev: true }),
    scss.bind({ dev: true }),
    vendors,
  ),
  watch,
));

gulp.task('build:prod', gulp.series(
  clean,
  gulp.parallel(copy, html, img, js, scss, vendors),
));
