'use strict';

describe('Service: profileColumns', function () {

  // load the service's module
  beforeEach(module('profileKingApp'));

  // instantiate service
  var profileColumns;
  beforeEach(inject(function (_profileColumns_) {
    profileColumns = _profileColumns_;
  }));

  it('should do something', function () {
    expect(!!profileColumns).toBe(true);
  });

});
