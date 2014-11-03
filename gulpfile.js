var gulp = require("gulp"); 
var browserify = require("browserify"); 
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

var live = livereload();
livereload.listen();

gulp.task('browserify', function(){
    return browserify({
        entries:[ './src/js/main.jsx' ], 
        'debug': true
    })
        .transform('reactify',{'harmony': true})
        .bundle()
        .on('error', function( err ){
            console.log( '[錯誤]', err );
            this.end();
        })
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('copy', function(){
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));

    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task( 'refresh', function(){
    // console.log( '\nlivereload > refresh\n' );
    setTimeout(function(){
      live.changed('');
    }, 500);
});


gulp.task('dev', ['browserify', 'copy', 'refresh']);

gulp.task('run', function(){
    gulp.watch('src/js/**/*.*',['dev']);
});


gulp.task('default', ['browserify','copy',]);
