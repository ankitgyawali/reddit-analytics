;(function() {

  angular
  	.module('reddit-analytics')
    .constant('CONSTANTS', {
			'ENVIRONMENT': 'DEV',
			// 'ENVIRONMENT': 'PROD',			
			'NUMBER_OF_WORDS_IN_WORDCLOUD': 50,
      		'API_URL': { DEV: 'http://localhost:3002', PROD: 'http://ankitgyawali.com:3049'},
			// 'reddit' :  ['worldnews','politics','videos','askreddit'],
			// 'reddit' :  ['worldnews','politics','videos','askreddit'],
			'reddit' :  ['all', 'askreddit','politics','videos','worldnews'],
			'color' :  ['#FFwede','blue','green','maroon','purple','red'],
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
			"contrast_set": 

		[
			[240,163,255],[0,117,220],[153,63,0],[76,0,92],[25,25,25],[0,92,49],[43,206,72],[255,204,153],[240,163,255],[128,128,128],[148,255,181],[143,124,0],[157,204,0],[194,0,136],[0,51,128],[255,164,5],[255,168,187],[66,102,0],[255,0,16],[94,241,242],[0,153,143],[224,255,102],[116,10,255],[153,0,0],[255,255,128],[255,255,0],[255,80,5]

		]
			
    });


})();
