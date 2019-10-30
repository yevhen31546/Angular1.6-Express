angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.retirement', {
    url: '/about/retirement',
    views: {
      'main@': {
        templateUrl: 'views/personalinfo/retirement/index.html',
        controller: 'RetirementController',
      },
    },
  });
}
