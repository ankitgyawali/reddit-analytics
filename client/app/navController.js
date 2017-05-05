
  angular
    .module('reddit-analytics')
    .controller('navController', navController);

  navController.$inject = ['$scope'];

    function navController($scope) {

  $scope.currentNavItem = 'home';

    }