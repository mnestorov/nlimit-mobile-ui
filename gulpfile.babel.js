import gulp from 'gulp';
import yargs from 'yargs';
import cleancss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import named from 'vinyl-named';
import zip from 'gulp-zip';

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

export const styles = () => {
	return gulp.src(paths.styles.src)
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(gulpif(PRODUCTION, cleancss({ 'compatability': 'ie8' })))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(gulp.dest(paths.styles.dest));
}

export const images = () => {
	return gulp.src(paths.images.src)
		.pipe(gulpif(PRODUCTION, imagemin()))
		.pipe(gulp.dest(paths.images.dest));
}

export const fonts = () => {
	return gulp.src('node_modules/font-awesome/**')
	  	.pipe(gulp.dest('dist/vendor/font-awesome'))
}

export const scripts = () => {
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

export const copy = () => {
	return gulp.src(paths.other.src)
		.pipe(gulp.dest(paths.other.dest));
}

export const clean = (done) => {
	del(['dist','packaged']).then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});
	done();
}

export const watch = () => {
	gulp.watch('src/assets/css/**/*.css', styles);
	gulp.watch('src/assets/js/**/*.js', scripts);
	gulp.watch(paths.images.src, images);
	gulp.watch(paths.other.src, copy);
}

export const compress = () => {
	return gulp.src(paths.packaged.src)
		.pipe(zip('nlimit-mobile.zip'))
		.pipe(gulp.dest(paths.packaged.dest));
}

export const dev = gulp.series(gulp.parallel(styles, images, fonts, scripts, copy), watch);
export const prod = gulp.series(clean, gulp.parallel(styles, images, fonts, scripts, copy));
export const bundle = gulp.series(prod, compress);