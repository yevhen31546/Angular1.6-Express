angular
  .module('lemonadeReward')
  .service('ClonelinkService', ClonelinkService);
/**
 * @description
 */
function ClonelinkService($rootScope,$httpParamSerializer,$location) {
  var vm = this;
  //clone link - consturct the slug
  vm.cloneLink = cloneLink;
  //Get domain
  vm.getDomain = getDomain;


  /*
  Responsable to generate LINK for the clone

  -dob = (yyyy-mm-dd)  js Date obj string
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
  - realterms
  */



  /*Return the clickable SLUG for clone*/
  function cloneLink(){

  //FINAL Salary - Convert to a string
    var finString='';
    angular.forEach($rootScope.finalsalary_list, function(final, key) {
      //firstiteration
      if(key!=0){finString+='|';}
      //add the obj
      finString+=JSON.stringify(final);
    });
    //if Final salary: send sign in the url
    if(finString.length==0){ finString='_'; }


      var slugOBJ = {
        'clone':'yes',
        'dob': $rootScope.DOB,
        'ret': $rootScope.about_ret,
        'gen': $rootScope.about_gender,
        'pot': $rootScope.pension_potSum,
        'fin': finString,
        'state': $rootScope.state,
        'stateV': $rootScope.stateValue,
        'stateAV': $rootScope.statePensionAssValue,
        'salary': $rootScope.salaryBeforeTax,
        'yourcon':$rootScope.yourSavings,
        'yourper':$rootScope.yourPerc,
        'youramount':$rootScope.amount,
        'empcon': $rootScope.empSavings,
        'empamount':$rootScope.empAmount,
        'empper':$rootScope.empPerc,
        'inf': $rootScope.inflation,
        'amc':$rootScope.pension_charge,
        'tfc': $rootScope.tfcToken,
        'growth': $rootScope.growthRateText,
        'real':$rootScope.realterms,
        'fix':$rootScope.fixIncomeLevel,
        'target':$rootScope.incomeTarget
      }
    return vm.getDomain() + '/clone/?' + $httpParamSerializer(slugOBJ);

  }

  //get domain: localhost with port or with any network
  function getDomain(){
      var domain = $location.protocol() + "://" + $location.host();
    //get the port
    if($location.port()>0){
       domain = domain  + ":" + $location.port();
    }
    return domain
  }




}//CloneService
