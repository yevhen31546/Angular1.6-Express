angular
  .module('lemonadeReward')
  .controller('StateController', StateController);

/**
 * @param $rootScope
 * @ngInject
 */
function StateController($rootScope, $scope) {
  /*
  * StatePensionAssValue: in the chart this value will be used as a State Pension
  */

  //Init value = null, if not use the rootScope value
  if($rootScope.statePensionAssValue!=''){
    $scope.userStatePension=$rootScope.statePensionAssValue;
  }else{
    $rootScope.statePensionAssValue
  }


          $rootScope.state_f = function(state) {
                if(state == 'yes'){
                    $rootScope.stateValue=true;
                    $rootScope.state='yes';
                    //Get StatePension Yealry
                    $scope.userStatePension=parseInt($rootScope.appData.state_pension_week*52);
                }
                else{
                  $rootScope.stateValue=false;
                  $rootScope.state='no';
                  $scope.userStatePension=0;

                }
        }


        //watch STATE Value
          $scope.$watch('state', function (newValue, oldValue, scope) {
              //if bigger than 0: switch to yes
              if($scope.state=='yes'){
                $rootScope.statePensionAssValue=$scope.userStatePension;
                $rootScope.stateValue=true;
              }else{
                $rootScope.stateValue=false;
                $rootScope.statePensionAssValue=0;
              }
          }, true);


      //watch userStatePension Value
        $scope.$watch('userStatePension', function (newValue, oldValue, scope) {
            //if bigger than 0: switch to yes
            if($scope.userStatePension>0){
              //Get User value
              $rootScope.statePensionAssValue=$scope.userStatePension;
              $rootScope.stateValue=true;
              $rootScope.state='yes';
            }else{
              $rootScope.statePensionAssValue='';
              $scope.userStatePension='';
            }


        }, true);




}//controller


// allow you to format a text input field.
// <input type="text" ng-model="test" format="currency : £" />
  /* angular
  .module('lemonadeReward')
.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

         ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue,'£',0);
            });

            elem.bind('blur', function(event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber,'£',0));
            });
        }
    };
}]);
*/
