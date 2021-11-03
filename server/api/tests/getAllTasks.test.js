const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET tasks', () => {
  const DBServer = new MongoMemoryServer();

  before(async () => {
    const URLMock = await DBServer.getUri();

    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    chai.request(app).post('/').send({
      description: 'Jogar futebol americano',
      name: 'joao',
      email: 'joaozinho@gmail.com',
    });
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('when get all tasks successfully', () => {
    chai
      .request(app)
      .get('/')
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
      });
  });
});
