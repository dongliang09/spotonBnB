'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';

    await queryInterface. changeColumn(options, "startDate", {
      type: Sequelize.DATEONLY,
      allowNull: false
    });
    await queryInterface. changeColumn(options, "endDate", {
      type: Sequelize.DATEONLY,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';

    await queryInterface. changeColumn(options, "startDate", {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface. changeColumn(options, "endDate", {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
