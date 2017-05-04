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

  homeController.$inject = ['LocalStorage', 'QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route'];



  function homeController(LocalStorage, QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route) {
        $scope.xdata = "test";
    $scope.$route = $route;
    
console.log($scope.currentNavItem);

// $scope.currentNavItem = "home";
  $scope.currentNavItem = 'home';
   // 'controller as' syntax
    var self = this;
    $scope.options = {
        chart: {
          
                //   mode: "count",
            type: 'sunburstChart',
            mode: 'count',
            height: 600,
            showLabels: false,
            labelFormat: function (d){ return '';},
         tooltip: {
      duration: 0,
      gravity: "w",
      distance: 25, 
      snapDistance: 0,
      classes: null,
      chartContainer: null,
      enabled: true,
      valueFormatter: function (d) {   
         return  '';  },
      headerFormatter: function (d) {   return '';  },
    //   headerFormatter: function (d) {   return '<span style="font-size:80%"><b>'+ "reddit-analytics" +"</b></span>";  },
      hideDelay: 200,
      headerEnabled: true,
      fixedTop: null,
        hidden: true,
      data: null,
      id: "nvtooltip-42549"
    },
            groupColorByParent: true,
            scale: d3.scale.category20c(),
            color: function(color){ return color; },
            // color: d3.scale.category20c(),
            duration: 250,
       

//   styles: {
//     classes: {
//       with-3d-shadow: true,
//       with-transitions: true,
//       gallery: false
//     },
//     css: {}
//   }    
 },
 
//   title: {
//     enable: true,
//     text: "Write Your Title",
//     className: "h4",
//     css: {
//       width: "600px",
//       "text-align": "right"
//     }
//   },
//   subtitle: {
//     enable: true,
//     text: "Write Your Title",
//     css: {
//       width: "600px",
//       textAlign: "center"
//     }
//   },
  caption: {
    enable: true,
    text: "Write Your Title",
    css: {
      width: "600px",
      textAlign: "center"
    }
  }
    
};

        $scope.loadData = function(){
                    $http({
                    method: 'POST',
                    url: 'http://localhost:3001/initialize',
                    // set the headers so angular passing info as form data (not request payload)
                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).success(function(data, status, headers, config) {


// ($scope.api.getScope().chart.color(['red','green']));
// ($scope.api.update())
// ($scope.api.refresh());
// $scope.api.getScope().chart.title('stuff').titleOffset(-10);
// $scope.api.refresh();
// console.log($scope.api.getScope().svg);

    $scope.newchildren = function(reddit_id,process_datetime,entities,p,s){
    $scope.varstoReturn = [];
    for (var m = 0; m  <entities[k].length; m++) {
        $scope.varstoReturn.push({   
            name: dataProcessor.entitiesLabelMaker(reddit_id,process_datetime,entities[k].length,entities[k][m],m+1,k+m+p+s+''), 
            // name: entities[k][m].normalized+k+m+p+s+'', 
     color: dataProcessor.interPolateSentimentColor(entities[k][m].label,parseInt(entities[k][m].confidence)),
                                        // color:(entities[k][m].label == "pos")? "green":((entities[k][m].label == "neg") ? "red" : "white"), 
                                        children:[]})
        }
        $scope.varstoReturn.push({ name:"te321x1st"+i+k+m,   color:"green", children:[]});                                            
    return $scope.varstoReturn;
}  
           

$scope.xdata = dataProcessor.processThisWeek(data);

$scope.test = [];
for (var i = 0; i < $scope.xdata.length; i++) {
// console.log($scope.xdata[i].subreddit)
// console.log($scope.xdata[i].reddit_id)
// console.log($scope.xdata[i].categories)
// $rootScope._.groupBy($scope.xdata[i].categories, [iteratee=label_id])
for (var k = 0; k  <$scope.xdata[i].categories.length; k++) {
    //   console.log(  $scope.xdata[i].process_datetime.toTimeString() +  " - reddit.com/"+ $scope.xdata[i].reddit_id[k] + ": " +i +" VS "+ k)

                    // console.log(($scope.xdata[i].categories[k].label_id))
                    // console.log(($scope.xdata[i].sentiment[k].confidence))
                    // console.log(parseInt($scope.xdata[i].categories[k].label_id.toString() + $scope.xdata[i].sentiment[k].confidence))
    // console.log(parseInt(($scope.xdata[i].categories[k].label_id*1005) + ($scope.xdata[i].sentiment[k].confidence*105)));
                $scope.data[0].children[$scope.xdata[i].id].children.push
                ({
                    // height:500,
                    // scale:500,
                    // size:500,
                    // sort: function(){ console.log("XX"); return "x"; },
                    
                    sorter:  dataProcessor.sorterLabel($scope.xdata[i].categories[k].label_id,$scope.xdata[i].sentiment[k].confidence,$scope.xdata[i].sentiment[k].label),
                    // parseInt(($scope.xdata[i].categories[k].label_id*1005) + ($scope.xdata[i].sentiment[k].confidence*105)),                    
                    name:  dataProcessor.categoryLabelMaker( $scope.xdata[i].categories[k].label_id,$scope.xdata[i].categories[k].name,$scope.xdata[i].process_datetime, $scope.xdata[i].reddit_id[k],dataProcessor.sorterLabel($scope.xdata[i].categories[k].label_id,$scope.xdata[i].sentiment[k].confidence,$scope.xdata[i].sentiment[k].label)),
                    // + "  : " +  + "  : " + .toTimeString() +  " - reddit.com/"+,
                    label_id: $scope.xdata[i].categories[k].label_id,
                    color: dataProcessor.rgb2hex(CONSTANTS.contrast_set[$scope.xdata[i].categories[k].label_id][0],CONSTANTS.contrast_set[$scope.xdata[i].categories[k].label_id][1],CONSTANTS.contrast_set[$scope.xdata[i].categories[k].label_id][2]),
                        // Figure out color here
                        children: 
                        [{  name: dataProcessor.sentimentLabelMaker($scope.xdata[i].reddit_id[k],$scope.xdata[i].process_datetime, $scope.xdata[i].sentiment[k] ,i+k),
                            // "reddit.com/"+$scope.xdata[i].reddit_id[k]+i+k, 
                            
   
                            
                            color: dataProcessor.interPolateSentimentColor($scope.xdata[i].sentiment[k].label,parseInt($scope.xdata[i].sentiment[k].confidence)),
                            // color: ($scope.xdata[i].sentiment[k].label == "pos")? "green":(($scope.xdata[i].sentiment[k].label == "neg")?"red":"white"),
                                    children:$scope.newchildren($scope.xdata[i].reddit_id[k],$scope.xdata[i].process_datetime,$scope.xdata[i].entities,i,k)
            }]
        });
 } // Loop one interation of each row posts
} // Loop through row objects

for (var z = 0; z  <$scope.data[0].children.length; z++) {
    // $scope.data[0].children[z]  =  subreddit
    console.log($scope.data[0].children[z] );
    var before = [];
    var after = [];
    for (var x = 0; x  <$scope.data[0].children[z].children.length; x++) {
            // Array of  POST objects
            before.push($scope.data[0].children[z].children[x].sorter);
    }
    //  $scope.data[0].children[z].children.sort(function(a,b) {return (a.sorter > b.sorter) ? 1 : ((b.sorter > a.sorter) ? -1 : 0);});
    $scope.data[0].children[z].children.sort(function(a, b){
    return a.sorter > b.sorter;
    });

    for (var y = 0; y  <$scope.data[0].children[z].children.length; y++) {
            // Array of  POST objects
            after.push($scope.data[0].children[z].children[y].sorter);
    }
    console.log("BEFORE");
    console.log(before + "   :  " + $scope.data[0].children[z].name);
    console.log("AFTER");
    console.log(after + "   :  " + $scope.data[0].children[z].name);
    
}
$scope.api.refresh();
// console.dir($scope.data[0].children) // 4 subreddits array

// console.dir($scope.data[0].children) // 4 subreddits
// console.log(JSON.stringify($scope.data))
            
                //   console.log(JSON.parse($scope.reddit_id))
                })
                .error(function(data, status, headers, config) {
                    console.log(status);    
                });

};
    $scope.data = [{
        name: "<b>Reddit</b><br><span style='font-size:80%'> Current Time:<br>" + dataProcessor.momentFormatter(new Date())+ "</span>",
        // Viewing blob of date newDate()
        height: 200,
        size: 152,
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