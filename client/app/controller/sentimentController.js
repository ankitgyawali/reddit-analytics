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
  .controller('sentimentController', sentimentController);

  sentimentController.$inject = ['toastr','$timeout', 'dataDecoratorfactory','timefactory','localstoragefactory','$element','$window','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','CHARTCONFIG','chartfactory','lodash'];

function sentimentController(toastr,$timeout, dataDecoratorfactory, timefactory,localstoragefactory,$element,$window,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,CHARTCONFIG,chartfactory,_) {
 
  // Initialize Default Vals
  $scope.subredditoptions = CONSTANTS.reddit.sort();
  $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
  $scope.currentTime = $scope.timeOptions[0];
  $scope.now = timefactory.initNow();   
  $scope.currentReddit = $scope.subredditoptions[0];

  $scope.options = {
    chart: {
        type: 'multiBarHorizontalChart',
        height: 450,
        multibar:{
            dispatch:{
                elementClick: function (t){
                    $scope.updateView(t.data.reddit);
                  }
            }
        },
        valueFormat: function(d){ return d },
        x: function(d){ return d.label;},
        y: function(d){ return d.value;},
        showControls: false,
        showValues: true,
        duration: 500,
        xAxis: {
            axisLabel: 'Dates',
            // axisLabelDistance: 0,            
            showMaxMin: false,
            tickFormat: function(d){
                return dateFns.format(new Date(d),'MM/DD');
            }
        },
        yAxis: {
            axisLabel: '# of Posts',
            tickFormat: function(d){
                return d;
            }
        }
    }
};

$scope.updateView = function(ids){
    $scope.reddit_hrefs = ids;
    $timeout(function() { $scope.$apply(); }, 1); // Doing inside a timeout to be safe
  }

$scope.convertToGraph = function(data){
    let positive = {};
    let negative = {};
    let neutral = {};
    let reddit_mappings = { pos: {}, neg:{}, neu:{} }
    let dataToReturn = [{
        key: "Positive",
        color: "green",
        values: []
        },
        {
        key: "Negative",
        color: "red",
        values: []
        },
        {
            key: "Neutral",
            color: "grey",
            values: []
        }
        ];

    _.map(data, function(each_post){
        if(each_post.sentiment.label == "pos"){
            positive[each_post.combinelabel] =  (positive[each_post.combinelabel] || 0) + 1;
            
            if(reddit_mappings.pos[each_post.combinelabel]) {
                reddit_mappings.pos[each_post.combinelabel].push(each_post.reddit_id)
              } else {
                reddit_mappings.pos[each_post.combinelabel] = [each_post.reddit_id]
              }

        } else if (each_post.sentiment.label == "neg") {
            negative[each_post.combinelabel] =  (negative[each_post.combinelabel] || 0) + 1;
            
            if(reddit_mappings.neg[each_post.combinelabel]) {
                reddit_mappings.neg[each_post.combinelabel].push(each_post.reddit_id)
              } else {
                reddit_mappings.neg[each_post.combinelabel] = [each_post.reddit_id]
              }

        } else {
            neutral[each_post.combinelabel] =  (neutral[each_post.combinelabel] || 0) + 1;
            if(reddit_mappings.neu[each_post.combinelabel]) {
                reddit_mappings.neu[each_post.combinelabel].push(each_post.reddit_id)
              } else {
                reddit_mappings.neu[each_post.combinelabel] = [each_post.reddit_id]
              }

        }

    });

    _.forOwn(positive,function (val,key) {
        dataToReturn[0].values.push({ label: key, value: val, reddit: reddit_mappings.pos[key] })
    });

    _.forOwn(negative,function (val,key) {
        dataToReturn[1].values.push({ label: key, value: val, reddit: reddit_mappings.neg[key]})
    });
    
    _.forOwn(neutral,function (val,key) {
        dataToReturn[2].values.push({ label: key, value: val, reddit: reddit_mappings.neu[key]})
    });

    _.forEach(dataToReturn, function(eachVal){
        eachVal.values.sort(function (a, b) { return new Date(b.label) - new Date(a.label); });
    });

    // return [final_data.pos, final_data.neu, final_data.neg ];
    return dataToReturn;
    // return data;
}

  $scope.cutbyReddit = function(reddit){
    $scope.currentReddit = reddit;
    localstoragefactory.set('senTimentReddit',reddit);  // <<-- Initialized current reddit 1
    $scope.cut_posts = dataProcessor.sliceByReddit(localstoragefactory.get('processedData'),
    reddit
    // localstoragefactory.get('sentimentTime')
    );

    // console.log($scope.cut_posts)
    $scope.data = ($scope.convertToGraph($scope.cut_posts));
    // $scope.recut();
    // $scope.data = $scope.nvCompatibleData($scope.cut_posts)
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