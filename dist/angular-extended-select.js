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

angular.module("wt.select").run(["$templateCache", function($templateCache) {

  $templateCache.put("template/angular-extended-select.html",
    "<span>\n" +
    "    <label>{{label}} {{ngOpts}}</label>\n" +
    "    <select ng-model=\"value\" ng-options=\"opt for opt in options\"\n" +
    "            ng-change=\"valueChanged();\"\n" +
    "            class=\"form-control\"></select>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"prevValue();\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"nextValue();\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "    </button>\n" +
    "</span>"
  );

}]);

angular.module("wt.select").run(["$templateCache", function($templateCache) {

  $templateCache.put("template/angular-extended-select.html",
    "<span>\n" +
    "    <label>{{label}}</label>\n" +
    "    <select ng-model=\"value\" ng-options=\"opt for opt in options\"\n" +
    "            ng-change=\"valueChanged();\"\n" +
    "            class=\"form-control\"></select>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"prevValue();\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"nextValue();\">\n" +
    "        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "    </button>\n" +
    "</span>"
  );

}]);
