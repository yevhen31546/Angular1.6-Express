angular.module("lemonadeReward").directive("barChart", ['$rootScope','CalculationService','$filter','$timeout', function ($rootScope,CalculationService,$filter,$timeout) {
  return {
    restrict: 'E',
    //template:'<svg id="{{ whichChart }}"  height="{{ chartHeigth }}"  ng-attr-style="height:{{ chartHeigth }}; background-color: white;"></svg>',
    template:'<svg id="{{ whichChart }}"  height="470px"  ng-attr-style="height:470px; background-color: white;"></svg>',
    link: function(scope, element,attrs,rootScope) {

      $timeout(function () {

        //push the gray box (life exp.) to the background). Prepend to the parent element as a first one (SVG z-index: order in the DOM)
        $("svg").on('mouseover',function(){
            $('#lifeBox0').prependTo($('svg'));
        });

          /*Extra income target +/- for fine tune*/
          //click to plus income target
          element.on('click', '.incometargetplusclass', function () {
            //Update incomeTarget only if less than the max limit


            if($rootScope.incomeTarget<scope.chartHelperMax){

              $rootScope.incomeTarget=parseInt($rootScope.incomeTarget)+100;

              //update the calcualtion
              scope.calc=CalculationService.mainCollector();
              //fit the data to the controller
              switch(scope.whichChart) {
              case "annuity":
                  var chartData=scope.calc.annuity.chart;
                  break;
              case "cashout":
                  var chartData=scope.calc.cashOut.chart;
                  break;
              case "flexible":
                  var chartData=scope.calc.flexibleChart.chart;
                  break;
              default:
                  var chartData=null;
              }//switch
              //update chart white a new data - passed as a parameter
              update(chartData);
              updateLine();
              //make move slider
              scope.$emit('sliderUpdate');



            }//if smaller than limit

          })
          //click to minus income target
          element.on('click', '.incometargetminusclass', function () {

            //Update incomeTarget only if less than the max limit
            if(scope.chartHelperMin<$rootScope.incomeTarget){
                $rootScope.incomeTarget=parseInt($rootScope.incomeTarget)-100;
                //update the values
                scope.calc=CalculationService.mainCollector();
                //fit the data to the controller
                switch(scope.whichChart) {
                case "annuity":
                    var chartData=scope.calc.annuity.chart;
                    break;
                case "cashout":
                    var chartData=scope.calc.cashOut.chart;
                    break;
                case "flexible":
                    var chartData=scope.calc.flexibleChart.chart;
                    break;
                default:
                    var chartData=null;
                }//switch
                //update chart white a new data - passed as a parameter
                update(chartData);
                updateLine();
                //make move slider
                scope.$emit('sliderUpdate');
            }//if smaller than limit
          })

      });





      //Based on the controller show the right data
      switch(scope.whichChart) {
      case "annuity":
          var chartData=scope.calc.annuity.chart;
          break;
      case "cashout":
          var chartData=scope.calc.cashOut.chart;
          break;
      case "flexible":
          var chartData=scope.calc.flexibleChart.chart;
          break;
      default:
          var chartData=null;
      }//switch


      var svg = element.find('#'+scope.whichChart);
      //var svg = element.find('svg');
      var chart;

    /* Results of the  Calcualtion*/
    scope.calc=CalculationService.mainCollector();
    //Freezed Limit values for the income target (otherwise recalcualte for every move)
    scope.chartHelperMax=scope.calc.chartHelper.limitMaxYaxis;
    scope.chartHelperMin=scope.calc.chartHelper.limitMinYaxis;




    /*
    *LIFE EXP. ---------------------------------------------------------
    */
    var updateBg = function(){
      //remove
      d3.select("#lifeBox0").remove();
      //define information
      var svg=d3.select('#'+scope.whichChart);
      var margin = chart.margin();
      var height = svg.style('height').split('px')[0];
      var width = svg.style('width').split('px')[0];

      //Get the Life Expectency GRAY BOX
      var boxWidth = ((scope.calc.annuityLongevity.lifeExpectancy-$rootScope.about_ret)/($rootScope.timeline.upto-$rootScope.about_ret))*(width-margin.left-margin.right);

          svg.append("rect")
                   .attr("x", margin.left) // start rectangle on the good position
                   .attr("y", margin.top) // no vertical translate
                   .attr("width", boxWidth) // correct size
                    .attr("id","lifeBox0")
                   .attr("height", height-margin.top-margin.bottom) // full height
                   .attr("fill", "rgba(0,0,0, 0.04)"); // transparency color to see grid




       //Label: life Expectency
       var labelTopPadding = 20;
       var labelTopPaddingText =22;
       //Life Exp. Gray Box
        d3.select("#lifeBox").remove();
        svg.append("rect")
                  .attr("x", boxWidth+margin.left) // start rectangle on the good position
                  .attr("y", margin.top + labelTopPadding) // no vertical translate
                  .attr("width", 140) // correct size
                  .attr("height", 40) // full height
                   .attr("id","lifeBox")
                  .attr("fill", "rgba(0,0,0, 0.04)") // transparency color to see grid
                  .classed('label-lifeExp',true);
        //graph line top
        d3.select("#lifeBox2").remove();
        svg.append("rect")
            .attr("x", margin.left) // start rectangle on the good position
            .attr("y", margin.top-2) // no vertical translate
            .attr("width", width) // correct size
            .attr("height", 2) // full height
            .attr("id","lifeBox2")
            .attr("fill", "rgba(0,0,0, 0.08)"); // transparency color to see grid
        //graph line bottom
        d3.select("#graphlinebottom").remove();
        svg.append("rect")
                .attr("x", margin.left) // start rectangle on the good position
                .attr("y", height-margin.bottom) // no vertical translate
                .attr("width", width) // correct size
                .attr("height", 2) // full height
                .attr("id","graphlinebottom")
                .attr("fill", "rgba(0,0,0, 0.08)"); // transparency color to see grid

          //LabelText: life Expectency
          d3.select("#lifeBoxText").remove();
          svg.append("text")
                  .attr("x", boxWidth+margin.left) // start rectangle on the good position
                             .attr("y", margin.top+labelTopPadding+labelTopPaddingText) // no vertical translate
                             .attr("width", 80) // correct size
                             .attr("height", 40) // full height
                             .attr("fill", "rgba(0,0,0,0.3)") // transparency color to see grid
                             .attr("dy", ".2em")
                            .attr("id","lifeBoxText")
                            .text('Life Expectancy');
                            //LabelText: life Expectency
          d3.select("#lifeBoxTextValue").remove();
          svg.append("text")
                    .attr("x", boxWidth+margin.left+106) // start rectangle on the good position
                    .attr("y", margin.top+labelTopPadding+labelTopPaddingText) // no vertical translate
                    .attr("width", 40) // correct size
                    .attr("height", 40) // full height
                    .attr("fill", "rgba(0,0,0,0.6)") // transparency color to see grid
                    .attr("dy", ".2em")
                    .style("font-weight", "bold")
                    .style("font-size", "16px")
                    .attr("id","lifeBoxTextValue")
                    .text(scope.calc.annuityLongevity.lifeExpectancy);


    }//Update BG



    /*
    *Uodat chart. ---------------------------------------------------------
    */
    var update = function(chartData) {
        //update Bars
        d3.select('#'+scope.whichChart) //'svg'
          .datum(chartData)
          .transition(d3.easeLinear)
          .call(chart);
      };



      /*
      *Updat Line. ---------------------------------------------------------
      */
    var updateLine = function(){


        //dashed line width
        var dashedLong = chartSize.width;
        var innerHeight= chartSize.height-chartSize.margin.top-chartSize.margin.bottom;
        var dashedHeight = (chartSize.height-chartSize.margin.bottom)-(innerHeight/chartSize.maxYvalue)*scope.incomeTarget;



         //append line
          d3.selectAll('#'+scope.whichChart +' line').remove();
          d3.select('#'+scope.whichChart).append('line')
              .style('stroke', '#77b800')
              .style('stroke-width', '1px')
              .style('stroke-dasharray', '6')
              .attr("class", "lifeExpectLine")
              .attr('x1', chartSize.margin.left ) //(x1,y1) coordinate
              .attr('y1', dashedHeight)
              .attr('x2', dashedLong)//(X2,y2 coordinate)
              .attr('y2', dashedHeight);



              /******************************************************************************************************************/
              //Incomer target + sign to add £100
                d3.select("#incometargetplus").remove()
              d3.select('#'+scope.whichChart).append("rect")
                            .attr("x",chartSize.width-40) // start rectangle on the good position
                            .attr("y", dashedHeight-10) // no vertical translate
                            .attr("width", 20) // correct size
                            .attr("height",20) // full height
                             .attr("id","incometargetplus")
                            .attr("class","incometargetplusclass")
                            .attr("fill", "#daf4a8"); // transparency color to see grid
              //Income target line text
              d3.select("#incometargetplustext").remove()
              d3.select('#'+scope.whichChart).append("text")
                                 .attr("x", chartSize.width-33) // start rectangle on the good position
                                 .attr("y", dashedHeight-6) // no vertical translate
                                 .attr("width", 20) // correct size
                                 .attr("height", 20) // full height
                                 .attr("fill", "#77b800") // transparency color to see grid
                                 .attr("dy", ".9em")
                                 .attr("id","incometargetplustext")
                                 .attr("class","incometargetplusclass")
                                 .text('+');

               /******************************************************************************************************************/
          //Incomer target - sign to reduce £100
                            d3.select("#incometargetminus").remove()
                                 d3.select('#'+scope.whichChart).append("rect")
                                               .attr("x",chartSize.width-130) // start rectangle on the good position
                                               .attr("y", dashedHeight-10) // no vertical translate
                                               .attr("width", 20) // correct size
                                               .attr("height",20) // full height
                                                .attr("id","incometargetminus")
                                               .attr("class","incometargetminusclass")
                                               .attr("fill", "#daf4a8"); // transparency color to see grid
                                 //Income target line text#daf4a8
                                 d3.select("#incometargetminustext").remove()
                                 d3.select('#'+scope.whichChart).append("text")
                                                    .attr("x", chartSize.width-122) // start rectangle on the good position
                                                    .attr("y", dashedHeight-7) // no vertical translate
                                                    .attr("width", 20) // correct size
                                                    .attr("height", 20) // full height
                                                    .attr("fill", "#77b800") // transparency color to see grid
                                                    .attr("dy", ".9em")
                                                    .attr("id","incometargetminustext")
                                                    .attr("class","incometargetminusclass")
                                                    .text('-');

              /******************************************************************************************************************/
              //Incomer target moving box
                d3.select("#incometargetbg").remove()
              d3.select('#'+scope.whichChart).append("rect")
                            .attr("x",chartSize.width-110) // start rectangle on the good position
                            .attr("y", dashedHeight-10) // no vertical translate
                            .attr("width", 70) // correct size
                            .attr("height",20) // full height
                            .attr("id","incometargetbg")
                             .style("stroke", '#daf4a8')
                             .style("stroke-width", '1')
                            .attr("fill", "#ffffff"); // transparency color to see grid
              //Income target line text
              d3.select("#incometargettext").remove()
              d3.select('#'+scope.whichChart).append("text")
                                 .attr("x", chartSize.width-100) // start rectangle on the good position
                                 .attr("y", dashedHeight-3) // no vertical translate
                                 .attr("width", 50) // correct size
                                 .attr("height", 20) // full height
                                 .attr("fill", "#77b800") // transparency color to see grid
                                 .attr("dy", ".6em")
                                 .attr("id","incometargettext")
                                 .text($filter('currency')(scope.calc.flexible.eachYearBeforeTax,'£',0));


    };




    scope.$on('chartloaded', function () {
        //update the values
        scope.calc=CalculationService.mainCollector();
        //fit the data to the controller
        switch(scope.whichChart) {
        case "annuity":
            var chartData=scope.calc.annuity.chart;
            break;
        case "cashout":
            var chartData=scope.calc.cashOut.chart;
            break;
        case "flexible":
            var chartData=scope.calc.flexibleChart.chart;
            break;
        default:
            var chartData=null;
        }//switch
        //update chart white a new data - passed as a parameter
        updateBg();
        update(chartData);
        updateLine();

     });




      nv.addGraph(function() {
        chart = nv.models.multiBarChart()
           .transitionDuration(50)
           .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
           .rotateLabels(0)      //Angle to rotate x-axis labels.
           .groupSpacing(0.7)    //Distance between each group of bars.
           .showLegend(true) //hide Legend
           .color(['#ef7e0a', '#acacac', '#585858','#202020','#000000']) //color Order IMPORTANT
           //.staggerLabels(true) //Makes the X labels stagger at different distances from the axis so they're less likely to overlap.
           .stacked(true).showControls(false) //show always stacked Allow user to switch between 'Grouped' and 'Stacked' mode.
     ;
     updateBg();
      //tooltip
      //chart.tooltip(false);
      chart.tooltipContent(function(bar,x,y){
         return '<span style="padding:3px;">'+bar + ': <b>'+ y +'</b></span>';
      });
     //color
       chart.color(function(d){
        return d.data.color
     });

     //define information
     var svg=d3.select('#'+scope.whichChart);
     var margin = chart.margin();
     var height = svg.style('height').split('px')[0];
     var width = svg.style('width').split('px')[0];


     //force fix Y : with this the scale fo all chart could be the same
     //round up to 100
      var maxValueY=scope.calc.chartHelper.maxYaxis;
      chart.forceY([0,maxValueY]);


    //store file size for later use
    setChartSize(width,height,margin,maxValueY);

     //hide decimals from Y axis values
     var poundFormat = function(d) { return '£' + d3.format(',f')(d) };
     chart.yAxis.tickFormat(poundFormat);
    //No data text
     chart.noData("");



        //Get the Life Expectency GRAY BOX
        var boxWidth = ((scope.calc.annuityLongevity.lifeExpectancy-$rootScope.about_ret)/($rootScope.timeline.upto-$rootScope.about_ret))*(width-margin.left-margin.right);

        var labelTopPadding = 20;
        var labelTopPaddingText =22;



//only show this part if TCF tokne >0
  if(0<$rootScope.tfcToken){
                  /*
                  *Tax free. ---------------------------------------------------------
                  */

                  //darker Y axis line
                  svg.append('rect')
                      .attr("x", margin.left) // start rectangle on the good position
                        .attr("y", margin.top+labelTopPadding) // no vertical translate
                        .attr("width", 2) // correct size
                        .attr("height", height-margin.bottom-margin.top-labelTopPadding) // full height
                        .attr("fill", "rgba(0,0,0,0.8)"); // transparency color to see grid

                  var lumpsumBoxWidth=140;
                  svg.append("rect")
                      .attr("x", margin.left) // start rectangle on the good position
                            .attr("y", margin.top + labelTopPadding) // no vertical translate
                            .attr("width", lumpsumBoxWidth) // correct size
                            .attr("height", 40) // full height
                            .attr("fill", "rgba(0,0,0, 0.8)"); // transparency color to see grid
                    /*Lump*/
                    svg.append("text")
                      .attr("x", margin.left+10) // start rectangle on the good position
                      .attr("y", margin.top + labelTopPadding+18) // no vertical translate
                      .attr("width", 40) // correct size
                      .attr("height", 40) // full height
                      .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                      .style("font-size", "10px")
                      .text('Lump');
                      /*SUM*/
                    svg.append("text")
                        .attr("x", margin.left+10) // start rectangle on the good position
                        .attr("y", margin.top + labelTopPadding+30) // no vertical translate
                        .attr("width", 40) // correct size
                        .attr("height", 40) // full height
                        .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                        .style("font-size", "10px")
                        .text('Sum');
                    /*TAX FREE value*/

                    svg.append("text")
                          .attr("x", margin.left+50) // start rectangle on the good position
                          .attr("y", margin.top + labelTopPadding+26) // no vertical translate
                          .attr("width", 40) // correct size
                          .attr("height", 40) // full height
                          .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                          .style("font-size", "14px")
                          .style("font-weight", "bold")
                        //  .text(scope.calc.pensionFundAtRetirement.tcfValueFormatted);
                        .text($filter('currency')(scope.calc.pensionFundAtRetirement.tcfValue,'£',0));
                          //.text('£35,000');
                      //tax free box
                      svg.append("rect")
                              .attr("x", margin.left+lumpsumBoxWidth) // start rectangle on the good position
                                    .attr("y", margin.top + labelTopPadding) // no vertical translate
                                    .attr("width", 50) // correct size
                                    .attr("height",40) // full height
                                    .attr("fill", "rgba(119,184,0, 1)"); // transparency color to see grid

                    /*Tax*/
                    svg.append("text")
                                      .attr("x", margin.left+lumpsumBoxWidth+10) // start rectangle on the good position
                                      .attr("y", margin.top + labelTopPadding+18) // no vertical translate
                                      .attr("width", 40) // correct size
                                      .attr("height", 40) // full height
                                      .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                      .style("font-size", "9px")
                                      .text('TAX');
                    svg.append("text")
                                        .attr("x", margin.left+lumpsumBoxWidth+10) // start rectangle on the good position
                                        .attr("y", margin.top + labelTopPadding+30) // no vertical translate
                                        .attr("width", 40) // correct size
                                        .attr("height", 40) // full height
                                        .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                        .style("font-size", "9px")
                                        .text('FREE');



            /*
          *Taxed. ---------------------------------------------------------
          */
              //show only on cashout page
              if(scope.whichChart == 'cashout'){
                  var tobBoxHeight =50;
                    svg.append("rect")
                                  .attr("x", margin.left) // start rectangle on the good position
                                                  .attr("y", margin.top + labelTopPadding+tobBoxHeight) // no vertical translate
                                                  .attr("width", lumpsumBoxWidth) // correct size
                                                  .attr("height", 40) // full height
                                                  .attr("fill", "rgba(0,0,0, 0.8)"); // transparency color to see grid
                                  /*Lump*/
                                  svg.append("text")
                                            .attr("x", margin.left+10) // start rectangle on the good position
                                            .attr("y", margin.top + labelTopPadding+tobBoxHeight+18) // no vertical translate
                                            .attr("width", 40) // correct size
                                            .attr("height", 40) // full height
                                            .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                            .style("font-size", "10px")
                                            .text('Lump');
                                            /*SUM*/
                                          svg.append("text")
                                              .attr("x", margin.left+10) // start rectangle on the good position
                                              .attr("y", margin.top + labelTopPadding+tobBoxHeight+30) // no vertical translate
                                              .attr("width", 40) // correct size
                                              .attr("height", 40) // full height
                                              .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                              .style("font-size", "10px")
                                              .text('Sum');
                                          /*TAX FREE value*/
                                          svg.append("text")
                                                .attr("x", margin.left+50) // start rectangle on the good position
                                                .attr("y", margin.top + labelTopPadding+tobBoxHeight+26) // no vertical translate
                                                .attr("width", 40) // correct size
                                                .attr("height", 40) // full height
                                                .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                                .style("font-size", "14px")
                                                .style("font-weight", "bold")
                                                .text( $filter('currency')(scope.calc.pensionFundAtRetirement.remainingFutureFound,'£',0));
                                            //tax free box
                                            svg.append("rect")
                                                    .attr("x", margin.left+lumpsumBoxWidth) // start rectangle on the good position
                                                          .attr("y", margin.top + labelTopPadding+tobBoxHeight) // no vertical translate
                                                          .attr("width", 50) // correct size
                                                          .attr("height",40) // full height
                                                          .attr("fill", "rgba(182,31,71, 1)"); // transparency color to see grid

                                          /*Tax*/
                                          svg.append("text")
                                                            .attr("x", margin.left+lumpsumBoxWidth+8) // start rectangle on the good position
                                                            .attr("y", margin.top + labelTopPadding+tobBoxHeight+23) // no vertical translate
                                                            .attr("width", 40) // correct size
                                                            .attr("height", 40) // full height
                                                            .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                                            .style("font-size", "9px")
                                                            .text('TAXED');


                        }//Taxed show only on chash out page

                  }//if TFC TOKEN > 0 otherwise do not show the box


        nv.utils.windowResize(function() {
          chart.update()
        });

        scope.$emit('chartloaded');

        return chart;
      });


    /*
    * HELPER FUNCTION
    * array()=[width,height,marign obj]
    */
     //chart size
    var chartSize = {};
    //set chartSize
    var setChartSize  = function storeChartSize(width,height,marign,maxYvalue){
        chartSize = {
            'width':width,
            'height':height,
            'margin':marign,
            'maxYvalue':maxYvalue,
        };
    }





    }
  }
}]);
