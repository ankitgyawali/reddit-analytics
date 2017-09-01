;
(function() {
  angular
  .module('reddit-analytics')
  .controller('categoryController', categoryController);

categoryController.$inject = ['toastr','$timeout', 'dataDecoratorfactory','timefactory','localstoragefactory','$element','$window','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','CHARTCONFIG','chartfactory','lodash'];

function categoryController(toastr,$timeout, dataDecoratorfactory, timefactory,localstoragefactory,$element,$window,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,CHARTCONFIG,chartfactory,_) {
  // Initialize Default Vals
  $scope.subredditoptions = CONSTANTS.reddit;
  $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
  $scope.currentTime = $scope.timeOptions[0];
  $scope.now = timefactory.initNow();   
  $scope.currentReddit = $scope.subredditoptions[0];

  $scope.options = CHARTCONFIG.CATEGORY_PIE_CHART
  
  $scope.options.chart.pie = {
    dispatch: {
      elementClick: function (t){
        $scope.updateView(t.data.reddit_id);
      }
    },
    xAxis: {
      axisLabel: 'Date',
      tickFormat: function(d){ return $scope.unique_dates[parseInt(d/100)]; }
    }
  };

  $scope.updateView = function(ids){
    $scope.reddit_hrefs = ids;
    $timeout(function() { $scope.$apply(); }, 1); // Doing inside a timeout to be safe
  }

  $scope.nvCompatibleData = function(data){
    let tempData = {};
    let reddit_ids = {};
    let dataToReturn = [];
    _.map(data, function(each_post){
      tempData[each_post.categories.name] =  (tempData[each_post.categories.name] || 0) + 1;
      if(reddit_ids[each_post.categories.name]) {
        reddit_ids[each_post.categories.name].push(each_post.reddit_id)
      } else {
      reddit_ids[each_post.categories.name] = [each_post.reddit_id]
      }
    });

    _.forEach(tempData,function (val,key) {
      dataToReturn.push({ key:dataDecoratorfactory.categoryPrettify(key), y: val, reddit_id: reddit_ids[key]})
    })
    return dataToReturn;
  }

  $scope.cutbyReddit = function(reddit){
    $scope.currentReddit = reddit;
    localstoragefactory.set('catReddit',reddit);  // <<-- Initialized current reddit 1
    $scope.cut_posts = dataProcessor.cutByTimenReddit(localstoragefactory.get('processedData'),
    reddit,
    localstoragefactory.get('catTime')
    );
    $scope.data = $scope.nvCompatibleData($scope.cut_posts)
  }

  // Do stuff once everything loads
  $timeout(function() {
    localstoragefactory.set('catTime',$scope.timeOptions[0]);  // <--- Initialize first time
    $scope.cutbyReddit(CONSTANTS.reddit[0]);
    $scope.selectedItemChanged($scope.timeOptions[0]);  
  }, 0);

  $scope.selectedItemChanged = function(val){
    $scope.currentTime = val
    localstoragefactory.set('catTime',val); // GET SELECTED TIMEOPTIONS
    $scope.cut_posts = dataProcessor.cutByTimenReddit(localstoragefactory.get('processedData'),
    localstoragefactory.get('catReddit'),
    val
    );
    $scope.data = $scope.nvCompatibleData($scope.cut_posts)
  }

  return { 
// sunburst:sunburst
  };

}

})();