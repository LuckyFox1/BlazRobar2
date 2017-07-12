"use strict";

const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        let task = require(path).call(this, options);
        return task(callback);
    })
}

lazyRequireTask('assets', './tasks/assets', {
    src: 'app/**/*.html',
    dst: 'public'
});

lazyRequireTask('clean', './tasks/clean', {
    dst: 'public'
});

lazyRequireTask('fonts', './tasks/fonts', {
    src: 'app/fonts/**/*.*',
    dst: 'public/fonts'
});

lazyRequireTask('images', './tasks/images', {
    src: 'app/img/**/*.*',
    dst: 'public/img'
});

lazyRequireTask('less', './tasks/less', {
    src: 'app/less/**/index.less',
    conc: 'main.css',
    dst: 'public/style'
});

lazyRequireTask('js', './tasks/js', {
    src: 'app/js/**/*.js',
    dst: 'public/js'
});

gulp.task('build', gulp.series('clean', gulp.parallel('less', 'images', 'assets', 'fonts', 'js')));

gulp.task('watch', () => {
    gulp.watch('app/less/**/*.*', gulp.series('less'));
    gulp.watch('app/**/*.html', gulp.series('assets'));
    gulp.watch('app/fonts/**/*.*', gulp.series('fonts'));
    gulp.watch('app/img/**/*.*', gulp.series('images'));
});

lazyRequireTask('serve', './tasks/serve', {
    src: 'public'
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));