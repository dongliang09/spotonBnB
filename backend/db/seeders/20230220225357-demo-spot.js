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
      address: "111 East 2nd Street",
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
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
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
      ownerId: 4,
      address: "1566 Roberta Drive",
      city: "San Mateo",
      state: "California",
      country: "United States of America",
      lat: 37.5591836,
      lng: -122.2921211,
      name: "Sunset Lagoon Getaway",
      description: "Calm your heart in front of the lakeview",
      price: 671
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
