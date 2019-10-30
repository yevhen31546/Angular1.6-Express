angular
  .module('lemonadeReward')
  .service('CalculationService', CalculationService);

/**
 * @description
 * Get the url (state change value)
 * Use for Lead Interest
 */
function CalculationService($rootScope,ClonelinkService) {
  var vm = this;
  vm.mainCollector = mainCollector;
  vm.dob = dob;
  vm.dateAtRetirement = dateAtRetirement;
  vm.timeToRetirement = timeToRetirement;
  vm.statePensionAge = statePensionAge;
  vm.futurePremium=futurePremium;
  vm.inflation=inflation;
  vm.netgrowth=netgrowth;
  vm.futurePremium=futurePremium;
  vm.futurePensionPot=futurePensionPot;
  vm.pensionFundAtRetirement=pensionFundAtRetirement;
  vm.annuityLongevity=annuityLongevity;
  vm.annuity=annuity;
  vm.cashOut=cashOut;
  vm.taxLumpSum=taxLumpSum;
  vm.pmt=pmt;
  vm.flexible=flexible;
  vm.flexibleFixIncome=flexibleFixIncome;

  vm.inflator=inflator;
  vm.deflator=deflator;
  vm.finalsalaryChart = finalsalaryChart;
  vm.statepensionChart = statepensionChart;
  vm.flexibleChart = flexibleChart;
  vm.chartHelper = chartHelper;
  //count how many times it is load



  function mainCollector(){
          //fullFuturePension
          var annuityLongevity=vm.annuityLongevity();
          //Infaltion
          var inflation = vm.inflation();
          //net growth
          var netgrowth = vm.netgrowth(inflation);
          //DOB
          var dob = vm.dob();
          //Date At retirement
          var dateAtRet = vm.dateAtRetirement(dob['obj'],dob,annuityLongevity);
          //Time to retirement
          var timeToRet = vm.timeToRetirement(dateAtRet['obj']);
          //State Pensiob Age
          var statePensionAge=vm.statePensionAge(dob['obj']);
          //future premiums
          var netgrowth=vm.netgrowth(inflation);
          //future Premium
          var futurePremium=vm.futurePremium(timeToRet,netgrowth);
          //future pension pots
          var futurePensionPot=vm.futurePensionPot(timeToRet,netgrowth);
          //fullFuturePension
          var pensionFundAtRetirement=vm.pensionFundAtRetirement(futurePremium,futurePensionPot);
          //final salary chart series calcualtor
          var finalsalaryChart = vm.finalsalaryChart(statePensionAge);
          //state pension series calculator
          var statepensionChart = vm.statepensionChart(statePensionAge);
          //annuity calcualtions
          var annuity=vm.annuity(pensionFundAtRetirement,annuityLongevity,inflation,statePensionAge,finalsalaryChart,statepensionChart);
          //annuity calcualtions
          var taxLumpSum=vm.taxLumpSum(pensionFundAtRetirement);
          //cashout calcualtions
          var cashOut=vm.cashOut(taxLumpSum,finalsalaryChart,statepensionChart);
          //PMT calculator function
          var pmt=vm.pmt(netgrowth,dateAtRet,pensionFundAtRetirement,0,1);
          //flexible calcualtion
          var flexible=vm.flexible(pmt,statePensionAge,inflation,pensionFundAtRetirement,netgrowth,annuityLongevity,finalsalaryChart,statepensionChart);
          //flexible calcualtion
          var flexibleFixIncome=vm.flexibleFixIncome(pmt,statePensionAge,inflation,pensionFundAtRetirement,netgrowth,annuityLongevity,finalsalaryChart,statepensionChart,dateAtRet,flexible);
          // flexible chart
          var flexibleChart = vm.flexibleChart(flexible,flexibleFixIncome,finalsalaryChart,statepensionChart);
          //help to setup the chart
          var chartHelper = vm.chartHelper(flexible,annuity,statePensionAge);


      //count the Calls of the function
      $rootScope.calculationCounter=$rootScope.calculationCounter+1;


      var response={
          'inflation':inflation,
          'netGrowth':netgrowth,
          'DOB':dob,
          'dateAtRet':dateAtRet,
          'timeToRet':timeToRet,
          'statePension':statePensionAge,
          'futurePremium':futurePremium,
          'futurePensionPot':futurePensionPot,
          'pensionFundAtRetirement':pensionFundAtRetirement,
          'annuityLongevity':annuityLongevity,
          'annuity':annuity,
          'cashOut':cashOut,
          'flexible':flexible,
          'flexibleFixIncome':flexibleFixIncome,
          'flexibleChart':flexibleChart,
          'chartHelper':chartHelper,
          'taxLumpSum':taxLumpSum
        }//response

        //update slug value with the new data
        $rootScope.clonelink=ClonelinkService.cloneLink();


        return response;
  }//main collector function




  /*
  @ Infaltion converter
  1. Get inflation and convert to [0,1]
  */
  function inflation(){
    //var number = $rootScope.inflation/100;
    var number = $rootScope.inflation/100;

      return {
        'percentage':$rootScope.inflation,
        'number':number
      }
  }
  /*
  @ Net Growth converter
  1. Select net growth based on user choose  and convert to [0,1]
  2. Convert to number and percentage
  */
  function netgrowth(inflation){
    //base values
    var stringPa = 'none';
    var numberPa = 0;
    var percentagePa = 0;
    var percentagePm=0;
    var numberPm=0;
    var netPaObj = {};


    //1. Calulate NetPa object
    angular.forEach($rootScope.appData.investment_return_arr, function(percentage, key) {
       netPaObj[key] = percentage - $rootScope.pension_charge - inflation.percentage;
      //  netPaObj[key] = netPaObj[key] <= 0.0001 ? 0.0001 : netPaObj[key];
    });


    //2. use netPaObj to find the proper values
    angular.forEach(netPaObj, function(percentage, name) {
      if($rootScope.growthRateText.toLowerCase() == name.toLowerCase()){
        //anually
        stringPa = name;
        numberPa = percentage/100;
        percentagePa = percentage;
        //per montly - too small number it could switch to negative=>abs (general computer floot thing?)
        numberPm = Math.abs(Math.pow(1+numberPa,1/12)-1);
        percentagePm=numberPm*100;

      }
    });
    return {
      'stringPa':stringPa,
      'numberPa':numberPa,
      'percentagePa':percentagePa,
      'numberPm':numberPm,
      'percentagePm':percentagePm,
      'netPa':netPaObj
    }
  }

  /*
  @ DOB return function
  */
  function dob() {
    var monthsText = ["January", "February", "March", "April", "May", "June", "July",
         "August", "September", "October", "November", "December"];

    var DOBObj = new Date($rootScope.DOB);
      var year = DOBObj.getFullYear();
      var month = DOBObj.getMonth();
      var day = DOBObj.getDate();
      var obj = new Date(year, month, day);
      //age
      var ageDifMs = Date.now() - DOBObj.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      var age = Math.abs(ageDate.getUTCFullYear() - 1970)
      //update Rootscope value
      $rootScope.about_age=age;

      return {
        'string':day+"/"+monthsText[month]+"/"+year,
        'obj':obj,
        'age':age
      };
  };
/*
@ date of retirement based on DOB and selectedRetAge
*/
function dateAtRetirement(DOB,dobFunc,annuityLongevity) {
  var monthsText = ["January", "February", "March", "April", "May", "June", "July",
       "August", "September", "October", "November", "December"];
    var year = DOB.getFullYear();
    var month = DOB.getMonth();
    var day = DOB.getDate();
    var obj = new Date(year + $rootScope.about_ret, month, day);
    var sumyear=year+$rootScope.about_ret;
    var yearsToRet = 0
    if($rootScope.about_ret > dobFunc.age){
      yearsToRet = $rootScope.about_ret-dobFunc.age
    }

    return {
      'string':day+"/"+monthsText[month]+"/"+sumyear,
      'SelectedRetAge':$rootScope.about_ret,
      'YearsToRet':yearsToRet,
      'YearsInRet':annuityLongevity.lifeExpectancy-$rootScope.about_ret,
      'obj':obj
    };
};
/*
@ timeAtRetirement
*/
function timeToRetirement(selectedRetAgeObj) {
    //now
    var nowSec = new Date().getTime();
    var retSec = selectedRetAgeObj.getTime();
    //if NO time until RetAge
    if(nowSec>=retSec){
      var diff=0;
    }else{
      var diff=retSec-nowSec;
    }
    //convert to week from millisconds
    var sec = diff/1000;
    var min = sec/60;
    var hour = min/60;
    var day = Math.floor(hour/24);
    var week = Math.floor(day/7);
    var year = day/365.25;
    var month = Math.floor(year*12);

    return {
      'days':day,
      'weeks':week,
      'months':month,
      'years':year
    };
};

/*
@ Based on the DOB what is the date and age of State Pension
Retrun: age
*/
function statePensionAge(DOB){
      //State Pension Ages Array[{age1,dateobject1},...]
      var statePensionArray=[];
      //Rreal array for sorting proccess
      var  stateRealArray = [];

      var maxDate = new Date('1900-01-01');
      var minDate = new Date('2100-01-01');
      var minAge = '';
      var maxAge = '';
      var prevObj = new Date('1900-01-01');

      angular.forEach($rootScope.appData.pensionage, function(age, date) {
        var objDate = new Date(date);

        //find MAX DATE
        if(objDate.getTime() > maxDate.getTime()){
          maxDate = objDate;
          maxAge = age;
        }

        //find MAX DATE
        if(objDate.getTime() < minDate.getTime()){
          minDate = objDate;
          minAge = age;
        }

      //OREDERED ARRAY based on UNIX Timestamp Math.abs(objDate.getTime())
       stateRealArray[age]={
         'age':age,
         'date':new Date(date)
       };


        statePensionArray.push({
          'age':age,
          'date':new Date(date)
        });
      });


      //Select State Retirement Date and Age,
      var statePension=0; // = {};
      var prevInt=new Date('1900-01-01');
      /*
      RISK!!!!
      assumption: Retirement Age will be increase in the future!!!!!!!!!!!!!
      */

      //calculate array length
      var size = 0;
      angular.forEach(stateRealArray, function(option,key) {
         size +=1;
      });//foreach

      //IF DOB > MaxDate: value=maxAge
      if(DOB.getTime()>=maxDate.getTime()){
         statePension=maxAge;
      }else{

        var count = 0;
        stateRealArray.slice().reverse().forEach(function(option,key) {
            //Do not iterate over the biggest value
          if(count!=0){
              if(DOB.getTime() <= option.date.getTime()){
                  statePension=option.age;
              }//higher than the interval.
          }//do not iterate over the last one


           //update count
           count +=1;
        });//foreach
      }



      //USER STATE PANSION VALUE!!
      //if undefined, Nan or empty use 0
  if($rootScope.statePensionAssValue == undefined || $rootScope.statePensionAssValue == NaN || $rootScope.statePensionAssValue==''){
      var userStatePension=0;
    }else{
      var userStatePension=parseInt($rootScope.statePensionAssValue);
    }


      return {
        'statePensionAge':statePension,
        'stateRealArray':stateRealArray,
        'max':maxDate,
        'maxAge': maxAge,
        'min':minDate,
        'minAge':minAge,
        'statePensionWeek':userStatePension/52,
        'statePensionMonth':userStatePension/12,
        'statePensionYear':userStatePension
      }
}

/*
Future Premiums
Future premiums projected to retirement
Step 1:Calcualte the current weekly value of premiums
Step 2: Calculate the future value of premius at retrirement
*/
function futurePremium(timeToRet,netgrowth){
    //current premiums
    var currentPremiumsMonthly=parseFloat($rootScope.yourSavings) + parseFloat($rootScope.empSavings);
    //future Premium Projected to retirement age
    //p((1+G)T-1)/G
    var futurePremium = currentPremiumsMonthly*((Math.pow(1+netgrowth.numberPm,timeToRet.months)-1))/netgrowth.numberPm;

    return {
      'yourSavings':$rootScope.yourSavings,
      'empSavings':$rootScope.empSavings,
      'currentPremiumsMonthly':currentPremiumsMonthly,
      'futurePremium':futurePremium,
      'growthrateMontly':netgrowth.numberPm,
      'monthsToRet':netgrowth.numberPm
    }
}
/*
Future Pension Pot
Current value projected to retirement
*/
function futurePensionPot(timeToRet,netgrowth){
  var futurePensionPot = $rootScope.pension_potSum*Math.pow(1+netgrowth.numberPm,timeToRet.months)
  return {
    'futurePensionPot':futurePensionPot,
    'netGrowth_pm':netgrowth.numberPm,
    'timeToRetMonths':timeToRet.months,
  }
}

/*
ALL Future Pension at Retirement age
Estimated value of your pensions
*/
function pensionFundAtRetirement(futurePremium,futurePensionPot){
  var fullFuturePension = futurePensionPot.futurePensionPot + futurePremium.futurePremium;
  var tcfValue=fullFuturePension*($rootScope.tfcToken/100);
  var remainingFutureFound=fullFuturePension-tcfValue;
  return {
    'fullFuturePension':fullFuturePension,
    'tcfPercent':$rootScope.tfcToken,
    'tcfMaxPercent':$rootScope.appData.max_TFC,
    'tcfValue':tcfValue,
    'tcfValueFormatted':'£'+tcfValue.toFixed(0),
    'remainingFutureFound':remainingFutureFound,
    'remainingFutureFoundFormatted':'£'+remainingFutureFound.toFixed(0),
  };
}
/*
Life Expectancy
Input: Age + Gender
*/
function annuityLongevity(){
  //Get user selected gender
  var gender =$rootScope.about_gender.toLowerCase();
  //convert to fit it to base data
  if(gender=='male'){ var sex='men'} else{ var sex='women'}
  //Get life expentancy form appData
  var lifeExpectancy = $rootScope.appData.life_expectancy[$rootScope.about_ret][sex];
  //Calculate level
    //level vs. inflation
    if($rootScope.realterms=='yes'){
      var income='inflation';
    }else{
      var income='level';
    }
  var level = $rootScope.appData.life_expectancy[$rootScope.about_ret][income]/$rootScope.appData.annuity_bought_with_fv;

  return {
    'lifeExpectancy':lifeExpectancy,
    'level':level,
    'gender':gender,
    'realterms':$rootScope.realterms,
    'income':income,
    'fix':$rootScope.appData.annuity_bought_with_fv,
    'test_income':$rootScope.appData.life_expectancy[$rootScope.about_ret][income]
  }
}

/*
* Final Salary Chart Calcualtor
*/
function finalsalaryChart(statePensionAge){

  //final salary  chart
  var finalsalaryChartArray = new Array();
  //list of final salary colors
  var finalBarColor =['#4e4e4e','#161616','#000000'];

   //Array of finale salaries
   angular.forEach($rootScope.finalsalary_list, function(finalSalary, step) {

       //final salary element
       var finalsalaryElem= new Array();
       //final salary line
       var finalsalaryLine = new Array();
       //final salary series
       var finalsalarySeries = new Array();

          //RenameSeries
         var name = finalSalary.name;
        //chart x-axis
        for (var i = parseInt($rootScope.about_ret); i <= parseInt($rootScope.timeline.upto); i++) {

           //pay only after FROM value
           if(finalSalary.from > i){
             //finalsalaryElem=[i,0];
             finalsalaryElem={"x":i,"y":0};
           }else{
             //finalsalaryElem=[i,parseInt(finalSalary.value)];
             finalsalaryElem={"x":i,"y":parseFloat(finalSalary.value)};
           }
           finalsalaryLine.push(finalsalaryElem);
        }//time series
        finalsalarySeries={
            'key':name,
            'values':finalsalaryLine,
            'color':finalBarColor[step],
            'payableFrom':parseInt(finalSalary.from),
            'annualy':parseFloat(finalSalary.value)
        }
        finalsalaryChartArray.push(finalsalarySeries);


    })//final salaries

    return finalsalaryChartArray;
}//finalsalaryChart

/*
* State Pension Chart Calcualtor
*/
function statepensionChart(statePensionAge){
  var value=0;
  var statePensionElem=new Array();
  var statePensionLine=new Array();

    //Before State Pension Year value = 0
    if($rootScope.stateValue==true){

      for (var i = parseInt($rootScope.about_ret); i <= parseInt($rootScope.timeline.upto); i++) {

        var labelPension = 'State Pension';
        if(statePensionAge.statePensionAge <= i){
          value=parseInt(statePensionAge.statePensionYear);
        }else{
          value=0;
        }//0 if sires less then State Pension
        //create chart Array
        //statePensionElem=[i,value];
        statePensionElem={"x":i,"y":value};
        statePensionLine.push(statePensionElem);
      }//foreach years
    }//Include
      //assemble return
    var statePensionChart={
        'key':'State Pension',
        'values':statePensionLine,
        'color':'#8d8d8d',
        'annualy':parseInt(statePensionAge.statePensionYear)
      }


    return statePensionChart;
}//statepensionChart


/*
@ Annuity Related Calcualtions
1. Get inflation and convert to [0,1]
*/
function annuity(pensionFundAtRetirement,annuityLongevity,inflation,statePensionAge,finalsalaryChart,statepensionChart){
   var eachYearBeforeTax=pensionFundAtRetirement.remainingFutureFound*annuityLongevity.level;
    //crate the chart time series
    var annuitySeries= new Array();
    //crate the chart time series
    var annuityElem= new Array();
    //crate the chart time series
    var annuityChart= {};
    //Sum of annuity up to lifeExpectancy
    var sumAnnuity=0;
    //max annuity
    var maxAnnuity = 0;

   for (var i = parseInt($rootScope.about_ret); i <= parseInt($rootScope.timeline.upto); i++) {
      //value of annuity
      var annuity=inflator(eachYearBeforeTax,inflation.number,i-$rootScope.about_ret,$rootScope.realterms);
      
      if(i <= annuityLongevity.lifeExpectancy){
        sumAnnuity+=annuity;
      }

      //get max annutiry
      if (maxAnnuity<annuity){
        maxAnnuity=annuity;
      }
      //can not be bigger than pensionFundAtRetirement.remainingFutureFound
      if(pensionFundAtRetirement.remainingFutureFound<annuity){
        annuity = pensionFundAtRetirement.remainingFutureFound;
      }


         //chart element
         //annuityElem=[i,annuity];
         annuityElem={"x":i,"y":annuity};
         //push chart
         annuitySeries.push(annuityElem);

    }




    //Assemble chart array
    var chart= new Array();


    //state pension
    if($rootScope.state=='yes'){
      chart.push(statepensionChart);
    }
    //final salary
    if(finalsalaryChart.length>0 && $rootScope.finalsalary_sum>0){
      angular.forEach(finalsalaryChart, function(value, key) {
           chart.push(value);
      });
    }

     //final Annuity bar
    annuityChart={
      "key":'Annuity',
      "values":annuitySeries,
      "color":'#ef7e0a'
    }
    console.log(annuityChart);
    chart.push(annuityChart);
    return {
      'eachYearBeforeTax':eachYearBeforeTax,
      'sumAnnuity':sumAnnuity,
      'totalpayment':sumAnnuity + pensionFundAtRetirement.tcfValue,
      'chart': chart,
      'maxAnnuity': maxAnnuity
    }
}

/*
@ Inflation calcualtor
* Based on Real Terms VS. Nominal Value ($rootScope.realterms)
* if: RealTerm retrun the Value
* else: Retrun the inflated nominal value
*/
var inflator = function inflator(value,rate,years,real){
    if(real=='yes'){
      return value;
    }else{
       return value/(Math.pow(1+rate,years));
    }
}
/*
@ Deflator calcualtor
* Based on Real Terms VS. Nominal Value ($rootScope.realterms)
* if: RealTerm retrun the Value
* else: Retrun the inflated nominal value
*/
var deflator = function deflator(value,rate,years,real){
    if(real=='yes'){
      return value;
    }else{
       return value*(Math.pow(1+rate,years));
    }
}

/*
@ Time Push
* This function Do not care real terms and future or past
* if: years negative transform backward, if positive transform forward
*/
var timepush = function timepush(value,rate,years){
      return value*(Math.pow(1+rate,years));
}


/*
@ Cashout Related Calcualtions
*/
function cashOut(taxLumpSum,finalsalaryChart,statepensionChart){

  //Assemble chart array
  var chart= new Array();

  //state pension
  if($rootScope.state=='yes'){
    chart.push(statepensionChart);
  }
  //final salary - We let the empty input fields so the length is not enough
  if(finalsalaryChart.length>0 && $rootScope.finalsalary_sum>0){
    angular.forEach(finalsalaryChart, function(value, key) {
         chart.push(value);
    });
  }

    return {
      'taxLumpSum':taxLumpSum.sumTax,
      'chart':chart
    }
}
/*
@ Cashout Related Calcualtions
*/
function flexible(pmt,statePensionAge,inflation,pensionFundAtRetirement,netgrowth,annuityLongevity,finalsalaryChart,statepensionChart){

    //If income target is defined by the Sliders use it otherwise PMT
    if($rootScope.incomeTarget>=0){

         var requiredIncome= $rootScope.incomeTarget-statePensionAge.statePensionYear-$rootScope.finalsalary_sum;

         var eachYearBeforeTax= $rootScope.incomeTarget;

         var requiredIncome= $rootScope.incomeTarget;
         //Add State pension
         if(statePensionAge.statePensionYear>0){ requiredIncome-=statePensionAge.statePensionYear; }
         //Add State pension
         if($rootScope.finalsalary_sum>0){ requiredIncome-=$rootScope.finalsalary_sum; }

         var eachYearBeforeTax= $rootScope.incomeTarget;



    }
    //First time calculation
    else{
      var requiredIncome= (-1)*pmt;
      //Add State pension
      if(statePensionAge.statePensionYear>0){ requiredIncome+=statePensionAge.statePensionYear; }
      //Add State pension
      if($rootScope.finalsalary_sum>0){ requiredIncome+=$rootScope.finalsalary_sum; }
      var eachYearBeforeTax=requiredIncome;

      $rootScope.incomeTarget=eachYearBeforeTax;


    }

    //for reuse in Fix Flex function
    $rootScope.requiredIncome=requiredIncome;


    //preValueActualDDfund
    var preValueActualDDfund=0;
    //preValueActualDDfund
    var preValuePvDDfund=0;
    //preValueActualDDfund
    var preValueActualDDfund=0;
    //pre value pvFlexIncome
    var sumPvFlexIncome=0;
    //switch RealTerm to the oposite
    var switchReal='';
    if($rootScope.realterms=='yes'){ switchReal='no'}else{switchReal='yes' }
    //crate the chart time series
    var flexibleSeries= new Array();
    //FoundRate
    var foundRate = netgrowth.numberPa + inflation.number;
    //pvDDfund
    var pvDDfund = 0;
    //actualDDfund
    var actualDDfund = 0;
    //pv Flex income
    var pvFlexIncomeTop= requiredIncome;
    //maxTotalPvDDfund
    var maxTotalPvDDfund = 0;
    //max pvFlexincome
    var maxPvFlexIcome =0;


    //Years Loop
      //counter for pvFlexIncomeTop first value
      var count=0;
    for (var i = parseInt($rootScope.about_ret); i <= parseInt($rootScope.timeline.upto); i++) {
      //actualFlexibleIncome
      var actualFlexibleIncome=deflator(requiredIncome,inflation.number,i-$rootScope.about_ret,switchReal);
        //Actual DD Found Calculation
        if(preValueActualDDfund==0){ actualDDfund=pensionFundAtRetirement.remainingFutureFound-actualFlexibleIncome }
        else{ actualDDfund = deflator(preValueActualDDfund,foundRate,1,'no')-actualFlexibleIncome; }
        //after lifeExpectancy 0
        if(actualDDfund<0){ pvDDfund = 0; }
        else{ pvDDfund = inflator(actualDDfund,inflation.number,i-$rootScope.about_ret,'no'); }

        //pvFlexIncome
          if(count==0){pvFlexIncomeTop=actualFlexibleIncome;}
          else if(preValuePvDDfund<=0){ pvFlexIncomeTop=0;}
          else if (preValueActualDDfund<actualFlexibleIncome){ pvFlexIncomeTop=preValueActualDDfund; }
          else { pvFlexIncomeTop=actualFlexibleIncome; }
          //actual value of pvFlexIncomeTop
          var pvFlexincome=inflator(pvFlexIncomeTop,inflation.number,i-$rootScope.about_ret,'no')

        //sumPvFlexIncome
        sumPvFlexIncome += pvFlexincome;
        if(annuityLongevity.lifeExpectancy< i){ var totalPvDDfund = 0;  }
        else { var totalPvDDfund = sumPvFlexIncome + pvDDfund; }

        //Update max value if it is bigger than the prev one
        if(maxTotalPvDDfund < totalPvDDfund){ maxTotalPvDDfund = totalPvDDfund; }

      //find max pvFlexIncome
      if(maxPvFlexIcome<pvFlexincome){
        maxPvFlexIcome=pvFlexincome;
      }


      //assemble a row
       var row = {
         'age':i,
         'actualFlexibleIncome': actualFlexibleIncome,
         'actualDDfund':actualDDfund,
         'pvDDfund':pvDDfund,
         'pvFlexIncome':pvFlexincome,
         'totalPvDDfund': totalPvDDfund
       }

       if(pvFlexincome<0){ pvFlexincome=0; }
       var bar = {"x":i,"y":pvFlexincome};

       //update preValueActualDDfund
       preValueActualDDfund=actualDDfund;
       //update preValuepvDDfund
       preValuePvDDfund=pvDDfund;
       //count step forther
       count+=1;
      //push value to the
      flexibleSeries.push(bar);

    }//iteration


    return {
      'requiredIncome':requiredIncome,
      'eachYearBeforeTax':eachYearBeforeTax,
      'flexibleSeries':flexibleSeries,
      'totalpayment':maxTotalPvDDfund + pensionFundAtRetirement.tcfValue,
      'maxFlexible':maxPvFlexIcome
    }
}




/*
*Flexible 2 FIX Income Calcualtor Function
*/
function flexibleFixIncome(pmt,statePensionAge,inflation,pensionFundAtRetirement,netgrowth,annuityLongevity,finalsalaryChart,statepensionChart,dateAtRet,felxible){



  //preValueActualDDfund
  var preValueActualDDfund=0;
  //preValueActualDDfund
  var preValuePvDDfund=0;
  //preValueActualDDfund
  var preValueActualDDfund=0;
  //pre value pvFlexIncome
  var sumPvFlexIncome=0;
  //switch RealTerm to the oposite
  var switchReal='';
  if($rootScope.realterms=='yes'){ switchReal='no'}else{switchReal='yes' }
  //crate the chart time series
  var flexibleSeries= new Array();
  //FoundRate
  var foundRate = netgrowth.numberPa + inflation.number;
  //pvDDfund
  var pvDDfund = 0;
  //actualDDfund
  var actualDDfund = 0;
  //pv Flex income
  var pvFlexIncomeTop= felxible.requiredIncome;
  //maxTotalPvDDfund
  var maxTotalPvDDfund = 0;
  //max pvFlexincome
  var maxPvFlexIcome =0;
  //Flex actual real terms fill shortfall
  var fillReal = new Array();




///Transform: Flexible and Satate Pension to ARRAY key = same as chart key///////////////////////////////////////////////////////////////////////////////////////////////

      //Step 1 add upp final salaries for years
      var sumFinal = Array();
      //calcualte SUM finalsalary for each year
      //becasue we let empty boxes on the form length of the array is not valid it self
      if(finalsalaryChart.length>0 && $rootScope.finalsalary_sum>0){
          //iterate throug one values rearrange them - not the CHART structure -> Array
          angular.forEach(finalsalaryChart, function(final, key) {
              var values=Array();
              sumFinal[key]={
                'from':final.payableFrom,
                'annualy':final.annualy,
                'values':values
              };
              angular.forEach(final.values, function(value, id) {
                  sumFinal[key].values[value.x]=value.y;
              });//for though final salary
          });
      }//if there is final salary
      else{
        //inside of array to maintain the structure
        var values=Array();
         sumFinal[0]={'from':$rootScope.about_ret,'values':values};
          //if no Final income generate 0 values
        for (var i = parseInt($rootScope.about_ret); i <= parseInt($rootScope.timeline.upto); i++) {
                  sumFinal[0].values[i]=0;
          };
      }


      //Step 2: transform state penstion to simple array - not the CHART structure -> Array
      var sumStatePension = Array();
      if($rootScope.stateValue==true){
            angular.forEach(statepensionChart.values, function(obj, key) {
                sumStatePension[obj.x]=obj.y;
              });
      }else{
        //if no State Pension generate 0 values
        for (var i = parseInt($rootScope.about_ret); i <= parseInt($rootScope.timeline.upto); i++) {
                sumStatePension[i]=0;
        };
      }

//End: Final and State pension transform//////////////////////////////////////////////////////////////////////////////////////////////////



  //Years Loop
    //counter for pvFlexIncomeTop first value
  var count=0;
  for (var i = parseInt($rootScope.about_ret); i <= parseInt($rootScope.timeline.upto); i++) {



/*
* 1. Flex actual real terms fill shortfall
*/
if($rootScope.realterms=='yes'){
        /*First round*/
        if(count==0){

          fillReal[i]=felxible.requiredIncome;
          //statepension
          //State pension
          if(i<statePensionAge.statePensionAge){ fillReal[i] += statePensionAge.statePensionYear;}
          //final
          if(finalsalaryChart.length>0 && $rootScope.finalsalary_sum>0){
            //iterate through the Final salaries and inflate only the proper one
            angular.forEach(sumFinal, function(final, age) {
                //if i age < payable from
                if(i<final.from){
                  fillReal[i] += final.annualy;
                }
            });
          };

        }else{
              /*After the first round*/
              fillReal[i] = 0;
              //requiredIncome
              fillReal[i] += timepush(fillReal[i-1],inflation.number,1);

              //final
              if(finalsalaryChart.length>0 && $rootScope.finalsalary_sum>0){
                //iterate through the Final salaries and inflate only the proper one
                angular.forEach(sumFinal, function(final, age) {
                    //if i age < payable from
                    if(i==final.from){
                      fillReal[i] -= timepush(final.values[i],inflation.number,final.from-dateAtRet.SelectedRetAge);
                    }
                });
              };//end final iteration

              //State pension
              if(i==statePensionAge.statePensionAge){
                  fillReal[i] -= timepush(statePensionAge.statePensionYear,inflation.number,statePensionAge.statePensionAge-dateAtRet.SelectedRetAge);
              }//end pensin

        }
}//RealTerms//////////////////////////////////////////////////////////////////////////////
/*
* 1. Flex actual NOMINAL terms fill shortfall
*/
else{
  /*First round*/
  if(count==0){

    fillReal[i]=felxible.requiredIncome;
    //statepension
    //State pension
    if(i<statePensionAge.statePensionAge){ fillReal[i] += statePensionAge.statePensionYear;}
    //final
    if(finalsalaryChart.length>0 && $rootScope.finalsalary_sum>0){
      //iterate through the Final salaries and inflate only the proper one
      angular.forEach(sumFinal, function(final, age) {
          //if i age < payable from
          if(i<final.from){
            fillReal[i] += final.annualy;
          }
      });
    };

  }//end: first round
  else{
        /*After the first round*/
        fillReal[i] = 0;
        //requiredIncome
        fillReal[i] += fillReal[i-1];

        //final
        if(finalsalaryChart.length>0 && $rootScope.finalsalary_sum>0){
          //iterate through the Final salaries and inflate only the proper one
          angular.forEach(sumFinal, function(final, age) {
              //if i age < payable from
              if(i==final.from){
                fillReal[i] -= timepush(final.values[i],inflation.number,i-dateAtRet.SelectedRetAge);
              }
          });
        };//end final iteration

        //State pension
        if(i==statePensionAge.statePensionAge){
            fillReal[i] -= timepush(statePensionAge.statePensionYear,inflation.number,i-dateAtRet.SelectedRetAge);
        }//end pension

    }//after first rount

  }//Nominal value////////////////////////////////////////////////////////////////////


//increase counter
count+=1;



}; //loop through/////////////////////////




//Calcualtion: from Flexible Income actual/////////////////////////
//2a, Flexible income (actula == fillReal)
var ddFundActual=Array();
var ddFundPV=Array();
var flexiblePV=Array();
var countFillReal=0;
angular.forEach(fillReal, function(flexIncome_2a,i) {

  if(countFillReal==0){
      //ddFoundActual
      ddFundActual[i]=pensionFundAtRetirement.remainingFutureFound-flexIncome_2a;
      //ddFundPV
      if(ddFundActual[i]>0){
        ddFundPV[i]=ddFundActual[i];
      }
      else{ ddFundPV[i]=0;}
      //flexiblePV

      flexiblePV[i]=flexIncome_2a;


  }else{
    //ddFoundActual
    ddFundActual[i]=timepush(ddFundActual[i-1],inflation.number+netgrowth.numberPa,1)-flexIncome_2a;
    //ddFundPV
    if(ddFundActual[i]>0){
       ddFundPV[i]=timepush(ddFundActual[i],inflation.number,dateAtRet.SelectedRetAge-i);
    }else{ ddFundPV[i]=0;}
    //flexiblePV, mod ==
     if(ddFundPV[i-1]<=0){ flexiblePV[i]=0;}
      else{
        if(ddFundActual[i-1]<flexIncome_2a){ flexiblePV[i]=ddFundActual[i-1]; }
        else{ flexiblePV[i]=flexIncome_2a; }
      }
     flexiblePV[i]=timepush(flexiblePV[i],inflation.number,dateAtRet.SelectedRetAge-i);

  }//rest rounds

  //increase itarator
  countFillReal+=1;
});//iterate Flexible income actual


/*
* Flexible Series Assembling
*/
var flexibleSeries= new Array();
angular.forEach(flexiblePV, function(value,age) {
  //allowed only positive values otherwise broke the chart
 if(value<0){
    value=0;
  }
  //cannot be more the the Future Pot (Othwerwise 'Show target income from outset' fill the whole gap)
  if(pensionFundAtRetirement.remainingFutureFound < value){
    value = pensionFundAtRetirement.remainingFutureFound;
  }

  var bar = {"x":age,"y":value};
  flexibleSeries.push(bar);
});


//return
  return {
    'finalsalaryChart':finalsalaryChart,
    'fillReal':fillReal,
    'ddFundActual':ddFundActual,
    'ddFundPV':ddFundPV,
    'flexiblePV':flexiblePV,
    'flexibleSeries':flexibleSeries,
    'sumFinal':sumFinal,
    'sumStatePension':sumStatePension

  }


}//fix flex function



/*
* Flexible chart
Handle the FIX INCAME CHANGES for flexible
*/
function flexibleChart(flexible,flexibleFixIncome,finalsalaryChart,statepensionChart){


  //Assemble chart array
  var chart= new Array();

  //state pension
  if($rootScope.state=='yes'){
    chart.push(statepensionChart);
  }
  //final salary
  if(finalsalaryChart.length>0 && $rootScope.finalsalary_sum>0){
    angular.forEach(finalsalaryChart, function(value, key) {
         chart.push(value);
    });
  }



   /*
   FLEXIBLE
   */
   //Which timeseries we use?
   if($rootScope.fixIncomeLevel=='yes'){
      var flexibleSeries=flexibleFixIncome.flexibleSeries;
   }else{
       var flexibleSeries=flexible.flexibleSeries;
   }


   //Run out of Flexible
   var runOut =[];
   angular.forEach(flexibleSeries, function(values, step) {
     if(values.y > 0 ){ runOut = values;}
   });


   //create the response
  var flexibleChart={
    "key":'Flexible',
    "values":flexibleSeries,
    "color":'#ef7e0a'
  }
  chart.push(flexibleChart);


  return{
    'chart':chart,
    'runOut':runOut
  }

}



/*
@ Tax Charge Estimatoin for Cach Out
1. what is left after TFC, calculat the tax on the remain
*/
function taxLumpSum(pensionFundAtRetirement){
    var remainingFound=pensionFundAtRetirement.remainingFutureFound;
    //Loop trough the ranges
    var nextTrashhold=0;
    var extandArray= new Array();
    var prevThreshold=0;
    var sumTax = 0;
    angular.forEach($rootScope.appData.taxLumpSum, function(values, step) {
        if(step =='last'){
          var  tax=(remainingFound-prevThreshold)*(values.rate/100);
        }else{
          //if no next range tax the remain
          if(remainingFound < values.grossBand + prevThreshold){
          var  tax=(remainingFound-prevThreshold)*(values.rate/100);
          }else{
          var  tax=values.grossBand*(values.rate/100);
          }
        }
      //crate the object
            var fullRow={
              'grossBand':values.grossBand,
              'threshold':values.grossBand + prevThreshold,
              'rate':values.rate,
              'remain':remainingFound-prevThreshold,
              'tax': tax,
            }
            //calcualte only if remaind something form the found
            if(prevThreshold<remainingFound){
                extandArray.push(fullRow);
                sumTax=sumTax+tax;
            }
            //update threshold
            prevThreshold=prevThreshold+values.grossBand;
            //update sumTax
    });

    return {
      'sumTax':sumTax
    }
}



/*
* Help to
*/
function chartHelper(flexible,annuity,statePensionAge){
      //max value calcualtion
      var maxYAxisvalue = 0;
      //min value calcualtion
      var minYAxisvalue = 0;
      //state pension
      if($rootScope.state=='yes'){
        maxYAxisvalue = statePensionAge.statePensionYear; //$rootScope.appData.state_pension_week*52;
        minYAxisvalue =statePensionAge.statePensionYear;
      }
      //final salary
      if($rootScope.finalsalary_list.length>0){
             maxYAxisvalue+=$rootScope.finalsalary_sum;
             minYAxisvalue+=$rootScope.finalsalary_sum;
      }
      //flexible vs. annuity
      if(flexible.maxFlexible<annuity.maxAnnuity){
        maxYAxisvalue+=annuity.maxAnnuity;
      }else{
          maxYAxisvalue+=flexible.maxFlexible;

      }

      return {
        'maxYaxis':Math.ceil(1.7*((maxYAxisvalue/100)*100)),
        'limitMaxYaxis':Math.ceil(1.4*((maxYAxisvalue/100)*100)),
        //'limitMinYaxis':Math.ceil(0.3*((maxYAxisvalue/100)*100))
        'limitMinYaxis':minYAxisvalue
      }

}



/**
 * Copy of Excel's PMT function.
 * Credit: http://stackoverflow.com/questions/2094967/excel-pmt-function-in-js
 *
 * @param netGrowth       The interest rate for the loan.
 * @param dateAtRet    The total number of payments for the loan in months.
 * @param pensionFundAtRetirement         The present value, or the total amount that a series of future payments is worth now;
 *                              Also known as the principal.
 * @param future_value          The future value, or a cash balance you want to attain after the last payment is made.
 *                              If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.
 * @param type                  Optional, defaults to 0. The number 0 (zero) or 1 and indicates when payments are due.
 *                              0 = At the end of period
 *                              1 = At the beginning of the period
 * @returns {number}
 */
function pmt(netgrowth, dateAtRet, pensionFundAtRetirement, futureValue , typeNum){
    var rate_per_period=netgrowth.numberPa;
    var number_of_payments=dateAtRet.YearsInRet;
    var present_value=pensionFundAtRetirement.remainingFutureFound;
    var future_value=futureValue;
    var type=typeNum;


    future_value = typeof future_value !== 'undefined' ? future_value : 0;
    type = typeof type !== 'undefined' ? type : 0;

	if(rate_per_period != 0.0){
		// Interest rate exists
		var q = Math.pow(1 + rate_per_period, number_of_payments);
		return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

	} else if(number_of_payments != 0.0){
		// No interest rate, but number of payments exists
		return -(future_value + present_value) / number_of_payments;
	}

	return 0;
}











}//CalculationService
