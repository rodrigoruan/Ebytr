const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST user', () => {
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

  it('when create new user successfully', () => {
    chai.request(app)
      .post('/users/create')
      .send({
        name: 'rodrigo',
        email: 'rodrigo@gmail.com',
        password: 'abc123',
      }).end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body.name).to.be.equal('rodrigo');
        expect(res.body.email).to.be.equal('rodrigo@gmail.com');
      });
  });

  it('when not create user successfully', () => {
    chai.request(app)
      .post('/users/create')
      .send({
        name: '',
        email: '',
        password: 'abc123',
      }).end((_err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('invalid data');
      });
  });
});
