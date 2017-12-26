const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('js', () => gulp
    .src([
        './src/**/*.js',
        '!./src/**/__test__/*.js',
        '!./src/**/*spec.js',
        '!./src/__mocks__/**/*.js',
    ])
    .pipe(babel())
    .pipe(gulp.dest('./lib')))

gulp.task('default', ['js'])