angular.module("lemonadeReward").directive("proceedFlexibleModal", ['$rootScope', function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/proceedFlexibleModal/proceedFlexibleModal.html',
    controller: function controller($scope) {

    }
  };
}]);
