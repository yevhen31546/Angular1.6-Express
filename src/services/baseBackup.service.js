angular
  .module('lemonadeReward')
  .service('BaseBackupService', BaseBackupService);

/**
 * @description
 * Get the url (state change value)
 * Use for Lead Interest
 */
function BaseBackupService() {
        this.getBackupData = function(){


  var inflation=2.5;
  var pension_charge=0.75;
  var investment_return_arr={
      'low': 1.65,
      'mid': 4.65,
      'high': 6.05,
  };
  var netpa={
      'low': investment_return_arr['low']-pension_charge-inflation,
      'mid': investment_return_arr['mid']-pension_charge-inflation,
      'high': investment_return_arr['high']-pension_charge-inflation,
  };
  var annuity_bought_with_fv=100000;

  var date = new Date();
  var today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);


  var life_expectancy={
  '55': {'men':85, 'women':88,'level':4043,'inflation':2319},
  '56': {'men':85, 'women':88,'level':4122,'inflation':2394},
  '57': {'men':85, 'women':88,'level':4205,'inflation':2472},
  '58': {'men':85, 'women':88,'level':4295,'inflation':2554},
  '59': {'men':85, 'women':88,'level':4428,'inflation':2640},
  '60': {'men':85, 'women':88,'level':4547,'inflation':2730},
  '61': {'men':85, 'women':88,'level':4664,'inflation':2852},
  '62': {'men':85, 'women':89,'level':4789,'inflation':2966},
  '63': {'men':86, 'women':89,'level':4928,'inflation':3119},
  '64': {'men':86, 'women':88,'level':5076,'inflation':3280},
  '65': {'men':86, 'women':88,'level':5211,'inflation':3451},
  '66': {'men':86, 'women':88,'level':5354,'inflation':3606},
  '67': {'men':86, 'women':88,'level':5506,'inflation':3752},
  '68': {'men':86, 'women':88,'level':5668,'inflation':3855},
  '69': {'men':86, 'women':88,'level':5840,'inflation':4078},
  '70': {'men':86, 'women':88,'level':6023,'inflation':4290},
  '71': {'men':87, 'women':88,'level':6220,'inflation':4503},
  '72': {'men':87, 'women':89,'level':6431,'inflation':4723},
  '73': {'men':87, 'women':89,'level':6657,'inflation':4943},
  '74': {'men':87, 'women':89,'level':6900,'inflation':5164},
  '75': {'men':88, 'women':89,'level':7161,'inflation':5409},
  '76': {'men':88, 'women':89,'level':7449,'inflation':5731},
  '77': {'men':88, 'women':90,'level':7813,'inflation':5731},
  '78': {'men':88, 'women':90,'level':8207,'inflation':6461},
  '79': {'men':89, 'women':90,'level':8635,'inflation':6873},
  '80': {'men':89, 'women':90,'level':9099,'inflation':7321},
  '81': {'men':89, 'women':91,'level':9603,'inflation':7808},
  '82': {'men':90, 'women':91,'level':10152,'inflation':8340},
  '83': {'men':90, 'women':91,'level':10756,'inflation':8925},
  '84': {'men':91, 'women':92,'level':11417,'inflation':9568},
  '85': {'men':91, 'women':92,'level':12280,'inflation':10269},
  '86': {'men':92, 'women':93,'level':13383,'inflation':11150},
  '87': {'men':92, 'women':93,'level':14662,'inflation':12347},
  '88': {'men':93, 'women':94,'level':16109,'inflation':13701},
  '89': {'men':94, 'women':94,'level':17693,'inflation':15186},
  '90': {'men':94, 'women':95,'level':19301,'inflation':16695},
  '91': {'men':95, 'women':95,'level':21222,'inflation':18470},
  '92': {'men':96, 'women':96,'level':23018,'inflation':20169},
  '93': {'men':96, 'women':97,'level':24944,'inflation':21999},
  '94': {'men':97, 'women':97,'level':27022,'inflation':23982},
  '95': {'men':98, 'women':98,'level':29288,'inflation':26147},
  '96': {'men':99, 'women':99,'level':31936,'inflation':28684},
  '97': {'men':99, 'women':100,'level':35224,'inflation':31834},
  '98': {'men':100, 'women':100,'level':39759,'inflation':36158},
  '99': {'men':101, 'women':101,'level':47099,'inflation':43087},
  '100': {'men':102, 'women':102,'level':62283,'inflation':57152}
  }



  //Create Resonse
  var response = {
          'today':today,
          'life_expectancy':life_expectancy,
          'annuity_bought_with_fv':annuity_bought_with_fv,
          'min_age_pension':55,
          'max_age_pension':100,
          'state_pension_week':168.60,
          'max_TFC':25,
          'inflation':inflation,
          'pension_charge':pension_charge,
          'investment_return_arr':investment_return_arr,
          'netpa':netpa,
          'pensionage':{
                  '1954-10-05':65,
                  '1961-03-05':66,
                  '1961-03-06':67
          },
          'taxLumpSum': {
            '1':{'grossBand':12500,'rate':0},
            '2':{'grossBand':37500, 'rate': 20},
            '3':{'grossBand':50000, 'rate':40},
            '4':{'grossBand':25000, 'rate': 60},
            '5':{'grossBand':25000, 'rate': 40},
            'last':{'grossBand':150000, 'rate': 45}
        },
        'mail_templates':{
          "printoption": "test-rop-1",
          "contact us": "lemonade-contact-us"
        },
        'contact_email':'_',
        'contact_phone':'_',
        'branding':{
            'mainColor': '#5dc3bb',
            'mainColorDark': '#3c474c',
            'mainColorLight': '#ed1559',
            'inverseColor': '#8f9493',
            'bgColor':'#efedea',
            'companyName':'_Lemonade',
            'headerFontColor':'#ffffff',
            'fontColor':'#e9004c',
            'logo':'http://storage.lemonadellp.com/upload/images/54009543.png',
            'headerlogo':'http://storage.lemonadellp.com/upload/images/50178089.png'
        }

     };//end response








            return response;
        }//getBackupData



}//appDataSerivce
