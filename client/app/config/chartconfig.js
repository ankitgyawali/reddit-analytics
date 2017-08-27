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
    SUNBURST_CHART:  {
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

    }, // Sunburst chart
    CATEGORY_PIE_CHART: {
      chart: {
          type: 'pieChart',
          height: 500,
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: false,
          duration: 500,
          // labelThreshold: 0.01,
          // labelSunbeamLayout: false,

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
            valueFormatter:function (d, i) { return d + " post(s)"; },
            keyFormatter:function (d, i) { return "<b>"+ d + "</b>"; },
            fixedTop: null,
            offset: {
              left: 0,
              top: 0
            },
            hidden: true,
            data: null,
            id: "nvtooltip-76318"
          },
          legend: {
              width: 500,
              margin: {
                  top: 5,
                  right: 35,
                  bottom: 5,
                  left: 0
              }
          }
      }
  }

    
        
});


})();
