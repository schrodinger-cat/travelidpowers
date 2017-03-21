var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var sourcemaps    = require('gulp-sourcemaps');
var browserSync   = require('browser-sync');
var jade          = require('gulp-jade');
var useref        = require('gulp-useref');
var uglify        = require('gulp-uglify');
var gulpIf        = require('gulp-if');
var cssnano       = require('cssnano');
var concat        = require('gulp-concat');
var gutil         = require('gulp-util');
var imagemin      = require('gulp-imagemin');
var cache         = require('gulp-cache');
var del           = require('del');
var runSequence   = require('run-sequence');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    logPrefix: 'Schrodinger-cat-box',
    open: false,
    port: 666
  })
})

gulp.task('sass', function() {
  var processors = [
      autoprefixer,
      cssnano
  ];
  return gulp.src('src/media/css/style.sass') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Passes it through a gulp-sass
    .pipe(postcss(processors))
    .pipe(gulp.dest('build/media/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('jade', function() {
 
  gulp.src('./src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src('src/media/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/media/js'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }))
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/media/css/**/*.sass', ['sass']);
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/media/js/**/*.js', ['js']);
  gulp.watch('src/media/img/**/*.js', ['images']);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {
  return gulp.src('src/**/*.jade')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('src/media/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('build/media/img'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('src/media/fonts/**/*')
    .pipe(gulp.dest('build/media/fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('build').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:build', function() {
  return del.sync(['build/**/*', '!build/media/img', '!build/media/img/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['jade', 'sass', 'js', 'images', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:build',
    'sass',
    'jade',
    'js',
    ['useref', 'images', 'fonts'],
    callback
  )
})