'use strict';

const gulp = require('gulp'),
    notify = require('gulp-notify'),
    combine = require('stream-combiner2').obj,
    concat = require('gulp-concat'),
    less = require('gulp-less');

module.exports = function(options) {
    return function() {
        return combine(gulp.src(options.src),
            less(),
            concat(options.conc),
            gulp.dest(options.dst)
        ).on('error', notify.onError());
    };
};

