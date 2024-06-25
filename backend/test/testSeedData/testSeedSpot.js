export default function testSeedSpot(models) {
  return models.Spot.create({
    ownerId: 1,
    address: "123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "App Academy (Test)",
    description: "Place where web developers are created",
    price: 123
  }, {
    include: [models.User]
  })
.catch(e => console.log(e))
}


// export default function seed(models) {
//   return models.User.create({
//     firstName: 'Jared',
//     lastName: 'Palmer',
//     email: 'jared@blah.com',
//     Chapter: {
//       name: 'New York',
//       location: '10016',
//     },
//     Company: {
//       name: 'Acme',
//       email: 'info@acme.com',
//     }
//   }, {
//     include: [models.Chapter, models.Company] // super cool shortcut to make related rows in one step
//   })
// .catch(e => console.log(e))
// }
