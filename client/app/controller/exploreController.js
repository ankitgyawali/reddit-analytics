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

  exploreController.$exploreController = ['localstoragefactory','$element','$window','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','localstoragefactory','CHARTCONFIG','chartfactory'];

function exploreController(localstoragefactory,$element,$window,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,localstoragefactory,CHARTCONFIG,chartfactory) {
 console.log("data");

		$scope.height = $window.innerHeight * 0.5;
			$scope.width = $element.find('#wordsCloud')[0].offsetWidth;
			// $scope.wordClicked = wordClicked;
        	// $scope.rotate = rotate;
          console.log(localstoragefactory.get)
			$scope.words = [
			{text: 'Angular',size: 25, color: '#6d989e'},
			{text: 'Angular2',size: 35, color: '#473fa3'}
		]

      	$scope.rotate =  function () {
            return ~~(Math.random() * 2) * 90;
        }

		// 	$scope.wordClicked = function (word){
		// 	alert('text: ' + word.text + ',size: ' + word.size);
		// }

 }


})();