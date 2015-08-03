'use strict'

// Libraries
var gulp 				 = require('gulp'),
    sass 				 = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss 	 = require('gulp-minify-css'),
    uglify 			 = require('gulp-uglify'),
    imagemin 		 = require('gulp-imagemin'),
    rename 			 = require('gulp-rename'),
    concat 			 = require('gulp-concat'),
    connect 		 = require('gulp-connect'),
    rimraf 			 = require('rimraf');

// Directories

var dirs = {
	dev: './dev',
	dist: './dist',
	devStyles: './dev/scss',
	distStyles: './dist/css',
	devJS: './dev/js',
	distJS: './dev/js'
	devImages: './dev/img',
	distImages: './dist/img'
};

// Spring Cleanin'

gulp.task('clean:dist', function(cb) {
	rimraf(dirs.dist, cb);
});

// Styles

gulp.task('styles', function() {
  return sass(dirs.devStyles + '/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(dirs.distStyles))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(dirs.distStyles))
});

// Scripts

gulp.task('js', function() {
  return gulp.src(dirs.devJS + '/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dirs.distJS))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dirs.distJS))
})

// Images

gulp.task('images', function() {
	 return gulp.src(dirs.devImages + '/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(dirs.distImages))
})

// Default Task

gulp.task('default', ['clean:dist', 'serve'], function() {
	gulp.start('styles', 'js', 'images', 'watch');
});

// Serve
// Starts a server
// Default Port: 8080
gulp.task('serve', function() {
  return connect.server({
    root: dirs.dist,
    livereload: true
  });
});

// Watch and test

gulp.task('watch', ['serve'], function() {
  gulp.watch(dirs.devStyles + '/**/*.scss', ['styles']);
  gulp.watch(dirs.devJS + '/**/*.js', ['js']);
  gulp.watch(dirs.devImages + '/**/*', ['images']);
});