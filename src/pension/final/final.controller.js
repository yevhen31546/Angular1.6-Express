angular
  .module('lemonadeReward')
  .controller('FinalController', FinalController);

/**
 * @param $rootScope
 * @ngInject
 */
function FinalController($rootScope, $scope) {

    //Setup base value or if come back later select the proper picture
    if($rootScope.finalsalary_list.length>0){
      $scope.choices=$rootScope.finalsalary_list;
    }else{
        $scope.choices = [];
    }

      //add function
      $scope.addNewChoice = function() {
          //Restrict the number of final salary : max 3
          if($scope.choices.length<3){
                var newItemNo = $scope.choices.length+1;
                $scope.choices.push({'id':newItemNo});
                //calcualte sum
                $scope.finalSum();
           }//Final Salary less than 3


      };

      //remove function
      $scope.removeChoice = function() {
        var lastItem = $scope.choices.length-1;
        $scope.choices.splice(lastItem);
        //calcualte sum
        $scope.finalSum();
        //emit validation in Step Directive to run again
        $scope.$broadcast('stepsRevalidate', true);
      };

      //sum calcualtion
      $scope.finalSum=function(){
        $scope.sum=0
        //loop
        angular.forEach($scope.choices, function(value, key) {
          //if not empty and intiger
          $scope.potvalue=parseInt(value.value);
          if (!isNaN($scope.potvalue)){
              $scope.sum=$scope.sum+parseInt(value.value);
          }
        });
        //store to rootScope
          $rootScope.finalsalary_sum=$scope.sum;
          $rootScope.finalsalary_list=$scope.choices;
      }

  }//controller
