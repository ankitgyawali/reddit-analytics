/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('reddit-analytics')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService'];


  function MainController(LocalStorage, QueryService) {
      // Called default Iniitalize api and compare data here 
  }


})();