angular
  .module('lemonadeReward')
  .directive('pensionForm', pensionForm);

function pensionForm() {
  const directive = {
    restrict: 'E',
    templateUrl: 'views/directives/pension/index.html',
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
  function controller($rootScope, $scope, PersonalDataService, $timeout) {



  }
}
