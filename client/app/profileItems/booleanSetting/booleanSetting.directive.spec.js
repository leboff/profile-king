'use strict';

describe('Directive: booleanSetting', function () {

  // load the directive's module and view
  beforeEach(module('profileKingApp'));
  beforeEach(module('app/profileItems/booleanSetting/booleanSetting.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<boolean-setting></boolean-setting>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the booleanSetting directive');
  }));
});