angular
.module('reddit-analytics')
.factory('timefactory', timefactory);

timefactory.$inject = ['CONSTANTS', 'moment', 'localStorageService', 'dataProcessor'];

function timefactory(CONSTANTS, moment, localStorageService, dataProcessor) {

// Return times
function getAvailableTimesFromQueryData(processed_data) {
    return (processed_data.map(function(eachmap) {
                return moment(eachmap.process_datetime)
            })
            .sort(function(a, b) {
                return b - a;
            }))
        .map(function(eachmap) {
            return convertmoment(moment(eachmap));
        });
}

function timeSlicer(processed_data, data, timestamp) { // GROUP BY DAY AND SORT HERE??
    var newArray = [];
    for (var i = 0; i < data.length; i++) { // each subreddit 
        if (dateFns.format(data[i].process_datetime, 'MM/DD/YYYY') == timestamp) {
            data[i].combiner = dateFns.format(data[i].process_datetime, 'MM/DD/YYYY');
            newArray.push(data[i]);
        }
    }
    return newArray;
}

function timeSlicerWordCloud(data, timestamp) {
    let newArray = [];
    for (let i = 0; i < data.length; i++) { // each subreddit 
        if (dateFns.format(data[i].process_datetime, 'MM/DD/YYYY') == timestamp) {
            newArray.push(data[i]);
        }
    }
    return newArray;
}

function initNow() {
    return moment(new Date()).format('MMMM Do, h:mm a ddd');
}

function convertRaw(rawdate) {
    return moment(rawdate).format('MMMM Do, h:mm a ddd');
}

function convertmoment(momentdate) {
    return moment(momentdate).format('MMMM Do, h:mm a ddd');
}

function wordcloudslice(wordclouddata, subreddit) {
    let newData = []
    for (let i = 0; i < wordclouddata.length; i++) {
        // console.log(wordclouddata[i].subreddit == subreddit)
        if (wordclouddata[i].subreddit == subreddit) {
            newData.push(wordclouddata[i]);
        }
    }
    return newData;

}
return {
    // slicebyTime:slicebyTime,
    initNow: initNow,
    convertRaw: convertRaw,
    convertmoment: convertmoment,
    getAvailableTimesFromQueryData: getAvailableTimesFromQueryData,
    timeSlicer: timeSlicer,
    timeSlicerWordCloud: timeSlicerWordCloud,
    wordcloudslice: wordcloudslice
}
}