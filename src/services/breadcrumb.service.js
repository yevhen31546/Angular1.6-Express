angular
  .module('lemonadeReward')
  .service('BreadcrumbService', BreadcrumbService);
/**
 * @description
 */
function BreadcrumbService($rootScope,$location) {
  var vm = this;

  //footer show/hide
  vm.footerShow = footerShow;
  //speakExpBtn Directive helper URL
  vm.speakExpBtn = speakExpBtn;
  //Company Name
  vm.companyName = companyName;
  //For Header show/hide
  vm.getHeader = getHeader;
  //get the number of the state in the poiston tree
  vm.getStep = getStep;
  //translate the url to step number
  vm.urlToNumber =urlToNumber;
  //last step number
  vm.backStepNumber=backStepNumber;
  //last step URL
  vm.backStepURL=backStepURL;
  //last step number
  vm.nextStepNumber=nextStepNumber;
  //last step URL
  vm.nextStepURL=nextStepURL;
  //main step array
  vm.mainStepArr=mainStepArr;
  //variables
  //Main Step numbers in group
  vm.mainStepNum={
    'about':[1,2,3],
    'pension':[4,5,6],
    'plans':[7,8,9],
    'options:':[10]
  };
  //possible collection of steps
  vm.stepOrder={
    0:'/',
    1:'about/age',
    2:'about/retirement',
    3:'about/gender',
    4:'pension/pot',
    5:'pension/final',
    6:'pension/state',
    7:'plans/salary',
    8:'plans/yoursavings',
    9:'plans/employersavings',
    10:'options/table'
  };

/*
MENU VALIDATE
valid = ture/false
*/
//About validation
vm.validAbout = function(position,valid){
  $rootScope.validAbout[position]=valid;
}
//Pension validation
vm.validPension = function(position,valid){
  $rootScope.validPension[position]=valid;
}
//Plans validation
vm.validPlans = function(position,valid){
  $rootScope.validPlans[position]=valid;
}

/*
Validator functions
*/
//age
vm.ageValid = function(){
  var valid=true;
  var error='';
  if($rootScope.DOB!=null){ valid=true; error=''; }
  else { valid=false; error='Before we can go further please select your date of birth.';}
  return {'valid':valid,'error':error}
}
//retage VALIDATE
vm.retageValid = function(){
  var valid=true;
  var error='';
  //logic
  if($rootScope.about_ret>=$rootScope.sliderMinAge && $rootScope.timeline.upto>$rootScope.about_ret){ valid=true; error=''; }
  else {valid=false;error='Your retirement age has to be between: ' + $rootScope.sliderMinAge +' and '+$rootScope.timeline.upto;}
  //return
  return {'valid':valid,'error':error}
}
//gender VALIDATE
vm.genderValid = function(){
  var valid=true;
  var error='';
  //logic
  if($rootScope.about_gender=='male' || $rootScope.about_gender=='female'){ valid=true; error=''; }
  else { valid=false; error='Please select your gender.';}
  //return
  return {'valid':valid,'error':error}
}
//gender VALIDATE
vm.potValid = function(){
  var valid=true;
  var error='';
  if ($rootScope.pension_potList.length<=0){ valid=true;error='';}
  else{
    var repeat=true;
    angular.forEach($rootScope.pension_potList, function(value, key) {
      if('name' in value){
        if(value.name.length>0){
          if('value' in value){
            if(value.value==undefined){
              valid=false;
              error='Latest Value of '+ value.name +' is not a valid number.';
            }
          }//if value undefined
          else{
            valid=false;
            error='Latest Value of'+ value.name +'is not a valid number.';
          }
        }//if name proided
      }//if name in obj
    });
  }
  return {'valid':valid,'error':error}
}//potValid
//final salary VALIDATE
vm.finalValid = function(){
  var valid=true;
  var error='';
  //logic
  if ($rootScope.pension_potSum<=0 && $rootScope.finalsalary_sum<=0){
    valid=false;error='Your total Pension Pot and Final Salary cannot be 0 at the same time.';
  }
  else if ($rootScope.finalsalary_list.length<=0){ valid=true;error='';}
  else {
    var repeat=true;
    angular.forEach($rootScope.finalsalary_list, function(value, key) {
      //get the value objects lenght
      var valueObj = Object.keys(value);
      //iterate
      if(repeat){
        //if all 3 input box empty let it go
        if(valueObj.length==1){}
        //if name is typed
        else if('name' in value){
          if(value.name=='' || value.name==undefined){
            valid=false;
            error='One of your pension pot names is not a valid or empty.';
            repeat=false;
          }//name not valid
        //if the user delete all element after to delete all fo it - let it go
        else if(value.value==undefined && value.from==undefined && (value.name=="" || !('name' in value))){}
        else if(value.value=='' || value.value==undefined){
            valid=false;
            error='Please provide a valid Latest Value for ' + value.name;
            repeat=false;
          }else if(value.from=='' || value.from==undefined){
            valid=false;
            error='Please provide a valid Payable From value for ' + value.name;
            repeat=false;
          }
        }//if value exist
        else{
          valid=false;
          error='Please provide a valid Company Name for your Final Salary.';
          repeat=false;
        }
      }//repeat
      });
  }
  //return
  return {'valid':valid,'error':error}
}
//state
vm.stateValid = function(){
  var valid=true;
  var error='';
  //logic
  //normal state pension value
  if($rootScope.state==''){
    valid=false;
    error='Please select one of the options.';
  }
  //state pension assumption - less than the given
  if(parseInt($rootScope.statePensionAssValue) == 0){
    valid=false;
    error='State Pension has to be bigger than £0';
  }
  else if($rootScope.state=='yes' && $rootScope.statePensionAssValue == ''){
    valid=false;
    error='State Pension is not a valid number';
  }
  //return
  return {'valid':valid,'error':error}
}
//salary
vm.salaryValid = function(){
  var valid=true;
  var error='';
  //logic
  //if empty set 0
  if($rootScope.salaryBeforeTax==''){ valid=true; error=''; $rootScope.salaryBeforeTax=0;}
  //have to be >= 0
  else if($rootScope.salaryBeforeTax>=0){ valid=true; error='';}
  else{
    valid=false;
    error='Please provide a valid number.';
  }
  //return
  return {'valid':valid,'error':error}
}
//Your Saving
vm.yourSaveValid = function(){
  var valid=true;
  var error='';
  //logic
  if($rootScope.yourSavings==undefined || $rootScope.yourSavings==null || $rootScope.yourSavings === NaN){
      valid=false; error='Please provide at least one value';
  }
  else if($rootScope.amount=='yes'){
    if($rootScope.yourSavingValue>=0){}
      else{ valid=false; error='The monthly amount is not valid'; }
    }
  else if($rootScope.amount=='no'){
      if(100>$rootScope.yourSavingPer>0){}
      else{ valid=false; error='The monthly percentage is not valid'; }
  }
  //return
  return {'valid':valid,'error':error}
}
//Emp Saving
vm.empSaveValid = function(){
  var valid=true;
  var error='';
  //logic
  if($rootScope.empSavings==undefined || $rootScope.empSavings==null || $rootScope.empSavings === NaN){
      valid=false; error='Please provide at least one value';
  }
  else if($rootScope.empAmount=='yes'){
      if($rootScope.empSavingValue>=0){}
      else{ valid=false; error='The monthly amount is not valid'; }
  }
  else if($rootScope.empAmount=='no'){
      if(100>$rootScope.empSavingPer>0){}
      else{ valid=false; error='The monthly percentage is not valid'; }
  }
  //return

  return {'valid':valid,'error':error}
}



/*
VALIDATE
*/
vm.validate = function (){
  var valid=true;
  var error='';
  //Pick the proper state
  switch ($location.path()) {
        case '/about/age':
            //validation function
            var validate = vm.ageValid();
            //response
            valid = validate.valid;
            error = validate.error;
            vm.validAbout(0,valid);
            break;
        case '/about/retirement':
            //validation function
            var validate = vm.retageValid();
            //response
            valid = validate.valid;
            error = validate.error;
            //menu validation
            vm.validAbout(1,valid);
            break;
        case '/about/gender':
            //validation function
            var validate = vm.genderValid();
            //response
            valid = validate.valid;
            error = validate.error;
              //menu validation
            vm.validAbout(2,valid);
            break;
        case '/pension/pot':
            //validation function
            var validate = vm.potValid();
            //response
            valid = validate.valid;
            error = validate.error;
            vm.validPension(0,valid);
            break;
        case '/pension/final':
            //validation function
            var validate = vm.finalValid();
            //response
            valid = validate.valid;
            error = validate.error;
            vm.validPension(1,valid);
            break;
       case '/pension/state':
             //validation function
             var validate = vm.stateValid();
             //response
             valid = validate.valid;
             error = validate.error;
            vm.validPension(2,valid);
            break;
        case '/plans/salary':
            //validation function
            var validate = vm.salaryValid();
            //response
            valid = validate.valid;
            error = validate.error;
            vm.validPlans(0,valid);
            break;
        case '/plans/yoursavings':
            //validation function
            var validate = vm.yourSaveValid();
            //response
            valid = validate.valid;
            error = validate.error;
            vm.validPlans(1,valid);
            break;
        case '/plans/employersavings':
              //validation function
              var validate = vm.empSaveValid();
              //response
              valid = validate.valid;
              error = validate.error;
              vm.validPlans(2,valid);
              break;
        default:
            break;
    }//switch

  return {'valid':valid,'error':error};
}//validate


      //Listen to the State change to change Menu Color
      vm.lastInputStep=false;
      $rootScope.$on('$locationChangeSuccess', () => {
        vm.url = '/'+vm.stepOrder[9];

        if(vm.url==$location.path()){
              $rootScope.lastInputStep=true;
        }else{
              $rootScope.lastInputStep=false;
        }
        //Base the MAIN STATE color the MENU

      });



//translate URL to step number
 function urlToNumber(){
    var searchText=$location.path().split("/")[1]+'/'+$location.path().split("/")[2]
    //Loop through the options
    var keepGoing = true;
    //set base postion
    var postion = 1;
    angular.forEach(vm.stepOrder, function(value, key) {
        if(keepGoing){

          if(value == searchText.toString()){
              postion = key;
              keepGoing = false;
          }//if search
        }//if keepGoing
    });
    return postion;
 }//urlToNumber


 //get the last step number
function backStepNumber(){
    if(vm.urlToNumber()<1){
      return vm.urlToNumber();
    }
    return parseInt(vm.urlToNumber())-1;
 }
//get last step URL
function backStepURL(){
    return vm.stepOrder[backStepNumber()];
}

//get the last step number
function nextStepNumber(){
   if(vm.urlToNumber()>0){
     return parseInt(vm.urlToNumber())+1;
   }
   return vm.urlToNumber();
}
//get last step URL
function nextStepURL(){
   return vm.stepOrder[nextStepNumber()];
}

//main step number
function mainStepArr(){
  var searchText=$location.path().split("/")[1];
  //Loop through the options
  var keepGoing = true;
  //set base postion
  var mainstep = vm.mainStepNum.about;
  angular.forEach(vm.mainStepNum, function(value, key) {
      if(keepGoing){

        if(key == searchText){
            mainstep = value
            keepGoing = false;
        }//if search
      }//if keepGoing
  });
  return mainstep;
}//mainStepArr



  function getStep(){
        return {
          'nextUrl':vm.nextStepURL(),
          'prevUrl':vm.backStepURL(),
          'currentNumber':urlToNumber(),
          'mainStep':mainStepArr()

        }

  }

  //For Home page to show hide header
  function getHeader() {
                    var showHeader;
                    switch ($location.path()) {
                          case '/print':
                               showHeader = false;
                               break;
                          case '/':
                                showHeader = false;
                                break;
                          default:
                              showHeader = true;
                    }
                    return {'showHeader': showHeader};
    } //END: getHeader


/*
COMPANY NAME
If start with _ Hide on the main page otherwise show it without the underscore
*/
function companyName(){
  var companyName=$rootScope.appData.branding.companyName
  if(companyName.charAt(0)=='_'){
     var screenCompany = companyName.substring(1);
     var hide = true;
  }else{
    var screenCompany = companyName;
    var hide = false;
  }

  return{
    'display':screenCompany,
    'hide': hide
  }

}


/*
BTN speakToExpert Directive
Follow the url to deicde which Btn. to show
*/
function speakExpBtn(){
  // which URL
  var modalView="print";
  if($location.path()=='/options/annuity'){  modalView="annuity"; }
  else if ($location.path()=='/options/flexible'){  modalView="flexible"; }
  else if ($location.path()=='/options/cashout'){  modalView="cashout"; }

  return{
    'modalView':modalView
  }

}


/*
FOOTER ON/OFF

*/
function footerShow(){
  // which URL
  var footerOnOff=true;
  if($location.path()=='/print'){ footerOnOff=false; }


  return footerOnOff;

}


}//BreadcrumbService
