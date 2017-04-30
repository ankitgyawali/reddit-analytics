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

  homeController.$inject = ['LocalStorage', 'QueryService','$scope','CONSTANTS','$http','dataProcessor'];


  function homeController(LocalStorage, QueryService,$scope,CONSTANTS,$http,dataProcessor) {
        $scope.xdata = "test";
        $scope.loadData = function(){
                    $http({
                    method: 'POST',
                    url: 'http://localhost:3001/initialize',
                    // set the headers so angular passing info as form data (not request payload)
                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).success(function(data, status, headers, config) {
                    
                $scope.xdata = dataProcessor.processThisWeek(JSON.parse(JSON.stringify(data).replace("\'","'")));

                   for (var i = 0; i < $scope.xdata.length; i++) {
                                 
                                 
                                 console.log(JSON.stringify($scope.xdata[i].subreddit) + ":  " + i);

                                     for (var k = 0; k  <$scope.xdata[i].sentiment.length; k++) {

                                 console.log(JSON.stringify($scope.xdata[i].sentiment[k]) + ":  " + i);

                                        $scope.data[0].children[$scope.xdata[i].id].children.push(
                                     {
                                         name: $scope.xdata[i].sentiment[k].label + i + k + '',
                                         color: ($scope.xdata[i].sentiment[k].label == "pos")? "green": (($scope.xdata[i].sentiment[k].label == "neg")? "red":"yellow"),
                                         children:[]
                                     });


                                
                            
                         }
                                 
                                 console.log(JSON.stringify($scope.data[0].children[$scope.xdata[i].id]) + ":  " + i);
                                
                         


                                //  console.log(JSON.stringify($scope.xdata[i].id));
                                //  console.log(JSON.stringify($scope.xdata[i].process_datetime));
                                //  console.log(JSON.stringify($scope.xdata[i].sentiment));
                                //  console.log("JSON.stringify($scope.xdata[i].sentiment");
                                    // console.log( $scope.xdata[i].sentiment.label);

                                        //   for (var k = 0; k  <$scope.xdata[i].sentiment.length; k++) {
                                                    // console.log( $scope.xdata[i].sentiment)

                                //  $scope.data[0].children[$scope.xdata[i].id].children.push(
                                //      {
                                //          name: $scope.xdata[i].sentiment[i].label,
                                //          color: ($scope.xdata[i].sentiment[i].label == "pos")? "green": "red"
                                //      }
                                     
                                //      );
                        //  }


                
        }
            
                            console.log(JSON.stringify($scope.data[0]));
            
   
                



                //   console.log(JSON.parse($scope.reddit_id))
                })
                .error(function(data, status, headers, config) {
                    console.log(status);    
                });

};


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
        $scope.data[0].children.push({ name: "/r/"+element, color:CONSTANTS.color[index],children:[]  })
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