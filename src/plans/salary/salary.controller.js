angular
  .module('lemonadeReward')
  .controller('SalaryController', SalaryController);

/**
 * @param $rootScope
 * @ngInject
 */
function SalaryController($rootScope, $scope) {

  if($rootScope.salaryBeforeTax>=0 && $rootScope.salaryBeforeTax!=''){
    $scope.salary= $rootScope.salaryBeforeTax;
  }else{
      $scope.salary='';
  }

  //SET SCOPE TO ROOT
  $scope.getSalary=function(){
      $rootScope.salaryBeforeTax= $scope.salary;
  }

}//controller
