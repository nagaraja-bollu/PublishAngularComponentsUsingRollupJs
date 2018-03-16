var gulp = require('gulp'),
fs = require('fs'),
del = require('del'),
rimraf = require('rimraf'),
run = require('gulp-run'),
gutil = require('gulp-util');




gulp.task('removeFiles', function (cb) {

/* Delete all files in Dist folder   */
del.sync('./dist', cb);
//del.sync(['dist/!(.*)']);
});


gulp.task('copyFiles', function () {

/* step-1 copy package.json, npmrc, readMe file  */
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
delete packageJson.devDependencies;
delete packageJson.scripts;
fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));

// let npmrcFile = fs.readFileSync('.npmrc').toString();
// fs.writeFileSync('dist/.npmrc', npmrcFile);

let readMe = fs.readFileSync('README.md').toString();
fs.writeFileSync('dist/README.md', readMe);
return fs;
});

gulp.task('bundle', function () {
return run('rollup -c rollup.config.umd.js && rollup -c rollup.config.esm.js && tsc && ngc').exec();
});



gulp.task('default',
['removeFiles',
  'copyFiles',
  'bundle'],
function () {
  console.log('use npm publish -> for publishing this bundles into npm');
});


