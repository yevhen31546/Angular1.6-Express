angular
  .module('lemonadeReward')
  .controller('PrintController', PrintController);

/**
 * @param $rootScope
 * @ngInject
 */
function PrintController($scope,$rootScope,CalculationService,$q,$timeout,PrintService,GenerateID,$location) {

  const vm = this;

   /* Results of the  Calcualtion*/
   $scope.calc=CalculationService.mainCollector();

   //list of possible charts
   $scope.chartTypes = ["flexible", 'annuity','cashout'];
   //human read name for charts
   $scope.chartNames = ["Flexible Drawdown", 'Annuity','Cash Out'];
   //scope level init of whichChart
   $scope.whichChart='';

   $scope.generatePDF=true;
   $scope.sendmail=false;
   $scope.finished=false;
   $scope.showdots=true;
   $scope.resp = 'Sending';

//generate identifier for the email
  $rootScope.identifier= GenerateID.generate();

  $scope.pictures= {
    'flexible':'',
    'annuity':'',
    'cashout':''
  };

  /* Timeout*/
  $timeout( function(){
    //flexible
    svgAsPngUri(document.getElementById("flexible"), {canvg:window.canvg, backgroundColor:'#ffffff',encoderOptions:1}, function(uri) {
      $scope.pictures.flexible = uri;
    });
    //annuity
    svgAsPngUri(document.getElementById("annuity"), {canvg:window.canvg, backgroundColor:'#ffffff',encoderOptions:1}, function(uri) {
      $scope.pictures.annuity = uri;
    });
    //annuity svgAsPngUri
    svgAsPngUri(document.getElementById("cashout"), {canvg:window.canvg, backgroundColor:'#ffffff',encoderOptions:1}, function(uri) {
      $scope.pictures.cashout = uri;
    });
    //picture generation done
    $scope.generatePDF=false;
    //ask for the email
    $scope.sendmail=true;
    //update DOM
  //  $scope.chartShow = false;
  //  $scope.$apply();
  }, 5000 );//timeout



  //PRINT BUTTON//////////////////////////////////////////////////////////////
  $scope.submitForm = function(form){
    $scope.sendmail=false;
    $scope.finished=true;
    $scope.showdots=true;


    if(form.$valid) {
      //response managers
      var pdfGen = function(){
        //pdfMake return value
        var payload = {
          'version':$rootScope.appData.branding.companyName,
          'about_age':$rootScope.about_age,
          'about_ret':$rootScope.about_ret,
          'about_gender':$rootScope.about_gender,
          'pension_potSum':$rootScope.pension_potSum,
          'finalsalary_sum':$rootScope.finalsalary_sum,
          'statePensionAssValue':$rootScope.statePensionAssValue,
          'salaryBeforeTax':$rootScope.salaryBeforeTax,
          'yourSavings':$rootScope.yourSavings,
          'empSavings':$rootScope.empSavings,
          'printID':$scope.identifier,
          'inflation':$rootScope.inflation,
          'pension_charge':$rootScope.pension_charge,
          'tfcToken':$rootScope.tfcToken,
          'growthRate':$rootScope.growthRateText,
          'growthRateValue':$rootScope.appData.investment_return_arr[$rootScope.growthRateText],
          'flexible_lumpsum':$scope.calc.pensionFundAtRetirement.tcfValue,
          'flexible_eachyear':$scope.calc.flexible.requiredIncome,
          'flexible_lastuntil':$scope.calc.flexibleChart.runOut.x,
          'flexible_totalpayment':$scope.calc.flexible.totalpayment,
          'annuity_lumpsum':$scope.calc.pensionFundAtRetirement.tcfValue,
          'annuity_eachyear':$scope.calc.annuity.eachYearBeforeTax,
          'annuity_lastuntil':'Income for life',
          'annuity_totalpayment':$scope.calc.annuity.totalpayment,
          'cashout_lumpsum':$scope.calc.pensionFundAtRetirement.tcfValue,
          'cashout_eachyear':$scope.calc.cashOut.taxLumpSum,
          'cashout_lastuntil':'No Income',
          'cashout_totalpayment':$scope.calc.pensionFundAtRetirement.fullFuturePension,
          'totalpensionpot_atretirement':$scope.calc.pensionFundAtRetirement.fullFuturePension,
          'incometarget':$rootScope.incomeTarget,
          'lifeExpectancy':$scope.calc.annuityLongevity.lifeExpectancy,
          'realterms':$rootScope.realterms,
          'fixIncomeLevel':$rootScope.fixIncomeLevel,
          'pic_flexible':$scope.pictures.flexible,
          'pic_annuity':$scope.pictures.annuity,
          'pic_cashout':$scope.pictures.cashout,
          'email':$scope.useremail,
          'identifier':$scope.identifier,
          'linkpayload':$rootScope.clonelink,
          'template':$rootScope.appData.mail_templates['printoption'],
          'contact_email':$rootScope.appData.contact_email,
          'contact_phone':$rootScope.appData.contact_phone
        }//POST data
        //Email Sending with Mandrill
        PrintService.mail(payload).then(function (response) {
          $scope.sendmail=false;
          $scope.finished=true;
          $scope.showdots=false;
          $scope.resp = response.data.msg;
        },function (reason) {
          $scope.sendmail=false;
          $scope.finished=true;
          $scope.showdots=false;
          $scope.resp = 'Sorry, we have some issues, please try again later.';
        });//promise end;

    }//pdfGen
    pdfGen();

  }//if form valid
  else{  $scope.formValid=false; }
  }//End:Print Button/////////////////////////////////////////////////////////////////////



  //END of print: back button
  $scope.endOfPrint = function(){
    //Redirect
    $location.path("/options/table");
  }


}//controller
