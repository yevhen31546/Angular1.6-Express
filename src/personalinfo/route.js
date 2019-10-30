angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.personalinfo', {
    url: '/about',
    views: {
      'main@': {
        templateUrl: 'views/personalinfo/index.html',
        controller: 'PersonalController',
      },
    },
  });
}
