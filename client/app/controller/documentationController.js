;(function() {
    
      angular
        .module('reddit-analytics')
        .controller('documentationController', documentationController);
    
        documentationController.$inject = ['$timeout', '$scope', 'CONSTANTS', '$http', '$rootScope', 'dataDecoratorfactory'
      ,'$route', 'localstoragefactory', 'timefactory', 'lodash'];
    
      function documentationController($timeout,$scope,CONSTANTS,$http,$rootScope,dataDecoratorfactory,
      $route,localstoragefactory,timefactory,_) {
    
        $scope.chartLabels = { // Create labels to be shown by view
            name: _.map(CONSTANTS.category_mapping, function(category){
                return dataDecoratorfactory.categoryPrettify(category);
            }),
            mapping: _.map(CONSTANTS.contrast_set, function(rgb){
                return dataDecoratorfactory.rgb2hex(rgb[0],rgb[1],rgb[2])
            })
        };


    }
})();