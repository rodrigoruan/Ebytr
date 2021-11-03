const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const { expect } = chai;
chai.use(chaiHttp);

describe('POST create user', () => {
  it('when create new user successfully', (done) => {
    chai
      .request(app)
      .post('/users/create')
      .send({ email: 'joaozinho@gmail.com', name: 'joaozinho', password: 'frangofrito' })
      .end((_err, res) => {
        const response = JSON.parse(res.text);
        expect(res.status).to.equal(200);
        expect(response.email).to.equal('joaozinho@gmail.com');
        expect(response.name).to.equal('joaozinho');
        done();
      });
  });

  it('when not create a user successfully', (done) => {
    chai
      .request(app)
      .post('/users/create')
      .send({ email: '', name: 'joaozinho', password: 'frangofrito' })
      .end((_err, res) => {
        const response = JSON.parse(res.text);
        expect(res.status).to.equal(400);
        expect(response.error).to.equal('invalid data');
        done();
      });
  });
});
