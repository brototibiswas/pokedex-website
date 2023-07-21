const gulp = require('gulp');
const { build } = require('vite');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
    return gulp.src('src/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('src/'));
}

function watchStyles() {
    gulp.watch('src/**/*.scss', buildStyles)
}

exports.default = gulp.series(buildStyles, watchStyles)