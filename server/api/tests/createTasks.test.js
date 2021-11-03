const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST tasks', () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('when create new task successfully', () => {
    chai.request(app)
      .post('/')
      .send({
        description: 'Jogar futebol americano',
        name: 'joao',
        email: 'joaozinho@gmail.com',
      }).end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('description');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('momentDate');
        expect(res.body.description).to.be.equal('Jogar futebol americano');
      });
  });

  it('when not create task successfully', () => {
    chai.request(app)
      .post('/')
      .send({
        description: '',
        name: '',
        email: 'joaozinho@gmail.com',
      }).end((_err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.be.equal('invalid data');
      });
  });
});
