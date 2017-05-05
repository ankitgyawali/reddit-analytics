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
        height: 800,
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
            id: "nvtooltip-42549"
            },
            groupColorByParent: true,
            scale: d3.scale.category20c(),
            color: function(color){ return color; },
            // color: d3.scale.category20c(),
            duration: 250,
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
