let app = require("../../app");
let chai = require('chai');
const request = require('supertest');
let chaiHttp = require('chai-http');

const models = require('../../db/models/index');
const User = models.User;

//node test/testSeedData/testSeedUser.js

function testSeedUser() {
  return models.User.create({
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: "Test",
    lastName:"user"
  }, {
    include: [models.Spot, models.Booking, models.Review]
  })
.catch(e => console.log(e))
}
