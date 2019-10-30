angular.module("lemonadeReward").directive("cashoutModal", ['$rootScope','CalculationService', function ($rootScope,CalculationService) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/cashoutModal/cashoutModal.html',
    controller: function controller($scope) {
      /* Results of the  Calcualtion*/
      $scope.calc=CalculationService.mainCollector();
    }
  };
}]);
