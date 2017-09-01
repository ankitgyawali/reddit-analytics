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
    },
    CATEGORY_PIE_CHART: {
      chart: {
          type: 'pieChart',
          height: 500,
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: false,
          duration: 500,
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
  },
  SENTIMENT_CHART: {
    chart: {
        type: 'multiBarHorizontalChart',
        height: 450,
        valueFormat: function(d){ return d },
        x: function(d){ return d.label;},
        y: function(d){ return d.value;},
        showControls: false,
        showValues: true,
        duration: 500,
        xAxis: {
            axisLabel: 'Dates',
            // axisLabelDistance: 0,
            showMaxMin: false,
            tickFormat: function(d){
                return dateFns.format(new Date(d),'MM/DD');
            }
        },
        yAxis: {
            axisLabel: '# of Posts',
            tickFormat: function(d){
                return d;
            }
        }
    }
  },
  DISPERSION_CHART: {
    chart: {
        tooltip: {
            valueFormatter: function (d, i) {
                return d;
            },
            keyFormatter: function (d, i) {
                return d + " occurences - ";
            }
        },
        type: 'scatterChart',
        height: 500,
        width: 800,
        showDistX: true,
        showDistY: true,
        tooltipContent: function(key) {
            return '<h3>' + key + '</h3>';
        },
        duration: 350,
        yAxis: {
            axisLabel: 'Count',
            tickFormat: function(d){
                return d;
            },
            axisLabelDistance: -5
        },
        zoom: {
            //NOTE: All attributes below are optional
            enabled: false,
            scaleExtent: [1, 10],
            useFixedDomain: false,
            useNiceScale: false,
            horizontalOff: false,
            verticalOff: false,
            unzoomEventType: 'dblclick.zoom'
        }
    }
}
});
})();
