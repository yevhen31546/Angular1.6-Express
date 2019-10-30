angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.cashout', {
    url: '/options/cashout',
    views: {
      'main@': {
        templateUrl: 'views/options/cashout/index.html',
        controller: 'ChartCashoutController',
      },
    },
  });
}
