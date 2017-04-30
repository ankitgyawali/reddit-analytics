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
      'API_URL': 'http://localhost:3000/',
			'reddit' :  ['worldnews','politics','videos','askreddit'],
			'color' :  ['#FFwede','blue','green','maroon','purple'],
			'category_mapping' : [
			 
			"ARTS_AND_ENTERTAINMENT",
			"TRAVEL", 
			"BUSINESS", 
			"AUTOMOTIVE",
			"EDUCATION",
			"CAREERS",
			"FOOD_AND_DRINK", 
			"FAMILY_AND_PARENTING",
			"HOBBIES_AND_INTERESTS", 
			"HEALTH_AND_FITNESS",
			"LAW_GOVERNMENT_AND_POLITICS", 
			"HOME_AND_GARDEN", 
			"PERSONAL_FINANCE",
			"PETS", 
			"REAL_ESTATE", 
			"RELIGION_AND_SPIRITUALITY", 
			"SCIENCE",
			"SPORTS",
			"SOCIETY",
			"TECHNOLOGY_AND_COMPUTING",
			"STYLE_AND_FASHION"
			],
    });


})();
