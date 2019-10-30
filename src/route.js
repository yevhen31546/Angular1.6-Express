angular
  .module('lemonadeReward')
  .config(config);

/**
 * @param $stateProvider
 * @param $urlRouterProvider
 * @param $locationProvider
 * @param $analyticsProvider
 * @ngInject
 */
function config($stateProvider, $urlRouterProvider, $locationProvider, $analyticsProvider) {
  $stateProvider.state('lr', {
    abstract: true,
    views: {
      main: {},
      clients: {
        templateUrl: 'views/abstract/clients/index.html',
      },
    },
  });


  function onEnter() {
    window.location.href = '/home';
  }

  /**
   * @param $rootScope
   * @ngInject
   */
  function controller($rootScope) {
    const rootScope = $rootScope;
    rootScope.title = 'Retirement Options Planner';
    rootScope.metaDescription = '';
    rootScope.keywords = '';
  }


  $urlRouterProvider.otherwise('/');
  $analyticsProvider.virtualPageviews(true);
  $locationProvider.html5Mode(true);
}
