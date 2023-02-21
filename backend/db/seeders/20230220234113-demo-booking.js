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
      startDate: "2023-01-01",
      endDate: "2023-01-04",
    },
    {
      spotId: 1,
      userId: 2,
      startDate: "2023-01-10",
      endDate: "2023-01-20",
    },
    {
      spotId: 2,
      userId: 1,
      startDate: "2023-02-01",
      endDate: "2023-02-04",
    },
    {
      spotId: 2,
      userId: 2,
      startDate: "2023-02-10",
      endDate: "2023-02-14",
    },
    {
      spotId: 3,
      userId: 3,
      startDate: "2023-05-01",
      endDate: "2023-05-09",
    },
    {
      spotId: 3,
      userId: 1,
      startDate: "2023-01-21",
      endDate: "2023-01-30",
    }], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, null, {});
  }
};
