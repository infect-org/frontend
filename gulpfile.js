( function() {

	'use strict';

	var gulp				= require( 'gulp' )
		, uglify			= require( 'gulp-uglify' )
		, concat			= require( 'gulp-concat' )
		, sass				= require( 'gulp-sass' )
		, gutil				= require( 'gulp-util' )
		, rename			= require( 'gulp-rename' )
		, sourcemap			= require( 'gulp-sourcemaps' )
		//, gulpPrint			= require( 'gulp-print' )

		//, gutil				= require( 'gulp-util' )
		, minifyCSS			= require( 'gulp-minify-css' )
		, gulpExpect		= require( 'gulp-expect-file')
		, babel				= require('gulp-babel')

		//, replace			= require( 'gulp-replace' )
		, debug				= require( 'gulp-debug' )
		, runSequence		= require('run-sequence');



	// Paths
	var config = {
		bower					: {
			srcFolder			: 'www/src/bower_components'
		}
		, js					: {
			destFolder			: 'www/dist/js'
			, srcFolder			: 'www/src/js'
		}
		, css					: {
			srcFolder			: 'www/src/styles/less'
			, destFolder		: 'www/dist/css'
		}
	};




	const jsFiles = [
		
		// Methods on Maps
		'node_modules/babel-polyfill/dist/polyfill.js'

		, config.bower.srcFolder + '/zepto/zepto.js'
		, config.bower.srcFolder + '/angular/angular.js'
		, config.bower.srcFolder + '/fxstr-angular-typeahead/fxstr-angular-typeahead/typeaheadDirective.js'
		, config.bower.srcFolder + '/angular-translate/angular-translate.js'

		// Plugins
		, config.js.srcFolder + '/plugins.js'
		, config.js.srcFolder + '/matrix/hsl-to-rgb.js'
		, config.js.srcFolder + '/matrix/resistance-matrix.js'

		// App
		, config.js.srcFolder + '/angular/infekt/app.js'

		// Factories
		, config.js.srcFolder + '/angular/infekt/diagnosisFactory.js'
		, config.js.srcFolder + '/angular/infekt/translationFactory.js'
		, config.js.srcFolder + '/angular/infekt/antibioticsFactory.js'
		, config.js.srcFolder + '/angular/infekt/bacteriaFactory.js'
		, config.js.srcFolder + '/angular/infekt/searchTableFactory.js'
		, config.js.srcFolder + '/angular/infekt/resistanceFactory.js'
		, config.js.srcFolder + '/angular/infekt/filterFactory.js'

		// Controllers
		, config.js.srcFolder + '/angular/infekt/infektController.js'

		// Directives
		, config.js.srcFolder + '/angular/infekt/resistanceMatrixComponent.js'
		, config.js.srcFolder + '/angular/infekt/legal-notice.js'

		// Filters
		, config.js.srcFolder + '/angular/infekt/joinFilter.js'

		// View stuff
		, config.js.srcFolder + '/main.js'
	];




	gulp.task('babel', () => {

		return gulp.src('**/*.es2015.js')
			.pipe(debug())
			.pipe(sourcemap.init())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(sourcemap.write('.'))
			.pipe(rename((path) => {
				path.basename = path.basename.replace( /\.es2015/, '' );
			}))
			.pipe(gulp.dest(''));

	});




	gulp.task('mergeScripts', () => {

		return gulp.src(jsFiles)
			.pipe(debug())
			.pipe(gulpExpect(jsFiles))
			.pipe(sourcemap.init())
				.pipe(concat('scripts.js'))
				//.pipe(uglify())
			.pipe(sourcemap.write('.'))
			//.pipe(gutil.beep())
			.pipe(gulp.dest(config.js.destFolder));

	});


	gulp.task('scripts', (callback) => {
		return runSequence('babel', 'mergeScripts', callback);
	});


	// USE THIS FOR JS DEV!
	gulp.task('watchScripts', ['scripts'], () => {
		gulp.watch('**/*.es2015.js', ['babel']);		
		gulp.watch('**/*[^es2015].js', ['mergeScripts']);
	});




	/**
	* Concat and minify styles
	*/
	gulp.task( 'minifyStyles', function() {

		return gulp.src( [ config.css.srcFolder + '/styles.less' ] )

			.pipe(debug())
			.pipe( concat ( 'main.min.css' ) )
			.pipe( sass().on('error', gutil.log) )
			.pipe( minifyCSS() )
			.pipe( gulp.dest( config.css.destFolder ) );

	} );





	gulp.task( 'watchCSS', function() {
		gulp.watch( config.css.srcFolder + '/**/*.scss', [ 'minifyStyles' ] );
	} );


	// ONLY concatenates styles
	gulp.task( 'devCSS', [ 'minifyStyles', 'watchCSS' ] );






} )();
