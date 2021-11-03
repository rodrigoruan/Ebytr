const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const models = require('../models/usersModel');
const app = require('../index');

chai.use(chaiHttp);

const { expect } = chai;
const { SECRET } = process.env;

describe('POST tasks', () => {
  let admUser = {};
  let admKey = null;
  const DBServer = new MongoMemoryServer();

  before(async () => {
    const URLMock = await DBServer.getUri();
    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    admUser = await models.insertAdminUser({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin123',
    });

    const {
      _id, name, email,
    } = admUser;

    admKey = jwt.sign({
      _id, name, email,
    }, SECRET);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  it('when create new task successfully', async () => {
    const task = await chai.request(app)
      .post('/')
      .send({
        description: 'Jogar futebol americano',
        name: 'joao',
        email: 'joaozinho@gmail.com',
      });
    expect(task).to.have.status(200);
    expect(task.body).to.have.property('_id');
    expect(task.body).to.have.property('description');
    expect(task.body).to.have.property('name');
    expect(task.body).to.have.property('momentDate');
    expect(task.body.description).to.be.equal('Jogar futebol americano');
  });

  it('when not create task successfully', async () => {
    const task = await chai.request(app)
      .post('/')
      .send({
        description: '',
        name: '',
        email: 'joaozinho@gmail.com',
      });
    expect(task).to.have.status(400);
    expect(task.body.error).to.be.a('string');
    expect(task.body.error).to.be.equal('invalid data');
  });
});
