angular
  .module('lemonadeReward')
  .config(mainConfig);

/**
 * @param $stateProvider
 * @ngInject
 */
function mainConfig($stateProvider) {
  $stateProvider.state('lr.annuity', {
    url: '/options/settings',
    views: {
      'main@': {
        templateUrl: 'views/options/advancedSettings/index.html',
        controller: 'AdvancedSettingsController',
      },
    },
  });
}
