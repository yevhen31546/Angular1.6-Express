angular
  .module('lemonadeReward')
  .controller('AdvancedSettingsController', AdvancedSettingsController);

/**
 * @param $rootScope
 * @ngInject
 */
function AdvancedSettingsController($rootScope, $scope, CalculationService,$location) {

const vm = this;

switch ($location.search().source) {
           case 'annuity':
               $scope.backLink='annuity';
               break;
           case 'flexible':
              $scope.backLink='flexible';
               break;
            case 'cashout':
              $scope.backLink='cashout';
              break;
           default:
              $scope.backLink='table';

       }

      //watch the change of RealTerms value and update the rootScope with it + update the chart
      $scope.$watch('realterms', function (newValue, oldValue) {
        $rootScope.realterms=newValue;
         //reload the chart
        $scope.$emit('chartloaded');
      });

      //watch the change of RealTerms value and update the rootScope with it + update the chart
      $scope.$watch('growthRateText', function (newValue, oldValue) {
        $rootScope.growthRateText=newValue;
         //reload the chart
        $scope.$emit('chartloaded');
      });

      //watch the change of RealTerms value and update the rootScope with it + update the chart
      $scope.$watch('tfcToken', function (newValue, oldValue) {
        $rootScope.tfcToken=newValue;
         //reload the chart
        $scope.$emit('chartloaded');
      });

      //watch the change of Inflation value and update the rootScope with it + update the chart
      $scope.$watch('inflation', function (newValue, oldValue) {
        //if invalid number use previous value
        if(newValue==undefined){
            $rootScope.inflation=$rootScope.inflation;
        }else{
            $rootScope.inflation=newValue;
        }
         //reload the chart
        $scope.$emit('chartloaded');
      });

      //watch the change of pension charge value and update the rootScope with it + update the chart
      $scope.$watch('pension_charge', function (newValue, oldValue) {
        //if invalid number use the previous value
        if(newValue==undefined){
          $rootScope.pension_charge=$rootScope.pension_charge;
        }else{
            $rootScope.pension_charge=newValue;
        }
         //reload the chart
        $scope.$emit('chartloaded');
      });


  }//controller
