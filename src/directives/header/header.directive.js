angular.module("lemonadeReward").directive("mainHeader", ['$rootScope','$location','BreadcrumbService', function ($rootScope,$location,BreadcrumbService) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/header/header.html',
    controller: function controller($scope,$timeout) {

        //Show or hide Header
        $scope.$on("$locationChangeStart", function(event){
            //Header
           $scope.hideHeader = BreadcrumbService.getHeader();
           //company name
            $scope.company = BreadcrumbService.companyName();  
        });
    }
  };
}]);
