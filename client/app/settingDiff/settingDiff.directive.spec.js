'use strict';

describe('Directive: settingDiff', function () {

  // load the directive's module and view
  beforeEach(module('profileKingApp'));
  beforeEach(module('app/settingDiff/settingDiff.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<setting-diff></setting-diff>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the settingDiff directive');
  }));
});