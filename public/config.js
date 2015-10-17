System.config({
  baseURL: "public/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "RubaXa/Sortable": "github:RubaXa/Sortable@1.2.1",
    "Sortable": "github:RubaXa/Sortable@1.2.1",
    "angular": "github:angular/bower-angular@1.4.5",
    "angular-animate": "github:angular/bower-angular-animate@1.4.5",
    "angular-hotkeys": "github:chieffancypants/angular-hotkeys@1.5.0",
    "angular-touch": "github:angular/bower-angular-touch@1.4.5",
    "angular-ui-date": "github:angular-ui/ui-date@0.0.8",
    "angular-ui/ui-date": "github:angular-ui/ui-date@0.0.8",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "core-js": "npm:core-js@1.1.4",
    "date.js": "npm:date.js@0.2.0",
    "dateify": "libraries/dateify",
    "es6-module-loader": "npm:es6-module-loader@0.17.7",
    "geoffgraham/animate.scss": "github:geoffgraham/animate.scss@3.2.0",
    "gregorian": "npm:gregorian@1.3.1",
    "interactions": "javascripts/interactions",
    "jquery": "github:components/jquery@2.1.4",
    "jquery-ui": "libraries/jquery-ui/jquery-ui",
    "lodash": "npm:lodash@3.10.1",
    "ng-sortable": "github:RubaXa/Sortable@1.2.1/ng-sortable",
    "velocity": "github:julianshapiro/velocity@1.2.2",
    "github:angular/bower-angular-animate@1.4.5": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:angular/bower-angular-touch@1.4.5": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:chieffancypants/angular-hotkeys@1.5.0": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-tty@0.1.0": {
      "tty-browserify": "npm:tty-browserify@0.0.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.24": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:date.js@0.2.0": {
      "debug": "npm:debug@0.7.4"
    },
    "npm:debug@0.7.4": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "tty": "github:jspm/nodelibs-tty@0.1.0"
    },
    "npm:es6-module-loader@0.17.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "when": "npm:when@3.7.3"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:when@3.7.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});
