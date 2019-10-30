angular.module("lemonadeReward").directive("flexibleModal", ['$rootScope', function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/flexibleModal/flexibleModal.html',
    controller: function controller($scope) {

    }
  };
}]);
