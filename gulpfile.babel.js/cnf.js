export const cnf = {
  base: './src',
  dist: './dist',
  includePaths: [
    './node_modules/bootstrap-sass/assets/stylesheets',
    './node_modules/font-awesome/scss',
  ],
  vendors: [
    './node_modules/lodash/lodash.js',
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    './node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './node_modules/ngstorage/ngStorage.js',
    './node_modules/restangular/dist/restangular.js',
    './node_modules/angular-cookies/angular-cookies.js',
    './node_modules/angular-messages/angular-messages.js',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    './node_modules/angulartics/src/angulartics.js',
    './node_modules/angulartics-google-analytics/dist/angulartics-ga.min.js',
    './node_modules/ng-combo-date-picker/source/ngComboDatePicker.min.js',
    './modifiedVendorJs/saveSvgAsPng/saveSvgAsPng.js',
  ],
};
/*
* SAVE SVG AS PNG IS !!!!!
the startsWith is not IE compatible
- Rewritten to work in IE as well, taken off form node manageme
*/

//'./node_modules/save-svg-as-png/saveSvgAsPng.js',


// './node_modules/angular-animate/angular-animate.js',
//'./node_modules/svg-injector/dist/svg-injector.min.js',
//'./node_modules/save-svg-as-png/saveSvgAsPng.js',
export default { cnf };
