

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
function tsSunburst(processed_data,timestamp){
    console.log(timestamp)
    console.log(processed_data);
    console.log("tsungurst");
return processed_data;
}

// function slicebyTime(data){
function slicebyTime(data,time){
console.log("data");
// console.log(time);
// console.log(time);
return data;
}

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
    slicebyTime:slicebyTime,
    initNow:initNow,
    convertRaw:convertRaw,
    convertmoment:convertmoment,
    getAvailableTimesFromQueryData:getAvailableTimesFromQueryData,
    tsSunburst:tsSunburst
}

}