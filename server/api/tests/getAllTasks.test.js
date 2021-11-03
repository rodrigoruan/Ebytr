// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../index');

// const { expect } = chai;
// chai.use(chaiHttp);

// describe('GET all tasks', () => {
//   it('when get all tasks successfully', (done) => {
//     chai
//       .request(app)
//       .get('/')
//       .end((_err, res) => {
//         const response = JSON.parse(res.text);
//         expect(res).to.have.status(200);
//         expect(response).to.be.a('array');
//         done();
//       });
//   });
// });
