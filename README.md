## publish Angular Components to NPM as package using rollup js

### prerequisites:
- Angular-cli template
-  Rollup js


### Create Angular application using angular/cli

Run below commands for create a angular template
```sh
$ ng g new project-name
$ cd project-name
$ npm install
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

