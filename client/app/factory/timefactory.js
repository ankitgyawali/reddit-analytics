

 angular
  .module('reddit-analytics')
  .factory('timefactory', timefactory);

   timefactory.$inject = ['CONSTANTS','moment','localStorageService','dataProcessor'];

function timefactory(CONSTANTS,moment,localStorageService,dataProcessor) {

function getToday(data){

}


// Return times?
function getAvailableTimesFromQueryData(processed_data){
    // console.log("processed_data")
    // console.log(processed_data)
// processed_data.map(function(eachmap) {return moment(eachmap.process_datetime);});
// //   $scope.timeOptions = $scope.processed_data.map(function(a) {return timefactory.convertRaw(a.process_datetime);});
return (processed_data.map(function(eachmap)    // Loop through given data
                            { return moment(eachmap.process_datetime // get each data  as moment object
                            )}).sort(function (a, b) { //sort
                                    return b - a;
                                }))
                            .map(function(eachmap) {return convertmoment(moment(eachmap));});
}

// return timestamped sunburst data from processed_data
// -> empty chart data <----->  processed data to cut <----> timestamp
// processed_data === empty data
// data == processed_data full 
// timestamp  =time to cut
function timeSlicer(processed_data,data,timestamp){   // GROUP BY DAY AND SORT HERE??
    var newArray = [];
    // data = slicebyTime(processed_data,timestamp)
    for (var i = 0 ; i < data.length;i++){ // each subreddit 
        //  console.log(dateFns.format(data[i].process_datetime,'MM/DD/YYYY') +'___VS___'+''+timestamp);
        // console.log(dateFns.format(data[i].process_datetime,'MM/DD/YYYY')==timestamp);
       if(dateFns.format(data[i].process_datetime,'MM/DD/YYYY')==timestamp){
           data[i].combiner = dateFns.format(data[i].process_datetime,'MM/DD/YYYY');
           newArray.push(data[i]);
    }
}
// newArray  
// entity.sort(function(a, b){
//     return parseInt(a.entimentSorter) - parseInt(b.entimentSorter);
// });
    console.log("new aray");

    console.log(newArray);

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


// // => {3: ["one", "two"], 5: ["three"]}
let groupedData = groupBy(newArray, 'subreddit');

console.log(groupBy(newArray, 'subreddit'))
  let tempArray  = [];

for (var key in groupedData) {
  if (groupedData.hasOwnProperty(key)) {
      let combined =  groupedData[key];

        let newObj = {};
        newObj.subreddit = key;
        newObj.process_datetime = groupedData[key][0].process_datetime;
        newObj.id = groupedData[key][0].id;
        newObj.reddit_id = [];
        newObj.categories = [];
        newObj.entities = [];
        newObj.sentiment = [];

        newObj.combiner = groupedData[key][0].combiner; // Comment this out later
        // newObj.categories = ;
        //   console.log(groupedData[key][0].cat);
        //   console.log(groupedData[key]);
        //   console.log(newObj);        
      for(let a=0;a<groupedData[key].length;a++){
            for(b=0;b<groupedData[key][a].reddit_id.length;b++){
                          newObj.reddit_id.push(groupedData[key][a].reddit_id[b])
                          newObj.categories.push(groupedData[key][a].categories[b])
                          newObj.entities.push(groupedData[key][a].entities[b])
                          newObj.sentiment.push(groupedData[key][a].sentiment[b])
            }

        //   console.log(a);
      }
    
    tempArray.push(newObj);
    // console.log(key + " -> " + groupedData[key]);
  }
}
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
newArray = tempArray;
return newArray;
}

function timeSlicerWordCloud(  data,timestamp   ){
    var newArray = [];
    // data = slicebyTime(processed_data,timestamp)
    for (var i = 0 ; i < data.length;i++){ // each subreddit 
        //  console.log(dateFns.format(data[i].process_datetime,'MM/DD/YYYY') +'___VS___'+''+timestamp);
        // console.log(dateFns.format(data[i].process_datetime,'MM/DD/YYYY')==timestamp);
       if(dateFns.format(data[i].process_datetime,'MM/DD/YYYY')==timestamp){
           newArray.push(data[i]);
    }

}

// newArray  
// entity.sort(function(a, b){
//     return parseInt(a.entimentSorter) - parseInt(b.entimentSorter);
// });

  console.log(newArray);
return newArray;
}


// function slicebyTime(data){
// function slicebyTime(data,time){
//     let newdata = []
//     // console.log(time);
//     for(var i = 0 ; i < data[0].children.length;i++){
//     // console.log(data[i]);
//     // console.log(dateFns.format(data[i].process_datetime,'MM/DD/YYYY') +'___VS___'+''+time);
//     // console.log(dateFns.format(data[i].process_datetime,'MM/DD/YYYY')==time);
//     if(dateFns.format(data[0].children.process_datetime,'MM/DD/YYYY')==time){
//         newdata.push(data[0].children);
//         console.log(newdata);
//         console.log("X");
//     }
// }

// console.log("Datum");
// console.log(newdata);
// return newdata;
// }

// function t(x){
//     // return x.map(function(eachmap) {return convertmoment(moment(eachmap));})
// }

    // $scope.timeOptions =  $scope.timeOptions.map(function(eachmap) {return timefactory.convertmoment(eachmap);});


function initNow(){
    return moment(new Date()).format('MMMM Do, h:mm a ddd');
}

function convertRaw(rawdate) {
    return moment(rawdate).format('MMMM Do, h:mm a ddd');
}

function convertmoment(momentdate) {
    return moment(momentdate).format('MMMM Do, h:mm a ddd');
}

function wordcloudslice(wordclouddata, subreddit) {
    // return wordclouddata;
    // console.log( "wordclouddata");
    // console.log( wordclouddata);
    // console.log( "subreddit");
    // console.log( subreddit);
    
    let newData = []
    for(let i=0;i<wordclouddata.length;i++){
        // console.log(wordclouddata[i].subreddit == subreddit)
        if(wordclouddata[i].subreddit == subreddit){
            newData.push(wordclouddata[i]);
        }
    }

    //     console.log( "wordclouddata");
    // console.log( newData);
    return newData;
    // console.log( "wordclouddata");
    // console.log( wordclouddata);
    // return wordclouddata;
}

return {
    // slicebyTime:slicebyTime,
    initNow:initNow,
    convertRaw:convertRaw,
    convertmoment:convertmoment,
    getAvailableTimesFromQueryData:getAvailableTimesFromQueryData,
    timeSlicer:timeSlicer,
    timeSlicerWordCloud:timeSlicerWordCloud,
    wordcloudslice:wordcloudslice
}

}