const gulp = require('gulp');
const yargs = require('yargs');
const cleancss = require('gulp-clean-css');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const del = require('del');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');
const named = require('vinyl-named');
const zip = require('gulp-zip');

const PRODUCTION = yargs.argv.prod;

const paths = {
	styles: {
		src: ['src/assets/css/global.style.css', 'src/assets/css/custom.style.css'],
		dest: 'dist/assets/css'
	},
	images: {
		src: 'src/assets/img/**/*.{jpg,jpeg,png,svg,gif}',
		dest: 'dist/assets/img'
	},
	scripts: {
		src: 'src/assets/js/global.script.js',
		dest: 'dist/assets/js'
	},
	other: {
		src: ['src/assets/**/*', '!src/assets/{img,js,css}', '!src/assets/{img,js,css}/**/*'],
		dest: 'dist/assets'
	},
	packaged: {
		src: ['**/*', '!.vscode', '!node_modules{,/**}', '!packaged{,/**}', '!src{,/**}', '!.babelrc', '!.gitignore', '!gulpfile.babel.js', '!package.json', '!package-lock.json'],
		dest: 'packaged'
	}
}
  
exports.default = (done) => {
	console.log('gulp works!')
	done();
}

module.exports.styles = () => {
	return gulp.src(paths.styles.src)
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(gulpif(PRODUCTION, cleancss({ 'compatability': 'ie8' })))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(gulp.dest(paths.styles.dest));
}

module.exports.images = () => {
	return gulp.src(paths.images.src)
		.pipe(gulpif(PRODUCTION, imagemin()))
		.pipe(gulp.dest(paths.images.dest));
}

module.exports.fonts = () => {
    return gulp.src('node_modules/font-awesome/**')
        .pipe(gulp.dest('dist/vendor/font-awesome'))
}

module.exports.scripts = () => {
	return gulp.src(paths.scripts.src)
		.pipe(named())
        .pipe(webpack({
            module: {
                rules: [
                    {
						test: /\.js$/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}
				]
            },
	    	output: {
	        	filename: '[name].js'
			},
	    	devtool: !PRODUCTION ? 'inline-source-map' : false,
            mode: PRODUCTION ? 'production' : 'development' //add this
		}))
		.pipe(gulpif(PRODUCTION, uglify())) //you can skip this now since mode will already minify
		.pipe(gulp.dest(paths.scripts.dest));
}

module.exports.copy = () => {
	return gulp.src(paths.other.src)
		.pipe(gulp.dest(paths.other.dest));
}

module.exports.clean = (done) => {
	del(['dist','packaged']).then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
		done(); // Call the callback function to signal async completion
	});
}

module.exports.watch = () => {
	gulp.watch('src/assets/css/**/*.css', module.exports.styles);
	gulp.watch('src/assets/js/**/*.js', module.exports.scripts);
	gulp.watch(paths.images.src, module.exports.images);
	gulp.watch(paths.other.src, module.exports.copy);
}

module.exports.compress = () => {
	return gulp.src(paths.packaged.src)
		.pipe(zip('gdir-mobile.zip'))
		.pipe(gulp.dest(paths.packaged.dest));
}

module.exports.dev = gulp.series(
    gulp.parallel(
        module.exports.styles, 
        module.exports.images, 
        module.exports.fonts, 
        module.exports.scripts, 
        module.exports.copy
    ), 
    module.exports.watch
);

module.exports.prod = gulp.series(
    module.exports.clean, 
    gulp.parallel(
        module.exports.styles, 
        module.exports.images, 
        module.exports.fonts, 
        module.exports.scripts, 
        module.exports.copy
    )
);

module.exports.bundle = gulp.series(
    module.exports.prod, 
    module.exports.compress
);

module.exports.dev = gulp.series(gulp.parallel(module.exports.styles, module.exports.images, module.exports.fonts, module.exports.scripts, module.exports.copy), module.exports.watch);
module.exports.prod = gulp.series(module.exports.clean, gulp.parallel(module.exports.styles, module.exports.images, module.exports.fonts, module.exports.scripts, module.exports.copy));
module.exports.bundle = gulp.series(module.exports.prod, module.exports.compress);
