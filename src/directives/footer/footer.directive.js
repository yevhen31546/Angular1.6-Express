angular.module("lemonadeReward").directive("mainFooter", ['$rootScope','BreadcrumbService','$location', function ($rootScope,BreadcrumbService,$location) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/footer/footer.html',
    controller: function controller($scope,$timeout) {


      //Show or hide Header
      $scope.$on("$locationChangeStart", function(event){
        //check to show footer or not
        $scope.footerOnOff=BreadcrumbService.footerShow();
      });


    }
  };
}]);
