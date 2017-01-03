'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var predictionCtrlStub = {
  index: 'predictionCtrl.index',
  show: 'predictionCtrl.show',
  create: 'predictionCtrl.create',
  upsert: 'predictionCtrl.upsert',
  patch: 'predictionCtrl.patch',
  destroy: 'predictionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var predictionIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './prediction.controller': predictionCtrlStub
});

describe('Prediction API Router:', function() {
  it('should return an express router instance', function() {
    expect(predictionIndex).to.equal(routerStub);
  });

  describe('GET /api/predictions', function() {
    it('should route to prediction.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'predictionCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/predictions/:id', function() {
    it('should route to prediction.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'predictionCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/predictions', function() {
    it('should route to prediction.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'predictionCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/predictions/:id', function() {
    it('should route to prediction.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'predictionCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/predictions/:id', function() {
    it('should route to prediction.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'predictionCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/predictions/:id', function() {
    it('should route to prediction.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'predictionCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
