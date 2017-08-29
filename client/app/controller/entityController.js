;
(function() {


 /**
  * Sample factory
  *
  * You can fetch here some data from API and the use them
  * in controller
  * 
  */
  angular
  .module('reddit-analytics')
  .controller('entityController', entityController);

  entityController.$inject = ['toastr','$timeout', 'dataDecoratorfactory','timefactory','localstoragefactory','$element','$window','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','CHARTCONFIG','chartfactory','lodash'];

function entityController(toastr,$timeout, dataDecoratorfactory, timefactory,localstoragefactory,$element,$window,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,CHARTCONFIG,chartfactory,_) {
 
  // Initialize Default Vals
  $scope.subredditoptions = CONSTANTS.reddit.sort();
  $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
  $scope.currentTime = $scope.timeOptions[0];
  $scope.now = timefactory.initNow();   
  $scope.currentReddit = $scope.subredditoptions[0];

  $scope.options = {
    chart: {
        type: 'scatterChart',
        height: 450,
        color: d3.scale.category10().range(),
        scatter: {
            onlyCircles: false
        },
        showDistX: true,
        showDistY: true,
        tooltipContent: function(key) {
            return '<h3>' + key + '</h3>';
        },
        duration: 350,
        xAxis: {
            axisLabel: 'Count',
            tickFormat: function(d){
                return d;
            }
        },
        yAxis: {
            axisLabel: 'Date',
            tickFormat: function(d){
                return d;
            },
            axisLabelDistance: -5
        },
        zoom: {
            //NOTE: All attributes below are optional
            enabled: false,
            scaleExtent: [1, 10],
            useFixedDomain: false,
            useNiceScale: false,
            horizontalOff: false,
            verticalOff: false,
            unzoomEventType: 'dblclick.zoom'
        }
    }
};



$scope.updateView = function(ids){
    $scope.reddit_hrefs = ids;
    $timeout(function() { $scope.$apply(); }, 1); // Doing inside a timeout to be safe
  }

$scope.convertToGraph = function(data){
    console.log(data)
    let groups = 4;
    let points = 40;
    var data = [],
    shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
    random = d3.random.normal();

    let  test = 1;
for (var i = 0; i < groups; i++) {
    test = test + 2
    data.push({
        key: 'Group ' + i,
        values: []
    });
    
    for (var j = 0; j < points; j++) {
    test = test + 2
    
        data[i].values.push({
              x: test, 
              y: random(),
              size: Math.random(),
              shape: shapes[j % 6]
        });
        // console.log(da)
    }
}
return data;

}

  $scope.cutbyReddit = function(reddit){
    $scope.currentReddit = reddit;
    localstoragefactory.set('senTimentReddit',reddit);  // <<-- Initialized current reddit 1
    $scope.cut_posts = dataProcessor.sliceByReddit(localstoragefactory.get('processedData'),
    reddit
    // localstoragefactory.get('sentimentTime')
    );
    $scope.data = ($scope.convertToGraph($scope.cut_posts));

  }



  // Do stuff once everything loads
  $timeout(function() {
    localstoragefactory.set('sentimentTime',$scope.timeOptions[0]);  // <--- Initialize first time
  $scope.cutbyReddit(CONSTANTS.reddit[0]);
  

$scope.data = ($scope.convertToGraph($scope.cut_posts));


  
}, 0);


  return { //All of the data is stored as cookie by utilizing $cookies
// sunburst:sunburst
  };

}

})();