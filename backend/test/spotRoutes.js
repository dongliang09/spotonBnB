let app = require("../app");
let chai = require('chai');
const request = require('supertest');
let chaiHttp = require('chai-http');

const { expect } = chai;
//  chai and chai-http can't user require above version 4

chai.should();
chai.use(chaiHttp);

// describe ('testing', () => {
//   it('hello world', (done) => {
//         chai.request(app).get('/hello/world').end((err, response) => {
//           response.should.have.status(200);
//           expect(response._body.message).to.equal('Hello World!');
//         })
//         done();
//   })
// })

// set up before each to seed some data??

describe ('spot routes', () => {



  it('get', (done) => {
        chai.request(app).get('/api/spots').end((err, response) => {
          response.should.have.status(200);
        })
        done();
  })
})

// describe('spot API Route', async () => {
//   it('get routes', async () => {
//     const { body, status } = await request(app).get('/api/spots');
//     const { data } = body;
//     expect(status).to.equal(200);
//   });
// });
