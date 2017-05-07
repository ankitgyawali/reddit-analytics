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
  .factory('chartfactory', chartfactory);

   chartfactory.$inject = ['CONSTANTS','moment','localStorageService','dataProcessor'];

 function chartfactory(CONSTANTS,moment,localStorageService,dataProcessor) {

// Processed_data == array of cut data
// chart data = empty data
// return full data
function sunburst(processed_data,chart_data){

    // Produce entities // PARAMETTERS
    function sortEntities(entity){
entity.sort(function(a, b){
    return parseInt(a.entimentSorter) - parseInt(b.entimentSorter);
});

return entity;
    }

    function entitiesSorterLabel(confidence,label){
    
    if(label=="pos"){
        return parseInt(confidence)+200;
        // return parseInt(confidence)+100;
    }
    else if(label == "neg"){
        return parseInt(confidence)+1000;
        // return parseInt(confidence)*-1;
    }
    else{
        return parseInt(confidence)+500;
        // return parseInt(confidence);
    }
    }

    function makeEntities (reddit_id,process_datetime,entities,p,s){
    let varstoReturn = [];
    for (var m = 0; m  <entities[k].length; m++) { // Loop to populate Entities arcs
        // console.log(entities[k][m])
        varstoReturn.push({
  entimentSorter: entitiesSorterLabel(entities[k][m].confidence,entities[k][m].label),
            name: entitiesSorterLabel(entities[k][m].confidence,entities[k][m].label) + dataProcessor.entitiesLabelMaker(reddit_id,process_datetime,entities[k].length,entities[k][m],m+1,k+m+p+s+''), 
            // name:  dataProcessor.entitiesLabelMaker(reddit_id,process_datetime,entities[k].length,entities[k][m],m+1,k+m+p+s+''), 
            color: dataProcessor.interPolateSentimentColor(entities[k][m].label,parseInt(entities[k][m].confidence)),value: 3,children:[]})
        }
       varstoReturn =  sortEntities(varstoReturn)


    return varstoReturn;
  } 

let categoriesChildren = [];
let sentimentChildren = [];

for (var i = 0; i < processed_data.length; i++) { // Loop through one select [list of reddit_id posts]
    // console.log($scope.xdata[i].subreddit) console.log($scope.xdata[i].reddit_id) console.log($scope.xdata[i].categories)
    // $rootScope._.groupBy($scope.xdata[i].categories, [iteratee=label_id])
        for (var k = 0; k  <processed_data[i].categories.length; k++) { // Loop throught each post in each select
        // console.log(parseInt($scope.xdata[i].categories[k].label_id.toString() + $scope.xdata[i].sentiment[k].confidence))

            chart_data[0].children[processed_data[i].id].children.push // push to sunburst format
            ({
            // sort: function(){ console.log("XX"); return "x"; },            
            // Create Label ids to sort later
            sorter:  dataProcessor.sorterLabel(processed_data[i].categories[k].label_id,processed_data[i].sentiment[k].confidence,processed_data[i].sentiment[k].label),
            
            process_datetime: processed_data[i].process_datetime,
            
            // Create Name for categories
            name:  dataProcessor.categoryLabelMaker(
            processed_data[i].categories[k].label_id,processed_data[i].categories[k].name,
            processed_data[i].process_datetime,processed_data[i].reddit_id[k],
            dataProcessor.sorterLabel(processed_data[i].categories[k].label_id,processed_data[i].sentiment[k].confidence,processed_data[i].sentiment[k].label)),
            
            label_id: processed_data[i].categories[k].label_id,
            
            // Map to rgb array[21]                       
            color: dataProcessor.rgb2hex(CONSTANTS.contrast_set[processed_data[i].categories[k].label_id][0],CONSTANTS.contrast_set[processed_data[i].categories[k].label_id][1],CONSTANTS.contrast_set[processed_data[i].categories[k].label_id][2]),
            
            children: // Each Sentiment Arc

                [{  name: dataProcessor.sentimentLabelMaker(processed_data[i].reddit_id[k],processed_data[i].process_datetime, processed_data[i].sentiment[k] ,i+k),
                    // Get Colo from interpolato
                    color: dataProcessor.interPolateSentimentColor(processed_data[i].sentiment[k].label,parseInt(processed_data[i].sentiment[k].confidence)),
                    // Push entities here
                    children: makeEntities(processed_data[i].reddit_id[k],processed_data[i].process_datetime,processed_data[i].entities,i,k)
                }]
            });
            
        } // Loop one interation of each row posts
} // Loop through row objects

// for(var x=0;x<chart_data[0].children.length;x++){
//     console.log(chart_data[0].children[x].children);
//     // chart_data[0].children[x].

//     chart_data[0].children[x] = chart_data[0].children[x].children.sort(function(a, b){
//     console.log(a.label_id);
        
//     return parseInt(a.label_id) - parseInt(b.label_id);
// });

// // for(var y=0;y<chart_data[0].children[x].children.length;y++){
// // chart_data[0].children[x].children[y].

// // }       
// }

// setItem("thisWeekData",value);
console.log("sort by category");
console.log(chart_data);
return chart_data;
}

  return { //All of the data is stored as cookie by utilizing $cookies
sunburst:sunburst
  };

}

})();