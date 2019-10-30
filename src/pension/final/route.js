angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.final', {
    url: '/pension/final',
    views: {
      'main@': {
        templateUrl: 'views/pension/final/index.html',
        controller: 'FinalController',
      },
    },
  });
}
