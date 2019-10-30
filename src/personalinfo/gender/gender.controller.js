angular
  .module('lemonadeReward')
  .controller('GenderController', GenderController);

/**
 * @param $rootScope
 * @ngInject
 */
function GenderController($rootScope) {

    //Setup base value or if come back later select the proper picture
    if($rootScope.about_gender == 'male'){
      $rootScope.url_gender_male='images/male-hover.png';
      $rootScope.url_gender_female='images/female.png';
    }else if ($rootScope.about_gender == 'female') {
      $rootScope.url_gender_male='images/male.png';
      $rootScope.url_gender_female='images/female-hover.png';
    }else{
      $rootScope.url_gender_male='images/male.png';
      $rootScope.url_gender_female='images/female.png';
    }




        $rootScope.gender_f = function(gender) {
              $rootScope.gender=gender;
              if(gender == 'male'){
                  $rootScope.url_gender_male='images/male-hover.png';
                  $rootScope.url_gender_female='images/female.png';
                  $rootScope.about_gender='male';
              }
              else{
                $rootScope.url_gender_male='images/male.png';
                $rootScope.url_gender_female='images/female-hover.png';
                $rootScope.about_gender='female';
              }
      }
}
