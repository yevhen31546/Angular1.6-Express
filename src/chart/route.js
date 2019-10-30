angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.chart', {
    url: '/chart',
    views: {
      'main@': {
        templateUrl: 'views/chart/index.html',
      },
    },
  });
}
