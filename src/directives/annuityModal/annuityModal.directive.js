angular.module("lemonadeReward").directive("annuityModal", ['$rootScope', function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/annuityModal/annuityModal.html',
    controller: function controller($scope) {

    }
  };
}]);
