;(function() {


	/**
	 * Place to store API URL or any other constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
    */

angular
.module('reddit-analytics')
.constant('CHARTCONFIG', {
    'SUNBURST_CHART':  {
        chart: {
        type: 'sunburstChart',
        mode: 'count',
        // mode: 'count',
        height: 800,

     sunburst: {
                    dispatch: {
                        chartClick: function(e) {       
                          // console.log($scope.data)
                            updateBreadcrumbs($scope.data.reverse(), '')
                        },
                        elementMouseover: function (e) {
                            function getElementNames(obj) {
                                var result = [obj];
                                if (obj.parent) {
                                    result = result.concat(getElementNames(obj.parent));
                                }
                                return result;
                            }
                            var sequenceArray = getElementNames(e.data);
                            // $scope.data = sequenceArray;
                        }
                    }
                },
        // showLabels: true,
        // labelFormat: function (d){ return d.name;},
        labelThreshold: 0.1,
        tooltip: {
            duration: 0,
            gravity: "w",
            distance: 25, 
            snapDistance: 0,
            classes: null,
            chartContainer: null,
            enabled: true,
            valueFormatter: function (d) {   return  '';  },
            headerFormatter: function (d) {   return '';  },
            //headerFormatter: function (d) {   return '<span style="font-size:80%"><b>'+ "reddit-analytics" +"</b></span>";  },
            hideDelay: 200,
            headerEnabled: true,
            fixedTop: null,
            hidden: true,
            data: null,
            id: "reddit-analytics-sunburst"
            },
            groupColorByParent: true,
            scale: d3.scale.category20c(),
            color: function(color){ return color; },
            // color: d3.scale.category20c(),
            duration: 250,
            sort : (function (d1, d2){
              console.log("CCCCCCCCCCCCCCCC");
              return d1.label_id > d2.label_id; }),
            caption:{enable:true,text:"Reddit",css:{width:"600px"}},
          styles: {
            classes: {
              "with-3d-shadow": true,
              "with-transitions": true,
              gallery: false
            },
            css: {}
          }    
        },

    } // Sunburst chart


    
        
});


})();
