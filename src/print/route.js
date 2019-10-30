angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.print', {
    url: '/print',
    views: {
      'main@': {
        templateUrl: 'views/print/index.html',
        controller: 'PrintController',
      },
    },
  });
}
