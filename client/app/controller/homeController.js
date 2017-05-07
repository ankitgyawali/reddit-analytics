/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('reddit-analytics')
    .controller('homeController', homeController);

  homeController.$inject = ['$timeout','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment'
  ,'$route','localstoragefactory','CHARTCONFIG','chartfactory','timefactory',];



  function homeController($timeout,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,
  $route,localstoragefactory,CHARTCONFIG,chartfactory,timefactory) {


   $scope.breadcrumbs='';
        $scope.data = {};
        $scope.elementObjects = {};
//  $scope.options = CHARTCONFIG.SUNBURST_CHART;
$scope.options =
{
        chart: {
        type: 'sunburstChart',
        mode: 'count',
        // mode: 'count',
        height: 800,

     sunburst: {
                    dispatch: {
                        chartClick: function(e) {       
                          console.log(($scope.data.reverse(), ''))
                        //   console.log(e);
                        //   console.log($scope.data.children[0].breadcrumbs);
                            updateBreadcrumbs($scope.data.reverse(), '')
                        },
                        elementMouseover: function (e) {
                            function getElementNames(obj) {
                                var result = [obj];
                                if (obj.parent) {
                                    result = result.concat(getElementNames(obj.parent));
                                }
                                return result;
                            }
                            var sequenceArray = getElementNames(e.data);
                            // $scope.data = sequenceArray;
                        }
                    }
                },
        // showLabels: true,
        // labelFormat: function (d){ return d.name;},
        labelThreshold: 0.1,
        tooltip: {
            duration: 0,
            gravity: "w",
            distance: 25, 
            snapDistance: 0,
            classes: null,
            chartContainer: null,
            enabled: true,
            valueFormatter: function (d) {   return  '';  },
            headerFormatter: function (d) {   return '';  },
            //headerFormatter: function (d) {   return '<span style="font-size:80%"><b>'+ "reddit-analytics" +"</b></span>";  },
            hideDelay: 200,
            headerEnabled: true,
            fixedTop: null,
            hidden: true,
            data: null,
            id: "reddit-analytics-sunburst"
            },
            groupColorByParent: true,
            scale: d3.scale.category20c(),
            color: function(color){ return color; },
            // color: d3.scale.category20c(),
            duration: 250,
            sort : (function (d1, d2){
              console.log("CCCCCCCCCCCCCCCC");
              return d1.label_id > d2.label_id; }),
            caption:{enable:true,text:"Reddit",css:{width:"600px"}},
          styles: {
            classes: {
              "with-3d-shadow": true,
              "with-transitions": true,
              gallery: false
            },
            css: {}
          }    
        },

    } 

 
          // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
        var b = { w: 125, h: 30, s: 3, t: 10 };
initializeBreadcrumbTrail()
function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", 750)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}


// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return 'blue'; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) {console.log(d.name);   return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}


    $scope.$route = $route;
    $scope.currentNavItem = 'home';
    $scope.now = timefactory.initNow();
//Time
// Load Time
  $scope.loadTime = function() {

    // Use timeout to simulate a 650ms request.
    // return $timeout(function() {
    // }, 0);
  };



$scope.currentBlob = new Date();

    var self = this;
   

    $scope.togglelabel = function(){
        // $scope.options.chart.showLabels = !$scope.options.chart.showLabels;
        // $scope.api.refresh();
    }
    $scope.createEmptyData = function(x){
        //x  = passed value
    let emptyData = [{
    name: "<b>Reddit</b><br><span style='font-size:80%'> Current Time:<br>" + dataProcessor.momentFormatter(new Date())+ "</span>"
    + dataProcessor.attachHidden("Reddit"),
    // Viewing blob of date newDate()
    height: 200,
    // size: 4,
    color: "grey",
    children: []}];
    CONSTANTS.reddit.forEach(function(element,index) {
        emptyData[0].children.push({ name: "/r/"+element + dataProcessor.attachHidden("Reddit"), color:CONSTANTS.color[index],children:[]})
    }, this);
    return emptyData;
    } 
  


    // CONSTANTS.reddit.forEach(function(element,index) {
    //     $scope.data[0].children.push({ name: "/r/"+element, color:CONSTANTS.color[index],children:[]})
    // }, this);
    localstoragefactory.set("sunburstEmpty",  $scope.createEmptyData("1") );
    $scope.data =    localstoragefactory.get("sunburstEmpty");
//);


if (true || (localstoragefactory.keys().indexOf("processedData") != 0) || (localstoragefactory.get('processedData').length < 10)) // ADD OR FOR NOT UP TO DATE TIME CALCS
{ //Call Datechecker function here
                $http({
                method: 'POST',
                url: CONSTANTS.API_URL+'/initialize',
                // set the headers so angular passing info as form data (not request payload)
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(data, status, headers, config) {

                    // Initialize first by trying to store data - this week raw data
                    localstoragefactory.initialize(data); //thisWeekData
                    // Process data and save it
                    localstoragefactory.set('processedData',dataProcessor.processThisWeek(data))
                    $scope.processed_data = localstoragefactory.get('processedData');                    

                    // Get timeOptions set
                    $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  

                    // Get timeoptions set at localstorage during dataprocess.processthisweek    
                     // Slice data and save raw data for current date for sunburst
                    localstoragefactory.set('sunburstData',timefactory.timeSlicer(localstoragefactory.get("sunburstEmpty"),$scope.processed_data,$scope.timeOptions[0]));  
                
                    // Set snuburst chart data
                    $scope.data = chartfactory.sunburst(localstoragefactory.get('sunburstData'), $scope.createEmptyData("1")); // Create chart data
                    // $scope.data = chartfactory.sunburst($scope.processed_data,localstoragefactory.get('sunburstData')); // Create chart data
                    
                    
                // console.log($scope.data);
                    // console.log(('sunburstData'));
                // data = timefactory.slicebyTime(localstoragefactory.get('thisWeekData'),$scope.timeOptions);
               
        $scope.selectedItemChanged($scope.timeOptions[0]);
   //$scope.api.refresh();
    })
    .error(function(data, status, headers, config) {
        console.log(status);    
    });
    }
    else{
        //   localStorageService.set("timestamps_arrays",timestamps)
//   localStorageService.set("unique_timestamps",ts)
//   localStorageService.set("unique_criteria","EACHDAY") 

        $scope.processed_data = localstoragefactory.get('processedData'); // Processed query data
        $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");

        // process stored sunburst data which takes in processed_data
        
        // ->> assumes get sunburst data has unsliced full data
        // $scope.data = timefactory.timeSlicer(localstoragefactory.get('sunburstData'),$scope.timeOptions[0]);
        $scope.data = chartfactory.sunburst(localstoragefactory.get('sunburstData'), $scope.createEmptyData("1")); // Create chart data
        
     // Populates timeOption
        $scope.selectedItemChanged($scope.timeOptions[0]);

    }

    $scope.selectedItemChanged = function(val){
        // console.log(val);
        localstoragefactory.set('sunburstData',timefactory.timeSlicer($scope.data,$scope.processed_data,val));  
        $scope.data = chartfactory.sunburst(localstoragefactory.get('sunburstData'),localstoragefactory.get('sunburstEmpty'));
        
        

    // return $timeout(function() {
    //     $scope.data = chartfactory.sunburst(localstoragefactory.get('sunburstData'),localstoragefactory.get('sunburstEmpty'));
        
    // }, 10000);


        $scope.api.refresh();
        console.log($scope.data);
        console.log("00000000000000000000000000");
    }
console.log((localstoragefactory.keys()));


    // Compare dates to sort
    // $scope.timeOption = $scope.timeOptions[0];

    // Sort formed data for Chart
    for (var z = 0; z  <$scope.data[0].children.length; z++) { // Loop through new data
    // $scope.data[0].children[z]  =  subreddit  // console.log($scope.data[0].children[z] );
    // var before = [];
    // var after = [];
    for (var x = 0; x  <$scope.data[0].children[z].children.length; x++) {
            // before.push($scope.data[0].children[z].children[x].sorter);
    }
    //  $scope.data[0].children[z].children.sort(function(a,b) {return (a.sorter > b.sorter) ? 1 : ((b.sorter > a.sorter) ? -1 : 0);});
    // $scope.data[0].children[z].children.sort(function(a, b){
    // return a.sorter > b.sorter;
    // });
    for (var y = 0; y  <$scope.data[0].children[z].children.length; y++) {
            // after.push($scope.data[0].children[z].children[y].sorter);
    }
    // console.log("BEFORE");
    // console.log(before + "   :  " + $scope.data[0].children[z].name);
    // console.log("AFTER");
    // console.log(after + "   :  " + $scope.data[0].children[z].name);
    }
    // $scope.api.refresh();
    // console.dir($scope.data[0].children) // 4 subreddits array

   
}

})();