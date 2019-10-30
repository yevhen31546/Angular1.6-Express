angular.module("lemonadeReward").directive("stillNotSure", ['$rootScope', function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/stillNotSure/stillNotSure.html',
    controller: function controller($scope,$rootScope,$location) {

    }
  };
}]);
