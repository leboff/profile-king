'use strict';

describe('Service: lokidb', function () {

  // load the service's module
  beforeEach(module('profileKingApp'));

  // instantiate service
  var lokidb;
  beforeEach(inject(function (_lokidb_) {
    lokidb = _lokidb_;
  }));

  it('should do something', function () {
    expect(!!lokidb).toBe(true);
  });

});
