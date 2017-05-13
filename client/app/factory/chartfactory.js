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

   chartfactory.$inject = ['$timeout','CONSTANTS','moment','localStorageService','dataProcessor','dataDecoratorfactory'];

 function chartfactory($timeout,CONSTANTS,moment,localStorageService,dataProcessor,dataDecoratorfactory) {

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
        // return parseInt(confidence)+200;
        return parseInt(confidence)+100;
    }
    else if(label == "neg"){
        // return parseInt(confidence)+1000;
        return parseInt(confidence)*-1;
    }
    else{
        // return parseInt(confidence)+500;
        return parseInt(confidence);
    }
    }

    function makeEntities (reddit_id,process_datetime,entities,p,s){
    let varstoReturn = [];
    for (let m = 0; m  <entities[k].length; m++) { // Loop to populate Entities arcs
        // console.log(entities[k][m])
        varstoReturn.push({
  entimentSorter: entitiesSorterLabel(entities[k][m].confidence,entities[k][m].label),
            name: entitiesSorterLabel(entities[k][m].confidence,entities[k][m].label) + dataProcessor.entitiesLabelMaker(reddit_id,process_datetime,entities[k].length,entities[k][m],m+1,k+m+p+s+''), 
            // name:  dataProcessor.entitiesLabelMaker(reddit_id,process_datetime,entities[k].length,entities[k][m],m+1,k+m+p+s+''), 
            color: dataDecoratorfactory.interPolateSentimentColor(entities[k][m].label,parseInt(entities[k][m].confidence)),value: 3,children:[]})
        }
       varstoReturn =  sortEntities(varstoReturn)


    return varstoReturn;
  } 


var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

// => {3: ["one", "two"], 5: ["three"]}
let grouped = groupBy(processed_data, 'subreddit');
// Storage ls factory??
let groupedx = [];
for (var key in grouped) {
  if (grouped.hasOwnProperty(key)) {

    if(grouped[key].length!=1){
        let first = grouped[key][0];
        // console.log(first);
        for(let i=1; i<grouped[key].length;i++){ //for each post
                grouped[key][0].reddit_id = grouped[key][0].reddit_id.concat(grouped[key][i].reddit_id);
                grouped[key][0].sentiment = grouped[key][0].sentiment.concat(grouped[key][i].sentiment);
                grouped[key][0].categories = grouped[key][0].categories.concat(grouped[key][i].categories);
                grouped[key][0].entities = grouped[key][0].entities.concat(grouped[key][i].entities);
            
                // console.log(grouped[key][0]);
                // console.log("vs");
                // console.log(grouped[key][i]);
                // for(let j=0;j<grouped[key][i].reddit_id.length;j++){
                    // delete grouped[key][i];
                // }
        }

    }

    console.log(key + " -> " + grouped[key]);
  
groupedx.push(grouped[key][0]);
}

processed_data = groupedx;


for (let e = 0; e < processed_data.length; e++) {
        
//  { id: "0", subreddit: "worldnews", process_datetime: "2017-05-07T05:07:10.000Z", 
//reddit_id: Array[14], sentiment: Array[14], entities: Array[14], categories: Array[14] }
console.log(processed_data[e]);
console.log("______________________vs______________________");


let sorted  = sortByCategory(processed_data[e].reddit_id,processed_data[e].sentiment,processed_data[e].entities,processed_data[e].categories);

processed_data[e].reddit_id = sorted.reddit_id;
processed_data[e].sentiment = sorted.sentiment;
processed_data[e].entities = sorted.entities;
processed_data[e].categories = sorted.categories;
console.log(processed_data[e]);
// //1) combine the arrays:

}


}

function sortByCategory(reddit_id, sentiment, entities, categories){
    // let valToReturn = { reddit_id = [], sentiment = [], entities = [], categories = []   }
    let valToReturn = { reddit_id:reddit_id, sentiment:sentiment, entities:entities, categories:categories  }
    let sreddit_id = [], ssentiment = [], sentities = [], scategories = [];
// console.log(valToReturn.categories);


    let temp = [];
    for (var i = 0; i < reddit_id.length; i++) { 
        temp.push({reddit_id:reddit_id[i],sentiment:sentiment[i], entities:entities[i],
            categories:categories[i]
            // ,label_id_c:categories[i].label_id
          })
    }


// console.log(temp);

// console.log("_________SORT BY THESE___");
    // temp = _.sortBy(temp, 'label_id_c');
       temp = temp.sort(function(a, b){
        //    console.log(a.categories.label_id);
    return parseInt(a.categories.label_id) > parseInt(b.categories.label_id);
});
console.log(temp);

    for (var q = 0; q < temp.length; q++) { 
        sreddit_id.push(temp[q].reddit_id);
        ssentiment.push(temp[q].sentiment);
        sentities.push(temp[q].entities);
        scategories.push(temp[q].categories);
        // temp.push({reddit_id:reddit_id[i],sentiment:sentiment[i], entities:entities[i],categories:categories[i]  })
        // temp.push({reddit_id:reddit_id[i],sentiment:sentiment[i], entities:entities[i],categories:categories[i]  })
    }
    
    valToReturn.reddit_id = sreddit_id;
    valToReturn.sentiment = ssentiment;
    valToReturn.entities = sentities;
    valToReturn.categories = scategories;
// console.log(valToReturn.categories);
    
    return valToReturn;
}

console.log(processed_data);
console.log("pre processing of sunbusst");
let temp = []
console.log(groupBy(processed_data, 'subreddit'));

for (var i = 0; i < processed_data.length; i++) { // Loop through one select [list of reddit_id posts]
    // console.log($scope.xdata[i].subreddit) console.log($scope.xdata[i].reddit_id) console.log($scope.xdata[i].categories)
    // $rootScope._.groupBy($scope.xdata[i].categories, [iteratee=label_id])

    // console.log(processed_data[i].categories)

        for (var k = 0; k  <processed_data[i].categories.length; k++) { // Loop throught each post in each select
        // console.log(parseInt($scope.xdata[i].categories[k].label_id.toString() + $scope.xdata[i].sentiment[k].confidence))

            chart_data[0].children[processed_data[i].id].children.push // push to sunburst format
            ({
            // sort: function(){ console.log("XX"); return "x"; },            
            // Create Label ids to sort later
            // sorter:  dataProcessor.sorterLabel(processed_data[i].categories[k].label_id,processed_data[i].sentiment[k].confidence,processed_data[i].sentiment[k].label),
            
            process_datetime: processed_data[i].process_datetime,
            
            // Create Name for categories
            name:  dataProcessor.categoryLabelMaker(
            processed_data[i].categories[k].label_id,processed_data[i].categories[k].name,
            processed_data[i].process_datetime,processed_data[i].reddit_id[k],
            dataProcessor.sorterLabel(processed_data[i].categories[k].label_id,processed_data[i].sentiment[k].confidence,processed_data[i].sentiment[k].label)),
            
            label_id: processed_data[i].categories[k].label_id,
            
            // Map to rgb array[21]                       
            color: dataDecoratorfactory.rgb2hex(CONSTANTS.contrast_set[processed_data[i].categories[k].label_id][0],CONSTANTS.contrast_set[processed_data[i].categories[k].label_id][1],CONSTANTS.contrast_set[processed_data[i].categories[k].label_id][2]),
            
            children: // Each Sentiment Arc
                // makesentiment(processed_data[i].reddit_id[k],processed_data[i].process_datetime,processed_data[i].sentiment[k],processed_data[i].entities,i,k)

    [{  name: dataProcessor.sentimentLabelMaker(processed_data[i].reddit_id[k],processed_data[i].process_datetime, processed_data[i].sentiment[k] ,i+k),
                    // Get Colo from interpolato
                    color: dataDecoratorfactory.interPolateSentimentColor(processed_data[i].sentiment[k].label,parseInt(processed_data[i].sentiment[k].confidence)),
                    // Push entities here
                    children: makeEntities(processed_data[i].reddit_id[k],processed_data[i].process_datetime,processed_data[i].entities,i,k)
        }]

            });
            
        } // Loop one interation of each row posts
} // Loop through row objects
// function makesentiment(reddit_id,process_datetime,sentiment,entities,i,k){


// setItem("thisWeekData",value);
console.log("sort by category");
    console.log(chart_data[0].children[0]);

//   $timeout( function(){
// return chart_data;
            
//         }, 0 );
return chart_data;


}

  return { //All of the data is stored as cookie by utilizing $cookies
sunburst:sunburst
  };

}

})();