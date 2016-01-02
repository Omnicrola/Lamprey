/**
 * Created by omnic on 11/29/2015.
 */
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');
var clean = require('gulp-clean');

gulp.task('default', ['watch']);

gulp.task('build', ['clean', 'make-js', 'watch']);

gulp.task('clean', function () {
    gulp.src('./dist/js', {read: false})
        .pipe(clean());
})

gulp.task('make-js', function () {
    gulp.src('src/Lamprey.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function () {
    return gulp.src('src/Lamprey.js')
        .pipe(watch('src/**/*.js'))
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest('./dist/js'));
});