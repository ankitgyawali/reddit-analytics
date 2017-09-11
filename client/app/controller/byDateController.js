;(function() {
    
      angular
        .module('reddit-analytics')
        .controller('byDateController', byDateController);
    
        byDateController.$inject = ['$timeout', 'notificationFactory', 'dataProcessor','$scope', 'CONSTANTS', '$http', '$rootScope', 'dataDecoratorfactory'
      ,'$route', 'localstoragefactory', 'timefactory', 'lodash'];
    
      function byDateController($timeout,notificationFactory,dataProcessor, $scope,CONSTANTS,$http,$rootScope,dataDecoratorfactory,
      $route,localstoragefactory,timefactory,_) {
    
        $scope.setDate = function(){
            
            // console.log($scope.ctrl.myDate)
            $http({
                method: 'POST',
                url: CONSTANTS.API_URL[CONSTANTS.ENVIRONMENT]+'/bydate?date=' + new Date(new Date($scope.ctrl.myDate).getTime() - (24*60*60*1000)).toISOString().substr(0, 10),
                // set the headers so angular passing info as form data (not request payload)
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(data, status, headers, config) {
                    // Initialize first by trying to store data - this week raw data
                    localstoragefactory.initialize(clone(data)); //thisWeekData
                    localstoragefactory.set('initial_data_from_api', clone(data)); // Create a copy 
                    // Process data and save it
                    localstoragefactory.set('processedData',dataProcessor.processThisWeek(data));
                    notificationFactory.info("Local Storage dataset set to: "+
                    new Date(new Date($scope.ctrl.myDate).getTime() - (24*60*60*1000)).toISOString().substr(0, 10))
            })
            .error(function(data, status, headers, config) {
                notificationFactory.error("Something went wrong while fetching data from API. Report admin.")
                notificationFactory.error(status)
            });
        }

        function clone(data){
            return JSON.parse(JSON.stringify(data));
        }

        $scope.setThisWeekData = function(){
            $http({
                method: 'POST',
                url: CONSTANTS.API_URL[CONSTANTS.ENVIRONMENT]+'/initialize',
                // set the headers so angular passing info as form data (not request payload)
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(data, status, headers, config) {
                    // Initialize first by trying to store data - this week raw data
                    localstoragefactory.initialize(clone(data)); //thisWeekData
                    localstoragefactory.set('initial_data_from_api', clone(data)); // Create a copy 
                    // Process data and save it
                    localstoragefactory.set('processedData',dataProcessor.processThisWeek(data));
                    notificationFactory.info("Local Storage dataset set to this week's.")
            })
            .error(function(data, status, headers, config) {
            notificationFactory.error("Something went wrong while fetching data from API. Report admin.")
            notificationFactory.error(status)
            });
        };


        $scope.ctrl = {
            myDate: new Date(),
            maxDate: new Date(),
            minDate: new Date(2017,8,2)
        }



    }
})();