angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.settings', {
    url: '/options/annuity',
    views: {
      'main@': {
        templateUrl: 'views/options/annuity/index.html',
        controller: 'ChartAnnuityController',
      },
    },
  });
}
