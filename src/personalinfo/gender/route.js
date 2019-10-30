angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.gender', {
    url: '/about/gender',
    views: {
      'main@': {
        templateUrl: 'views/personalinfo/gender/index.html',
        controller: 'GenderController',
      },
    },
  });
}
