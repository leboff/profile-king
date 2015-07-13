'use strict';

describe('Service: ngForce', function () {

  // load the service's module
  beforeEach(module('profileKingApp'));

  // instantiate service
  var ngForce;
  beforeEach(inject(function (_ngForce_) {
    ngForce = _ngForce_;
  }));

  it('should do something', function () {
    expect(!!ngForce).toBe(true);
  });

});
