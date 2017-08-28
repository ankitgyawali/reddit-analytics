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
  .controller('sentimentController', sentimentController);

  sentimentController.$inject = ['toastr','$timeout', 'dataDecoratorfactory','timefactory','localstoragefactory','$element','$window','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment','$route','CHARTCONFIG','chartfactory','lodash'];

function sentimentController(toastr,$timeout, dataDecoratorfactory, timefactory,localstoragefactory,$element,$window,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,$route,CHARTCONFIG,chartfactory,_) {
 
  // Initialize Default Vals
  $scope.subredditoptions = CONSTANTS.reddit.sort();
  $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");  
  $scope.currentTime = $scope.timeOptions[0];
  $scope.now = timefactory.initNow();   
  $scope.currentReddit = $scope.subredditoptions[0];

  $scope.options = {
    chart: {
        type: 'multiBarHorizontalChart',
        height: 450,
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showControls: true,
        showValues: true,
        duration: 500,
        xAxis: {
            showMaxMin: false
        },
        yAxis: {
            axisLabel: 'Values',
            tickFormat: function(d){
                return d3.format(',.2f')(d);
            }
        }
    }
};

$scope.convertToGraph = function(data){
    let tempData = {};
    let dataToReturn = [];

    let final_data = {
    pos: { key: "Positive", color:"green", values:  [] },
    neu: { key: "Neutral", color:"grey", values:  [] },
    neg: { key: "Negative", color:"red", values:  [] }
    }
    _.map(data, function(each_post){
        // console.log(each_post.reddit_id)
        // tempData[each_post.sentiment.label] =  (tempData[each_post.categories.name] || 0) + 1;
        final_data[each_post.sentiment.label].values.push([
            new Date(each_post.process_datetime).getTime(),
            each_post.sentiment.confidence])
        
        
        // if(each_post.sentiment.label=="pos"){
        // dataToReturn.push()
        // }
        // , each_post.sentiment.confidence
      });
  
    
    // _.forEach(tempData,function (val,key) {
    //   dataToReturn.push({ key:dataDecoratorfactory.categoryPrettify(key), y: val})
    // })

    // return [final_data.pos, final_data.neu, final_data.neg ];
    return [final_data.pos ];
    // return data;
}

  $scope.cutbyReddit = function(reddit){
    $scope.currentReddit = reddit;
    localstoragefactory.set('senTimentReddit',reddit);  // <<-- Initialized current reddit 1
    $scope.cut_posts = dataProcessor.sliceByReddit(localstoragefactory.get('processedData'),
    reddit
    // localstoragefactory.get('sentimentTime')
    );

    // console.log($scope.cut_posts)
$scope.data = ($scope.convertToGraph($scope.cut_posts));

    // $scope.data = $scope.nvCompatibleData($scope.cut_posts)
  }

  // Do stuff once everything loads
  $timeout(function() {
    localstoragefactory.set('sentimentTime',$scope.timeOptions[0]);  // <--- Initialize first time
  $scope.cutbyReddit(CONSTANTS.reddit[0]);
//   angular.element("#radio_cat_0").click();
//   $scope.selectedItemChanged($scope.timeOptions[0]);  

$scope.data = ($scope.convertToGraph($scope.cut_posts));
// $scope.data = [
//     {
//         key: "Short",
//         values: [ [ 1083297600000 , -0.77078283705125] , [ 1085976000000 , -1.8356366650335] , [ 1088568000000 , -5.3121322073127] , [ 1091246400000 , -4.9320975829662] , [ 1093924800000 , -3.9835408823225] , [ 1096516800000 , -6.8694685316805] , [ 1099195200000 , -8.4854877428545] , [ 1101790800000 , -15.933627197384] , [ 1104469200000 , -15.920980069544] , [ 1107147600000 , -12.478685045651] , [ 1109566800000 , -17.297761889305] , [ 1112245200000 , -15.247129891020] , [ 1114833600000 , -11.336459046839] , [ 1117512000000 , -13.298990907415] , [ 1120104000000 , -16.360027000056] , [ 1122782400000 , -18.527929522030] , [ 1125460800000 , -22.176516738685] , [ 1128052800000 , -23.309665368330] , [ 1130734800000 , -21.629973409748] , [ 1133326800000 , -24.186429093486] , [ 1136005200000 , -29.116707312531] , [ 1138683600000 , -37.188037874864] , [ 1141102800000 , -34.689264821198] , [ 1143781200000 , -39.505932105359] , [ 1146369600000 , -45.339572492759] , [ 1149048000000 , -43.849353192764] , [ 1151640000000 , -45.418353922571] , [ 1154318400000 , -44.579281059919] , [ 1156996800000 , -44.027098363370] , [ 1159588800000 , -41.261306759439] , [ 1162270800000 , -47.446018534027] , [ 1164862800000 , -53.413782948909] , [ 1167541200000 , -50.700723647419] , [ 1170219600000 , -56.374090913296] , [ 1172638800000 , -61.754245220322] , [ 1175313600000 , -66.246241587629] , [ 1177905600000 , -75.351650899999] , [ 1180584000000 , -81.699058262032] , [ 1183176000000 , -82.487023368081] , [ 1185854400000 , -86.230055113277] , [ 1188532800000 , -84.746914818507] , [ 1191124800000 , -100.77134971977] , [ 1193803200000 , -109.95435565947] , [ 1196398800000 , -99.605672965057] , [ 1199077200000 , -99.607249394382] , [ 1201755600000 , -94.874614950188] , [ 1204261200000 , -105.35899063105] , [ 1206936000000 , -106.01931193802] , [ 1209528000000 , -110.28883571771] , [ 1212206400000 , -119.60256203030] , [ 1214798400000 , -115.62201315802] , [ 1217476800000 , -106.63824185202] , [ 1220155200000 , -99.848746318951] , [ 1222747200000 , -85.631219602987] , [ 1225425600000 , -63.547909262067] , [ 1228021200000 , -59.753275364457] , [ 1230699600000 , -63.874977883542] , [ 1233378000000 , -56.865697387488] , [ 1235797200000 , -54.285579501988] , [ 1238472000000 , -56.474659581885] , [ 1241064000000 , -63.847137745644] , [ 1243742400000 , -68.754247867325] , [ 1246334400000 , -69.474257009155] , [ 1249012800000 , -75.084828197067] , [ 1251691200000 , -77.101028237237] , [ 1254283200000 , -80.454866854387] , [ 1256961600000 , -78.984349952220] , [ 1259557200000 , -83.041230807854] , [ 1262235600000 , -84.529748348935] , [ 1264914000000 , -83.837470195508] , [ 1267333200000 , -87.174487671969] , [ 1270008000000 , -90.342293007487] , [ 1272600000000 , -93.550928464991] , [ 1275278400000 , -85.833102140765] , [ 1277870400000 , -79.326501831592] , [ 1280548800000 , -87.986196903537] , [ 1283227200000 , -85.397862121771] , [ 1285819200000 , -94.738167050020] , [ 1288497600000 , -98.661952897151] , [ 1291093200000 , -99.609665952708] , [ 1293771600000 , -103.57099836183] , [ 1296450000000 , -104.04353411322] , [ 1298869200000 , -108.21382792587] , [ 1301544000000 , -108.74006900920] , [ 1304136000000 , -112.07766650960] , [ 1306814400000 , -109.63328199118] , [ 1309406400000 , -106.53578966772] , [ 1312084800000 , -103.16480871469] , [ 1314763200000 , -95.945078001828] , [ 1317355200000 , -81.226687340874] , [ 1320033600000 , -90.782206596168] , [ 1322629200000 , -89.484445370113] , [ 1325307600000 , -88.514723135326] , [ 1327986000000 , -93.381292724320] , [ 1330491600000 , -97.529705609172] , [ 1333166400000 , -99.520481439189] , [ 1335758400000 , -99.430184898669] , [ 1338436800000 , -93.349934521973] , [ 1341028800000 , -95.858475286491] , [ 1343707200000 , -95.522755836605] , [ 1346385600000 , -98.503848862036] , [ 1348977600000 , -101.49415251896] , [ 1351656000000 , -101.50099325672] , [ 1354251600000 , -99.487094927489]]
//         ,
//         mean: -60
//     }
// ];


  
}, 0);





  return { //All of the data is stored as cookie by utilizing $cookies
// sunburst:sunburst
  };

}

})();