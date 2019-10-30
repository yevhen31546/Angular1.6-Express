angular
  .module('lemonadeReward')
  .service('DetectionService', DetectionService);

  /*
  NOT USED
  DETECT IE10 end IE11: For Different Printing endpoint
  - Charts generation SvgASPng not working
  */

function DetectionService() {
  var vm = this;
  vm.get = get;


      function get() {
        var version = detectIE();
        if (version === false) {
          //Other browser
          vm.browser = 'other';
        } else if (version >= 12) {
          vm.browser = 'edge';
        } else {
          vm.browser = 'ie1011';
        }

        /**
         * detect IE
         * returns version of IE or false, if browser is not Internet Explorer
         */
        function detectIE() {
          var ua = window.navigator.userAgent;
          var msie = ua.indexOf('MSIE ');
          if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
          }

          var trident = ua.indexOf('Trident/');
          if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
          }
          var edge = ua.indexOf('Edge/');
          if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
          }
          // other browser
          return false;
        }

        return vm.browser;

      }//end browser



}//Contact service
