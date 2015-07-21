'use strict';

describe('Directive: profileSetting', function () {

  // load the directive's module and view
  beforeEach(module('profileKingApp'));
  beforeEach(module('app/profileSetting/profileSetting.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile-setting></profile-setting>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the profileSetting directive');
  }));
});