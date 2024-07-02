const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),
    check('username')
      .exists({ checkFalsy: true })
      .withMessage('Username is required'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/',validateSignup,async (req, res) => {

      const { email, password, username, firstName, lastName } = req.body;

      //find if user/email exists
      const usernameFound = await User.findOne({
        where:{username: username}
      })

      if (usernameFound) {
        return res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "username": "User with that username already exists"
          }
        })
      }

      const emailFound = await User.findOne({
        where:{email: email}
      })

      if (emailFound) {
        return res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }
      // const user = await User.signup({ email, username, password, firstName, lastName });

      const hashedPassword = bcrypt.hashSync(password);

      const newUser = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });

      let newUserFound = await User.scope('currentUser').findByPk(newUser.id);
      let token = await setTokenCookie(res, newUserFound);

      let user = newUserFound.toJSON();
      user.token = token;

      return res.json({
        "user": user
      });
    }
  );


router.delete('/:userId', requireAuth, async (req, res) => {

  let userId = req.params.userId;
  let currentUserId = req.user.id;

  const userFound = await User.findByPk(userId);

  // try not to leak how many users in database
  if (!userFound || userFound.id !== currentUserId) {
    return res.status(403).json({
        "message": "Forbidden",
        "statusCode": 403
    })
  }

  await userFound.destroy()

  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })

})

module.exports = router;
