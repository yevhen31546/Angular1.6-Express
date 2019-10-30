angular.module("lemonadeReward").directive("reviewSummary", ['$rootScope','$location','BreadcrumbService', function ($rootScope,$location,BreadcrumbService) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/reviewSummary/reviewSummary.html',
    controller: function controller($scope) {

    }
  };
}]);
