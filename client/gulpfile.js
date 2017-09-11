var gulp = require('gulp');
var concat = require('gulp-concat');

// var uglify = require('gulp-uglify');

var del = require('del');

var gutil = require('gulp-util');

var paths = {
  scripts: ['app/*.js', 'components/directives/main.nav.directive.js','components/services/*.js', 'components/directives/responsive.nav.directive.js', 'app/config/*.js',  'app/factory/*','app/controller/*'],
//   scripts: ['app/*.js', 'app/config/*.js', 'app/controller/*.js', 'app/factory/*.js','app/services/*.js', 'components/directives/*.js'],
  images: 'client/img/**/*',
  css: 'styles/custom.css'
};

// Not all tasks need to use streams 
// A gulpfile is just another node program and you can use any package available on npm 
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  return del(['build']);
});
 

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
  //  .pipe(es6transpiler())
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist'))
})


// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['scripts']);