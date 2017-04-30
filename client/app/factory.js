;(function() {


  /**
   * Sample factory
   *
   * You can fetch here some data from API and the use them
   * in controller
   * 
   */
  angular
    .module('reddit-analytics')
    .factory('getDataFromAPI', getDataFromAPI);


  angular
    .module('reddit-analytics')
    .factory('dataProcessor', dataProcessor);


  dataProcessor.$inject = ['$http'];


  getDataFromAPI.$inject = ['$http', 'LocalStorage'];


  ////////////
  function dataProcessor($http) {
  
    function processThisWeek(data) {




      console.log(data);

                //   $scope.reddit_id = ($scope.xdata.reddit_id);

                  // $scope.reddit_id = (new Function("return " + $scope.xdata.reddit_id+ ";")());
                  // $scope.catagories = (new Function("return " + $scope.xdata.catagories+ ";")());
                  //       for (var k in $scope.xdata){
                  //   if ($scope.xdata.hasOwnProperty(k)) {
                  //       // console.log(k);
                  //       // console.log($scope.xdata[k]);
                  //       if(k = "entities"){
                  //            $scope.test = (new Function("return " + $scope.xdata[k]+ ";")());
                  //            console.log($scope.test[0]);
                  //            console.log(new Function("return " + $scope.test[0]+ ";")());
                  //            console.log(new Function("return " + $scope.test[0]+ ";")().l);
                  //            console.log("entitiesentitiesentities");
                  //       }
                  //       // console.log("Key is " + k + ", value is" + (new Function("return " + $scope.xdata[k] + ";")()));
                  //        }
                  //           }









          return(data);
}

return { //All of the data is stored as cookie by utilizing $cookies

            processThisWeek: processThisWeek

};



};




  function getDataFromAPI($http, LocalStorage) {

    return {
      loadData: loadData
    };


    ////////////  function definitions


    /**
     * Load articles from GetPocket API
     * @return {Object} Articles object
     */
    // var request = {
    //   consumer_key: 'xxxx',
    //   access_token: 'xxxx',
    //   sort: 'newest',
    //   count: 5
    // };

    // return $http({
    //   method: 'GET',
    //   url: API.url + 'v3/get',
    //   params: request
    // }).then(function(articles) {
    //   return articles.data;
    // })
    // .catch(function(error) {
    //   return error;
    // });
  }


})();
