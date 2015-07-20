'use strict';

describe('Directive: orgList', function () {

  // load the directive's module and view
  beforeEach(module('profileKingApp'));
  beforeEach(module('app/orgList/orgList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<org-list></org-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the orgList directive');
  }));
});