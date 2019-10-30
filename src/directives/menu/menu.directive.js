angular.module("lemonadeReward").directive("mainMenu", ['$rootScope','$location','$state', function ($rootScope,$location,$state) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/menu/menu.html',
    controller: function controller($rootScope, $scope, $location,$state) {

      /*Base Value Variation for menu color*/
      $scope.active={
        'backgroundColor': '#FFFFFF',
        'color': $rootScope.appData.branding.fontColor
      };
      $scope.inactive={
        'backgroundColor': $rootScope.appData.branding.mainColorDark,
        'color': $rootScope.appData.branding.headerFontColor
      };

      //Listen to the State change to change Menu Color
      $rootScope.$on('$locationChangeSuccess', () => {
        //GET THE MAIN STATE FORM THE URL
        $rootScope.mainStep=$location.path().split("/")[1];
        //Base the MAIN STATE color the MENU
        switch ($rootScope.mainStep) {
                          case '':
                              $rootScope.menu_about=$scope.inactive;
                              $rootScope.menu_pension=$scope.inactive;
                              $rootScope.menu_plans=$scope.inactive;
                              $rootScope.menu_options=$scope.inactive;
                              break;
                          case 'about':
                                $rootScope.menu_about=$scope.active;
                                $rootScope.menu_pension=$scope.inactive;
                                $rootScope.menu_plans=$scope.inactive;
                                $rootScope.menu_options=$scope.inactive;
                                break;
                          case 'pension':
                                $rootScope.menu_about=$scope.inactive;
                                $rootScope.menu_pension=$scope.active;
                                $rootScope.menu_plans=$scope.inactive;
                                $rootScope.menu_options=$scope.inactive;
                                break;
                          case 'plans':
                                $rootScope.menu_about=$scope.inactive;
                                $rootScope.menu_pension=$scope.inactive;
                                $rootScope.menu_plans=$scope.active;
                                $rootScope.menu_options=$scope.inactive;
                                break;
                          case 'options':
                                $rootScope.menu_about=$scope.inactive;
                                $rootScope.menu_pension=$scope.inactive;
                                $rootScope.menu_plans=$scope.inactive;
                                $rootScope.menu_options=$scope.active;
                                break;
                          default:
                                $rootScope.menu_about=$scope.inactive;
                                $rootScope.menu_pension=$scope.inactive;
                                $rootScope.menu_plans=$scope.inactive;
                                $rootScope.menu_options=$scope.inactive;
                    }
      });

      //check array all element true
      $scope.allTrue =  function allTrue(obj){
          for(var o in obj)
              if(obj[o]==false) return false;

          return true;
        }


    },//controller
    link: function(scope, element, attrs) {


        /*
        Validate Upto pension
        */
        scope.validUpToPension = function(){
          element.on('click', function(e){
                //Only if clicked to the next BTN (Back do not count)
                if (angular.element(e.target).hasClass('linkPension')) {
                    //alltrue
                    if(scope.allTrue($rootScope.validAbout)){}
                    else{
                      //prevent status change
                       e.preventDefault();

                    }

                }//if has class

            });
        }//ValidUpToPension

        /*
        Validate Upto plans
        */
        scope.validUpToPlans = function(){
          element.on('click', function(e){
                //Only if clicked to the next BTN (Back do not count)
                if (angular.element(e.target).hasClass('linkPlans')) {
                    //alltru
                    if(scope.allTrue($rootScope.validAbout) && scope.allTrue($rootScope.validPension)){}
                    else{
                      //prevent status change
                       e.preventDefault();
                    }
                }//if has class

            });
        }//validUpToPlans


        /*
        Validate Upto Options == ALL
        */
        scope.validUpToOptions = function(){
          element.on('click', function(e){
                //Only if clicked to the next BTN (Back do not count)
                if (angular.element(e.target).hasClass('linkOptions')) {
                    //alltrue
                    if(scope.allTrue($rootScope.validAbout)
                      && scope.allTrue($rootScope.validPension)
                        && scope.allTrue($rootScope.validPlans)){}
                    else{
                      //prevent status change
                       e.preventDefault();
                    }
                }//if has class

            });
        }//validUpToOptions



      }//link
  };
}]);
