'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';

    await queryInterface.bulkInsert(options, [{
      reviewId: 1,
      url: "https://s.hdnux.com/photos/51/14/66/10800567/5/rawImage.jpg"
    },
    {
      reviewId: 2,
      url: "https://cdn.vox-cdn.com/thumbor/jZk0yFxKQkSW4KFn4zsbt0OsBlA=/0x0:2000x1333/1200x0/filters:focal(0x0:2000x1333):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13599102/TrailblazerTavern_PChang_4355.jpg"
    },
    {
      reviewId: 3,
      url: "https://cdn.vox-cdn.com/thumbor/bTdWXqkk82DchHH1ZIkkZTrAodU=/0x0:2000x1333/1200x0/filters:focal(0x0:2000x1333):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13599109/TrailblazerTavern_PChang_4379.jpg"
    },
    {
      reviewId: 4,
      url: "https://fastly.4sqi.net/img/general/200x200/15272514_2oGes3t9GOYt4ekTf_JFTjaNo7b5GDYalUt8UYRrKe0.jpg"
    },
    {
      reviewId: 5,
      url: "https://www.travelinusa.us/wp-content/uploads/sites/3/2014/07/Dove-dormire-a-Yosemite-05.jpg"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
