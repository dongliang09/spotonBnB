'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';

    await queryInterface.bulkInsert(options, [{
      spotId: 1,
      userId: 1,
      review: "Learn so much to advance my career",
      stars: 5
    },
    {
      spotId: 2,
      userId: 1,
      review: "Really enjoy spending time with friends in here",
      stars: 5
    },
    {
      spotId: 2,
      userId: 2,
      review: "The foods are really good here, want to visit again next time",
      stars: 4
    },
    {
      spotId: 2,
      userId: 3,
      review: "Didn't get my food on time, still good service attitude",
      stars: 2
    },
    {
      spotId: 4,
      userId: 1,
      review: "Spend couple days here to relax, feeling great",
      stars: 4
    },
    {
      spotId: 4,
      userId: 2,
      review: "Feeling cold, wish they fix the heat soon",
      stars: 3
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {});
  }
};
