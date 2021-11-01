const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../index');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /', () => {
  describe('quando é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai
        .request(server)
        .get('/');
    });

    it('retorna o código de status 204', () => {
      expect(response).to.have.status(204);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.a.property('_id');
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  });
});
