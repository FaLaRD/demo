let uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    scriptsPATH = {
      "input": "./src/assets/js/",
      "ouput": "./dist/assets/js/"
    };

module.exports = function () {
  $.gulp.task('libsJS:dev', () => {
    return $.gulp.src([
      'node_modules/svg4everybody/dist/svg4everybody.min.js',
      'node_modules/swiper/js/swiper.min.js',
      'src/assets/js/lib/Modal.js',
      'src/assets/js/lib/inputmask.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe($.gulp.dest(scriptsPATH.ouput));
  });

  $.gulp.task('libsJS:build', () => {
    return $.gulp.src([
      'node_modules/svg4everybody/dist/svg4everybody.min.js',
      'node_modules/swiper/js/swiper.min.js',
      'src/assets/js/lib/Modal.js',
      'src/assets/js/lib/inputmask.min.js'
    ])
    .pipe(babel({
      presets: [ ['@babel/env', {modules: false}] ]
    }))
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe($.gulp.dest(scriptsPATH.ouput));
  });

  $.gulp.task('js:dev', () => {
    return $.gulp.src([scriptsPATH.input + '*.js',
      '!' + scriptsPATH.input + 'libs.min.js'])
      .pipe($.gulp.dest(scriptsPATH.ouput))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });

  $.gulp.task('js:build', () => {
    return $.gulp.src([scriptsPATH.input + '*.js',
      '!' + scriptsPATH.input + 'libs.min.js'])
      .pipe($.gulp.dest(scriptsPATH.ouput))
  });

  $.gulp.task('js:build-min', () => {
    return $.gulp.src([scriptsPATH.input + '*.js',
      '!' + scriptsPATH.input + 'libs.min.js'])
      .pipe(babel({
        presets: [ ['@babel/env', {modules: false}] ]
      }))
      .pipe(concat('main.js'))
      //.pipe(uglify())
      .pipe($.gulp.dest(scriptsPATH.ouput))
  });
};
