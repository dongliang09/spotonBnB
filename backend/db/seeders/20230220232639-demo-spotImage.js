'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options,[{
      spotId: 1,
      url: "https://lh3.googleusercontent.com/p/AF1QipNliLMj6OFAC-4mfbhtUBrshwN5HrsFlXKbDrYT=s1360-w1360-h1020",
      preview: true
    },
    {
      spotId: 1,
      url: "https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5e3a384c96ecbe8564dadb2a_Artboard%20Copy%206-p-500.webp",
      preview: false
    },
    {
      spotId: 2,
      url: "https://s3-media0.fl.yelpcdn.com/bphoto/Y76JNq3M910-wGPYz7BeGA/348s.jpg",
      preview: false
    },
    {
      spotId: 2,
      url: "https://cdn.vox-cdn.com/thumbor/hr49ZocPFudPLdNY1ObF6_y2P-0=/0x0:2000x1333/1200x675/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/62618574/TrailblazerTavern_PChang_4346.0.jpg",
      preview: true
    },
    {
      spotId: 4,
      url: "https://jameskaiser.com/wp-content/uploads/2014/12/yosemite-national-park-hotels-in-park.jpg",
      preview: false
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
