// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

import 'angular';
import 'angular-mocks/angular-mocks';

// import some modules by regex match
const context = require.context('./app', true, /\.spec.js$/);
context.keys().forEach(context);
