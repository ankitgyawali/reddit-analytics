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

  exploreController.$exploreController = ['QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','localstoragefactory','CHARTCONFIG','chartfactory'];

function exploreController(QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,localstoragefactory,CHARTCONFIG,chartfactory) {
 console.log("data");


 }


})();