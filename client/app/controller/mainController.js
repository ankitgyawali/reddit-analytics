;(function() {

  angular
    .module('reddit-analytics')
    .controller('MainController', MainController);

  MainController.$inject = ['CONSTANTS','dataProcessor','localstoragefactory','$http','lodash'];

  function MainController(CONSTANTS, dataProcessor, localstoragefactory, $http, _) {
      // Function to clone of object

  }


})();