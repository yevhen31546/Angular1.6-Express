angular.module("lemonadeReward").directive("steps", ['$rootScope','BreadcrumbService', function ($rootScope,BreadcrumbService) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/steps/steps.html',
    controller: function controller($rootScope,$scope,$timeout) {
      //base value
      $scope.errorMsg='';
      //get the step/postion related information
      $rootScope.step=BreadcrumbService.getStep();

      //assueme the best first during the validation
      $rootScope.valid={};
      $rootScope.valid.valid=true;
      $rootScope.valid.error='';



    },link: function(scope, element, attrs) {
        scope.validate = function(){
          //check if the provided value is vlaid
          scope.valid=BreadcrumbService.validate();
          element.on('click', function(e){
                //Only if clicked to the next BTN (Back do not count)
                if (angular.element(e.target).hasClass('nextBtn')) {
                    //if validation faild:prevent status change
                    if(scope.valid.valid==false){  e.preventDefault(); }
                }

            });
        }//validate function

        //Capture Broadcast to run revalidation function
         scope.$on('stepsRevalidate', function(event, mass) {
              scope.validate();
         });

      }//link
  };
}]);
