'use strict';

describe('Service: diff', function () {

  // load the service's module
  beforeEach(module('profileKingApp'));

  // instantiate service
  var diff;
  beforeEach(inject(function (_diff_) {
    diff = _diff_;
  }));

  it('should do something', function () {
    expect(!!diff).toBe(true);
  });

});
