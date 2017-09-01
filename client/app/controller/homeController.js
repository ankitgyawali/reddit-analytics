;(function() {

  angular
    .module('reddit-analytics')
    .controller('homeController', homeController);

  homeController.$inject = ['$timeout','QueryService','$scope','CONSTANTS','$http','dataProcessor','$rootScope','moment'
  ,'$route','localstoragefactory','CHARTCONFIG','chartfactory','timefactory','lodash','dataDecoratorfactory'];

  function homeController($timeout,QueryService,$scope,CONSTANTS,$http,dataProcessor,$rootScope,moment,
  $route,localstoragefactory,CHARTCONFIG,chartfactory,timefactory,_,dataDecoratorfactory) {

    $scope.data = {};
    $scope.elementObjects = {};
    $scope.chartLabels = {
        name: _.map(CONSTANTS.category_mapping, function(category){
            return dataDecoratorfactory.categoryPrettify(category);
        }),
        mapping: _.map(CONSTANTS.contrast_set, function(rgb){
            return dataDecoratorfactory.rgb2hex(rgb[0],rgb[1],rgb[2])
        })
    }
    $scope.options = CHARTCONFIG.SUNBURST_CHART;
    $scope.$route = $route;
    $scope.currentNavItem = 'home';
    $scope.now = timefactory.initNow();
    $scope.currentBlob = new Date();

    // Sun burst chart empty data goes here
    $scope.createEmptyData = function(){
    let emptyData = [{
    name: "<b>Reddit</b><br><span style='font-size:80%'> Current Time:<br>" + dataProcessor.momentFormatter(new Date())+ "</span>"
    + dataProcessor.attachHidden("Reddit"),
    // Viewing blob of date newDate()
    height: 200,
    // size: 4,
    color: "grey",
    children: []}];

    _.forEach(CONSTANTS.reddit, function(element, index){
        emptyData[0].children.push({ 
            name: "/r/"+element + dataProcessor.attachHidden("Reddit"),
            index: index,
            color:CONSTANTS.color[index],
            children:[]})        
    })
    return emptyData;
    } 

    localstoragefactory.set("sunburstEmpty",  $scope.createEmptyData() );
    $scope.data = localstoragefactory.get("sunburstEmpty");
    $scope.selectedItemChanged = function(val){
        localstoragefactory.set('sunburstData',timefactory.timeSlicer($scope.data,$scope.processed_data,val));  
        $timeout(function() {
            $scope.data = chartfactory.sunburst(localstoragefactory.get('sunburstData'),localstoragefactory.get('sunburstEmpty'));
            console.log($scope.data);
            $scope.$apply();
            $scope.api.updateWithData($scope.data);
        }, 100);
        $scope.api.refresh();
        $scope.api.updateWithData($scope.data);
    }
    $timeout(function() {
            $scope.processed_data = localstoragefactory.get('processedData'); // Processed query data
            $scope.timeOptions  =  localstoragefactory.get("unique_timestamps");
            localstoragefactory.set('sunburstData',timefactory.timeSlicer(localstoragefactory.get("sunburstEmpty"),$scope.processed_data,$scope.timeOptions[0]));
            $scope.data = chartfactory.sunburst(localstoragefactory.get('sunburstData'), $scope.createEmptyData()); // Create chart data
            $scope.selectedItemChanged($scope.timeOptions[0]);
        
        }, 100);
}
})();