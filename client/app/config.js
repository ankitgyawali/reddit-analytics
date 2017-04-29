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
    .constant('CONSTANTS', {
      'API_URL': 'http://www.yourAPIurl.com/',
			'reddit' :  ['all','askreddit','politics','videos','worldnews'],
			'color' :  ['#FFwede','blue','green','maroon','purple'],			
    });


})();
