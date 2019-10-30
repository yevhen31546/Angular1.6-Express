angular
  .module('lemonadeReward')
  .directive('plansForm', plansForm);

function plansForm() {
  const directive = {
    restrict: 'E',
    templateUrl: 'views/directives/plans/index.html',
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
