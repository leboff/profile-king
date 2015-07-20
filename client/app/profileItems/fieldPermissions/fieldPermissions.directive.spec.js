'use strict';

describe('Directive: fieldPermissions', function () {

  // load the directive's module and view
  beforeEach(module('profileKingApp'));
  beforeEach(module('app/fieldPermissions/fieldPermissions/fieldPermissions.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<field-permissions></field-permissions>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the fieldPermissions directive');
  }));
});