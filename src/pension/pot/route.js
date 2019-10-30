angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.pot', {
    url: '/pension/pot',
    views: {
      'main@': {
        templateUrl: 'views/pension/pot/index.html',
        controller: 'PotController',
      },
    },
  });
}
