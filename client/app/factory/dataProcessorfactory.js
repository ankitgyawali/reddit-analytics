;
(function() {

 angular
  .module('reddit-analytics')
  .factory('dataProcessor', dataProcessor);

 dataProcessor.$inject = ['CONSTANTS','moment','localStorageService','dataDecoratorfactory','lodash'];
 /*
            data [] } -> array of rows {} containing 
                                          -> datetime ""
                                          -> entities []
                                          -> categories []
                                          -> sntiment []
                                          -> subreddit ""

 */

 function dataProcessor(CONSTANTS,moment,localStorageService,dataDecoratorfactory,_) {

function momentFormatter(post_datetime){
  // console.log(post_datetime);
  // console.log(moment(new Date(post_datetime.toString())).format('MMMM Do, h:mm a ddd'));
return moment(new Date(post_datetime.toString())).format('MMMM Do, h:mm a ddd');

}

function categoryLabel(label){
label = label.replace(/_/g, ' ').toLowerCase();
return label.charAt(0).toUpperCase() + label.slice(1);
}

function categoryLabelMaker(category_label_id,category_name,post_datetime,reddit_id,sorter)
{
return "Reddit post: reddit.com/<b>"+reddit_id+"<br>Category:"+category_name+"</center></b><br> " + "Sorter: " +sorter + "<br><span style='font-size:80%'>"+
momentFormatter(post_datetime) + "</span>";
}

function entitiesLabelMaker(reddit_id,post_datetime,entities,normalizedentitty,currentindex,garbage){

  let returnstring = "<b>"+normalizedentitty.normalized+"</b><br>Reddit post: reddit.com/<b>"+reddit_id;
  returnstring+="<br>Entity ("+ currentindex +"/"+ entities+"): "+ normalizedentitty.normalized;
  returnstring+=", Occurences: "+ normalizedentitty.o;
  returnstring+="<br> Entity Sentiment:";
  
  returnstring += dataDecoratorfactory.normalizeSentimentLabel(normalizedentitty.label);

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


  function processThisWeek(data) {

   var allData = [];
   var timestamps = [];

   for (var k = 0; k < data.length; k++) {
    var newData = {}

    newData.id = data[k].id

    newData.subreddit = CONSTANTS.reddit[data[k].id]

    newData.process_datetime = new Date(data[k].process_datetime)
    newData.combinelabel =   dateFns.format(newData.process_datetime,'MM/DD/YYYY')
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
      newData.entities[i][j].entimentSorter =   dataDecoratorfactory.normalizeConfidenceForSorting(newData.entities[i][j].confidence,newData.entities[i][j].label)
      delete newData.entities[i][j]["l"];
      delete newData.entities[i][j]["c"];
      delete newData.entities[i][j]["n"];
     }
// newData.entities[i] = newData.entities[i].sort(function(a, b){
//     return parseInt(a.entimentSorter) - parseInt(b.entimentSorter);
// });

}
// console.log(newData.categories);
     newData.categories = newData.categories.sort(function(a, b){
    return parseInt(a.label_id) > parseInt(b.label_id);
});
// console.log(newData.categories);


      allData.push(newData);
    // console.log(allData);
   }


   var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


   console.log((allData));
let groupedData = groupBy(allData, 'subreddit');

let sortedData = []; //Hold 4 objects here  
   console.log(groupedData);
// ARRAY OF OBJECTS started
for (var key in groupedData) {
  if (groupedData.hasOwnProperty(key)) {
        
        groupedData[key] = groupBy(groupedData[key], 'combinelabel')
                        console.log(groupedData[key]);
                  
        for (var childKey in groupedData[key]) {
              if (groupedData[key].hasOwnProperty(childKey)) {
                    let add = {};
                    add.combinelabel = groupedData[key][childKey][0].combinelabel;
                    add.combiner = groupedData[key][childKey][0].combinelabel;
                    add.id = groupedData[key][childKey][0].id;
                    add.process_datetime = groupedData[key][childKey][0].process_datetime;
                    add.subreddit = groupedData[key][childKey][0].subreddit;
                    add.reddit_id = [];
                    add.entities = [];
                    add.sentiment = [];
                    add.categories = [];
                    for (let r = 0; r < groupedData[key][childKey].length; r++) {
                          for (let s = 0; s < groupedData[key][childKey][r].reddit_id.length; s++) {
                                    //  console.log(groupedData[key][childKey][r].reddit_id[s]);                      
                    add.reddit_id.push(groupedData[key][childKey][r].reddit_id[s]);
                    add.entities.push(groupedData[key][childKey][r].entities[s]);
                    add.sentiment.push(groupedData[key][childKey][r].sentiment[s]);
                    add.categories.push(groupedData[key][childKey][r].categories[s]);
                          }
                        }                

                                          // console.log(add);
                    // console.log(groupedData[key][childKey]);    

                         sortedData.push(add);
              }
            }
  }
}


console.log(sortedData);

let tempArray = sortedData;
console.log(tempArray);
      for(let w=0;w<tempArray.length;w++){
        var list = []
          for(let x=0;x<tempArray[w].reddit_id.length;x++){
            list.push({ reddit_id:  tempArray[w].reddit_id[x],        sentiment:  tempArray[w].sentiment[x],
             entities:  tempArray[w].entities[x], categories:  tempArray[w].categories[x],           })
      }

      list.sort(function(a, b) {
    return ((a.categories.label_id < b.categories.label_id) ? -1 : ((a.categories.label_id == b.categories.label_id) ? 0 : 1));
        });
   tempArray[w].reddit_id=[]
   tempArray[w].categories=[]
   tempArray[w].sentiment=[]
   tempArray[w].entities=[]

        for (var k = 0; k < list.length; k++) {

            tempArray[w].reddit_id.push(list[k].reddit_id)
            tempArray[w].categories.push(list[k].categories)
            tempArray[w].sentiment.push(list[k].sentiment)
            tempArray[w].entities.push(list[k].entities)

        }


    }
console.log(tempArray);
allData = tempArray;


  unique_ts =  unique_timestamps_cutter(timestamps)

   localStorageService.set("timestamps_arrays",timestamps)
   localStorageService.set("unique_timestamps",unique_ts);
   localStorageService.set("unique_criteria","EACHDAY")
   return (allData);
  //  return [allData[0]];
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
    return name.substring(name.lastIndexOf("#$%!")+4,name.lastIndexOf("$#@!"));
  //  throw 'myException'; // generates an exception
}
catch (e) {
   // statements to handle any exceptions
  //  logMyErrors(e); // pass exception object to error handler
  return "<!-- #$%!"+ val +"#$%! -->"

}
  // return "<!-- #$%!"+ val +"#$%! -->"
}


function createWordCloudWords(processed_data){
  console.log(processed_data);
  
let score = [];
let entity = [];
// workaround for min?
// let max =1, min =100, max_index, min_index; 
// Find min & max so wordcloud size can be interpolated
                  // console.log("XXXXXXXXXXXXX");
                  // console.log(processed_data);

for(let i=0;i<processed_data.length;i++){ //post
  // console.log(localstoragefactory.get('sunburstData')[i]);

          for(let j=0;j<processed_data[i].entities.length;j++){ //entities
          //     // $scope.x.push({ name      })
          for(let k=0;k<processed_data[i].entities[j].length;k++){ //entities
                // console.log(localstoragefactory.get('sunburstData')[i].entities[j][k])

                let check = entity.indexOf(processed_data[i].entities[j][k].normalized);
                if(check==-1){
                  let labelTag = ''
                  let color =''
                if(processed_data[i].entities[j][k].label=="pos"){
                    labelTag = "Positive";
                    color = "#006400"
                  }
                  else if(processed_data[i].entities[j][k].label == "neg"){

                    labelTag = "Negative";
                    color="#8B0000"
                  }
                  else{
                    labelTag = "Neutral";
                  color = "grey";

                  }
                entity.push(processed_data[i].entities[j][k].normalized);
                score.push({ text:processed_data[i].entities[j][k].normalized,
                 size:processed_data[i].entities[j][k].o,
                  color:dataDecoratorfactory.interPolateSentimentColorForWordCloud(processed_data[i].entities[j][k].label,processed_data[i].entities[j][k].confidence),
                  custom: {
                    name: processed_data[i].entities[j][k].normalized, color: color,
                    confidence: processed_data[i].entities[j][k].confidence,label:labelTag,
                    reddit_id: processed_data[i].reddit_id[j],
                    occurences: processed_data[i].entities[j][k].o
                  }
                   });
                }
                else{
                  score[check].size = score[check].size + processed_data[i].entities[j][k].o;
                }
            }          
          }
            
  }

score = score.sort(function(a, b){
    return parseInt(b.size) - parseInt(a.size);
});
  console.log(score.length);
if(score.length > CONSTANTS.NUMBER_OF_WORDS_IN_WORDCLOUD ){
  score = score.slice(0,CONSTANTS.NUMBER_OF_WORDS_IN_WORDCLOUD)
}

// Normalize the entities
let min  = score[0].size;
let max  = score[score.length-1].size;
// console.log(min)
// console.log(max)

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

for(let l=0;l<score.length;l++){ //post
// console.log(score[l].size+ "___VS____ "+convertRange(score[l].size,[min,max],[125,10]))
score[l].size = convertRange(score[l].size,[min,max],[99,10]);
}

// var i = d3.interpolateNumber(10, 20);
// i(0.0); // 10
  console.log(score.length);
  return score;
}


function cutByTimenReddit(processed_data,subreddit,time){
  let cutData = [];
          for(let j=0;j<processed_data.length;j++){ //entities
            console.log(time + " vs " + dateFns.format(processed_data[j].process_datetime,'MM/DD/YYYY'));
            if(processed_data[j].subreddit==subreddit   &&  time == dateFns.format(processed_data[j].process_datetime,'MM/DD/YYYY')){
            // console.log(processed_data[j].subreddit==subreddit   &&  time == dateFns.format(processed_data[j].process_datetime,'MM/DD/YYYY'));
            
            cutData.push(processed_data[j])
            }
          }

          console.log(cutData)
          
return cutData;
}


  return { //All of the data is stored as cookie by utilizing $cookies
  createSunburst:createSunburst,
  retrieveHidden:retrieveHidden,
  attachHidden:attachHidden,
   processThisWeek: processThisWeek,
   categoryLabelMaker:categoryLabelMaker,
   sentimentLabelMaker:sentimentLabelMaker,
   entitiesLabelMaker:entitiesLabelMaker,
   momentFormatter:momentFormatter,
   sorterLabel:sorterLabel,
   createWordCloudWords:createWordCloudWords,
   cutByTimenReddit:cutByTimenReddit
  };



 };

})();