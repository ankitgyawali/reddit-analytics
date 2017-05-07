;
(function() {

 angular
  .module('reddit-analytics')
  .factory('dataProcessor', dataProcessor);

 dataProcessor.$inject = ['CONSTANTS','moment','localStorageService'];
 /*
            data [] } -> array of rows {} containing 
                                          -> datetime ""
                                          -> entities []
                                          -> categories []
                                          -> sntiment []
                                          -> subreddit ""

 */

 function dataProcessor(CONSTANTS,moment,localStorageService) {

  function entitiesSorterLabel(confidence,label){
    
    if(label=="pos"){
        // return parseInt(confidence)+100;
        return parseInt(confidence)+1000;
    }
    else if(label == "neg"){
        // return parseInt(confidence)*-1;
        return parseInt(confidence)+600;
    }
    else{
        return parseInt(confidence)+800;
        // return parseInt(confidence);
    }
}



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

function categoryLabelMaker(category_label_id,category_name,post_datetime,reddit_id,sorter)
{
// console.log(categoryLabel(category_name))
// category_name = categoryLabel(category_name)
// return category_name""
return "Reddit post: reddit.com/<b>"+reddit_id+"<br>Category:"+category_name+"</center></b><br> " + "Sorter: " +sorter + "<br><span style='font-size:80%'>"+
//  post_datetime.toString()
momentFormatter(post_datetime) + "</span>";
}

function entitiesLabelMaker(reddit_id,post_datetime,entities,normalizedentitty,currentindex,garbage){

  let returnstring = "<b>"+normalizedentitty.normalized+"</b><br>Reddit post: reddit.com/<b>"+reddit_id;
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
   


      if(label=="pos"){

      let color = d3.scale.linear()
      .domain([0, 99])
      .interpolate(d3.interpolateHcl)
      .range(["white", "green"]);
      return color(confidence);
    }
    else if(label == "neg"){

        let color = d3.scale.linear()
      .domain([0, 99])
      .interpolate(d3.interpolateHcl)
      .range(["white", "red"]);
      return color(confidence);


    }
    else{
      let color = d3.scale.linear()
      .domain([0, 99])
      .interpolate(d3.interpolateHcl)
      .range(["black", "white"]);
      return color(confidence);

    }

// console.log(label + "  - " +confidence);
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


    // return color(getRandomArbitrary(-98,99));
  

  }

  function processThisWeek(data) {

   var allData = [];
   var timestamps = [];

   for (var k = 0; k < data.length; k++) {
    var newData = {}

    newData.id = data[k].id

    newData.subreddit = CONSTANTS.reddit[data[k].id]

    newData.process_datetime = new Date(data[k].process_datetime)
    timestamps.push(newData.process_datetime);


    newData.reddit_id = new Function("return " + data[k].reddit_id + ";")();
    newData.sentiment = new Function("return " + data[k].sentiment + ";")();
    newData.entities = new Function("return " + data[k].entities + ";")();
    newData.categories = new Function("return " + data[k].catagories + ";")();
// console.log(newData.entities);

    for (var i = 0; i < newData.sentiment.length; i++) {

     newData.sentiment[i] = JSON.parse(newData.sentiment[i]);
     newData.sentiment[i].label = newData.sentiment[i].l;
     newData.sentiment[i].confidence = newData.sentiment[i].c;
     delete newData.sentiment[i]["l"];
     delete newData.sentiment[i]["c"];

     newData.categories[i] = JSON.parse(newData.categories[i])
     newData.categories[i].confidence = newData.categories[i].c;
     newData.categories[i].label_id = newData.categories[i].l;
     newData.categories[i].name = CONSTANTS.category_mapping[newData.categories[i].label_id - 1];
     delete newData.categories[i]["c"];
     delete newData.categories[i]["l"];

     for (var j = 0; j < newData.entities[i].length; j++) {
      newData.entities[i][j] = JSON.parse(newData.entities[i][j]);
      newData.entities[i][j].label = newData.entities[i][j].l;
      newData.entities[i][j].normalized = newData.entities[i][j].n;
      newData.entities[i][j].confidence = newData.entities[i][j].c;
      newData.entities[i][j].entimentSorter =   entitiesSorterLabel(newData.entities[i][j].confidence,newData.entities[i][j].label)
      delete newData.entities[i][j]["l"];
      delete newData.entities[i][j]["c"];
      delete newData.entities[i][j]["n"];
     }
// newData.entities[i] = newData.entities[i].sort(function(a, b){
//     return parseInt(a.entimentSorter) - parseInt(b.entimentSorter);
// });

}
// console.log(newData.categories);
//      newData.categories = newData.categories.sort(function(a, b){
//     return parseInt(a.label_id) > parseInt(b.label_id);
// });
// console.log(newData.categories);


      allData.push(newData);
    // console.log(allData);
   }
//    console.log(JSON.stringify(allData));


  unique_ts =  unique_timestamps_cutter(timestamps)

   localStorageService.set("timestamps_arrays",timestamps)
   localStorageService.set("unique_timestamps",unique_ts);
   localStorageService.set("unique_criteria","EACHDAY")
   return (allData);
  }

function unique_timestamps_cutter(timestamp){
   var unique_ts = new Set();    
  //  let cd =   dateFns.format(data[i].process_datetime,'MM/DD/YYYY');
   timestamp.map(function(eachmap) {
     unique_ts.add(dateFns.format(eachmap,'MM/DD/YYYY'));
   });
   unique_ts = Array.from(unique_ts)
  //  console.log(unique_ts)
  //  console.log(unique_ts.sort(dateFns.compareDsc))

// Add sot by date to unique_ts here
return unique_ts.reverse();
}





// parseInt(($scope.xdata[i].categories[k].label_id*1005) + ($scope.xdata[i].sentiment[k].confidence*105)),                    

  function sorterLabel(label_id,confidence,label){
    let total = label_id;
    //   if(label=="pos"){
    //   total += (4*1005);
    // }
    // else if(label == "neg"){
    //   total += (3*1005);
    // }
    // else{
    //   total += (2*1004);
    // }


    // total += confidence;
    return (total);

  }


  // Process raw data to json graph
  function   createSunburst()  {

  }

function attachHidden(val){
  return "<!-- #$%!"+ val +"$#@! -->"
}

function retrieveHidden(name){

try {
    return name.substring(name.lastIndexOf("#$%!")+1,name.lastIndexOf("$#@!"));
  //  throw 'myException'; // generates an exception
}
catch (e) {
   // statements to handle any exceptions
  //  logMyErrors(e); // pass exception object to error handler
  return "<!-- #$%!"+ val +"#$%! -->"

}


  // return "<!-- #$%!"+ val +"#$%! -->"
}

  return { //All of the data is stored as cookie by utilizing $cookies
  createSunburst:createSunburst,
  retrieveHidden:retrieveHidden,
  attachHidden:attachHidden,
   processThisWeek: processThisWeek,
   interPolateSentimentColor:interPolateSentimentColor,
   rgb2hex:rgb2hex,
   categoryLabelMaker:categoryLabelMaker,
   sentimentLabelMaker:sentimentLabelMaker,
   entitiesLabelMaker:entitiesLabelMaker,
   momentFormatter:momentFormatter,
   sorterLabel:sorterLabel
  };



 };







})();