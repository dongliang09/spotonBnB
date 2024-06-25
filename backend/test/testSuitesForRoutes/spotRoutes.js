let app = require("../../app");
let chai = require('chai');
const request = require('supertest');
let chaiHttp = require('chai-http');

const { expect } = chai;
//  chai and chai-http can't user require above version 4

chai.should();
chai.use(chaiHttp);

describe ('login', () => {
  // postman set up cookies xsrftoken in the environment in route /api/csrf/restore
  // pm.environment.set('xsrftoken', pm.cookies.get('XSRF-TOKEN'))

  // example
  // chai.request(url)
  //   .get('/')
  //   .set('Cookie', 'cookieName=cookieValue;otherName=otherValue')
  //   .then(...)

  let xsrftoken = "";
  let csrftoken = "";
  chai.request(app).get('/api/csrf/restore').end((err, res) => {
    xsrftoken = res.body['XSRF-Token']
    csrftoken = res.header['set-cookie'][0].split(";")[0].split("=")[1];
  })

  it('login with user information', (done) => {
    chai.request(app).post('/api/session')
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken}`)
      .set('content-type', 'application/json')
      .send({
        "credential":"Demo-lition",
        "password":"password"
      }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user');
        res.body['user']['username'].should.equal('Demo-lition');
        res.body['user'].should.have.property('id');
        res.body['user'].should.have.property('email');
        res.body['user'].should.have.property('firstName');
        res.body['user'].should.have.property('lastName');
        // console.log(res.body)
        done()
    })
  })


})

describe ('spot routes', () => {
  it('get', (done) => {
    chai.request(app).get('/api/spots').end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('Spots');
      res.body['Spots'].should.be.a('array');
      res.body.should.have.property('page');
      res.body['page'].should.be.a('number');
      res.body.should.have.property('size');
      res.body['size'].should.be.a('number');
      done();
    })
  })

  // set up before each to seed some data??


  // should return 403 forbidden when there is no authentication
  // it('post with no authenticaion', (done) => {
  //   chai.request(app).post('/api/spots')
  //     .set('content-type', 'application/json')
  //     .set("XSRF-TOKEN", xsrftoken)
  //     .set("Cookie", _csrf=csrftoken)
  //     .send({
  //       address: "234 Disney Lane",
  //       city: "San Francisco",
  //       state: "California",
  //       country: "United States of America",
  //       lat: 37.7645358,
  //       lng: -122.4730327,
  //       name: "App Academy (Test2)",
  //       description: "Place where web developers are created",
  //       price: 234
  //     })
  //     .end((err, res) => {
  //     console.log(res)
  //       res.should.have.status(200);

  //     // expect(res.body.message).to.equal("Forbidden");
  //     done();
  //   })
  // })

  // set up auth before each test?
  // beforeEach((done) => {
  //   chai.request(app).get('/session').end((err, res) => {

  //   })
  //   done()
  // })

  // it('get current', (done) => {
  //   let newSpot = {

  //   }
  //   // chai.request(app).get('/api/spots').end((err, response) => {
  //   //   response.should.have.status(200);
  //   // })
  //   done();
  // })

})

// describe('spot API Route', async () => {
//   it('get routes', async () => {
//     const { body, status } = await request(app).get('/api/spots');
//     const { data } = body;
//     expect(status).to.equal(200);
//   });
// });
