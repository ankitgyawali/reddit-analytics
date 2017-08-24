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
  .controller('exploreController', exploreController);

  exploreController.$exploreController = ['toastr','$timeout','timefactory','localstoragefactory','$element','$window','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','CHARTCONFIG','chartfactory'];

function exploreController(toastr,$timeout,timefactory,localstoragefactory,$element,$window,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,CHARTCONFIG,chartfactory) {
 
    $scope.subredditoptions = CONSTANTS.reddit.sort();
    $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
    console.log($scope.timeOptions);
    $scope.currentTime = $scope.timeOptions[0];
    $scope.now = timefactory.initNow();   
    $scope.currentReddit = $scope.subredditoptions[0];
    
    // WordCloud Options
		$scope.height = $window.innerHeight *  0.85 // WORD CLOUD
		$scope.width = $element.find('#wordsCloud')[0].offsetWidth; //WORD CLOUD
    $scope.rotate =  function () {
        return ~~(Math.random() * 2) * 90;
    }
		
    $scope.wordClicked = function (word){
        $scope.worddetails = word.custom;
        $timeout(function() { // Call with timeout so everything gets loaded when changing timesets
        $scope.$apply();
      }, 0);
		}

         $scope.maxWordSize = 	$scope.width * 0.15;
      $scope.minWordSize = 	$scope.maxWordSize / 5;

         $scope.spread = $scope.maxCount - $scope.minCount;
     if ($scope.spread <= 0) $scope.spread = 1;
    $scope.step = ($scope.maxWordSize - $scope.minWordSize) / $scope.spread;

  toastr.info("Associated reddit post is linked on the top-left corner.")
  toastr.info("Click on the words to see more details.");

    // Cut by reddit on intialization which since initial time has already been set on localstorage
    $scope.cutbyReddit = function(reddit){
      $scope.currentReddit = reddit;
      localstoragefactory.set('wcReddit',reddit);  // <<-- Initialized current reddit 1
      $scope.newwords = dataProcessor.cutByTimenReddit(localstoragefactory.get('processedData'),
      reddit,
      localstoragefactory.get('wcTime')
      );
      console.log(reddit);

      console.log(localstoragefactory.get('processedData'));
      
      $scope.words = dataProcessor.createWordCloudWords($scope.newwords);
      $scope.wordClicked({custom:$scope.words[0].custom});
    }

    // Called after cutbReddit is defined
    // TODO: Move this out to a seperate factory

    // Do stuff once everything loads
    $timeout(function() {
    localstoragefactory.set('wcTime',$scope.timeOptions[0]);  // <--- Initialize first time

    $scope.cutbyReddit(CONSTANTS.reddit[0]);

    
    angular.element("#radio_0").triggerHandler('click');
    $scope.selectedItemChanged($scope.timeOptions[0]);  
      }, 0);

    $scope.selectedItemChanged = function(val){
      $scope.currentTime = val
      localstoragefactory.set('wcTime',val); // GET SELECTED TIMEOPTIONS
      $scope.newwordss = dataProcessor.cutByTimenReddit(localstoragefactory.get('processedData'),
      localstoragefactory.get('wcReddit'),
      val
      );
      localstoragefactory.set('sunburstData',timefactory.timeSlicerWordCloud(localstoragefactory.get('processedData'),val));   // BY TIME
      $scope.words = dataProcessor.createWordCloudWords($scope.newwordss);
      $scope.wordClicked({custom:$scope.words[0].custom});
    }
 }


})();