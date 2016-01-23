var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass');


gulp.task('start', function() {
    nodemon({
        script: './server.js',
        ext: 'js html jade',
        env: {
            'NODE_ENV': 'development',
            'NODE_PATH': '.',
            'PORT': 8000
        }
    });
});

gulp.task('sass', function() {
    gulp.src('./**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
    gulp.watch('./**/*.scss', ['sass']);
});

gulp.task('default', ['start', 'watch', 'sass']);
