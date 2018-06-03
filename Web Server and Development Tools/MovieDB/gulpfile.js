let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let htmlmin = require('gulp-htmlmin');

gulp.task('minify-css', () => {
    return gulp.src('./public/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./public/css/minifycss'));
});

gulp.task('minify-html', () => {
    return gulp.src('./views/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./views/minifyhtml'));
});

gulp.task('default', ['minify-css', 'minify-html']);

