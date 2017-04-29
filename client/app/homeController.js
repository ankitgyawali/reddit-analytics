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
    .controller('homeController', homeController);

  homeController.$inject = ['LocalStorage', 'QueryService','$scope','CONSTANTS'];


  function homeController(LocalStorage, QueryService,$scope,CONSTANTS) {

    // 'controller as' syntax
    var self = this;
    $scope.options = {
        chart: {
            type: 'sunburstChart',
            height: 450,
            color: function(color){return color; },
            // color: d3.scale.category20c(),
            duration: 250
        }
    };

    $scope.data = [{
        name: "Subreddits",
        color: "white",
        children: []}];

    CONSTANTS.reddit.forEach(function(element,index) {
        $scope.data[0].children.push({ name: "/r/"+element, color:CONSTANTS.color[index]  })
    }, this);

    ////////////  function definitions


    /**
     * Load some data
     * @return {Object} Returned object
     */
    // QueryService.query('GET', 'posts', {}, {})
    //   .then(function(ovocie) {
    //     self.ovocie = ovocie.data;
    //   });
  }


})();