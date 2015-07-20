'use strict';

describe('Directive: applicationVisibilities', function () {

  // load the directive's module and view
  beforeEach(module('profileKingApp'));
  beforeEach(module('app/profileItems/applicationVisibilities/applicationVisibilities.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<application-visibilities></application-visibilities>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the applicationVisibilities directive');
  }));
});