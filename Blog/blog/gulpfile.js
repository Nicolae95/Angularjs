'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/app/css/'));
});

gulp.task('copy', function () {
    gulp.src(['node_modules/angular/angular.js','node_modules/angular-ui-router/release/angular-ui-router.js','node_modules/angular-utils-pagination/dirPagination.js'])
    .pipe(gulp.dest('public/libs/'));
});

//Watch task
gulp.task('watch',function() {
    gulp.watch(['src/*.scss'], ['styles']);
});
