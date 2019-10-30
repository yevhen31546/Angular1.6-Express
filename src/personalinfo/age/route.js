angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.age', {
    url: '/about/age',
    views: {
      'main@': {
        templateUrl: 'views/personalinfo/age/index.html',
        controller: 'AgeController',
      },
    },
  });
}
