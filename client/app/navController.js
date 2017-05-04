
  angular
    .module('reddit-analytics')
    .controller('navController', homeController);

  navController.$inject = ['$scope'];

    function homeController($scope) {

  $scope.currentNavItem = 'home';

    }