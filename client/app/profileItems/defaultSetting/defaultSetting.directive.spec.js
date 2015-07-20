'use strict';

describe('Directive: defaultSetting', function () {

  // load the directive's module and view
  beforeEach(module('profileKingApp'));
  beforeEach(module('app/profileItems/defaultSetting/defaultSetting.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<default-setting></default-setting>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the defaultSetting directive');
  }));
});