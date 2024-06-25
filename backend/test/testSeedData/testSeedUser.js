export default function testSeedUser(models) {
  return models.User.create({
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: "Test",
    lastName:"user"
  }, {
    include: [models.Spot, models.Booking, models.Review]
  })
.catch(e => console.log(e))
}
