'use strict';

const gulp = require('gulp'),
    notify = require('gulp-notify'),
    combine = require('stream-combiner2').obj,
    babel = require('gulp-babel');

module.exports = function(options) {
    return function() {
        return combine(
            gulp.src(options.src),
            babel(),
            gulp.dest(options.dst)).on('error', notify.onError());
    };
};
