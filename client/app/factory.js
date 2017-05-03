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


 dataProcessor.$inject = ['CONSTANTS','moment'];


 getDataFromAPI.$inject = ['$http', 'LocalStorage'];


 /*
            data [] } -> array of rows {} containing 
                                          -> datetime ""
                                          -> entities []
                                          -> categories []
                                          -> sntiment []
                                          -> subreddit ""

 */

 function dataProcessor(CONSTANTS) {


function momentFormatter(post_datetime){
  // console.log(post_datetime);
  // console.log(moment(new Date(post_datetime.toString())).format('MMMM Do, h:mm a ddd'));
return moment(new Date(post_datetime.toString())).format('MMMM Do, h:mm a ddd');

}


function categoryLabel(label){
label = label.replace(/_/g, ' ').toLowerCase();
return label.charAt(0).toUpperCase() + label.slice(1);


// return ; 
}

function categoryLabelMaker(category_label_id,category_name,post_datetime,reddit_id)
{
// console.log(categoryLabel(category_name))
// category_name = categoryLabel(category_name)
// return category_name""
return "Reddit post: reddit.com/<b>"+reddit_id+"<br>Category:"+category_name+"</center></b><br><span style='font-size:80%'>"+
//  post_datetime.toString()
momentFormatter(post_datetime) + "</span>";
}

function entitiesLabelMaker(reddit_id,post_datetime,entities,normalizedentitty,currentindex,garbage){

  let returnstring = "Reddit post: reddit.com/<b>"+reddit_id;
  returnstring+="<br>Entity ("+ currentindex +"/"+ entities+"): "+ normalizedentitty.normalized;
  returnstring+=", Occurences: "+ normalizedentitty.o;
  returnstring+="<br> Entity Sentiment:";
  
        if(normalizedentitty.label=="pos"){
      returnstring += "positive";
    }
    else if(normalizedentitty.label == "neg"){

      returnstring += "negative";
    }
    else{
      returnstring += "neutral";
    }

  // returnstring+= normalizedentitty



returnstring += ", Confidence: "+normalizedentitty.confidence+"% </center></b><br><span style='font-size:80%'>";
returnstring += momentFormatter(post_datetime) +"</span> <!--" +garbage+post_datetime.toString()+"-->";
return returnstring;
}

function sentimentLabelMaker(reddit_id,post_datetime,sentiment,garbage)
{
// console.log(categoryLabel(category_name))
// return category_name""
let returnstring = "Reddit post: reddit.com/<b>"+reddit_id+"<br>Overall Sentiment:";

      if(sentiment.label=="pos"){
      returnstring += "positive";
    }
    else if(sentiment.label == "neg"){

      returnstring += "negative";
    }
    else{
      returnstring += "neutral";
    }
    // console.log(post_datetime);
    // console.log(moment(post_datetime.toString()).format('MMMM Do, h:mm a ddd'));
returnstring += ", Confidence: "+sentiment.confidence+"% </center></b><br><span style='font-size:80%'>"+
momentFormatter(post_datetime) + "</span> <!--" +garbage+post_datetime.toString()+"-->";

return returnstring;

}



    function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }
   

  function interPolateSentimentColor(label,confidence) {
    let oldr = '';
      if(label=="pos"){
        confidence = confidence + 99
      oldr = "green";
    }
    else if(label == "neg"){
      confidence = confidence - 99  
      oldr = "red";
    }
    else{
      oldr = "white";
    }

// console.log(label + "  - " +confidence);
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

    var color = d3.scale.linear()
    .domain([-100, 0, 200])
     .interpolate(d3.interpolateRgb)
    .range(["red", "white", "green"]);
    // return color(getRandomArbitrary(-98,99));
    return color(confidence);

  }

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
   
    }
      allData.push(newData);
    // console.log(allData);
   }
//    console.log(JSON.stringify(allData));
   return (allData);
  }

  return { //All of the data is stored as cookie by utilizing $cookies

   processThisWeek: processThisWeek,
   interPolateSentimentColor:interPolateSentimentColor,
   rgb2hex:rgb2hex,
   categoryLabelMaker:categoryLabelMaker,
   sentimentLabelMaker:sentimentLabelMaker,
   entitiesLabelMaker:entitiesLabelMaker,
   momentFormatter:momentFormatter
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