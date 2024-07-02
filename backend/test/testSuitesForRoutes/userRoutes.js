let app = require("../../app");
let chai = require('chai');
const request = require('supertest');
let chaiHttp = require('chai-http');

const { expect } = chai;
//  chai and chai-http can't user require above version 4

chai.should();
chai.use(chaiHttp);

/*
POST    /api/users : sign up with body validation, sign up correctly, with existing email / username
DELETE  /api/users/:userId
*/

let xsrftoken = "";
let csrftoken = "";
let jwt = "";
let id = -1;

describe ('user routes', () => {

  chai.request(app).get('/api/csrf/restore').end((err, res) => {
    xsrftoken = res.body['XSRF-Token']
    csrftoken = res.header['set-cookie'][0].split(";")[0].split("=")[1];
  })

  // need to clear database
  it('POST /api/users, sign up user with body validation', (done) => {
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

  it('POST /api/users, sign up user correctly', (done) => {
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
        jwt = user['token'];
        id = user['id'];
        done()
    })
  })

  it('POST /api/users, user already exists with email', (done) => {
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

  it('POST /api/users, user already exists with username', (done) => {
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

  it('DELETE /api/users/:userId, delete user with wrong userId', (done) => {
    chai.request(app).delete(`/api/users/${id + 100}`)
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken};token=${jwt}`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        expect(res.body['message']).to.equal("Forbidden");
        done()
    })
  })

  it('DELETE /api/users/:userId, delete user with correctly', (done) => {
    chai.request(app).delete(`/api/users/${id}`)
      .set("XSRF-TOKEN", xsrftoken)
      .set("Cookie", `_csrf=${csrftoken};token=${jwt}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        expect(res.body['message']).to.equal("Successfully deleted");
        done()
    })
  })

  //NODE_ENV=test dotenv mocha ./test/testSuitesForRoutes/userRoutes.js




})
