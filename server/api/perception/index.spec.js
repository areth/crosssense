'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var perceptionCtrlStub = {
  index: 'perceptionCtrl.index',
  add: 'perceptionCtrl.add',
  destroy: 'perceptionCtrl.destroy'
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
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var perceptionIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './perception.controller': perceptionCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Perception API Router:', function() {
  it('should return an express router instance', function() {
    expect(perceptionIndex).to.equal(routerStub);
  });

  describe('GET /api/perceptions', function() {
    it('should route to perception.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'perceptionCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/perceptions', function() {
    it('should route to perception.controller.add', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'perceptionCtrl.add')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/perceptions/:id', function() {
    it('should route to perception.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.isAuthenticated', 'perceptionCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
