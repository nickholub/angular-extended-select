'use strict';

describe('Directive: dtSelect', function () {

  var element, scope, rootScope, compile;

  beforeEach(module('wt.select', function($provide) {
    // Inject dependencies
  }));

  beforeEach(inject(function ($compile, $rootScope) {
    rootScope = $rootScope;
    compile = $compile;

    scope = $rootScope.$new();
    scope.values = ['option1', 'option2', 'option3'];
    scope.value = scope.values[0];

    // Define and compile the element
    element = angular.element('<span wt-select label="Extended Select" ng-model="value" options="values"></span>');
    element = compile(element)(scope);
    scope.$digest();
  }));

  it('should render label', function() {
    expect(element.html()).toContain('Extended Select');
  });

});