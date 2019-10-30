angular
  .module('lemonadeReward')
  .controller('AgeController', AgeController);

/**
 * @param $rootScope
 * @ngInject
 */
function AgeController($rootScope, $scope, BreadcrumbService,CalculationService) {

  //get root data
  if($rootScope.DOB!=''){
    $scope.dateOfBirth=$rootScope.DOB;
  }
  //Minimum Age 55
    $scope.today = new Date();
    $scope.yearsEnd=$scope.today.getFullYear()-25;
    $scope.yearsStart=$scope.today.getFullYear()-75;
  //date options
  $scope.dateOptions = {
    'minDate':new Date($scope.yearsStart, 1, 1),
    'maxDate':new Date($scope.yearsEnd, 1, 1),
    //'initDate':new Date($rootScope.DOB),
  };


  //min Age which is possible 55 -if younger use a message
  $rootScope.minAgeMsg=false;



  /*Catch DOB changes and pass it to rootScope*/
  $scope.$watch("dateOfBirth", function(newValue, oldValue) {

      $rootScope.DOB=$scope.dateOfBirth;
      var userAge=CalculationService.dob();
      $rootScope.sliderMinAge=userAge.age;


      //if userAGE > base Ret.Age - older than 68
      if($rootScope.sliderMinAge>$rootScope.about_ret){
        $rootScope.about_ret=$rootScope.sliderMinAge;
      }else{

      }
      //Min possible option is 55 - annuityLongevity availablaty
      if($rootScope.sliderMinAge<55){
        $rootScope.sliderMinAge=55;
        $rootScope.minAgeMsg=true;
      }else{
          $rootScope.minAgeMsg=false;
      }




  });




}//controller
