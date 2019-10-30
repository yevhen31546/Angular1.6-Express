angular.module("lemonadeReward").directive("dob", ['$rootScope', function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/dob/dob.html',
    controller: function controller($scope) {

    },
    link: function(scope, element,attrs,rootScope) {

        //Select the middle year form the list
      //   Outsoruced to a directive to modify the DOM

        $('#dobDirective [ng-model=year]').focus(function(){
          if($(this).data('focused') !==  true)
          {
              $(this).data('focused',true);
              //$(this).children(':nth-child(25)').prop('selected',true);
              $('#dobDirective [ng-model=year]').children(':nth-child(25)').after('<option label="Year" value="string:">Year</option>');
              $('#dobDirective [ng-model=year]').children(':nth-child(26)').prop('selected',true);

          }


        });
        $('#mySelect').blur(function(){
         $(this).data('focused',false);
        });




    }
  };
}]);
