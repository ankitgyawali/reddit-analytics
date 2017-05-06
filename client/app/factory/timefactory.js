

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
function tsSunburst(processed_data,data,timestamp){
    console.log(processed_data);
    console.log("----------MIDDLE---------------");
    var newArray = [];
    // data = slicebyTime(processed_data,timestamp)
    console.log(data); // array of objects
    for (var i = 0 ; i < data.length;i++){ // each subreddit 
        // console.log(processed_data[0].children[i]);
        //  console.log(dateFns.format(data[i].process_datetime,'MM/DD/YYYY') +'___VS___'+''+timestamp);
        // console.log(dateFns.format(data[i].process_datetime,'MM/DD/YYYY')==timestamp);
       if(dateFns.format(data[i].process_datetime,'MM/DD/YYYY')==timestamp){ newArray.push(data[i]);
    }

    }
    // let currentdata = processed_data;
    console.log("----------END---------------");
    console.log(newArray);

// data is filtered by timestamp 
return processed_data;
// return newArray;
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


return {
    // slicebyTime:slicebyTime,
    initNow:initNow,
    convertRaw:convertRaw,
    convertmoment:convertmoment,
    getAvailableTimesFromQueryData:getAvailableTimesFromQueryData,
    tsSunburst:tsSunburst
}

}