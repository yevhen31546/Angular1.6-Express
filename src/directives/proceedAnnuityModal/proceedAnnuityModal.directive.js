angular.module("lemonadeReward").directive("proceedAnnuityModal", ['$rootScope', function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/proceedAnnuityModal/proceedAnnuityModal.html',
    controller: function controller($scope) {

    }
  };
}]);
