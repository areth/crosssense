'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var signalCtrlStub = {
  index: 'signalCtrl.index',
  show: 'signalCtrl.show',
  create: 'signalCtrl.create',
  upsert: 'signalCtrl.upsert',
  patch: 'signalCtrl.patch',
  destroy: 'signalCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var signalIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './signal.controller': signalCtrlStub
});

describe('Signal API Router:', function() {
  it('should return an express router instance', function() {
    expect(signalIndex).to.equal(routerStub);
  });

  describe('GET /api/signals', function() {
    it('should route to signal.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'signalCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/signals/:id', function() {
    it('should route to signal.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'signalCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/signals', function() {
    it('should route to signal.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'signalCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/signals/:id', function() {
    it('should route to signal.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'signalCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/signals/:id', function() {
    it('should route to signal.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'signalCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/signals/:id', function() {
    it('should route to signal.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'signalCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
