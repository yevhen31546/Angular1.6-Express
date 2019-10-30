angular.module("lemonadeReward").directive("startBeforeBtn", ['$rootScope','$location','BreadcrumbService', function ($rootScope,$location,BreadcrumbService) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/startBeforeBtn/startBeforeBtn.html',
    controller: function controller($scope,$timeout) {

    }
  };
}]);
