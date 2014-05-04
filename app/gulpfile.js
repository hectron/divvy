'use strict';

var LIVERELOAD_PORT = 35729,
  SERVER_PORT = 9000;

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var mocha = require('gulp-mocha');

gulp.task('styles', function () {
    return gulp.src('public/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded'
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('public/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter($.jshintStylish))
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('public/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('public/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('mocha', function (){
  gulp.src('./test/*.js')
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('test', ['scripts', 'mocha']);

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: LIVERELOAD_PORT }))
        .use(connect.static('public'))
        .use(connect.static('.tmp'))
        .use(connect.directory('public'));

    require('http').createServer(app)
        .listen(SERVER_PORT)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:' + SERVER_PORT);
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:' + SERVER_PORT);
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'public/*.html',
        '.tmp/styles/**/*.css',
        'public/scripts/**/*.js',
        'public/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('public/styles/**/*.scss', ['styles']);
    gulp.watch('public/scripts/**/*.js', ['scripts']);
    gulp.watch('public/images/**/*', ['images']);
});
