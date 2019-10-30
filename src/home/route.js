angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.home', {
    url: '/',
    views: {
      'main@': {
        templateUrl: 'views/home/index.html',
        controller: 'HomeController',
        controllerAs: 'vm',
      },
    },
  });
}
