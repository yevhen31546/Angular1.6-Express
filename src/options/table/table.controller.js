angular
  .module('lemonadeReward')
  .controller('TableController', TableController);

/**
 * @param $rootScope
 * @ngInject
 */
function TableController($rootScope, $scope,CalculationService,$location,$window) {



//when the first load the card view show the Review Entry/Summary modal window
$rootScope.$emit('openModal', ['review','lg']);




    //define which chart for directive
    $rootScope.whichChart = 'cards';

  /* Results of the  Calcualtion*/
  $scope.calc=CalculationService.mainCollector();


      /*
      * Watch Advanced Settings changes and run calcualtionService again
      */
      //Growth Rate Changes
      $scope.$watch(function() {
        return $rootScope.growthRateText;
      }, function() {
        $scope.calc=CalculationService.mainCollector();
      }, true);
      //TFC Token Changes
      $scope.$watch(function() {
        return $rootScope.tfcToken;
      }, function() {
        $scope.calc=CalculationService.mainCollector();
      }, true);

      //RealTerm Change
      $scope.$watch(function() {
        return $rootScope.realterms;
      }, function() {
        $scope.calc=CalculationService.mainCollector();
      }, true);

      //Retirement age watch
      $scope.$watch(function() {
        return $rootScope.about_ret;
      }, function() {
        $scope.calc=CalculationService.mainCollector();
      }, true);


      //add Retirement age function
      $scope.updateRetAge = function(direction){
        //if 100>about_ret>55
        if(direction=='plus'){ if($rootScope.about_ret<$rootScope.timeline.upto){ $rootScope.about_ret++; }}
        else{ if($rootScope.about_ret > $rootScope.sliderMinAge){ $rootScope.about_ret--; }}
        $scope.$emit('chartloaded');
      }

      //watch the change of RealTerms value and update the rootScope with it + update the chart
      $scope.$watch('realterms', function (newValue, oldValue) {
        $rootScope.realterms=newValue;
         //reload the chart
        $scope.$emit('chartloaded');
      });

      /*reset the application*/
      $scope.reset = function() {
        $location.path('/');
        $window.location.reload();
      };



  }//controller
