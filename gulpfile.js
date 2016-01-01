/**
 * Created by omnic on 11/29/2015.
 */
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sourceStream = require('vinyl-source-stream');
var clean = require('gulp-clean');

gulp.task('default', ['build']);

gulp.task('build', function (done) {

});

gulp.task('build', ['clean', 'make-js']);

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
