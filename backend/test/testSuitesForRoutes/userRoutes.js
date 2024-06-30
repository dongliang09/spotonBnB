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

describe ('login', () => {

  chai.request(app).get('/api/csrf/restore').end((err, res) => {
    xsrftoken = res.body['XSRF-Token']
    csrftoken = res.header['set-cookie'][0].split(";")[0].split("=")[1];
  })

  // need to clear database
  it('sign up user with body validation', (done) => {
    chai.request(app).post('/api/users')
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken}`)
      .set('content-type', 'application/json')
      .send({
        "email": "john.smith3",
        "password": "secret password"
      }).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        expect(res.body['message']).to.equal("Validation Error");
        res.body.should.have.property('errors');
        res.body['errors'].should.be.a('object');
        let errors = res.body['errors']
        errors.should.have.property('email');
        expect(errors['email']).to.equal("Invalid email");
        errors.should.have.property('username');
        expect(errors['username']).to.equal("Username is required");
        errors.should.have.property('firstName');
        expect(errors['firstName']).to.equal("First Name is required");
        errors.should.have.property('lastName');
        expect(errors['lastName']).to.equal("Last Name is required");
        done()
    })
  })

  it('sign up user correctly', (done) => {
    chai.request(app).post('/api/users')
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken}`)
      .set('content-type', 'application/json')
      .send({
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith3@gmail.com",
        "username": "JohnSmith3",
        "password": "secret password"
      }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body['user'].should.be.a('object');
        let user = res.body['user'];
        user.should.have.property('id');
        user.should.have.property('firstName');
        expect(user['firstName']).to.equal("John");
        user.should.have.property('lastName');
        expect(user['lastName']).to.equal("Smith");
        user.should.have.property('email');
        expect(user['email']).to.equal("john.smith3@gmail.com");
        user.should.have.property('username');
        expect(user['username']).to.equal("JohnSmith3");
        jwt = user['token']
        done()
    })
  })

  it('user already exists with email', (done) => {
    chai.request(app).post('/api/users')
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken}`)
      .set('content-type', 'application/json')
      .send({
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith3@gmail.com",
        "username": "JohnSmith333333",
        "password": "secret password"
      }).end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        expect(res.body['message']).to.equal("User already exists");
        res.body.should.have.property('errors');
        res.body['errors'].should.be.a('object');
        res.body['errors'].should.have.property('email');
        expect(res.body['errors']['email']).to.equal("User with that email already exists");
        done()
    })
  })

  it('user already exists with username', (done) => {
    chai.request(app).post('/api/users')
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken}`)
      .set('content-type', 'application/json')
      .send({
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith333333@gmail.com",
        "username": "JohnSmith3",
        "password": "secret password"
      }).end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        expect(res.body['message']).to.equal("User already exists");
        res.body.should.have.property('errors');
        res.body['errors'].should.be.a('object');
        res.body['errors'].should.have.property('username');
        expect(res.body['errors']['username']).to.equal("User with that username already exists");
        done()
    })
  })

  //mocha test/testSuitesForRoutes/userRoutes.js




})
