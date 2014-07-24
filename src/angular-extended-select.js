'use strict';

angular.module('wt.select', [])
  .directive('wtSelect', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'template/angular-extended-select.html',
      scope: {
        label: '@',
        options: '='
      },
      require: ['wtSelect', 'ngModel'],
      controller: function ($scope) {
        var ngModelCtrl;

        this.init = function (ngModelController) {
          ngModelCtrl = ngModelController;
          ngModelCtrl.$render = function() {
            $scope.value = ngModelCtrl.$viewValue;
          };
        };

        $scope.valueChanged = function () {
          ngModelCtrl.$setViewValue($scope.value);
          ngModelCtrl.$render();
        };

        $scope.prevValue = function () {
          var index = $scope.options.indexOf($scope.value);
          var nextIndex = (index - 1 + $scope.options.length) % $scope.options.length;
          $scope.value = $scope.options[nextIndex];
          ngModelCtrl.$setViewValue($scope.value);
          ngModelCtrl.$render();
        };

        $scope.nextValue = function () {
          var index = $scope.options.indexOf($scope.value);
          var nextIndex = (index + 1) % $scope.options.length;
          $scope.value = $scope.options[nextIndex];
          ngModelCtrl.$setViewValue($scope.value);
          ngModelCtrl.$render();
        };
      },
      link: function ($scope, element, attrs, ctrls) {
        var selectCtrl = ctrls[0];
        var ngModelCtrl = ctrls[1];
        selectCtrl.init(ngModelCtrl);
      }
    };
  });
