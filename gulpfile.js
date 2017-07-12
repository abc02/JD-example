var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var clean = require('gulp-clean')
var changed = require('gulp-changed')
var less = require('gulp-less')
var concat = require('gulp-concat')



gulp.task('server', ['less', "js"], function () {

    browserSync.init({
        server: "."
    });
    gulp.watch("./src/js/*.js", ['js']);
    gulp.watch("./src/less/*less", ['less']);
    gulp.watch("./*.html").on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('less', function () {
    gulp.src(["./src/less/reset.less", "./src/less/com.less","./src/less/iconfont.less", "./src/less/*.less"])
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(gulp.dest("./dist/css"))
        .pipe(reload({ stream: true }));
});

gulp.task('js', function () {
    gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest("./dist/js"))
        .pipe(reload({ stream: true }));
})

gulp.task('default', ['server']);
