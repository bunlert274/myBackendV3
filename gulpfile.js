(function(require) {
  'use strict'
  var sass          = require('gulp-sass')
  var gulp          = require('gulp')
  var browserSync   = require('browser-sync')
  var concat        = require('gulp-concat')
  var uglify        = require('gulp-uglify')
  var rename        = require('gulp-rename')
  var sourcemaps    = require('gulp-sourcemaps')
  var autoprefixer  = require('gulp-autoprefixer')

  var sassOptions = {errLogToConsole: true, outputStyle: 'expanded'}
  var autoprefixerOptions = ['last 2 versions', '> 5%', 'Firefox ESR']

  gulp.task('scripts', function() {
    return gulp.src('./source/script/**/*.js')
      .pipe(concat('mybackendv3.js'))
      .pipe(gulp.dest('./build/js/'))
  })

  gulp.task('js_prod', function() {
    return gulp.src(basefiles)
      .pipe(sourcemaps.init())
      .pipe(concat('mybackendv3.js'))
      .pipe(rename('mybackendv3.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/js/'))
  })

  gulp.task('sass', function() {
    gulp.src('./source/css/mybackendv3.sass')
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest('./build/css/'))
  })

  gulp.task('css_prod', function() {
    gulp.src('./source/css/mybackendv3.sass')
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest('./build/js/'))      
  })

  gulp.task('browser-sync', function() {
    browserSync({
      cors: true,
      server: {
        baseDir: './build'
      }
    })
  })

  gulp.task('default', ['browser-sync', 'sass', 'scripts'], function() {
    gulp.watch('source/css/**/**/*.+(scss|sass)', ['sass'])

    gulp.watch(['./build/**/*.html', './source/css/**/**/*.+(scss|sass)'], browserSync.reload);
    gulp.watch('./source/js/**/*.js', ['scripts', browserSync.reload])

  })

  gulp.task('production', ['js_prod', 'css_prod'])

})(require);