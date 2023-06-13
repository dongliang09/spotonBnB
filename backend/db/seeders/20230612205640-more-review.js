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
      spotId: 5,
      userId: 1,
      review: "I love my time here. I feel very comfortable in the neiborhood.",
      stars: 5
    },
    {
      spotId: 5,
      userId: 1,
      review: "Really enjoy spending time with friends to have party in here",
      stars: 5
    },
    {
      spotId: 8,
      userId: 2,
      review: "BBQ in this place is a good experience.",
      stars: 4
    },
    {
      spotId: 8,
      userId: 3,
      review: "The furnitures are modern. Felt the owner put lots of work into it.",
      stars: 2
    },
    {
      spotId: 10,
      userId: 1,
      review: "Kids have fun with the water park here.",
      stars: 4
    },
    {
      spotId: 10,
      userId: 6,
      review: "Enjoyed my fishing time with friends, and we had a good chat.",
      stars: 3
    },
    {
      spotId: 11,
      userId: 2,
      review: "Great mountain view.",
      stars: 4
    },
    {
      spotId: 11,
      userId: 4,
      review: "All plants construct a beautiful piece of art.",
      stars: 3
    },
    {
      spotId: 11,
      userId: 5,
      review: "Highly recommend for the people who like outdoor camping.",
      stars: 5
    },
    {
      spotId: 10,
      userId: 6,
      review: "Feeling cold, wish they fix the heat soon",
      stars: 3
    },
    {
      spotId: 13,
      userId: 5,
      review: "Very convience to the local supermark and restaurant.",
      stars: 4
    },
    {
      spotId: 15,
      userId: 5,
      review: "A bit noisy during the day because it is located in downtown, but I love that style",
      stars: 3
    },
    {
      spotId: 19,
      userId: 1,
      review: "Very environmental, everything live with harmonic of the place.",
      stars: 4
    },
    {
      spotId: 19,
      userId: 6,
      review: "The space is very big, good for kids running around.",
      stars: 5
    },
    {
      spotId: 19,
      userId: 3,
      review: "Spend weekend here to relax, enjoyed the earthly smell.",
      stars: 4
    },
    {
      spotId: 20,
      userId: 4,
      review: "Spent a week of winter in here, love to play with the snow. House is warm.",
      stars: 3
    },
    {
      spotId: 20,
      userId: 5,
      review: "Who doesn't like to watch snow inside the house.",
      stars: 4
    },
    {
      spotId: 20,
      userId: 6,
      review: "A lot of boardgames here, had a good time with friends.",
      stars: 3
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {});
  }
};
