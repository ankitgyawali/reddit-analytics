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
  .controller('categoryController', categoryController);

  categoryController.$inject = ['toastr','$timeout','timefactory','localstoragefactory','$element','$window','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','CHARTCONFIG','chartfactory'];

function categoryController(toastr,$timeout,timefactory,localstoragefactory,$element,$window,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,CHARTCONFIG,chartfactory) {
 

  $scope.subredditoptions = CONSTANTS.reddit.sort();
  $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
  $scope.currentTime = $scope.timeOptions[0];
  $scope.now = timefactory.initNow();   
  $scope.currentReddit = $scope.subredditoptions[0];


  $scope.cutbyReddit = function(reddit){
    $scope.currentReddit = reddit;
    localstoragefactory.set('wcReddit',reddit);  // <<-- Initialized current reddit 1
    $scope.newwords = dataProcessor.cutByTimenReddit(localstoragefactory.get('processedData'),
    reddit,
    localstoragefactory.get('wcTime')
    );
    console.log(reddit);

    console.log(localstoragefactory.get('processedData'));
    
    // $scope.words = dataProcessor.createWordCloudWords($scope.newwords);
    // $scope.wordClicked({custom:$scope.words[0].custom});
  }

  // Called after cutbReddit is defined
  // TODO: Move this out to a seperate factory

  // Do stuff once everything loads
  $timeout(function() {
  localstoragefactory.set('catTime',$scope.timeOptions[0]);  // <--- Initialize first time
  $scope.cutbyReddit(CONSTANTS.reddit[0]);

  angular.element("#radio_0").triggerHandler('click');
  $scope.selectedItemChanged($scope.timeOptions[0]);  
    }, 0);

  $scope.selectedItemChanged = function(val){
    $scope.currentTime = val
    localstoragefactory.set('catTime',val); // GET SELECTED TIMEOPTIONS

    // localstoragefactory.set('sunburstData',timefactory.timeSlicerWordCloud(localstoragefactory.get('processedData'),val));   // BY TIME
  }



  return { //All of the data is stored as cookie by utilizing $cookies
// sunburst:sunburst
  };

}

})();