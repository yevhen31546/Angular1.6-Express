angular
  .module('lemonadeReward')
  .controller('ChartAnnuityController', ChartAnnuityController);

/**
 * @param $rootScope
 * @ngInject
 */
function ChartAnnuityController($rootScope, $scope,CalculationService,$location,$window,CloneService) {

const vm = this;

/* Results of the  Calcualtion*/
$scope.calc=CalculationService.mainCollector();



/*
* Watch Advanced Settings changes and run calcualtionService again
*/
//watch the change of RealTerms value and update the rootScope with it + update the chart



      //Income slider
      $rootScope.incomeSlider = {
        value: $rootScope.incomeTarget,
        options: {
          floor: 0,
          ceil: $scope.calc.chartHelper.maxYaxis,
          step: 100,
         minLimit: $scope.calc.chartHelper.limitMinYaxis,
         maxLimit: $scope.calc.chartHelper.limitMaxYaxis,
          vertical: true,
          onChange: function(id) {
            $rootScope.incomeTarget=$scope.incomeSlider.value // Update base value
            $scope.$emit('chartloaded');
          },
        hidePointerLabels: true,
        hideLimitLabels: true,
        showSelectionBar: false,
        showTicksValues: false,
        ticksValuesTooltip: function (v) {return '';}
        }

      };
      //watch the change of RealTerms value and update the rootScope with it + update the chart
      $scope.$watch('realterms', function (newValue, oldValue) {
        $rootScope.realterms=newValue;
         //reload the chart
        $scope.$emit('chartloaded');
      });

      //add Retirement age function
      $scope.updateRetAge = function(direction){
        //if 100>about_ret>55
        if(direction=='plus'){ if($rootScope.about_ret<$rootScope.timeline.upto){ $rootScope.about_ret++; }}
        else{ if($rootScope.about_ret > $rootScope.sliderMinAge){ $rootScope.about_ret--; }}
        $scope.$emit('chartloaded');
      }

      //Chart incomeTarget +/- change: update the slider value
      $scope.$on('sliderUpdate', function(event, data) {
          $scope.incomeSlider.value=$rootScope.incomeTarget;
          $scope.$broadcast('rzSliderForceRender');
       });


      /*reset the application*/
      $scope.reset = function() {
        $location.path('/');
        $window.location.reload();
      };


  }//controller
