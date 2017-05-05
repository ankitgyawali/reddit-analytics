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

    $scope.xdata = "test";
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
/*timeOptions
     <md-select placeholder="Assign to user" ng-model="user" md-on-open="loadUsers()" style="min-width: 200px;">
      <md-option ng-value="timeOption" ng-repeat="timeOption in timeOptions">{{timeOption.name}}</md-option>
    </md-select>
    <p class="md-caption">Current Time : {{ timeOption ? timeOption.name : 'No one yet' }}</p>*/

    var self = this;
    $scope.options = CHARTCONFIG.SUNBURST_CHART;

    $scope.togglelabel = function(){
        // $scope.options.chart.showLabels = !$scope.options.chart.showLabels;
        // $scope.api.refresh();
    }

    $scope.data = [{
    name: "<b>Reddit</b><br><span style='font-size:80%'> Current Time:<br>" + dataProcessor.momentFormatter(new Date())+ "</span>",
    // Viewing blob of date newDate()
    height: 200,
    size: 152,
    color: "grey",
    children: []}];

    CONSTANTS.reddit.forEach(function(element,index) {
        $scope.data[0].children.push({ name: "/r/"+element, color:CONSTANTS.color[index],children:[]  })
    }, this);

//);


if (true || (localstoragefactory.keys().indexOf("processedData") != 0) || (localstoragefactory.get('processedData').length < 10)) // ADD OR FOR NOT UP TO DATE TIME CALCS
{ //Call Datechecker function here
                $http({
                method: 'POST',
                url: 'http://localhost:3001/initialize',
                // set the headers so angular passing info as form data (not request payload)
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(data, status, headers, config) {
                // console.log("fetching");
                    localstoragefactory.initialize(data); // Initialize first by trying to store data - this week raw data

                    localstoragefactory.set('processedData',dataProcessor.processThisWeek(data)) // raw data normalized
                    $scope.processed_data = localstoragefactory.get('processedData');
    
                    // Get timeoptions set at localstorage during dataprocess.processthisweek    
                    $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
                    // console.log($scope.timeOptions[0]+"XXXX");
                    // Set sunburst data after slicing it
                    localstoragefactory.set('sunburstData',timefactory.tsSunburst($scope.data,$scope.timeOptions[0]));  
                    
                    
                    // $scope.temp = localstoragefactory.get('sunburstData')

                    // takes in sliced data
                    $scope.data = chartfactory.sunburst($scope.processed_data,localstoragefactory.get('sunburstData')); // Create chart data
                    
                    
                // data = timefactory.slicebyTime(localstoragefactory.get('thisWeekData'),$scope.timeOptions);
                // console.log($scope.data);
                // console.log($scope.data);
               
                                  
                    
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
        $scope.data = timefactory.tsSunburst(localstoragefactory.get('sunburstData'),$scope.timeOptions[0]);
     // Populates timeOption

    }

    $scope.selectedItemChanged = function(val){
        // console.log(val);
        timefactory.tsSunburst(localstoragefactory.get('sunburstData'),val);
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