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
  .factory('getDataFromAPI', getDataFromAPI);


 angular
  .module('reddit-analytics')
  .factory('dataProcessor', dataProcessor);


 dataProcessor.$inject = ['CONSTANTS'];


 getDataFromAPI.$inject = ['$http', 'LocalStorage'];


 ////////////
 function dataProcessor(CONSTANTS) {

  function processThisWeek(data) {

   var allData = [];

   for (var k = 0; k < data.length; k++) {
    var newData = {}

    newData.id = data[k].id

    newData.subreddit = CONSTANTS.reddit[data[k].id]

    newData.process_datetime = new Date(data[k].process_datetime)
    newData.reddit_id = new Function("return " + data[k].reddit_id + ";")();
    newData.sentiment = new Function("return " + data[k].sentiment + ";")();
    newData.entities = new Function("return " + data[k].entities + ";")();
    newData.categories = new Function("return " + data[k].catagories + ";")();

    for (var i = 0; i < newData.sentiment.length; i++) {

     newData.sentiment[i] = JSON.parse(newData.sentiment[i]);
     newData.sentiment[i].label = newData.sentiment[i].l;
     newData.sentiment[i].confidence = newData.sentiment[i].c;
     delete newData.sentiment[i]["l"];
     delete newData.sentiment[i]["c"];

     newData.categories[i] = JSON.parse(newData.categories[i])
     newData.categories[i].confidence = newData.categories[i].c;
     newData.categories[i].label_id = newData.categories[i].l;;
     newData.categories[i].name = CONSTANTS.category_mapping[newData.categories[i].label_id - 1];
     delete newData.categories[i]["c"];
     delete newData.categories[i]["l"];

     for (var j = 0; j < newData.entities[i].length; j++) {
      newData.entities[i][j] = JSON.parse(newData.entities[i][j]);
      newData.entities[i][j].label = newData.entities[i][j].l;
      newData.entities[i][j].normalized = newData.entities[i][j].n;
      newData.entities[i][j].confidence = newData.entities[i][j].c;

      delete newData.entities[i][j]["l"];
      delete newData.entities[i][j]["c"];
      delete newData.entities[i][j]["n"];
     }
     allData.push(newData);
    }
    // console.log(allData);
   }
   return (allData);
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