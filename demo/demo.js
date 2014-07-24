'use strict';

angular.module('app', [
    'ngRoute',
    'wt.select'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'view.html',
        controller: 'DemoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('DemoCtrl', function ($scope) {
    $scope.values = ['option1', 'option2', 'option3'];
    $scope.value = $scope.values[1];
  });

