'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';

    await queryInterface.bulkInsert(options, [{
      spotId: 1,
      userId: 1,
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-06-04"),
    },
    {
      spotId: 1,
      userId: 2,
      startDate: new Date("2023-06-10"),
      endDate: new Date("2023-06-20"),
    },
    {
      spotId: 2,
      userId: 1,
      startDate: new Date("2023-07-01"),
      endDate: new Date("2023-07-04"),
    },
    {
      spotId: 2,
      userId: 2,
      startDate: new Date("2023-07-10"),
      endDate: new Date("2023-07-14"),
    },
    {
      spotId: 3,
      userId: 3,
      startDate: new Date("2023-05-01"),
      endDate: new Date("2023-05-09"),
    },
    {
      spotId: 3,
      userId: 1,
      startDate: new Date("2023-06-21"),
      endDate: new Date("2023-06-30"),
    }], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, null, {});
  }
};
