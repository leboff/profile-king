'use strict';

describe('Directive: classAccesses', function () {

  // load the directive's module and view
  beforeEach(module('profileKingApp'));
  beforeEach(module('app/profileItems/classAccesses/classAccesses.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<class-accesses></class-accesses>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the classAccesses directive');
  }));
});