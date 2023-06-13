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
      spotId: 4,
      userId: 5,
      startDate: new Date("2023-06-12"),
      endDate: new Date("2023-06-13"),
    },
    {
      spotId: 4,
      userId: 4,
      startDate: new Date("2023-07-04"),
      endDate: new Date("2023-07-07"),
    },
    {
      spotId: 5,
      userId: 4,
      startDate: new Date("2023-07-01"),
      endDate: new Date("2023-07-04"),
    },
    {
      spotId: 5,
      userId: 6,
      startDate: new Date("2023-07-10"),
      endDate: new Date("2023-07-14"),
    },
    {
      spotId: 6,
      userId: 6,
      startDate: new Date("2023-07-09"),
      endDate: new Date("2023-07-19"),
    },
    {
      spotId: 6,
      userId: 2,
      startDate: new Date("2023-08-01"),
      endDate: new Date("2023-08-10"),
    },{
      spotId: 7,
      userId: 4,
      startDate: new Date("2023-08-05"),
      endDate: new Date("2023-08-06"),
    },
    {
      spotId: 7,
      userId: 5,
      startDate: new Date("2023-08-10"),
      endDate: new Date("2023-08-20"),
    },
    {
      spotId: 8,
      userId: 5,
      startDate: new Date("2023-07-01"),
      endDate: new Date("2023-07-04"),
    },
    {
      spotId: 8,
      userId: 6,
      startDate: new Date("2023-07-10"),
      endDate: new Date("2023-07-14"),
    },
    {
      spotId: 9,
      userId: 3,
      startDate: new Date("2023-07-25"),
      endDate: new Date("2023-08-01"),
    },
    {
      spotId: 9,
      userId: 2,
      startDate: new Date("2023-07-21"),
      endDate: new Date("2023-07-30"),
    },
    {
      spotId: 10,
      userId: 4,
      startDate: new Date("2023-07-11"),
      endDate: new Date("2023-07-14"),
    },
    {
      spotId: 10,
      userId: 3,
      startDate: new Date("2023-08-10"),
      endDate: new Date("2023-08-14"),
    },
    {
      spotId: 11,
      userId: 4,
      startDate: new Date("2023-09-01"),
      endDate: new Date("2023-09-09"),
    },
    {
      spotId: 11,
      userId: 5,
      startDate: new Date("2023-08-21"),
      endDate: new Date("2023-08-30"),
    },{
      spotId: 12,
      userId: 1,
      startDate: new Date("2023-07-12"),
      endDate: new Date("2023-07-14"),
    },
    {
      spotId: 12,
      userId: 2,
      startDate: new Date("2023-08-04"),
      endDate: new Date("2023-08-06"),
    },
    {
      spotId: 13,
      userId: 4,
      startDate: new Date("2023-07-04"),
      endDate: new Date("2023-07-07"),
    },
    {
      spotId: 13,
      userId: 5,
      startDate: new Date("2023-08-16"),
      endDate: new Date("2023-08-18"),
    },
    {
      spotId: 14,
      userId: 5,
      startDate: new Date("2023-06-27"),
      endDate: new Date("2023-06-30"),
    },
    {
      spotId: 14,
      userId: 6,
      startDate: new Date("2023-09-10"),
      endDate: new Date("2023-09-14"),
    },
    {
      spotId: 15,
      userId: 3,
      startDate: new Date("2023-07-01"),
      endDate: new Date("2023-07-09"),
    },
    {
      spotId: 15,
      userId: 1,
      startDate: new Date("2023-08-21"),
      endDate: new Date("2023-08-30"),
    },{
      spotId: 16,
      userId: 3,
      startDate: new Date("2023-07-21"),
      endDate: new Date("2023-07-24"),
    },
    {
      spotId: 16,
      userId: 4,
      startDate: new Date("2023-08-06"),
      endDate: new Date("2023-08-09"),
    },
    {
      spotId: 17,
      userId: 5,
      startDate: new Date("2023-07-05"),
      endDate: new Date("2023-07-06"),
    },
    {
      spotId: 17,
      userId: 6,
      startDate: new Date("2023-08-30"),
      endDate: new Date("2023-08-31"),
    },
    {
      spotId: 18,
      userId: 1,
      startDate: new Date("2023-08-22"),
      endDate: new Date("2023-08-26"),
    },
    {
      spotId: 18,
      userId: 6,
      startDate: new Date("2023-07-30"),
      endDate: new Date("2023-07-31"),
    },
    {
      spotId: 19,
      userId: 3,
      startDate: new Date("2023-08-18"),
      endDate: new Date("2023-08-19"),
    },
    {
      spotId: 19,
      userId: 1,
      startDate: new Date("2023-07-21"),
      endDate: new Date("2023-07-25"),
    },{
      spotId: 20,
      userId: 4,
      startDate: new Date("2023-09-01"),
      endDate: new Date("2023-09-04"),
    },
    {
      spotId: 20,
      userId: 2,
      startDate: new Date("2023-10-10"),
      endDate: new Date("2023-10-20"),
    }], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, null, {});
  }
};
