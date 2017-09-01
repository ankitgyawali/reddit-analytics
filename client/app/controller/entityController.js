;
(function() {
  angular
  .module('reddit-analytics')
  .controller('entityController', entityController);

  entityController.$inject = ['toastr','$timeout', 'dataDecoratorfactory','timefactory','localstoragefactory','$element','$window','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','CHARTCONFIG','chartfactory','lodash'];

function entityController(toastr,$timeout, dataDecoratorfactory, timefactory,localstoragefactory,$element,$window,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,CHARTCONFIG,chartfactory,_) {
 
  // Initialize Default Vals
  $scope.subredditoptions = CONSTANTS.reddit;
  $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
  $scope.currentTime = $scope.timeOptions[0];
  $scope.now = timefactory.initNow();   
  $scope.currentReddit = $scope.subredditoptions[0];

  $scope.selectedPoint = {};
  $scope.options = CHARTCONFIG.DISPERSION_CHART;
  $scope.options.chart.scatter = {
            dispatch: {
                elementClick:function (data)
                {
                    $scope.selectedPoint = data.point;
                    $timeout(function() { $scope.$apply(); }, 1);
                }
            
            }
        };


$scope.updateView = function(ids){
    $scope.reddit_hrefs = ids;
    $timeout(function() { $scope.$apply(); }, 1); // Doing inside a timeout to be safe
  }


$scope.convertToGraph = function(processed_data){
    let new_data = [];
    $scope.pos = {
        key: "Positive",
        color: "green",
        values: []
        };

    $scope.neg = {
        key: "Negative",
        color: "red",
        values: []
        };

    $scope.neu = {
        key: "Neutral",
        color: "grey",        
        values: []
        };

    let label_symbol_mapping = {
        pos: "triangle-up",
        neg: "triangle-down",
        neu: "diamond"
    }

    let label_full_mapping = {
        pos: "Positive",
        neg: "Negative",
        neu: "Neutral"
    }

    let x_val = 1;
        // console.log(neu);
    $scope.unique_dates = [];
    _.forEach(processed_data, function(post){
        $scope.unique_dates.push(dateFns.format(new Date(post.process_datetime),'MM/DD/YYYY'));
        // console.log(post)
    });

    $scope.unique_dates = $scope.unique_dates.filter(function(item, pos) {
        return $scope.unique_dates.indexOf(item) == pos;
    });
    
    // Show graph in reverse format
    // $scope.unique_dates.reverse();

    let x_mappings = {}
    let start = 0;

    _.forEach($scope.unique_dates, function(date){
        x_mappings[date] = start;
        start += 100;
    });

    _.forEach(processed_data, function(post){
        
        _.forEach(post.entities, function(entity){

        x_mappings[dateFns.format(new Date(post.process_datetime),'MM/DD/YYYY')] += 4;
        
        // console.log($scope.getshapes(entity.o));
        $scope[entity.label].values.push(
            {
                        x: x_mappings[dateFns.format(new Date(post.process_datetime),'MM/DD/YYYY')],
                        y: entity.o,
                        size: parseInt(entity.confidence)/100,
                        shape: label_symbol_mapping[entity.label],
                        reddit_id: post.reddit_id,
                        name: entity.normalized,
                        label: label_full_mapping[entity.label],
                        confidence: entity.confidence,
                        date: post.process_datetime
            }
        );

            // console.log(entity);
        })
    });

return [$scope.pos, $scope.neg, $scope.neu];

}

  $scope.cutbyReddit = function(reddit){
    $scope.selectedPoint = {};
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