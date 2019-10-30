angular.module("lemonadeReward").directive("contactUs", ['$rootScope', function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'views/directives/contactUs/contactUs.html',
    controller: function controller($scope,$rootScope,$location,ContactService) {


    //show form switcher
    $scope.showForm=true;
    //pricacy ckeck
    $scope.privacyChecked=false;
    //pension data check
    $scope.pensionDataChecked=false;

    $scope.submitForm = function submitForm(isValid) {



        var userData = {
          'firstname': $scope.user.fname,
          'lastname': $scope.user.lname,
          'email':$scope.user.email,
          'phone':$scope.user.phone,
          'message:':$scope.user.message,
          'subject': 'R.O.P - ' + $rootScope.appData.branding.companyName + ' - Contact US'
        };

        //If checkbox checked
        if($scope.pensionDataChecked){
            userData['Duplicate_Link']=$rootScope.clonelink;
        }



        if(isValid){
            ContactService.mail(userData).then(function (response) {
              if(response.data.error==0){
                $scope.showForm=false;
                $scope.sending = true;
              }else{
                $scope.showForm=false;
                $scope.sending = false;
              }

            },function (reason) {
                  $scope.sending = false;
                  $scope.showForm=false;
            });//promise end

        }//if valid

    };//submitForm




    }//controller
  };//return
}]);
