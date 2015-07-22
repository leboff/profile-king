'use strict';

describe('Service: orgs', function () {

  // load the service's module
  beforeEach(module('profileKingApp'));

  // instantiate service
  var orgs;
  beforeEach(inject(function (_orgs_) {
    orgs = _orgs_;
  }));

  it('should do something', function () {
    expect(!!org).toBe(true);
  });

});
