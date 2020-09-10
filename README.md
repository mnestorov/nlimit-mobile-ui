# NLIMIT - Mobile Web UI Template

## How to Install

**Clone the repo or create a fork:**

`$ git clone https://github.com/mnestorov/nlimit-mobile-ui.git`

**Install the gulp command line utility:**

`npm install --global gulp-cli`

- [Quick Start guide for Gulp installation](https://gulpjs.com/docs/en/getting-started/quick-start)

**Install the required NPM packages**

- [yargs](https://www.npmjs.com/package/yargs) - yargs helps you build interactive command line tools.
- [gulp-sass](https://www.npmjs.com/package/gulp-sass) - sass plugin for gulp.
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) - gulp plugin to minify css, using clean-css.
- [gulp-if](https://www.npmjs.com/package/gulp-if) - a ternary gulp plugin, conditionally control the flow of vinyl objects.
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - write inline source maps.
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - minify PNG, JPEG, GIF and SVG images with imagemin.
- [del](https://www.npmjs.com/package/del) - delete files and folders using globs
- [webpack-stream](https://www.npmjs.com/package/webpack-stream) - run webpack as a stream to conveniently integrate with gulp.
- [babel-loader](https://www.npmjs.com/package/babel-loader) - this package allows transpiling JavaScript files using Babel and webpack.
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - minify JavaScript with UglifyJS3.
- [vinyl-named](https://www.npmjs.com/package/vinyl-named) - give vinyl files arbitrary chunk names.
- [gulp-zip](https://www.npmjs.com/package/gulp-zip) - ZIP compress files.
- [gulp-replace](https://www.npmjs.com/package/gulp-replace) - a string replace plugin for gulp 3.

**Use latest JavaScript version in our gulpfile**

Node already supports a lot of ES2015+ features, but to avoid compatibility problems we need to **install [Babel](https://babeljs.io/docs/en/babel-register)** and rename our **_gulpfile.js_** as **_gulpfile.babel.js_**.

`npm install --save-dev @babel/register @babel/core @babel/preset-env`

## How to Run

**Run the project for development with hot reload:**

`$ gulp dev` or `$ npm run dev`

**Build the project for production:**

`$ gulp bundle --prod` or `$ npm run bundle`

## GULP commands

These are all the commands we define in our **_gulp.babel.js_** file.

`gulp dev`, `gulp prod`, `gulp bundle --prod`, `gulp clean`

## NPM commands

These are all the NPM commands we define in our **_package.json_** file.

`npm run dev`, `npm run prod`, `npm run bundle`, `npm run clean`
