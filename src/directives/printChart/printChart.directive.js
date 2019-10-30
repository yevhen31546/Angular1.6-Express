angular.module("lemonadeReward").directive("printChart", ['$rootScope','CalculationService','$filter','$timeout', function ($rootScope,CalculationService,$filter,$timeout) {
  return {
    restrict: 'E',
    //template:'<svg id="{{ whichChart }}"  height="{{ chartHeigth }}"  ng-attr-style="height:{{ chartHeigth }}; background-color: white;"></svg>',
    template:'<svg id="{{ whichChart }}"  ng-attr-style="height:800px; width:1600px;" xmlns="http://www.w3.org/2000/svg" version="1.1" width="1600" height="800"  viewBox="0 0 1600 800" preserveAspectRatio="xMinYMin meet"></svg>',
    link: function(scope, element,attrs,rootScope) {



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
      d3.select("#lifeBox0"+scope.whichChart).remove();
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
                    .attr("id","lifeBox0"+scope.whichChart)
                   .attr("height", height-margin.top-margin.bottom) // full height
                   .attr("fill", "rgba(0,0,0, 0.09)"); // transparency color to see grid




       //Label: life Expectency
       var labelTopPadding = 20;
       var labelTopPaddingText =44;
       //Life Exp. Gray Box
        d3.select("#lifeBox"+scope.whichChart).remove();
        svg.append("rect")
                  .attr("x", boxWidth+margin.left) // start rectangle on the good position
                  .attr("y", margin.top + labelTopPadding) // no vertical translate
                  .attr("width", 220) // correct size
                  .attr("height", 80) // full height
                   .attr("id","lifeBox"+scope.whichChart)
                  .attr("fill", "rgba(0,0,0, 0.08)") // transparency color to see grid
                  .classed('label-lifeExp',true);
        //graph line top
        d3.select("#lifeBox2"+scope.whichChart).remove();
        svg.append("rect")
            .attr("x", margin.left) // start rectangle on the good position
            .attr("y", margin.top-2) // no vertical translate
            .attr("width", width) // correct size
            .attr("height", 2) // full height
            .attr("id","lifeBox2"+scope.whichChart)
            .attr("fill", "rgba(0,0,0, 0.08)"); // transparency color to see grid
        //graph line bottom
        d3.select("#graphlinebottom"+scope.whichChart).remove();
        svg.append("rect")
                .attr("x", margin.left) // start rectangle on the good position
                .attr("y", height-margin.bottom) // no vertical translate
                .attr("width", width) // correct size
                .attr("height", 2) // full height
                .attr("id","graphlinebottom"+scope.whichChart)
                .attr("fill", "rgba(0,0,0, 0.08)"); // transparency color to see grid

          //LabelText: life Expectency
          d3.select("#lifeBoxText"+scope.whichChart).remove();
          svg.append("text")
                  .attr("x", boxWidth+margin.left) // start rectangle on the good position
                             .attr("y", margin.top+labelTopPadding+labelTopPaddingText) // no vertical translate
                             .attr("width", 160) // correct size
                             .attr("height", 80) // full height
                             .attr("fill", "rgba(0,0,0,0.6)") // transparency color to see grid
                             .attr("dy", ".2em")
                             .style("font-size", "18px")
                             .style("font-weight", "bold")
                            .attr("id","lifeBoxText"+scope.whichChart)
                            .text('Life Expectancy');
                            //LabelText: life Expectency
          d3.select("#lifeBoxTextValue"+scope.whichChart).remove();
          svg.append("text")
                    .attr("x", boxWidth+margin.left+160) // start rectangle on the good position
                    .attr("y", margin.top+labelTopPadding+labelTopPaddingText+2) // no vertical translate
                    .attr("width", 40) // correct size
                    .attr("height", 40) // full height
                    .attr("fill", "rgba(0,0,0,0.6)") // transparency color to see grid
                    .attr("dy", ".2em")
                    .style("font-weight", "bold")
                    .style("font-size", "2em")
                    .attr("id","lifeBoxTextValue"+scope.whichChart)
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
          d3.select('#'+scope.whichChart).append('line')
              .style('stroke', '#77b800')
              .style('stroke-width', '4px')
              .style('stroke-dasharray', '4')
              .attr("class", "lifeExpectLine")
              .attr("id", "lifeExpectLine"+scope.whichChart)
              .attr('x1', chartSize.margin.left ) //(x1,y1) coordinate
              .attr('y1', dashedHeight)
              .attr('x2', dashedLong)//(X2,y2 coordinate)
              .attr('y2', dashedHeight);






              /******************************************************************************************************************/
              //Incomer target moving box
              d3.select('#'+scope.whichChart).append("rect")
                            .attr("x",chartSize.width-200) // start rectangle on the good position
                            .attr("y", dashedHeight-25) // no vertical translate
                            .attr("width", 150) // correct size
                            .attr("height",50) // full height
                            .attr("id","incometargetbg"+scope.whichChart)
                            .attr("fill", "#77b800"); // transparency color to see grid
              //Income target line text
              d3.select('#'+scope.whichChart).append("text")
                                 .attr("x", chartSize.width-183) // start rectangle on the good position
                                 .attr("y", dashedHeight-6) // no vertical translate
                                 .attr("width", 50) // correct size
                                 .attr("height", 20) // full height
                                 .attr("fill", "#ffffff") // transparency color to see grid
                                 .attr("dy", ".6em")
                                 .style("font-size", "25px")
                                 .attr("id","incometargettext"+scope.whichChart)
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

        //Modify axes size
          //Axis
          d3.select('#'+scope.whichChart).selectAll('.tick text').style("font-size",'14px');
          d3.select('#'+scope.whichChart).selectAll('.tick text').style("font-weight",'normal');
          d3.select('#'+scope.whichChart).selectAll('.tick text').style("color",'#c4c4c4');
          d3.select('#'+scope.whichChart).selectAll('.tick').style("opacity",'1');
          //hide last element in Y-axis
          d3.select('#'+scope.whichChart).selectAll('.nv-axisMaxMin text').style("color",'#ffffff');
          d3.select('#'+scope.whichChart).selectAll('.nv-axisMaxMin text').style("display",'none');
          //css legend
          d3.select('#'+scope.whichChart).selectAll('.nv-legend text').style("font-size",'13px');
          //Hide the GenerateID
          d3.select('#'+scope.whichChart).selectAll('.tick line').style("display",'none');
     });



      nv.addGraph(function() {
        chart = nv.models.multiBarChart()
           .transitionDuration(50)
           .reduceXTicks(false)   //If 'false', every single x-axis tick label will be rendered.
           .rotateLabels(0)      //Angle to rotate x-axis labels.
           .groupSpacing(0.7)    //Distance between each group of bars.
           .showLegend(true) //hide Legend
           .color(['#ef7e0a', '#acacac', '#585858','#202020','#000000']) //color Order IMPORTANT
           //.staggerLabels(true) //Makes the X labels stagger at different distances from the axis so they're less likely to overlap.
           .stacked(true).showControls(false) //show always stacked Allow user to switch between 'Grouped' and 'Stacked' mode.
     ;
     updateBg();
      //tooltip
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

                  var lumpsumBoxWidth=250;
                  svg.append("rect")
                      .attr("x", margin.left) // start rectangle on the good position
                            .attr("y", margin.top + labelTopPadding) // no vertical translate
                            .attr("width", lumpsumBoxWidth) // correct size
                            .attr("height", 70) // full height
                            .attr("fill", "rgba(0,0,0, 0.8)"); // transparency color to see grid
                    /*Lump*/
                    svg.append("text")
                      .attr("x", margin.left+10) // start rectangle on the good position
                      .attr("y", margin.top + labelTopPadding+30) // no vertical translate
                      .attr("width", 40) // correct size
                      .attr("height", 40) // full height
                      .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                      .style("font-size", "25px")
                      .text('Lump');
                      /*SUM*/
                    svg.append("text")
                        .attr("x", margin.left+10) // start rectangle on the good position
                        .attr("y", margin.top + labelTopPadding+50) // no vertical translate
                        .attr("width", 80) // correct size
                        .attr("height", 80) // full height
                        .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                        .style("font-size", "20px")
                        .text('Sum');
                    /*TAX FREE value*/

                    svg.append("text")
                          .attr("x", margin.left+80) // start rectangle on the good position
                          .attr("y", margin.top + labelTopPadding+45) // no vertical translate
                          .attr("width", 80) // correct size
                          .attr("height", 80) // full height
                          .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                          .style("font-size", "30px")
                          .style("font-weight", "bold")
                        //  .text(scope.calc.pensionFundAtRetirement.tcfValueFormatted);
                        .text($filter('currency')(scope.calc.pensionFundAtRetirement.tcfValue,'£',0));
                          //.text('£35,000');
                      //tax free box
                      svg.append("rect")
                              .attr("x", margin.left+lumpsumBoxWidth) // start rectangle on the good position
                                    .attr("y", margin.top + labelTopPadding) // no vertical translate
                                    .attr("width", 90) // correct size
                                    .attr("height",70) // full height
                                    .attr("fill", "rgba(119,184,0, 1)"); // transparency color to see grid

                    /*Tax*/
                    svg.append("text")
                                      .attr("x", margin.left+lumpsumBoxWidth+20) // start rectangle on the good position
                                      .attr("y", margin.top + labelTopPadding+30) // no vertical translate
                                      .attr("width", 90) // correct size
                                      .attr("height", 80) // full height
                                      .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                      .style("font-size", "18px")
                                      .text('TAX');
                    svg.append("text")
                                        .attr("x", margin.left+lumpsumBoxWidth+20) // start rectangle on the good position
                                        .attr("y", margin.top + labelTopPadding+50) // no vertical translate
                                        .attr("width", 80) // correct size
                                        .attr("height", 80) // full height
                                        .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                        .style("font-size", "19px")
                                        .text('FREE');



            /*
          *Taxed. ---------------------------------------------------------
          */
              //show only on cashout page
              if(scope.whichChart == 'cashout'){
                  var tobBoxHeight =70;
                    svg.append("rect")
                                  .attr("x", margin.left) // start rectangle on the good position
                                                  .attr("y", margin.top + labelTopPadding+tobBoxHeight+30) // no vertical translate
                                                  .attr("width", lumpsumBoxWidth) // correct size
                                                  .attr("height", 70) // full height
                                                  .attr("fill", "rgba(0,0,0, 0.8)"); // transparency color to see grid
                                  /*Lump*/
                                  svg.append("text")
                                            .attr("x", margin.left+10) // start rectangle on the good position
                                            .attr("y", margin.top + labelTopPadding+tobBoxHeight+60) // no vertical translate
                                            .attr("width", 80) // correct size
                                            .attr("height", 70) // full height
                                            .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                            .style("font-size", "25px")
                                            .text('Lump');
                                            /*SUM*/
                                          svg.append("text")
                                              .attr("x", margin.left+10) // start rectangle on the good position
                                              .attr("y", margin.top + labelTopPadding+tobBoxHeight+80) // no vertical translate
                                              .attr("width", 80) // correct size
                                              .attr("height", 70) // full height
                                              .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                              .style("font-size", "20px")
                                              .text('Sum');
                                          /*TAX FREE value*/
                                          svg.append("text")
                                                .attr("x", margin.left+80) // start rectangle on the good position
                                                .attr("y", margin.top + labelTopPadding+tobBoxHeight+70) // no vertical translate
                                                .attr("width", 80) // correct size
                                                .attr("height", 80) // full height
                                                .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                                .style("font-size", "25px")
                                                .style("font-weight", "bold")
                                                .text( $filter('currency')(scope.calc.pensionFundAtRetirement.remainingFutureFound,'£',0));
                                            //tax free box
                                            svg.append("rect")
                                                    .attr("x", margin.left+lumpsumBoxWidth) // start rectangle on the good position
                                                          .attr("y", margin.top + labelTopPadding+tobBoxHeight+30) // no vertical translate
                                                          .attr("width", 90) // correct size
                                                          .attr("height",70) // full height
                                                          .attr("fill", "rgba(182,31,71, 1)"); // transparency color to see grid

                                          /*Tax*/
                                          svg.append("text")
                                                            .attr("x", margin.left+lumpsumBoxWidth+8) // start rectangle on the good position
                                                            .attr("y", margin.top + labelTopPadding+tobBoxHeight+75) // no vertical translate
                                                            .attr("width", 80) // correct size
                                                            .attr("height", 70) // full height
                                                            .attr("fill", "rgba(255,255,255,1)") // transparency color to see grid
                                                            .style("font-size", "20px")
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
