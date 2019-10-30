angular
  .module('lemonadeReward')
  .controller('RetirementController', RetirementController);

/**
 * @param $rootScope
 * @ngInject
 */
function RetirementController($rootScope, $scope,CalculationService) {

  //Use calculated value if slider has not been touched yet.
  if($rootScope.retChanged!=true){
    //init retirement age based on DOB
    $scope.custom_ret=CalculationService.statePensionAge($rootScope.DOB);
    if($scope.custom_ret.statePensionAge>$rootScope.sliderMinAge){
        $rootScope.about_ret=$scope.custom_ret.statePensionAge;
    }
  }




        /*
        Age slider
        -extra values controlled ind age.controller
        */
        $rootScope.retSlider = {
          value: $rootScope.about_ret,
          options: {
            floor: $rootScope.sliderMinAge,
            ceil: 100,
            minLimit: $rootScope.sliderMinAge,
            maxLimit: 100,
            showTicks: 5,
            onChange: function(id) {
              $rootScope.retChanged=true;
              $rootScope.about_ret=$scope.retSlider.value // Update base value
            }
          }
      };


}
