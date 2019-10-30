angular
  .module('lemonadeReward')
  .directive('optionsForm', optionsForm);

function optionsForm() {
  const directive = {
    restrict: 'E',
    templateUrl: 'views/directives/options/index.html',
    controller,
  };

  return directive;

  /**
   * @param $scope
   * @param $location
   * @param SalesforceService
   * @param $timeout
   * @param dataService
   * @ngInject
   */
  function controller($rootScope, $scope) {



  }
}
