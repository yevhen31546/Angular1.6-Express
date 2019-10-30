angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.table', {
    url: '/options/table',
    views: {
      'main@': {
        templateUrl: 'views/options/table/index.html',
        controller: 'TableController',
      },
    },
  });
}
