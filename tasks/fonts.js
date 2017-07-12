'use strict';

const gulp = require('gulp');

module.exports = (options) => {
    return function() {
        return gulp.src(options.src)
            .pipe(gulp.dest(options.dst));
    }
};