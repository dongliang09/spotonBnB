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
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/ged4a87053c3da47721249ae18a64f6a86bc93aa983668c9c8c0315e5bb1711cf07db98b44f1a08fd3db2d1499ebdc76e_640.jpg",
      preview: true
    },
    {
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/g5142e8cc14a284a4d301d4982fa39e2950dfbbfb1c1bf791caddce01a33d1a3ef2367e396312b055ce5af7b6e34148c1_640.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/gb0e971dc6754dbb6e493da43a2145613a9e3f853acbf4791dd03c9e6e21679762fab286a342c24e83aace80f5cccbfaf_640.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/g44d930863a337b3fead5a74fee69599288b82f73b00c301a6f24aa57eb59513bc0c13d2ce91308742e1f7c2fe71eb796_640.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://jameskaiser.com/wp-content/uploads/2014/12/yosemite-national-park-hotels-in-park.jpg",
      preview: true
    },
    {
      spotId: 4,
      url: "https://randomwordgenerator.com/img/picture-generator/54e7d043435ba914f1dc8460962e33791c3ad6e04e507441722872d5934dc2_640.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://randomwordgenerator.com/img/picture-generator/54e7d043435ba914f1dc8460962e33791c3ad6e04e507441722872d5934dc2_640.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://randomwordgenerator.com/img/picture-generator/54e7d043435ba914f1dc8460962e33791c3ad6e04e507441722872d5934dc2_640.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://randomwordgenerator.com/img/picture-generator/54e7d043435ba914f1dc8460962e33791c3ad6e04e507441722872d5934dc2_640.jpg",
      preview: false
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
