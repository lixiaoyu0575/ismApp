var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require("gulp-concat");
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
// var bs = require('browser-sync').create();
var stripDebug = require('gulp-strip-debug');//Strip console, alert, and debugger statements from JavaScript code
var jshint = require('gulp-jshint');
 // var fontmin = require('gulp-fontmin');  to minify fonts

//****** Run tasks in parallel ******//
gulp.task('default',function(){
	gulp.run('minifyHTML','transferResources', 'compressImages','jshint');
});



//****** Minify javascript and css files ******//
gulp.task('minify', function(){
  return gulp.src('ismApp/*.html')
	  .pipe(useref())
	  .pipe(gulpIf('*.js',ngAnnotate()))//specific dependengcy annotation to minify
	  .pipe(gulpIf('*.js',uglify()))
	  .pipe(gulpIf('*.js',stripDebug()))
	  .pipe(gulpIf('*.css',minifyCSS()))
	  .pipe(gulp.dest('dist'))
});

//****** Minify html files ******//
gulp.task('minifyHTML',['minify'],function(){
	gulp.src(['ismApp/views*/*.html','ismApp/views*/**/*.html'])
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});

//****** Transfer files that require no minification ******//
gulp.task('transferResources',function(){//just transfer static resouces to certain location
	// gulp.src(['app/assets*/img*/*.png','app/assets*/resources*/*.png'])
	// 	.pipe(gulp.dest('dist/css'));
	// gulp.src('app/resources*/**/*.png')
	// 	.pipe(gulp.dest('dist'));
	gulp.src(['ismApp/lib/timeline/css/icons/*.ttf','ismApp/lib/timeline/css/icons/*.woff'])
		.pipe(gulp.dest('dist/assets/icons'));
	gulp.src('ismApp/assets/fonts*/*')
		.pipe(gulp.dest('dist/assets'));
	gulp.src('ismApp/data*/*')
		.pipe(gulp.dest('dist'));
});

//****** Watch any changes in source file and take actions correspondingly******//
gulp.task('watchChanges',function () {
	return gulp.watch(['ismApp/*.html','ismApp/**/*.js','ismApp/**/**/*.js','ismApp/**/*.css'],function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		//do something here after changes, e.g., recompile source files.
	})
})

//****** Optimize Images******//
gulp.task('compressImages',function(){
	return gulp.src(['ismApp/assets*/img*/*.png','ismApp/assets*/img*/**/*', 'ismApp/assets*/resources*/*.png'])
		// .pipe(imagemin({ progressive: true }))
		.pipe(gulp.dest('dist'));
});

//****** Optimize Fonts******// but not minified enough
// gulp.task('compressFonts',function(){
	// gulp.src(['app/lib/timeline/css/icons/*.ttf','app/lib/timeline/css/icons/*.woff'])
		// .pipe(fontmin({}))
		// .pipe(gulp.dest('dist/assets/icons'));
// });

//******* browsersync use case **********//
gulp.task('js-watch', ['minify'], function (done) {
    bs.reload();
    done();
});
// gulp.task('browser-sync', function() {
    // bs.init({
        // server: {
            // baseDir: "./app/"
        // }
    // });
// });

//****** jshint use case *********//
var jshinConfig = {
    "bitwise": true, // prohibits the use of bitwise operators such as ^ (XOR), | (OR) and others
    "camelcase": true, // force all variable names to use either camelCase style or UPPER_CASE with underscores
    "curly": true, // requires you to always put curly braces around blocks in loops and conditionals
    "eqeqeq": true, // prohibits the use of == and != in favor of === and !==
    "esversion": 5, //specify the ECMAScript version to which the code must adhere

    /*
     *   // forin requires all for in loops to filter object's items
     * for (key in obj) {
     *     if (obj.hasOwnProperty(key)) {
     *   // We are sure that obj[key] belongs to the object and was not inherited.
     *     }
     * }
     */
    "forin": true,
    "freeze": true, // options prohibits overwriting prototypes of native objects such as Array, Date and so on
    "immed": true, // prohibits the use of immediate function invocations without wrapping them in parentheses
    "indent": 4, // sets a specific tab width for your code

    /*
     * Latedef prohibits the use of a variable before it was defined.
     * Setting this option to "nofunc" will allow function declarations to be ignored.
     * Modern JS engines will look ahead and find your function definition before executing.
     */
    "latedef": "nofunc",
    "newcap": true, // requires you to capitalize names of constructor functions.
    "noarg": true, // prohibits the use of arguments.caller and arguments.callee
    "noempty": true, // warns when you have an empty block in your code.
    "nonbsp": true, // warns about "non-breaking whitespace" characters.
    "nonew": true, // prohibits the use of constructor functions for side-effects
    "plusplus": false, // prohibits the use of unary increment and decrement operators
    "quotmark": "double", // enforces the consistency of quotation marks used throughout your code
    "undef": true, // prohibits the use of explicitly undeclared variables
    "unused": false, // warns when you define and never use your variables
    "strict": true, // requires the code to run in ECMAScript 5's strict mode
    "maxparams": 10, // lets you set the max number of formal parameters allowed per function
    "maxdepth": 5, // lets you control how nested do you want your blocks to be
    "maxstatements": 40, // lets you set the max number of statements allowed per function
    "maxcomplexity": 8, // lets you control cyclomatic complexity throughout your code
    "maxlen": 120, // lets you set the maximum length of a line
    "asi": false, // suppresses warnings about missing semicolons
    "boss": false, // suppresses warnings about the use of assignments in cases where comparisons are expected
    "debug": false, // suppresses warnings about the debugger statements in your code
    "eqnull": true, // suppresses warnings about == null comparisons
    "esnext": false, // tells JSHint that your code uses ECMAScript 6 specific syntax
    "evil": false, // suppresses warnings about the use of eval
    "expr": false, // suppresses warnings about the use of expressions where normally you would expect to see assignments or function calls

    /*
     * funcscope suppresses warnings about declaring variables inside of control structures
     * while accessing them later from the outside
     */
    "funcscope": false,
    "globalstrict": false, // suppresses warnings about the use of global strict mode.
    "iterator": false, // suppresses warnings about the __iterator__ property
    "lastsemic": false, // suppresses warnings about missing semicolons, but only when the semicolon is omitted for the last statement in a one-line block:
    "laxbreak": false, // suppresses most of the warnings about possibly unsafe line breakings in your code
    "laxcomma": false, // suppresses warnings about comma-first coding style
    "loopfunc": false, // suppresses warnings about functions inside of loops. ???how to make right hint
    "maxerr": 50, // set the maximum amount of warnings JSHint will produce before giving up
    "moz": false, // tells JSHint that your code uses Mozilla JavaScript extensions
    "multistr": false, // suppresses warnings about multi-line strings
    "notypeof": false, // suppresses warnings about invalid typeof operator values
    "proto": false, // suppresses warnings about the __proto__ property
    "scripturl": false, // suppresses warnings about the use of script-targeted URLs—such as javascript:...
    "shadow": false, // suppresses warnings about variable shadowing
    "sub": true, // suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
    "supernew": false, // suppresses warnings about "weird" constructions like new function () { ... } and new Object;
    "validthis": false, // suppresses warnings about possible strict violations when the code is running in strict mode and you use this in a non-constructor function
    "noyield": false, // suppresses warnings about generator functions with no yield statement in them.
    "withstmt": false, // suppresses warnings about the use of the with statement

    "browser": true, // defines globals exposed by modern browsers
    "node": true, // defines globals available when your code is running inside of the Node runtime environment

    "globals": { // allow for global variables that are specific to the test environment
        "angular": false, // Setting it to false will trigger JSHint to consider that variable read-only
        "$": false
    }
};
gulp.task('jshint',function(){
	// return gulp.src(['app/app/**/*.js','app/app/*.'])
	// 	.pipe(jshint(jshinConfig))
	// 	.pipe(jshint.reporter('default'));
});