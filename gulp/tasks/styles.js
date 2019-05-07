let plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    stylesPATH = {
        "input": "./dev/static/sass/",
        "ouput": "./build/static/css/"
    };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'main.sass')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            //.pipe(sourcemaps.write())
            .pipe(rename('main.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'main.sass')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe(csscomb())
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'main.sass')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe(csscomb())
            .pipe(csso())
            .pipe(rename('main.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
};
