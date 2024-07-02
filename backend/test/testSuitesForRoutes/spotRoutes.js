let app = require("../../app");
let chai = require('chai');
const request = require('supertest');
let chaiHttp = require('chai-http');

const { expect } = chai;
//  chai and chai-http can't user require above version 4

chai.should();
chai.use(chaiHttp);

/*
POST    /api/session : login
GET     /api/spots : get all spots on first page without authentication, but can see all
GET     /api/spots/current : require authentication
GET     /api/spots/:sptId
POST    /api/spots
POST    /api/spots/:spotId/images
PUT     /api/spots/:sptId
DELETE  /api/spots/:sptId
GET     /api/spots/:spotId/reviews
POST    /api/spots/:spotId/reviews
GET     /api/spots/:spotId/bookings
POST    /api/spots/:spotId/bookings
*/

/*
postman set up cookies xsrftoken in the environment in route /api/csrf/restore
pm.environment.set('xsrftoken', pm.cookies.get('XSRF-TOKEN'))

example
chai.request(url)
  .get('/')
  .set('Cookie', 'cookieName=cookieValue;otherName=otherValue')
  .then(...)

hide error track stack ?
https://stackoverflow.com/questions/51032718/can-i-hide-failure-details-in-mocha-output
*/

let xsrftoken = "";
let csrftoken = "";
let jwt = "";

describe ('spots routes', () => {

  chai.request(app).get('/api/csrf/restore').end((err, res) => {
    xsrftoken = res.body['XSRF-Token']
    csrftoken = res.header['set-cookie'][0].split(";")[0].split("=")[1];
  })

  it('login with wrong user information', (done) => {
    chai.request(app).post('/api/session')
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken}`)
      .set('content-type', 'application/json')
      .send({
        "credential":"Demo-lition123",
        "password":"notPassword"
      }).end((err, res) => {
        res.should.have.status(401);
        expect(res.body.title).to.equal("Login failed");
        expect(res.body.message).to.equal("Invalid credentials");
        done()
    })
  })

  // should return 401 require authentication
  it("get current user's spots without authenticaion", (done) => {
    chai.request(app).get('/api/spots/current')
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal("Authentication required");
        done();
    })
  })

  it('POST /api/session, login with user information', (done) => {
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
        jwt = res.header['set-cookie'][0].split(";")[0].split("=")[1];
        // console.log(res.header['set-cookie'], jwt)
        done()
    })
  })

// })

// describe ('spot routes', () => {

  it('get all spots', (done) => {
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




  // set up auth before each test?
  // beforeEach((done) => {
  //   chai.request(app).get('/session').end((err, res) => {

  //   })
  //   done()
  // })

  it('POST /api/spots, post spot with wrong latitube and longitube', (done) => {
    chai.request(app).post('/api/spots')
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken};token=${jwt}`)
      .set('content-type', 'application/json')
      .send({
        "address": "234 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 537.7645358,
        "lng": -1822.4730327,
        "name": "App Academy (Test)",
        "description": "Place where web developers are created",
        "price": 234
      }).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        expect(res.body['title']).to.equal('Validation Error');
        res.body.should.have.property('message');
        expect(res.body['message']).to.equal('Validation Error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        expect(res.body['errors'].lat).to.equal('Latitude is not valid');
        expect(res.body['errors'].lng).to.equal('Longitude is not valid');
        done()
    })
  })

  it('post spot information', (done) => {
    chai.request(app).post('/api/spots')
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken};token=${jwt}`)
      .set('content-type', 'application/json')
      .send({
        "address": "234 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy (Test)",
        "description": "Place where web developers are created",
        "price": 234
      }).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('address');
        res.body.should.have.property('city');
        res.body.should.have.property('state');
        res.body.should.have.property('country');
        res.body.should.have.property('lat');
        res.body.should.have.property('lng');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('price');
        // res.body.should.have.property('ownerId');
        // res.body.should.have.property('createdAt');
        // res.body.should.have.property('updatedAt');
        // res.body.should.have.property('avgRating');
        done()
    })
  })

  it("get current user's spots", (done) => {
    chai.request(app).get('/api/spots/current')
      .set("Cookie", `token=${jwt}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('Spots');
        res.body['Spots'].should.be.a('array');
        if (res.body['Spots'].length !== 0) {
          let oneSpot = res.body['Spots'][0];
          oneSpot.should.be.a('object');
          oneSpot.should.have.property('id');
          oneSpot.should.have.property('address');
          oneSpot.should.have.property('city');
          oneSpot.should.have.property('state');
          oneSpot.should.have.property('country');
          oneSpot.should.have.property('lat');
          oneSpot.should.have.property('lng');
          oneSpot.should.have.property('name');
          oneSpot.should.have.property('description');
          oneSpot.should.have.property('price');
          oneSpot.should.have.property('ownerId');
          oneSpot.should.have.property('createdAt');
          oneSpot.should.have.property('updatedAt');
          oneSpot.should.have.property('avgRating');
          oneSpot.should.have.property('previewImage');
        }
        done();
      })
  })

})

// describe('spot API Route', async () => {
//   it('get routes', async () => {
//     const { body, status } = await request(app).get('/api/spots');
//     const { data } = body;
//     expect(status).to.equal(200);
//   });
// });
