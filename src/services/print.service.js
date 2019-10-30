angular
  .module('lemonadeReward')
  .service('PrintService', PrintService);


function PrintService($rootScope,$http,$location) {
  var vm = this;
  vm.mail= mail;

/*
* Normal EMail Sending through the Lemonade System
http://localhost:8000/mail/rop/print
http://10.0.2.2:8000/mail/rop/print
''
*/
if( $location.absUrl().indexOf('localhost') >= 0 ||
  $location.absUrl().indexOf('127.0.0.1') >= 0 ){
    vm.api='http://localhost/api/printrop/printout';
}else{
  //vm.api='https://api.lemonadellp.com/mail/rop/print'
  vm.api='https://php.lemonadellp.com/printrop/printout';
}

      //SEND data as FORM DATA (vs. Json)
      function mail(data) {
              return $http({
                  method: 'POST',
                  url: vm.api,
                  data: $.param(data),
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded,charset=UTF-8',
                    'Accept': 'application/json',
                  }
              });
      }




}//Contact service
