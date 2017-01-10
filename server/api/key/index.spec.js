'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var keyCtrlStub = {
  index: 'keyCtrl.index',
  set: 'keyCtrl.set',
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

var routerStub = {
  get: sinon.spy(),
  post: sinon.spy()
};

// require the index with our stubbed out modules
var keyIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './key.controller': keyCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Key API Router:', function() {
  it('should return an express router instance', function() {
    expect(keyIndex).to.equal(routerStub);
  });

  describe('GET /api/keys', function() {
    it('should route to key.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'keyCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/keys', function() {
    it('should route to key.controller.set', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'keyCtrl.set')
        ).to.have.been.calledOnce;
    });
  });
});
