angular
  .module('lemonadeReward')
  .service('BaseDataService', BaseDataService);

/**
 * @description
 * Get the url (state change value)
 * Use for Lead Interest
 */
function BaseDataService($rootScope,$q,$http, $location,BaseBackupService) {
var vm = this;
this.data;
var self = this;

//diff. identifier for test and prod. env.
// var identifier='lemonade';
// var identifier='aberdeen';
var identifier='siemens';
  /*
  *Localhost use localhost API
  */
  //  vm.api='https://api.lemonadellp.com/calculators/ret_opt_planner/version/'+live_identifier;
  if( $location.absUrl().indexOf('localhost') >= 0 || $location.absUrl().indexOf('127.0.0.1') >= 0 ){
    vm.api='http://localhost/api/rop/'+identifier;
  }else{
    vm.api='http://php.lemonadellp.com/rop/'+identifier;
  }

    this.getApiData = function(){
      if (angular.isDefined($rootScope.basedata)) {
        return $rootScope.basedata;
      }
      return $http({
        timeout:3000,
        method: 'POST',
        url: vm.api,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }//getApiData


      //Base BackupData Service
      this.getBackupData = function(){
            return BaseBackupService.getBackupData();
        }//getBackupData



}//appDataSerivce
