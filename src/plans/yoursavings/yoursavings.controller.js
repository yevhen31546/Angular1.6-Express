angular
  .module('lemonadeReward')
  .controller('YoursavingsController', YoursavingsController);

/**
 * @param $rootScope
 * @ngInject
 */
function YoursavingsController($rootScope, $scope, $location) {

  if($rootScope.yourSavings>=0){
    $scope.montlySaving=$rootScope.yourSavings;
    if($rootScope.amount=='yes'){
          $scope.yourSavingValue=$rootScope.yourSavings;
          $scope.montlySaving=$rootScope.yourSavings;
    }
    else if($rootScope.amount=='no'){
        $scope.yourSavingPer=$rootScope.yourPerc;
        //!!! salaryBeforeTax => annual
        $scope.resultAmount=(($rootScope.salaryBeforeTax/12)*$scope.yourSavingPer)/100;
          $scope.montlySaving=$rootScope.yourSavings;
    }
  }else{
    $scope.montlySaving=0;
  }

  //Watch the salaryBeforeTax change
  $rootScope.$watch('salaryBeforeTax', function() {
          //update only if it is percentage
          if($rootScope.amount=='no'){
                $scope.yourSavingsPer();
          }
      });


  //Clear the percentage field and claculate the result
  $scope.yourSavingsAmount=function(){
      $scope.yourSavingPer='';
      //for designing
      $rootScope.amount='yes';
      $rootScope.yourSavingValue=$scope.yourSavingValue;
      $scope.result($scope.yourSavingValue);
  }

  //Clear the amount field and calculate form salary and %
  $scope.yourSavingsPer=function(){
      $scope.yourSavingValue='';
      //calcualte amount
        //!!! salaryBeforeTax => annual
      if($rootScope.salaryBeforeTax!='' && $rootScope.salaryBeforeTax>0){
        $scope.resultAmount=(($rootScope.salaryBeforeTax/12)*$scope.yourSavingPer)/100;
      }else{
        $scope.resultAmount=0;
      }
      //for designing
      $rootScope.amount='no';
      $rootScope.yourPerc=$scope.yourSavingPer;
      $rootScope.yourSavingPer=$scope.yourSavingPer;
      //plot result
      $scope.result($scope.resultAmount);

  }


  //plot the result
  $scope.result=function(montlySaving){
      $scope.montlySaving=montlySaving;
      //Add result to rootScope
      $rootScope.yourSavings=$scope.montlySaving;
  }




}//controller
