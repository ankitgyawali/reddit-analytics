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

  $scope.options = CHARTCONFIG.CATEGORY_PIE_CHART
  
  $scope.options.chart.pie = {
    dispatch: {
      elementClick: function (t){
        $scope.updateView(t.data.reddit_id);
      }
    }
  };




  return { //All of the data is stored as cookie by utilizing $cookies
// sunburst:sunburst
  };

}

})();