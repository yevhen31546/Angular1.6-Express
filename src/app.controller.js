/*
RUN: Get AppData before load the website
*/
angular
  .module('lemonadeReward')
  .run(['$rootScope','$location', 'BaseDataService','BreadcrumbService','CloneService','$state','DetectionService', function($rootScope, $location,BaseDataService,BreadcrumbService,CloneService,$state,DetectionService) {



    /*
    *Base values for the calc
    */

     //base realterms
     $rootScope.realterms='yes';
     //base growth rate
     $rootScope.growthRateText='mid';
     //about
     $rootScope.DOB='';
     $rootScope.about_age=55;
     $rootScope.about_ret=65;
     //Min. Ret Age = you age in slider
     $rootScope.sliderMinAge=55;
     $rootScope.about_gender='';
     //pension
     $rootScope.pension_potList=[];
     $rootScope.pension_potSum=0;
     //True or False, state only govern the style
     $rootScope.stateValue=false;
     $rootScope.state='';
     //user statepension value
     $rootScope.statePensionAssValue='';
     //final salary
     $rootScope.finalsalary_list=[];
     $rootScope.finalsalary_sum=0;
     //Salary Before Tax
     $rootScope.salaryBeforeTax='';
     //Your Saving
     $rootScope.yourSavings=0;
     $rootScope.amount='';
     $rootScope.yourPerc='';
     //Employer Saving
     $rootScope.empSavings=0;
     $rootScope.empAmount='';
     $rootScope.empPerc='';
     //Base settings to digram
     $rootScope.timeline={
       'upto':100
     }
     /*
       if all menupont is valid options possible
       true = value optional
     */
     $rootScope.validAbout=[false,false,false];
     $rootScope.validPension=[false,true,false];
     $rootScope.validPlans=[false,true,true];
     //target income base value
     $rootScope.incomeTarget=undefined;
     //option table counter : Review modal load only once
     $rootScope.tableCounter=0;
     //Maintain fix income target for flexible in chart: yes vs. no
     $rootScope.fixIncomeLevel='no';
     //Clone link
     $rootScope.clonelink='';
     //Get the GET variables
     var getValues = $location.search();

     /*
     *GET API DATA
     * Everything should be in the promse which require data from the API
     */
      BaseDataService.getApiData().then(
        //Get Api Data
        function(response){
          //Api avaiable
          $rootScope.serverRun=true;
           $rootScope.appData=response.data;
           /*DEFINE BASE VALUES WITH API DATA*/
            //TfcToken
            $rootScope.tfcToken=$rootScope.appData.max_TFC;
            //inflation
            $rootScope.inflation=parseFloat($rootScope.appData.inflation);
            //pension charge
            $rootScope.pension_charge=parseFloat($rootScope.appData.pension_charge);
             //MENU
             $rootScope.menu_about={'backgroundColor': '#FFFFFF','color': $rootScope.appData.branding.fontColor};
             $rootScope.menu_pension={'backgroundColor': $rootScope.appData.branding.mainColorDark,'color': $rootScope.appData.branding.headerFontColor};
             $rootScope.menu_plans={'backgroundColor': $rootScope.appData.branding.mainColorDark,'color': $rootScope.appData.branding.headerFontColor};
             $rootScope.menu_options={'backgroundColor': $rootScope.appData.branding.mainColorDark,'color': $rootScope.appData.branding.headerFontColor};
             //company name

              $rootScope.companyScreen = BreadcrumbService.companyName();

              //CLONE if clone=yes
              if(getValues.clone=='yes'){
                  //Call Clone Service to Store GET variables
                  CloneService.storeGet(getValues);
                  //$location.path('/clone');
                  $state.transitionTo('lr.clone');

              }else{
                //$location.path('/');
                  $state.transitionTo('lr.home');
              }
        },
        //Get Backup Data
        function(){
          //Api avaiable
          $rootScope.serverRun=false;
          $rootScope.appData=BaseDataService.getBackupData();
          /*DEFINE BASE VALUES WITH API DATA - Addvanced settings we will be modify*/
           //TfcToken
           $rootScope.tfcToken=$rootScope.appData.max_TFC;
           //inflation
           $rootScope.inflation=parseFloat($rootScope.appData.inflation);
           //pension charge
           $rootScope.pension_charge=parseFloat($rootScope.appData.pension_charge);
            //MENU
            $rootScope.menu_about={'backgroundColor': '#FFFFFF','color': $rootScope.appData.branding.fontColor};
            $rootScope.menu_pension={'backgroundColor': $rootScope.appData.branding.mainColorDark,'color': $rootScope.appData.branding.headerFontColor};
            $rootScope.menu_plans={'backgroundColor': $rootScope.appData.branding.mainColorDark,'color': $rootScope.appData.branding.headerFontColor};
            $rootScope.menu_options={'backgroundColor': $rootScope.appData.branding.mainColorDark,'color': $rootScope.appData.branding.headerFontColor};
            //company name
             $rootScope.companyScreen = BreadcrumbService.companyName();


             /*
             DETECT IE10 end IE11
             */
             //$rootScope.browser = DetectionService.get();



             //APP: CLONE if clone=yes
             if(getValues.clone=='yes'){
                 //Call Clone Service to Store GET variables
                 CloneService.storeGet(getValues);
                 //$location.path('/clone');
                 $state.transitionTo('lr.clone');

             }else{
               //$location.path('/');
                 $state.transitionTo('lr.home');
             }
        });







}]);

/*
NG-APP
*/

angular
  .module('lemonadeReward')
  .controller('AppController', AppController);
  function AppController($rootScope, $scope, $location,$state, $window, $document,BreadcrumbService,BaseDataService, $timeout) {

    //get the year for the Footer
    $scope.dateYear = new Date();




  };
