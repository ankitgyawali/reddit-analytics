;
(function() {

 angular
  .module('reddit-analytics')
  .factory('dataDecoratorfactory', dataDecoratorfactory);

 dataDecoratorfactory.$inject = ['CONSTANTS','moment','localStorageService'];

function dataDecoratorfactory(CONSTANTS,moment,localStorageService) {


function rgb2hex(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
}


function normalizeConfidenceForSorting(label,confidence)
{
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


function normalizeSentimentLabel(label)
{
    if(label=="pos"){
      return "positive";
    }
    else if(label == "neg"){

      return "negative";
    }
    else{
      return "neutral";
    }
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
      .range(["black", "#91AA9D"]);
      return color(confidence);

    }
}


function interPolateSentimentColorForWordCloud(label,confidence) {
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
      .range(["black", "beige"]);
      return color(confidence);

    }
}


function interPolateSentimentForWordCloud(label){
  let labelTag, color;
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
  return { labelTag:labelTag, color:color }
}



  return { //All of the data is stored as cookie by utilizing $cookies
    normalizeConfidenceForSorting:normalizeConfidenceForSorting,
    normalizeSentimentLabel: normalizeSentimentLabel,
    interPolateSentimentColor:interPolateSentimentColor,
    rgb2hex:rgb2hex,
    interPolateSentimentForWordCloud:interPolateSentimentForWordCloud,
    interPolateSentimentColorForWordCloud:interPolateSentimentColorForWordCloud
  };
 }
})();