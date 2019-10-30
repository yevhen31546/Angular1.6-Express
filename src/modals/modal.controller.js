angular
  .module('lemonadeReward')
  .controller('ModalController', ModalController);

/**
 * @param $uibModal
 * @constructor
 * @ngInject
 */
function ModalController($uibModal,$rootScope,$timeout,$scope) {
  const vm = this;
  vm.open = open;



//Open modal form other controller
var openModal = $rootScope.$on('openModal', function(event, args) {
    //run only once in digest circle
     if($rootScope.tableCounter==0){
        vm.open(args[0],args[1]);
        $rootScope.tableCounter+=1;
        //$rootScope.$emit('openModal', ['review','lg']);
        console.log($rootScope.tableCounter);
    }
});
//destory automatically
//$scope.$on('$destroy', openModal);



  function open(template, size) {

   /*If any modal is open it close them*/
    $('.modal-content > .ng-scope').each(function()
    {
        try
        {
            $(this).scope().$dismiss();
        }
        catch(_) {}
    });
    /*Open the modal*/
    $uibModal.open({
      animation: true,
      templateUrl: `views/modals/${template}.html`,
      controller: 'ModalInstanceController',
      controllerAs: 'ModalInstCtrl',
      size
    });



  }//open


  //close
  function closeMain(reason){
     $modalStack.dismissAll(reason);
  }

}

angular
  .module('lemonadeReward')
  .controller('ModalInstanceController', ModalInstanceController);

/**
 * @param $uibModalInstance
 * @constructor
 * @ngInject
 */
function ModalInstanceController($uibModalInstance,$rootScope,$scope) {
  const vm = this;
  vm.ok = ok;
  vm.cancel = cancel;

  function ok() {
    $uibModalInstance.close();
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
