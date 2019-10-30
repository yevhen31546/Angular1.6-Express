angular.module("lemonadeReward").directive("proceedCashoutModal", ['$rootScope', function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/proceedCashoutModal/proceedCashoutModal.html',
    controller: function controller($scope) {

    }
  };
}]);
