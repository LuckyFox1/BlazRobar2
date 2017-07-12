'use strict';

const gulp = require('gulp'),
    pngquant = require('imagemin-pngquant'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()],
                interlaced: true
            }))
            .pipe(gulp.dest(options.dst))
            .pipe(reload({stream: true}));
    };
};
