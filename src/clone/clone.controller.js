/*
DUPLICATE FEATURE
*/

angular
  .module('lemonadeReward')
  .controller('CloneController', CloneController);

/**
 * @param $rootScope
 * @ngInject
 */
function CloneController($scope,$rootScope,$location,CalculationService,BreadcrumbService) {

  var vm = this;


/*
* Validation
*/
//////////////////////////////////////////////////////
//DOB//////////////////////////////////////////////////
///////////////////////////////////////////////////////
if($rootScope.DOB!=''){
  $scope.dateOfBirth=$rootScope.DOB;
}
//Minimum Age 55
  $scope.today = new Date();
  $scope.yearsEnd=$scope.today.getFullYear()-25;
  $scope.yearsStart=$scope.today.getFullYear()-75;
//date options
$scope.dateOptions = {
  'minDate':new Date($scope.yearsStart, 1, 1),
  'maxDate':new Date($scope.yearsEnd, 1, 1),
  //'initDate':new Date($rootScope.DOB),
};
/*Catch DOB changes and pass it to rootScope*/
$scope.$watch("dateOfBirth", function(newValue, oldValue) {

    $rootScope.DOB=$scope.dateOfBirth;
    var userAge=CalculationService.dob();
    $rootScope.sliderMinAge=userAge.age;


    //if userAGE > base Ret.Age - older than 68
    if($rootScope.sliderMinAge>=$rootScope.about_ret){
      $rootScope.about_ret=$rootScope.sliderMinAge;
    }else{

    }
    //Min possible option is 55 - annuityLongevity availablaty
    if($rootScope.sliderMinAge<55){
      $rootScope.sliderMinAge=55;
      $rootScope.minAgeMsg=true;
    }else{
        $rootScope.minAgeMsg=false;
    }

});//end watch
//END DOB/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//RET AGE/////////////////////////////////////////////////
///////////////////////////////////////////////////////
$scope.retAge = $rootScope.about_ret;
//watch userStatePension Value
  $scope.$watch('retAge', function (newValue, oldValue, scope) {
    $rootScope.about_ret=newValue;
  });


//End: RET AGE
//////////////////////////////////////////////////////
//GENDER/////////////////////////////////////////////////
///////////////////////////////////////////////////////
$scope.gen = $rootScope.about_gender;
//watch userStatePension Value
  $scope.$watch('gen', function (newValue, oldValue, scope) {
    $rootScope.about_gender=newValue;
  });
//End: Gender
//////////////////////////////////////////////////////
//Pension POT /////////////////////////////////////////////////
///////////////////////////////////////////////////////
$scope.pensionPotValue = $rootScope.pension_potSum;
//watch userStatePension Value
  $scope.$watch('pensionPotValue', function (newValue, oldValue, scope) {
    $rootScope.pension_potList=new Array();
    $rootScope.pension_potList.push({'id':'pot1','value':newValue});
    $rootScope.pension_potSum=newValue;
  });
//End: Pension POT

//////////////////////////////////////////////////////
//FINAL/////////////////////////////////////////////////
///////////////////////////////////////////////////////
//add function
//Setup base value or if come back later select the proper picture

if($rootScope.finalsalary_list.length>0){
  $scope.choices=$rootScope.finalsalary_list;
}else{
    $scope.choices = [];
}

$scope.addNewChoice = function() {
    //Restrict the number of final salary : max 3
    if($scope.choices.length<3){
          var newItemNo = $scope.choices.length+1;
          $scope.choices.push({'id':newItemNo});
          //calcualte sum
          $scope.finalSum();
     }//Final Salary less than 3


};

//remove function
$scope.removeChoice = function() {
  var lastItem = $scope.choices.length-1;
  $scope.choices.splice(lastItem);
  //calcualte sum
  $scope.finalSum();
  //emit validation in Step Directive to run again
  $scope.$broadcast('stepsRevalidate', true);
};


//sum calcualtion
$scope.finalSum=function(){
  $scope.sum=0
  //loop
  angular.forEach($scope.choices, function(value, key) {
    //if not empty and intiger
    $scope.potvalue=parseInt(value.value);
    if (!isNaN($scope.potvalue)){
        $scope.sum=$scope.sum+parseInt(value.value);
    }
  });
  //store to rootScope
    $rootScope.finalsalary_sum=$scope.sum;
    $rootScope.finalsalary_list=$scope.choices;
}
//End: Final/////////////////////////////////////////
//////////////////////////////////////////////////////
//STATE Pension////////////////////////////////////////
///////////////////////////////////////////////////////
//Init value = null, if not use the rootScope value
$scope.inputDevice = [
       {
           value: 'yes',
           label: 'Yes'
       },
       {
           value: 'no',
           label: 'No'
       }
   ];
        //watch STATE Value
        $scope.stateScope=$rootScope.state;
        $scope.userStatePension=$rootScope.statePensionAssValue;
          $scope.$watch('stateScope', function (newValue, oldValue, scope) {
            if(newValue == 'yes'){
                $rootScope.stateValue=true;
                $rootScope.state='yes';
                //Get StatePension Yealry
                if($scope.userStatePension>0){

                }else{
                    $scope.userStatePension=parseInt($rootScope.appData.state_pension_week*52);
                    $rootScope.statePensionAssValue=$scope.userStatePension;
                }
            }
            else{
              $rootScope.stateValue=false;
              $rootScope.state='no';
              $rootScope.statePensionAssValue='';
              $scope.userStatePension='';
            }
          });

          //watch userStatePension Value
            $scope.$watch('userStatePension', function (newValue, oldValue, scope) {
                //if bigger than 0: switch to yes
                if(newValue>0){
                  $scope.stateScope='yes';
                  $rootScope.stateValue=true;
                  $rootScope.state='yes';
                  $rootScope.statePensionAssValue=newValue;
                }else{
                  $scope.stateScope='no';
                  $rootScope.state='no';
                  $rootScope.stateValue=false;
                  $rootScope.statePensionAssValue='';
                }


            }, true);
//END: state
//////////////////////////////////////////////////////
//Salary////////////////////////////////////////
///////////////////////////////////////////////////////
$scope.currentSalary=parseInt($rootScope.salaryBeforeTax);
//watch userStatePension Value
  $scope.$watch('currentSalary', function (newValue, oldValue, scope) {
    $rootScope.salaryBeforeTax=newValue;
  });
//End: salary
//////////////////////////////////////////////////////
//Your Conbrib////////////////////////////////////////
///////////////////////////////////////////////////////
$scope.yourcontrib=parseFloat($rootScope.yourSavings.toFixed(2));
//watch userStatePension Value
  $scope.$watch('yourcontrib', function (newValue, oldValue, scope) {
    $rootScope.yourSavings=newValue;
    $rootScope.yourSavingValue=newValue;
    //set contribution page to AMOUNT type
    $rootScope.amount='yes';
    $rootScope.yourPerc='';
    $rootScope.yourSavingPer='';
  });
//End: yourcontrib
//////////////////////////////////////////////////////
//EMP Conbrib////////////////////////////////////////
///////////////////////////////////////////////////////
$scope.empcontrib=parseFloat($rootScope.empSavings.toFixed(2)); //
//watch userStatePension Value
  $scope.$watch('empcontrib', function (newValue, oldValue, scope) {
    $rootScope.empSavings=newValue;
    $rootScope.empSavingValue=newValue;
    //set  EMP contribution page to AMOUNT type
    $rootScope.empAmount='yes';
    $rootScope.empPerc='';
    $rootScope.empSavingPer='';
  });
//End: yourcontrib


/*
VALIDATION
*/
//run validation and calcualtion
//hide error messages
$scope.showError = false;

$scope.validate = function(){
    //Global Validation Array to eveluate the Result the validation. Sub validation are used to show error message
    $scope.globalValidArray=new Array();
     //response values TRUE/false
     $scope.validValue={};
     //Help text if arror occured
    $scope.validMsg={};

    //DOB////////////////////////////////
    $scope.ageValid = BreadcrumbService.ageValid();
      if($scope.ageValid.valid==false){
        $scope.validMsg['age']=$scope.ageValid.error;
        $scope.validValue['age']=false;
        $scope.globalValidArray.push(false);
      }else{
        $scope.validValue['age']=true;
        $scope.validMsg['age']=false;
      }
    //Retirement age
    $scope.retageValid = BreadcrumbService.retageValid();
      if($scope.retageValid.valid==false){
        $scope.validMsg['ret']=$scope.retageValid.error;
        $scope.validValue['ret']=false;
        $scope.globalValidArray.push(false);
      }else{
        $scope.validValue['ret']=true;
        $scope.validMsg['ret']=false;
      }
    //Gender
    $scope.genderValid =  BreadcrumbService.genderValid();
        if($scope.genderValid.valid==false){
          $scope.validMsg['gender']=$scope.genderValid.error;
          $scope.validValue['gender']=false;
          $scope.globalValidArray.push(false);
        }else{
          $scope.validValue['gender']=true;
          $scope.validMsg['gender']=false;
        }
    //pension pot
    $scope.potValid =  BreadcrumbService.potValid();
        if($scope.potValid.valid==false){
          $scope.validMsg['pot']=$scope.potValid.error;
          $scope.validValue['pot']=false;
          $scope.globalValidArray.push(false);
        }else{
          $scope.validValue['pot']=true;
          $scope.validMsg['pot']=false;
        }
     //final salary
        $scope.finalValid =  BreadcrumbService.finalValid();
            if($scope.finalValid.valid==false){
              $scope.validMsg['final']=$scope.finalValid.error;
              $scope.validValue['final']=false;
              $scope.globalValidArray.push(false);
            }else{
              $scope.validValue['final']=true;
              $scope.validMsg['final']=false;
            }
          //State Pension
           $scope.stateValid =  BreadcrumbService.stateValid();
                   if($scope.stateValid.valid==false){
                     $scope.validMsg['state']=$scope.stateValid.error;
                     $scope.validValue['state']=false;
                     $scope.globalValidArray.push(false);
                   }else{
                     $scope.validValue['state']=true;
                     $scope.validMsg['state']=false;
                   }
          //Salary before taxfree
          $scope.salaryValid =  BreadcrumbService.salaryValid();
                  if($scope.salaryValid.valid==false){
                    $scope.validMsg['salary']=$scope.salaryValid.error;
                    $scope.validValue['salary']=false;
                    $scope.globalValidArray.push(false);
                  }else{
                    $scope.validValue['salary']=true;
                    $scope.validMsg['salary']=false;
                  }
          //Salary before taxfree
          $scope.yourSaveValid =  BreadcrumbService.yourSaveValid();
                          if($scope.yourSaveValid.valid==false){
                            $scope.validMsg['yourcont']='Please, provide a valid value.';
                            $scope.validValue['yourcont']=false;
                            $scope.globalValidArray.push(false);
                          }else{
                            $scope.validValue['yourcont']=true;
                            $scope.validMsg['yourcont']=false;
                    }
           //Salary before taxfree
            $scope.empSaveValid =  BreadcrumbService.empSaveValid();
                                    if($scope.empSaveValid.valid==false){
                                      $scope.validMsg['empcont']='Please, provide a valid value.';
                                      $scope.validValue['empcont']=false;
                                      $scope.globalValidArray.push(false);
                                    }else{
                                      $scope.validValue['empcont']=true;
                                      $scope.validMsg['empcont']=false;
              }


        //if validation pass
        if($scope.globalValidArray.length==0){
          //open up all tabs tabs
          $rootScope.validAbout=[true,true,true];
          $rootScope.validPension=[true,true,true];
          $rootScope.validPlans=[true,true,true];
          //sort out the menu coloring
          /*Base Value Variation for menu color*/
          $scope.active={
            'backgroundColor': '#FFFFFF',
            'color': $rootScope.appData.branding.fontColor
          };
          $scope.inactive={
            'backgroundColor': $rootScope.appData.branding.mainColorDark,
            'color': $rootScope.appData.branding.headerFontColor
          };
          $rootScope.menu_about=$scope.inactive;
          $rootScope.menu_pension=$scope.inactive;
          $rootScope.menu_plans=$scope.inactive;
          $rootScope.menu_options=$scope.active;
          //REDIRECT
          $location.url('/options/table');
        }
        //validation faild
        else{
            //let the error messages to show up
            $scope.showError = true;
        }








     //locate to Card view
     //$location.url('/options/table');
  };//validate function






}//controller
