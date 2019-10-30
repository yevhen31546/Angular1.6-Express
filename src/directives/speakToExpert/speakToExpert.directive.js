angular.module("lemonadeReward").directive("speakToExpert", ['$rootScope',function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/speakToExpert/speakToExpert.html',
    controller: function controller($scope,$rootScope,$location) {


    },
    link: function(scope, elem, attrs,rootScope) {

    }
  };
}]);
