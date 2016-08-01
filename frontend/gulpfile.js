var paths = {
    scss: [
        './src/sass/*.scss'
    ],

    includePaths: [
        'bower_components/foundation-sites/scss'
    ],

    js: [

    ]
};

const gulp = require('gulp'),
path       = require('path'),
glob       = require('glob'),
browserify = require('browserify'),
gutil      = require('gulp-util'),
concat     = require('gulp-concat'),
uglify     = require('gulp-uglify'),
sass       = require('gulp-sass'),
es         = require('event-stream'),
babelify   = require('babelify'),
source     = require('vinyl-source-stream'),
rename     = require('gulp-rename');

var hbsfy = require("hbsfy").configure({
    extensions: ["hbs"]
});

var browserify_compiler = function(path,done) {
    glob(path, function(err, files) {
        if(err) done(err);
        var tasks = files.map(function(entry) {
            return browserify({
                entries: [entry],
                paths: ['./node_modules','./src/js'],
                 extensions: ['.js']
            })
            .transform(babelify)
            .transform(hbsfy)
            .bundle()
            .on('error', function (err) {
                console.info(err);
                gutil.log(
                   gutil.colors.red("Browserify compile error:"),
                   err.message
                );
                this.emit("end");
            })
            .pipe(source(entry))
            .pipe(rename(function (path) {
                console.info(path);
                path.dirname  = "js";
                //path.basename = "-goodbye";
                //path.extname  = ".md";
            }))
            .pipe(gulp.dest('./'));
        });
        es.merge(tasks).on('end', done);
    });
};

/***********
DEFINE  TASK
*********/

gulp.task('styles', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: paths.includePaths
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('browserify', browserify_compiler.bind(null,     './src/js/*.js'));

gulp.task('scripts', function() {
    return gulp.src(paths.js)
    .pipe(concat('vendor.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('/js'));
});


// Watch for changes in files
gulp.task('watch', function() {
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.scss, ['styles']);
    gulp.watch('./src/js/**/**.js', ['browserify']);
    gulp.watch('./src/js/**/**.hbs', ['browserify']);
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'browserify', 'watch']);
gulp.task('all', ['scripts', 'styles', 'browserify']);
