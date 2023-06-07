'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options,[{
      ownerId: 1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },
    {
      ownerId: 2,
      address: "350 Mission St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.790880,
      lng: -122.396690,
      name: "Trailblazer Cafe",
      description: "A dinning place to relex your mind",
      price: 73
    },
    {
      ownerId:2,
      address: "415 Mission St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.789848,
      lng: -122.396797,
      name: "Ohana Floor",
      description: "A place to see the view of San Francisco",
      price: 82
    },
    {
      ownerId: 3,
      address: "9006 Yosemite Lodge Dr",
      city: "YOSEMITE NATIONAL PARK",
      state: "California",
      country: "United States of America",
      lat: 37.742401,
      lng: -119.600258,
      name: "Yosemite Valley Lodge",
      description: "A place to rest before your next wonderful journey",
      price: 157
    },
    {
      ownerId: 5,
      address: "1971 East 2nd Street",
      city: "Port Angeles",
      state: "Washington",
      country: "United States of America",
      lat: 48.1182356,
      lng: -123.4338569,
      name: "Port Angeles Inn",
      description: "Quite Tree house, surrounding by beautiful flowers and plants",
      price: 294
    },
    {
      ownerId: 4,
      address: "1586 Roberta Drive",
      city: "San Mateo",
      state: "California",
      country: "United States of America",
      lat: 37.5591836,
      lng: -122.2921211,
      name: "Sunset Lagoon Getaway",
      description: "Calm your heart in front of the lakeview",
      price: 671
    },
    {
      ownerId: 3,
      address: "14698 Seashore Drive",
      city: "Sea Ranch",
      state: "California",
      country: "United States of America",
      lat: 38.7149911,
      lng: -123.4551285,
      name: "The Ranch House",
      description: "This is house is designed by famous architect, earning an award with this master piece",
      price: 593
    },
    {
      ownerId: 4,
      address: "95630 Mills Dr",
      city: "Visalia",
      state: "California",
      country: "United States of America",
      lat: 36.352792,
      lng: -119.225445,
      name: "Luxury Treehouse",
      description: "Modern design with outdoor burner, great for BBQ party",
      price: 532
    },
    {
      ownerId: 1,
      address: "35002 SE Morningside Blvd",
      city: "Port St. Lucie",
      state: "Florida",
      country: "United States of America",
      lat: 27.2439502,
      lng: -80.3161211,
      name: "Modern Houseboat",
      description: "Enjoy your charming sunrise and sunset",
      price: 158
    },
    {
      ownerId: 2,
      address: "1234 Lido Ln",
      city: "San Rafael",
      state: "California",
      country: "United States of America",
      lat: 37.9684169,
      lng: -122.5024745,
      name: "Waterfront Retreat Haven",
      description: "Calm your heart in front of the lakeview",
      price: 988
    },
    {
      ownerId: 3,
      address: "2687 Saddle Brook Ct",
      city: "Oakland",
      state: "California",
      country: "United States of America",
      lat: 37.7912709,
      lng: -122.1510458,
      name: "Great View Cottage",
      description: "Up in the mountain with great view",
      price: 176
    },
    {
      ownerId: 4,
      address: "161 All. de la Charmille, 33700",
      city: "Mérignac",
      state: "Nouvelle-Aquitaine",
      country: "France",
      lat: 44.8578768,
      lng: -0.642675,
      name: "Cozy House",
      description: "This place is quiet, ten minutes drive from airport",
      price: 73
    },
    {
      ownerId: 2,
      address: "72 Anthony Rd, Welling DA16 3EJ",
      city: "Greater London",
      state: "England",
      country: "United Kingdom",
      lat: 51.4697683,
      lng: 0.1067028,
      name: "Casa Anthony",
      description: "Located in central area, very close to supermarkets and restaurants",
      price: 81
    },
    {
      ownerId: 4,
      address: "Pedro Montt 363, 250279 Valparaíso",
      city: "Viña del Mar",
      state: "Valparaíso",
      country: "Chile",
      lat: -33.0283721,
      lng: -71.571386,
      name: "Wolf Residence",
      description: "We live in the quiet residential neighborhood",
      price: 57
    },
    {
      ownerId: 6,
      address: "8959 4th Ave",
      city: "Brooklyn",
      state: "New York",
      country: "United States of America",
      lat: 40.6547416,
      lng: -74.0036967,
      name: "Groovy Bedroom",
      description: "Kick back and relax in this calm, stylish space.",
      price: 93
    },
    {
      ownerId: 5,
      address: "Av. Almte. Miguel Grau 802",
      city: "Barranco",
      state: "Gobierno Regional de Lima",
      country: "Peru",
      lat: -12.144381,
      lng: -77.0225606,
      name: "Miraflores",
      description: "we are close to the most touristy district of the capital.",
      price: 21
    },
    {
      ownerId: 4,
      address: "2108 19 Ave NW",
      city: "Calgary",
      state: "Alberta",
      country: "Canada",
      lat: 51.0698283,
      lng: -114.1117232,
      name: "Cute house",
      description: "It is a 5 minute drive to downtown, a 6 minute drive to University of Calgary",
      price: 34
    },
    {
      ownerId: 5,
      address: "Chem. des Fleurettes 53",
      city: "Lausanne",
      state: "Vaud",
      country: "Switzerland",
      lat: 46.5171054,
      lng: 6.6178462,
      name: "Nice and Organzied",
      description: "Quiet neighborhood with a nice park next door and local shops.",
      price: 92
    },
    {
      ownerId: 2,
      address: "3065 E Woodside Way",
      city: "Springfield",
      state: "Missouri",
      country: "United States of America",
      lat: 37.1520926,
      lng: -93.2152573,
      name: "Earthouse Retreat",
      description: "Earthouse offers unique architectural design providing guests with an open inviting interior complete with high-end furnishings.",
      price: 361
    },
    {
      ownerId: 1,
      address: "3020-835 Hokujō",
      city: "Hakuba, Kitaazumi District",
      state: "Nagano",
      country: "Japan",
      lat: 36.6927743,
      lng: 137.8392022,
      name: "Alpinarc4",
      description: "Throught the windows, you can see breathtaking views of Hakuba",
      price: 434
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
