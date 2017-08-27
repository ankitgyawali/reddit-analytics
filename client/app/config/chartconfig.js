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
        // mode: 'size',
        mode: 'count',
        height: 800,
        tooltip: {
            duration: 0,
            gravity: "w",
            distance: 25, 
            snapDistance: 0,
            classes: null,
            chartContainer: null,
            enabled: true,
            hideDelay: 200,
            headerEnabled: true,
            fixedTop: null,
            hidden: true,
            data: null,
            id: "reddit-analytics-sunburst"
            },
            groupColorByParent: true,
            // scale: d3.scale.category20c(),
            color: function(color){ return color; },
            // color: d3.scale.category20c(),
            // duration: 250,
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
