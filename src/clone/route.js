angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.clone', {
    url: '/clone',
    views: {
      'main@': {
        templateUrl: 'views/clone/index.html',
        controller: 'CloneController',
      },
    },
  });
}
