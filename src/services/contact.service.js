angular
  .module('lemonadeReward')
  .service('ContactService', ContactService);


function ContactService($rootScope,$http,$location) {
  var vm = this;
  vm.mail= mail;

/*
* Normal EMail Sending through the Lemonade System
*/
if( $location.absUrl().indexOf('localhost') >= 0 ||
  $location.absUrl().indexOf('127.0.0.1') >= 0 ){
vm.api='http://localhost/api/notification/atretirement'
}else{
vm.api='https://php.lemonadellp.com/notification/atretirement'
}

      //user request a call back (Cheapest quote proceed button)
      function mail(data) {
              return $http({
                  method: 'POST',
                  url: vm.api,
                  data: $.param(data),
                  //headers: {'Content-Type': 'application/json; charset=utf-8'}
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              });
      }



}//Contact service
