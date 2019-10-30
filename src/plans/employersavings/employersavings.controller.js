angular
  .module('lemonadeReward')
  .controller('EmployersavingsController', EmployersavingsController);

/**
 * @param $rootScope
 * @ngInject
 */
function EmployersavingsController($rootScope, $scope) {
  if($rootScope.empSavings>0){
    $scope.montlySaving=$rootScope.empSavings;
    if($rootScope.empAmount=='yes'){
          $scope.empSavingValue=$rootScope.empSavings;
          $scope.montlySaving=$rootScope.empSavings;
    }
    else if($rootScope.empAmount=='no'){
        $scope.empSavingPer=$rootScope.empPerc;
          //!!! salaryBeforeTax => annual
        $scope.resultempAmount=(($rootScope.salaryBeforeTax/12)*$scope.empSavingPer)/100;
          $scope.montlySaving=$rootScope.empSavings;
    }
  }else{
    $scope.montlySaving=0;
  }

  //Watch the salaryBeforeTax change
  $rootScope.$watch('salaryBeforeTax', function() {
          //update only if it is percentage
          if($rootScope.empAmount=='no'){
                $scope.empSavingsPer();
          }
      });


  //Clear the percentage field and claculate the result
  $scope.empSavingsAmount=function(){
      $scope.empSavingPer='';
      //for designing
      $rootScope.empAmount='yes';
      $rootScope.empSavingValue=$scope.empSavingValue;
      $scope.result($scope.empSavingValue);
  }

  //Clear the empAmount field and calculate form salary and %
  $scope.empSavingsPer=function(){
      $scope.empSavingValue='';
      //calcualte empAmount
      //!!! salaryBeforeTax => annual
      if($rootScope.salaryBeforeTax!='' && $rootScope.salaryBeforeTax>0){
        $scope.resultempAmount=(($rootScope.salaryBeforeTax/12)*$scope.empSavingPer)/100;
      }else{
        $scope.resultempAmount=0;
      }
      //for designing
      $rootScope.empAmount='no';
      $rootScope.empPerc=$scope.empSavingPer;
      $rootScope.empSavingPer=$scope.empSavingPer;
      //plot result
      $scope.result($scope.resultempAmount);

  }


  //plot the result
  $scope.result=function(montlySaving){
      $scope.montlySaving=montlySaving;
      //Add result to rootScope
      $rootScope.empSavings=$scope.montlySaving;
  }




}//controller
