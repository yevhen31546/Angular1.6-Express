angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.yoursavings', {
    url: '/plans/yoursavings',
    views: {
      'main@': {
        templateUrl: 'views/plans/yoursavings/index.html',
        controller: 'YoursavingsController',
      },
    },
  });
}
