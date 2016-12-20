var gulp = require('gulp');

// templates
var htmlmin = require('gulp-htmlmin');

gulp.task('templates', function(){
	gulp.src('./dev/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./site'))
		.pipe(connect.reload());
});


// // styles
// var sass = require('gulp-sass');
// var prefix = require('gulp-autoprefixer');

// gulp.task('styles', function(){
// 	gulp.src('./dev/scss/style.scss')
// 		.pipe(sass({
// 			outputStyle: 'compressed'
// 		}))
// 		.pipe(prefix('last 12 version'))
// 		.pipe(gulp.dest('./site'))
// 		.pipe(connect.reload());
// });

//styles
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var prefix = require('gulp-autoprefixer');

gulp.task('minify-css', function() {
  return gulp.src('./dev/css/*.css')
  	.pipe(concat('style.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(prefix('last 12 version'))
    .pipe(gulp.dest('./site'));
});

// scripts
var uglify = require('gulp-uglifyjs');
gulp.task('scripts', function(){
	gulp.src('./dev/js/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./site'))
		.pipe(connect.reload());
});

// images
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
	gulp.src('./dev/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./site/img'))
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
	gulp.watch('./dev/*.html', ['templates']);
	gulp.watch('./dev/css/*.css', ['minify-css']);
	gulp.watch('./dev/js/*.js', ['scripts']);
	gulp.watch('/dev/img/*.{jpg, png, gif, svg}', {cwd: './dev/'}, ['img']);
});

// connect
var connect = require('gulp-connect-multi')();
gulp.task('connect', connect.server({
	host: '127.0.0.1',
	port: 9090,
	root: ['site'],
	livereload: true,
	open: {
		browser: 'Chrome'
	}
}));

gulp.task('default', ['templates', 'minify-css', 'scripts', 'images']);
gulp.task('dev', ['default', 'connect', 'watch']);




