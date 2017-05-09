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
		$scope.height = $window.innerHeight * 0.65;
		$scope.width = $element.find('#wordsCloud')[0].offsetWidth;
    $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
    $scope.currentTime = $scope.timeOptions[0];
    $scope.currentReddit = $scope.subredditoptions[0];
    // $scope.currentTime = "$scope.timeOptions[0]";

    $scope.now = timefactory.initNow();
      	$scope.rotate =  function () {
            return ~~(Math.random() * 2) * 90;
        }
			$scope.wordClicked = function (word){
        $scope.worddetails = word.custom;
        console.log(word);
        console.log("word");
        // $scope.$apply();
		}

$scope.currentBlob = new Date();
// $scope.wordClicked("")
       toastr.success("Error: Status Code . Contact admin if issue persists.");

$scope.worddetails = "test";

$scope.cutbyReddit = function(reddit){
  $scope.currentReddit = reddit;
console.log("cut by this reddit: "+reddit);
localstoragefactory.set('wcReddit',reddit);  // <<-- Initialized current reddit 1
console.log("cut by this time");
console.log(localstoragefactory.get('wcTime'));  // <<-- Initialized current reddit 1
// localstoragefactory.set('wcTime',$scope.timeOptions[1]); // GET SELECTED TIMEOPTIONS
// console.log($scope.currentTimeOption);
// localstoragefactory.set('wordCloudCutData',timefactory.wordcloudslice(localstoragefactory.get('processedData'),reddit));


              $scope.newwords = dataProcessor.cutByTimenReddit(localstoragefactory.get('processedData'),
              reddit,
              localstoragefactory.get('wcTime')
              );


// $scope.words = dataProcessor.createWordCloudWords(localstoragefactory.get('sunburstData'));
$scope.words = dataProcessor.createWordCloudWords($scope.newwords);
console.log($scope.words);

// console.log($scope.words) ;
// $scope.words = dataProcessor.createWordCloudWords($scope.newwords);
// console.log($scope.words) ;

  // cut word here call selected item changed?
}
$scope.cutbyReddit(CONSTANTS.reddit[0]);
$scope.currentlySelected  = CONSTANTS.reddit[0];
// console.log($scope.currentlySelected  );
// $scope.reddit = 'politics';
$timeout(function() {

localstoragefactory.set('wcTime',$scope.timeOptions[0]);  // <--- Initialize first time
angular.element("#radio_0").triggerHandler('click');
$scope.selectedItemChanged($scope.timeOptions[0]);  

$scope.wordClicked({custom:$scope.words[0].custom});
// localstoragefactory.set('wordCloudReddt',timefactory.timeSlicerWordCloud(localstoragefactory.get('processedData'),val));   // BY TIME
// localstoragefactory.set('wordCloudTS',timefactory.wordcloudslice(localstoragefactory.get('processedData'),subreddit)); // BY SUBREDDIT
}, 0);
// SELECTED ITEM CHANGE
$scope.selectedItemChanged = function(val){
  $scope.currentTime = val
localstoragefactory.set('wcTime',val); // GET SELECTED TIMEOPTIONS
let reddit  = localstoragefactory.get('wcReddit'); // GET SELECTED TIMEOPTIONS

$scope.newwordss = dataProcessor.cutByTimenReddit(localstoragefactory.get('processedData'),
reddit,
val
);



 localstoragefactory.set('sunburstData',timefactory.timeSlicerWordCloud(localstoragefactory.get('processedData'),val));   // BY TIME


  // $scope.words = dataProcessor.createWordCloudWords(localstoragefactory.get('sunburstData'));
  $scope.words = dataProcessor.createWordCloudWords($scope.newwordss);
	$scope.wordClicked({custom:$scope.words[0].custom});

    console.log("00000000000000000000000000");
}
    $scope.now = timefactory.initNow();
    // console.log( $scope.subredditoptions)
 }


})();