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
    $scope.options = CHARTCONFIG.SUNBURST_CHART;

    $scope.togglelabel = function(){
        // $scope.options.chart.showLabels = !$scope.options.chart.showLabels;
        // $scope.api.refresh();
    }
    $scope.createEmptyData = function(x){
        //x  = passed value
    let emptyData = [{
    name: "<b>Reddit</b><br><span style='font-size:80%'> Current Time:<br>" + dataProcessor.momentFormatter(new Date())+ "</span>",
    // Viewing blob of date newDate()
    height: 200,
    // size: 4,
    color: "grey",
    children: []}];
    CONSTANTS.reddit.forEach(function(element,index) {
        emptyData[0].children.push({ name: "/r/"+element, color:CONSTANTS.color[index],children:[]})
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
                    
                    
                console.log($scope.data);
                    console.log(('sunburstData'));
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