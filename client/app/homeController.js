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
                    // console.log(data);
                     $scope.rgb2hex = function(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }

 function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }



                $scope.xdata = dataProcessor.processThisWeek(JSON.parse(JSON.stringify(data).replace("\'","'")));

                   for (var i = 0; i < $scope.xdata.length; i++) {
                                 
                                 



                                     for (var k = 0; k  <$scope.xdata[i].categories.length; k++) {

                                         $scope.newchildren = function(entities){

                                             $scope.varstoReturn = [];
                                             
                                            //  $scope.xdata[i].entities
                                            // console.log(entities)
                                            // console.log(entities.length);
                    
                                      
                                                for (var m = 0; m  <entities[k].length; m++) {
                                                //  console.log(entities[l][m])
                                               
                                                    // 
                                                 $scope.varstoReturn.push({   name: entities[k][m].normalized+k+m+'', color:"green", children:[]    })
                                                 console.log({   name: entities[k][m].normalized+k+m+'', color:"green", children:[]    });
                                                }


                                            // console.log(entities)
                                        // return [{  name:"Test", color: "blue", children:[] }]
                                                 console.log("+AAAAAAA");
                                                 console.log(JSON.stringify($scope.varstoReturn));
                                                 $scope.oldtest = [{name:"te3211st"+i+k,   color:"blue", children:[]},
                                                 {name:"te321x1st"+i+k+m,   color:"green", children:[]}
                                                 
                                        
                                        ];
                                        $scope.varstoReturn.push(
                                                 {name:"te321x1st"+i+k+m,   color:"green", children:[]}
                                            
                                        );
                                        
                                       console.log(JSON.stringify($scope.oldtest));
                                        return $scope.varstoReturn;
                                        // return $scope.oldtest;
                                         
                                        }

                                        $scope.data[0].children[$scope.xdata[i].id].children.push(
                                     {
                                         name: $scope.xdata[i].categories[k].name + i + k + '',
                                         color: rgb2hex(CONSTANTS.contrast_set[$scope.xdata[i].categories[k].label_id][0],CONSTANTS.contrast_set[$scope.xdata[i].categories[k].label_id][1],CONSTANTS.contrast_set[$scope.xdata[i].categories[k].label_id][2]),
                                         
                                         // Figure out color here
                                         children: [{ name: "REd"+i+k+'', color: ($scope.xdata[i].sentiment[k].label == "pos")? "green":(($scope.xdata[i].sentiment[k].label == "neg") ? "red" : "white"  ),
                                         
                                        //  children:[{name:"te3211st"+i+k,   color:"blue", children:[] }  ]
                                         children:$scope.newchildren($scope.xdata[i].entities)
                                        
                                    }
                                        ]



                                     });

//    console.log($scope.data[0].children[$scope.xdata[i].id].children)

                                
                            
                         }
    
   }
            
            
   
                    //    console.log( $scope.data);



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
            height: 950,
            showLabels: false,
            color: function(color){return color; },
       
            // color: d3.scale.category20c(),
            duration: 250
        }
    };

    $scope.data = [{
        name: "Subreddits",
        height: 200,
        color: "grey",
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

    $scope.loadData();
  }


})();