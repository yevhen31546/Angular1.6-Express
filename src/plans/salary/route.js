angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.salary', {
    url: '/plans/salary',
    views: {
      'main@': {
        templateUrl: 'views/plans/salary/index.html',
        controller: 'SalaryController',
      },
    },
  });
}
