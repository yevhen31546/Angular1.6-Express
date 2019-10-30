angular
  .module('lemonadeReward')
  .service('CloneService', CloneService);
/**
 * @description
 */
function CloneService($rootScope,BreadcrumbService,CalculationService) {
  var vm = this;
  //store Get values
  vm.storeGet = storeGet;


  /*
  Look at the GET OBJ and the store the valid values in the right RootScope variables

  -dob = (yyyy-mm-dd) string representation of a JS date obj
  -ret = int
  -gen = male/female
  -pot = int
  -fin = obj: {name,income,age}
  -state = yes/no
  -stateV = int
  -salary = int
  -yourcon = number
  -empcon = number

  -it = number (incometarget)

  //Not mandatory!!!
  -growth = text
  -taxfree = number
  -inf = float
  -amc = float (pension charge)
  */
  function storeGet(getValues){
      //No need summary window in card view
      $rootScope.tableCounter=10;
      //DOB: convert date string to JS date obj
      $rootScope.DOB=new Date(getValues.dob);
      //Retirement age:
      $rootScope.about_ret=parseInt(getValues.ret);
      $rootScope.retChanged=true;
      //Gender
      if(getValues.gen =='male'){$rootScope.about_gender='male';}
      else{$rootScope.about_gender='female';}
      //pot
      $rootScope.pension_potSum = parseInt(getValues.pot);
      //generate a none pot (sum of the origin pots)
      $rootScope.pension_potList=new Array();
      $rootScope.pension_potList.push({'id':'pot1','name':'','value':parseInt(getValues.pot)});
      //final salary
      if(getValues.fin=='_'){
        $rootScope.finalsalary_list = [];
      }else{
        //convert back to an obj
        var oneFinalSalary = getValues.fin.split('|');
        var fin=new Array();
        $rootScope.finalsalary_sum=0;
        angular.forEach(oneFinalSalary, function(onefinal) {
          //One final object
          var onFinalObj = JSON.parse(onefinal)
          //SUM final salalry
          $rootScope.finalsalary_sum+=parseInt(onFinalObj.value);
          // add final list array
          fin.push(onFinalObj);
        });
        $rootScope.finalsalary_list = fin;
      }
      //state pension
      if(getValues.state =='yes'){$rootScope.state='yes';}
      else if(getValues.state =='no'){$rootScope.state='no';}
      else {getValues.state =='';}
      //state use user value?
      if(getValues.stateV=='true'){$rootScope.stateValue=true;}
      else{$rootScope.stateValue=false;}
      //state user value
      $rootScope.statePensionAssValue=parseInt(getValues.stateAV);
      //salary
      $rootScope.salaryBeforeTax=parseInt(getValues.salary);
      //you contrib
      $rootScope.yourSavings=parseFloat(getValues.yourcon);
      if(getValues.youramount=='yes'){
        $rootScope.amount='yes';
        $rootScope.yourSavingPer='';
        $rootScope.yourSavingValue=parseFloat(getValues.yourcon);
      }else{
        $rootScope.amount='no';
        $rootScope.yourPerc=parseFloat(getValues.yourper);
        $rootScope.yourSavingPer=parseFloat(getValues.yourper);
      }
      //emp contrib
      $rootScope.empSavings=parseFloat(getValues.empcon);
      if(getValues.empAmount=='yes'){
        $rootScope.empAmount='yes';
        $rootScope.empSavingValue=parseFloat(getValues.empcon);
      }else{
        $rootScope.empAmount='no';
        $rootScope.empPerc=parseFloat(getValues.empper);
      }



      /*
      Income target
      */
      if(getValues.target>=0){ $rootScope.incomeTarget=getValues.target;}
      else{ $rootScope.incomeTarget=''; }

      /*
      settings
      */
      //inflation
      if(parseFloat(getValues.inf)>99.99){ $rootScope.inflation=99.99; }
      else if (parseFloat(getValues.inf)<0){ $rootScope.inflation=0;}
      else { $rootScope.inflation=parseFloat(getValues.inf); }

      //amc - pesion charge
      if(parseFloat(getValues.amc)>99.99){ $rootScope.pension_charge=99.99; }
      else if (parseFloat(getValues.amc)<0){ $rootScope.pension_charge=0;}
      else { $rootScope.pension_charge=parseFloat(getValues.amc); }

      //TFC, taxfree
      if(parseInt(getValues.tfc)<0){ $rootScope.tfcToken=0;}
      else if(parseInt(getValues.tfc)>$rootScope.appData.max_TFC){ $rootScope.tfcToken=$rootScope.appData.max_TFC; }
      else{ $rootScope.tfcToken=parseInt(getValues.tfc); }

      //growth
      if(getValues.growth=='low'){$rootScope.growthRateText='low';}
      else if(getValues.growth=='high'){$rootScope.growthRateText='high';}
      else {$rootScope.growthRateText='mid';}

      //realterms
      if(getValues.real=='yes'){ $rootScope.realterms='yes';}
      else{ $rootScope.realterms='no'; }

      //fix income level
      if(getValues.fix=='yes'){ $rootScope.fixIncomeLevel='yes';}
      else{ $rootScope.fixIncomeLevel='no'; }

  }//set the variables







}//CloneService
