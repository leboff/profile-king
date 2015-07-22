'use strict';

describe('Service: profileList', function () {

  // load the service's module
  beforeEach(module('profileKingApp'));

  // instantiate service
  var profileList;
  beforeEach(inject(function (_profileList_) {
    profileList = _profileList_;
  }));

  it('should do something', function () {
    expect(!!profileList).toBe(true);
  });

});
