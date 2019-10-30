angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.state', {
    url: '/pension/state',
    views: {
      'main@': {
        templateUrl: 'views/pension/state/index.html',
        controller: 'StateController',
      },
    },
  });
}
