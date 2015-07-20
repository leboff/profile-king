'use strict';

describe('Controller: OrgCtrl', function () {

  // load the controller's module
  beforeEach(module('profileKingApp'));

  var OrgCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrgCtrl = $controller('OrgCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
