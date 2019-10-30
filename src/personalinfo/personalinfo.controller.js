angular
  .module('lemonadeReward')
  .controller('PersonalController', PersonalController);

/**
 * @param $rootScope
 * @ngInject
 */
function PersonalController($rootScope,$scope,BaseDataService) {


  // //TEST: base values for testing purposes//////////////////
     $scope.fillform = function() {
       $scope.userdata={
         'DOB':'1960-03-22',
         'gender':'male',
         'pensionpots':800000,
         'selectedRetAge':67,
         'currentAnnualSalary':100000,
         'perYouPayRetPlan':4,
         'perEmpPayRetPlan':1,
         'growthRateText':'mid',
         'gender':'Male',
         'realterms':'yes',
         'targetIncome':69579,
         'tfcTaken':25
       };
       $scope.submitForm()
  };
  //TEST DATA END!////////////////////////////////

    //submit form set RootScope values
     $scope.submitForm = function() {
       //pass personal data to PersonalDataService
       PersonalDataService.setData($scope.userdata);

     };




}
