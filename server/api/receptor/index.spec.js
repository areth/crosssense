'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var receptorCtrlStub = {
  index: 'receptorCtrl.index',
  show: 'receptorCtrl.show',
  create: 'receptorCtrl.create',
  upsert: 'receptorCtrl.upsert',
  patch: 'receptorCtrl.patch',
  destroy: 'receptorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var receptorIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './receptor.controller': receptorCtrlStub
});

describe('Receptor API Router:', function() {
  it('should return an express router instance', function() {
    expect(receptorIndex).to.equal(routerStub);
  });

  describe('GET /api/receptors', function() {
    it('should route to receptor.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'receptorCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/receptors/:id', function() {
    it('should route to receptor.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'receptorCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/receptors', function() {
    it('should route to receptor.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'receptorCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/receptors/:id', function() {
    it('should route to receptor.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'receptorCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/receptors/:id', function() {
    it('should route to receptor.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'receptorCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/receptors/:id', function() {
    it('should route to receptor.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'receptorCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
