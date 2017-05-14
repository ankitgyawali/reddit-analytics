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

        
 $scope.options = CHARTCONFIG.SUNBURST_CHART;


    $scope.$route = $route;
    $scope.currentNavItem = 'home';
    $scope.now = timefactory.initNow();




$scope.currentBlob = new Date();

    var self = this;

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
                url: CONSTANTS.API_URL[CONSTANTS.ENVIRONMENT]+'/initialize',
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
        // $scope.data = chartfactory.sunburst(localstoragefactory.get('sunburstData'),localstoragefactory.get('sunburstEmpty'));
        
        
     $timeout(function() {
        $scope.data = chartfactory.sunburst(localstoragefactory.get('sunburstData'),localstoragefactory.get('sunburstEmpty'));
        console.log($scope.data);
        $scope.$apply();
    $scope.api.updateWithData($scope.data);
// console.log(nv);
//                     if (nv && nv.graphs) {
//                 nv.graphs.forEach(function(nvGraph) {
//                     nvGraph.update();
//                 });
//             }

    }, 2);

    //   $scope.$watch($scope.data, function(val) {
    // // $scope.$apply();
    // console.log(val);
    //     $scope.api.refresh();


    //     });



        $scope.api.refresh();
    $scope.api.updateWithData($scope.data);
        
        console.log($scope.data);
        console.log("00000000000000000000000000");
    }
console.log((localstoragefactory.keys()));
   
}

})();