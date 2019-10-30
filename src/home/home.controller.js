angular
  .module('lemonadeReward')
  .controller('HomeController', controller);

/**
 * @param $rootScope
 * @ngInject
 */
function controller($rootScope,BreadcrumbService) {
  const vm = this;
  const rootScope = $rootScope;

  vm.$onInit = function $onInit() {
    rootScope.title = 'Lemonadereward.com';
    rootScope.metaDescription = '';
    rootScope.keywords = '';

  };
}
