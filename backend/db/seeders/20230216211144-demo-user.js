'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "demo",
        lastName:"user"
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "John",
        lastName:"Smith"
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: "Harry",
        lastName:"Lam"
      },
      {
        email: 'aaaaaa@user.io',
        username: 'aaaaaa',
        hashedPassword: bcrypt.hashSync('aaaaaa'),
        firstName: "Noah",
        lastName:"Tang"
      },
      {
        email: 'bbbbbb@user.io',
        username: 'bbbbbb',
        hashedPassword: bcrypt.hashSync('bbbbbb'),
        firstName: "Issac",
        lastName:"Wang"
      },
      {
        email: 'cccccc@user.io',
        username: 'cccccc',
        hashedPassword: bcrypt.hashSync('cccccc'),
        firstName: "Sarah",
        lastName:"Ling"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'aaaaaa', 'bbbbbb', 'cccccc'] }
    }, {});
  }
};
