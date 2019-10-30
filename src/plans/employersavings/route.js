angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.employersavings', {
    url: '/plans/employersavings',
    views: {
      'main@': {
        templateUrl: 'views/plans/employersavings/index.html',
        controller: 'EmployersavingsController',
      },
    },
  });
}
