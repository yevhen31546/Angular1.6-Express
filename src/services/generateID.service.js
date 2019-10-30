angular
  .module('lemonadeReward')
  .service('GenerateID', GenerateID);

/**
 * @description
 * Get the url (state change value)
 * Use for Lead Interest
 */
function GenerateID($rootScope) {
  var vm = this;
  vm.generate= generate;

      //Generate Special identifier
      function generate(){
          //date - random elements
          vm.date = new Date();
          //var year = $scope.date.getFullYear().slice(-1); //1
          var month = vm.date.getMonth()+1; //2
          var day = vm.date.getDate(); //2
          var hours = vm.date.getHours(); //2
          var minutes = vm.date.getMinutes(); //2
          //random value
          var random = Math.floor((Math.random() * 10) + 1); //2
          var random2 = Math.floor((Math.random() * 10) + 1); //2
          var random3 = Math.floor((Math.random() * 10) + 1); //2

          var identifier = random.toString() + random2.toString() + month.toString() + day.toString() + random3.toString() +  hours.toString() + minutes.toString();

          return identifier;
        }//getBackupData



}//appDataSerivce
