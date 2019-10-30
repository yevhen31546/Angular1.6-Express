angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.flexible', {
    url: '/options/flexible',
    views: {
      'main@': {
        templateUrl: 'views/options/flexible/index.html',
        controller: 'ChartFlexibleController',
      },
    },
  });
}
