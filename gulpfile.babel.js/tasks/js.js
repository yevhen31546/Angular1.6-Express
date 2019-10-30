import gulp from 'gulp';
import ngAnnotate from 'gulp-ng-annotate';
import babel from 'gulp-babel';
import iife from 'gulp-iife';
import order from 'gulp-order';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';

import { cnf } from '../cnf';

export function js(cb) {
  let t = this;

  if (typeof t === 'undefined') {
    t = { dev: false };
  }

  return gulp.src([
    `${cnf.base}/**/*.js`,
  ])
    .pipe(gulpif(t.dev, sourcemaps.init()))
    .pipe(ngAnnotate())
    .pipe(iife({
      useStrict: true,
      trimCode: true,
      prependSemicolon: true,
      params: ['$', 'angular'],
      args: ['window.$', 'window.angular'],
    }))
    .pipe(order([
      'app.module.js',
      'app.controller.js',
      'route.js',
      '*.run.js',
      '*.factory.js',
      '*.service.js',
      '*.animation.js',
      '*.filter.js',
      '*.component.js',
      '*.directive.js',
      '*.controller.js',
    ]))
    .pipe(babel())
    .pipe(concat('app.modules.js'))
    .pipe(gulpif(!t.dev, uglify()))
    .pipe(rename('lemonade.min.js'))
    .pipe(gulpif(t.dev, sourcemaps.write('./')))
    .pipe(gulp.dest(`${cnf.dist}/js`))
    .on('end', cb);
}

export default { js };
