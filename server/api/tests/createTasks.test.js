const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST tasks', () => {
  it('when create new task successfully', (done) => {
    chai
      .request(app)
      .post('/')
      .send({
        description: 'Passear com o cachorro',
        name: 'João',
        email: 'joao@gmail.com',
      })
      .end((_err, res) => {
        expect(res).to.have.status(200);
        const response = JSON.parse(res.text);
        expect(response).to.have.a.property('_id');
        expect(response).to.have.a.property('description');
        expect(response).to.have.a.property('name');
        expect(response).to.have.a.property('momentDate');
        expect(response.description).to.equal('Passear com o cachorro');
        expect(response.name).to.equal('João');
        done();
      });
  });

  it('when not create task successfully', (done) => {
    chai
      .request(app)
      .post('/')
      .send({
        name: 'João',
        email: 'joao@gmail.com',
      })
      .end((_err, res) => {
        expect(res).to.have.status(400);
        const response = JSON.parse(res.text);
        expect(response.error).to.be.a('string');
        expect(response.error).to.equal('invalid data');
        done();
      });
  });
});
