;(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('reddit-analytics', [
      'ngRoute', 'ngLodash', 'nvd3','angularMoment','ngMaterial','LocalStorageModule','angular-d3-word-cloud','ngAnimate', 'toastr'
    ])
    .config(config)
      .constant('_', window._)

         .config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('ra')
    .setStorageType('localStorage')
    .setNotify(true, true)
})

.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,    
    newestOnTop: true,
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body',
    closeButton: true,
    showDuration: 500,
    hideDuration: 1000,
    timeOut: 2500,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    progressBar: true
    
  });
})
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {

// {
//   "closeButton": false,
//   "debug": false,
//   "newestOnTop": false,
//   "progressBar": false,
//   "positionClass": "toast-top-right",
//   "preventDuplicates": false,
//   "onclick": null,
//   "showDuration": "300",
//   "hideDuration": "1000",
//   "timeOut": "5000",
//   "extendedTimeOut": "1000",
//   "showEasing": "swing",
//   "hideEasing": "linear",
//   "showMethod": "fadeIn",
//   "hideMethod": "fadeOut"
// }

 


     $rootScope._ = window._;
  });

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/sunburst', {
        templateUrl: 'views/sunburst.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'home'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'contact'
        
      })
      .when('/', {
        templateUrl: 'views/wordcloud.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'explore'
        
      })
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'documentation'
        
      })
      .when('/sentiment', {
        templateUrl: 'views/sentiment.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'documentation'
        
      })
      .when('/entity', {
        templateUrl: 'views/entity.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'documentation'
      })
      .when('/documentation', {
        templateUrl: 'views/documentation.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'documentation'
      })
      .when('/bydate', {
        templateUrl: 'views/bydate.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'documentation'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('authInterceptor');

  }


  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   * 
   */
  angular
    .module('reddit-analytics')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$location'];

  function authInterceptor($rootScope, $q, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }


  /**
   * Run block
   */
  angular
    .module('reddit-analytics')
    .run(run);

  run.$inject = ['$location', 'CONSTANTS','dataProcessor','localstoragefactory','$http','lodash'];

  function run($location, CONSTANTS, dataProcessor, localstoragefactory, $http, notificationFactory, _) {
    function clone(data){
      return JSON.parse(JSON.stringify(data));
    }

    // Check if data is freshed
    let found = false;
    if(localstoragefactory.get('processedData')){
      for(let i=0;i<localstoragefactory.get('processedData').length;i++){
        if(dateFns.format(new Date(localstoragefactory.get('processedData')[i].process_datetime),'MM/DD') == dateFns.format(new Date(),'MM/DD')){
          found = true;
          break;
        }
      }
    }

    // If data is not fresh request new data
    if
    (localstoragefactory.keys().indexOf("processedData") == 0 // Local Storage is wonky
    ||
    (localstoragefactory.get('processedData') && localstoragefactory.get('processedData').length < 10) // Data is wonky
    ||
    !found) // Data is old
    {


      var request = new XMLHttpRequest();
      request.open('POST', '/initialize' , false); 
      request.send(null);
      let data = JSON.parse(request.responseText);
      // Initialize first by trying to store data - this week raw data
      localstoragefactory.initialize(clone(data)); //thisWeekData
      localstoragefactory.set('initial_data_from_api', clone(data)); // Create a copy 
      // Process data and save it
      localstoragefactory.set('processedData',dataProcessor.processThisWeek(data))

        //   $http({
        //     method: 'POST',
        //     url: CONSTANTS.API_URL[CONSTANTS.ENVIRONMENT]+'/initialize',
        //     // set the headers so angular passing info as form data (not request payload)
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).success(function(data, status, headers, config) {

        //         // Initialize first by trying to store data - this week raw data
        //         localstoragefactory.initialize(clone(data)); //thisWeekData
        //         localstoragefactory.set('initial_data_from_api', clone(data)); // Create a copy 
        //         // Process data and save it
        //         localstoragefactory.set('processedData',dataProcessor.processThisWeek(data))
        // })
        // .error(function(data, status, headers, config) {
        //   notificationFactory.error("Something went wrong while fetching data from API. Report admin.")
        //   notificationFactory.error(status)
        // });

      } else {
          // Main flow --
          // Set processed data with a fresh clone copy so every time a new controller tries to draw it gets a new data
          localstoragefactory.set('processedData',dataProcessor.processThisWeek(clone(localstoragefactory.get('initial_data_from_api'))));
      }
  }


})();