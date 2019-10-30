angular
  .module('lemonadeReward')
  .controller('ChartController', ChartController);

/**
 * @param $rootScope
 * @ngInject
 */
function ChartController($rootScope,$scope,ChartDataService,CalculationService) {
  const vm = this;


//APP  Data
//console.log($rootScope.appData);
//Get User Data
//console.log($rootScope.userdata);


/*
Test Calcualtion Functions
*/
vm.resp=CalculationService.mainCollector();
//console.log(vm.resp);


/*
END: Test Calcualtion Functions
*/
  $scope.fetchData = function() {
        var exampleData = [];
        var exampleData = [
          {
              "key": "Series 1",
              "values": [[1,[4,6]],[2,8],[3,9],[4,12],[1,3]]
          }
        ];
        return exampleData;
    }//End: fetch
    $scope.exampleData = $scope.fetchData();



$scope.calc = function(){
        var data = $scope.exampleData;
        data[0].values[0][1]=6;
        $scope.exampleData = data;
};

}
