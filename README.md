## publish Angular Components to NPM as package using rollup js

### prerequisites:
- Angular-cli template
-  Rollup js

### Create Angular application using angular/cli

Run below commands for create a angular template
```sh
$ ng g new project-name
$ cd project-name
```
Now Angular application is ready to use
### Install [RollupJS](https://rollupjs.org/guide/en) package

```
$ npm install --global rollup
```

### Configure rollupjs in config.js file
[using Config files](https://rollupjs.org/guide/en#using-config-files)
Below is sample config.
```
// rollup.config.js
export default {
  input: 'src/main.ts',
  output: {
    file: 'bundle.js',
    format: 'es'
  }
};
```

### Additional dependent Rollup plugins for angular
```
npm install --save-dev rollup-plugin-node-resolve
npm install --save-dev rollup-plugin-commonjs
npm install --save-dev rollup-plugin-angular
npm install --save-dev rollup-plugin-typescript
npm install --save-dev node-sass
```

### create new component (EMIComponent)

```
$ ng g component emi
```
for example, emi.component.ts file will create in the project with html as <p>emi works!</p>

#### export EMIComponent in app.module.ts
```
@NgModule({
  declarations: [
    AppComponent,
    EmiComponent
  ],
  exports: [EmiComponent],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
#### Create export.file.ts
```
// export the files here which will be available in client app while consuming this npm package
export * from './emi/emi.component'; 
```

#### update package.json

```
"main": "libraryname.umd.js",
"jsnext:main": "libraryname.esm.js",
"module": "libraryname.esm.js",
"types": "libraryname.d.ts",
```

### create gulpfile for tasks to run for build
```
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

```

```
$ cd dist
// login to npm registry or use .npmrc file and then publish the package
$ npm publish 
```

Reference blog:
https://hackernoon.com/how-to-create-library-in-angular-2-and-publish-to-npm-from-scratch-f2b1272d6266
