angular
  .module('lemonadeReward')
  .controller('PotController', PotController);

/**
 * @param $rootScope
 * @ngInject
 */
function PotController($rootScope, $scope) {


  //Setup base value or if come back later select the proper picture
  if($rootScope.pension_potList.length>0){
    $scope.choices=$rootScope.pension_potList;
  }else{
      $scope.choices = [{id: 'pot1'}];
  }

    //add function
    $scope.addNewChoice = function() {
         //Restrict the number of final salary : max 5
          if($scope.choices.length<5){
              var newItemNo = $scope.choices.length+1;
              $scope.choices.push({'':'pot'+newItemNo});
              //calcualte sum
              $scope.potSum();
         }//Final Salary less than 5
    };

    //remove function
    $scope.removeChoice = function() {
      var lastItem = $scope.choices.length-1;
      $scope.choices.splice(lastItem);
      //calcualte sum
      $scope.potSum();
      //emit validation in Step Directive to run again
      $scope.$broadcast('stepsRevalidate', true);
    };

    //sum calcualtion
    $scope.potSum=function(){
      $scope.sum=0
      //loop
      angular.forEach($scope.choices, function(value, key) {
        //if not empty and intiger
        $scope.potvalue=parseInt(value.value);
        if (!isNaN($scope.potvalue)){
            $scope.sum=$scope.sum+value.value;
        }
      });
      //store to rootScope
         //Round up/down to the nearest integer
        $rootScope.pension_potSum=Math.round($scope.sum);
        $rootScope.pension_potList=$scope.choices;
    }


}//controller
