var gulp			= require('gulp')
	, concat		= require('gulp-concat')
	, sass			= require('gulp-sass')
	, util			= require('gulp-util')
	, sourcemap		= require('gulp-sourcemaps')
	, expect		= require('gulp-expect-file')
	, minifyCSS		= require('gulp-minify-css')
	, browserify	= require('browserify')
	, babelify 		= require('babelify')
	, source 		= require('vinyl-source-stream')
	, beep 			= require('beepbeep')
	, rename		= require('gulp-rename');



var paths		= {
	jsSrc		: 'www/src/js' 		// For file watcher
	, jsFiles	: [
		  'main.js'
		  //, 'experiments/canvas/canvas.js'
		  //, 'experiments/canvas/native.js'
		  /*'experiments/matrix/matrix.js'
		  , 'experiments/svg/svg.js'
		  , 'experiments/div/div.js'*/
	]
	, jsDest	: 'www/dist/js'

	, scssSrc	: 'www/src/scss'
	, cssDest	: 'www/dist/css'
	, bowerSrc	: 'www/src/bower_components'
	, bowerFiles: []
	, npmSrc	: 'node_modules'
	, npmFiles	: [
		'babel-polyfill/dist/polyfill.js'
	]
	, vendorDest: 'www/dist/vendor'
};



function browserifyFile(file) {
	return new Promise((resolve, reject) => {
		browserify({entries: [file], debug: true, basedir: paths.jsSrc, extensions: ['.js', '.jsx'] })
			.transform('babelify')
			.bundle()
			.pipe(source(file))
			.pipe(gulp.dest(paths.jsDest))
			.on('end', resolve)
			.on('error', (err) => {
				reject(err);
				beep(3);
			});
	}) ;
}

/**
* @param {String} baseFolder	Folder (without final slash)
* @param {Array} files			File names (as array)
*/
function copyFiles(baseFolder, files) {
	return gulp.src(files.map((file) => baseFolder + '/' + file), { base: baseFolder })
		.pipe(gulp.dest(paths.vendorDest));
};


gulp.task('scripts', () => {
	return Promise.all(paths.jsFiles.map((file) => browserifyFile(file)))
		.then(beep);
});


gulp.task('styles', () => {
	return gulp.src([paths.scssSrc + '/main.scss' ] )
		.pipe(concat('main.min.css'))
		.pipe(sass().on('error', util.log))
		.pipe(minifyCSS())
		.pipe(gulp.dest(paths.cssDest));
});


gulp.task( 'watch', function() {
	gulp.watch( paths.scssSrc + '/**/*.scss', ['styles']);
	gulp.watch(paths.jsSrc + '/**/*.{js,jsx}', ['scripts']);
} );


gulp.task('vendor', () => {
	return Promise.all([
		copyFiles(paths.bowerSrc, paths.bowerFiles)
		, copyFiles(paths.npmSrc, paths.npmFiles)
	]);
});


gulp.task( 'default', [ 'vendor', 'styles', 'scripts', 'watch' ] );


