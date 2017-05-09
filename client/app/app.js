;(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('reddit-analytics', [
      'ngRoute', 'nvd3','angularMoment','ngMaterial','LocalStorageModule','angular-d3-word-cloud','ngAnimate', 'toastr'
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
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 1000,
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
      .when('/', {
        templateUrl: 'views/home.html',
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
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'MainController',
        controllerAs: 'main'
        // activetab: 'explore'
        
      })
      .when('/documentation', {
        templateUrl: 'views/documentation.html',
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

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

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

  run.$inject = ['$location'];

  function run($location) {

    // put here everything that you need to run on page load
   
  }


})();