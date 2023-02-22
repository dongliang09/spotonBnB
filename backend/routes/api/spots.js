const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize  } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ]
    });
    let spotsList = [];

    spots.forEach(spot => {
        spotsList.push(spot.toJSON());
    });

    spotsList.forEach(spot => {

        if (spot.Reviews.length === 0) spot.avgRating = 0.0;
        else {
            let ratingSum = 0;
            spot.Reviews.forEach(review => {
                ratingSum += review.stars;
            })
            spot.avgRating = ratingSum / spot.Reviews.length;
        }
        delete spot.Reviews;

        if (spot.SpotImages.length === 0) spot.previewImage = null;
        else {
            let previewCount = 0;
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url;
                    previewCount++;
                }
            })
            if (previewCount === 0) spot.previewImage = null
        }
        delete spot.SpotImages;
    })
    res.json({"Spot" : spotsList})
});

router.get('/current', requireAuth, async (req, res) => {

    const currentId = req.user.id;
    const spots = await Spot.findAll({
        where: {
            ownerId: currentId
        },
        include: [
            {model: Review},
            {model: SpotImage}
        ]
    });
    let spotsList = [];

    spots.forEach(spot => {
        spotsList.push(spot.toJSON());
    });

    spotsList.forEach(spot => {

        if (spot.Reviews.length === 0) spot.avgRating = 0.0;
        else {
            let ratingSum = 0;
            spot.Reviews.forEach(review => {
                ratingSum += review.stars;
            })
            spot.avgRating = ratingSum / spot.Reviews.length;
        }
        delete spot.Reviews;

        if (spot.SpotImages.length === 0) spot.previewImage = null;
        else {
            let previewCount = 0;
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url;
                    previewCount++;
                }
            })
            if (previewCount === 0) spot.previewImage = null
        }
        delete spot.SpotImages;
    })
    res.json({"Spot" : spotsList})
});

router.get('/:spotId', async (req, res) => {

    let spotId = req.params.spotId;
    const spotFound = await Spot.findByPk(spotId, {
        include: [
            {model: Review},
            {
                model: SpotImage,
                attributes: {
                    exclude: ['spotId', "createdAt", "updatedAt"]
                }
            },
            {
                model: User,
                as: "Owner",
                attributes: {
                    exclude: ['username', "hashedPassword", "email", "createdAt", "updatedAt"]
                }
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
            ]
        }
    })


    if (!spotFound) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    let spot = spotFound.toJSON();

    if (spot.Reviews.length === 0) {
        spot.avgRating = 0.0;
        spot.numReviews = 0;
    } else {
        // let ratingSum = 0;
        // spot.Reviews.forEach(review => {
        //     ratingSum += review.stars;
        // })
        // spot.avgStarRating = ratingSum / spot.Reviews.length;
        spot.numReviews = spot.Reviews.length;
    }
    delete spot.Reviews;

    res.json(spot)
});

const validateCreateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
];

router.post('/', requireAuth, validateCreateSpot, async (req, res) => {

    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const currentId = req.user.id;

    let newSpot;
    newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price,
        ownerId: currentId
    })

    res.status(201).json(newSpot)

});

router.post('/:spotId/images', requireAuth, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user
    const currentId = req.user.id;
    const { url, preview } = req.body;

    const spotFound = await Spot.findByPk(req.params.spotId)

    if (!spotFound || spotFound.ownerId !== currentId) {
        return res.status(400).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    let newSpotImage = await SpotImage.create({
        url, preview,
        spotId: spotFound.id
    })

    let spotImageFound = await SpotImage.findByPk(newSpotImage.id);

    res.json(spotImageFound)

});

router.put('/:spotId', requireAuth, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user

});

router.delete('/:spotId', requireAuth, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user

});

module.exports = router;
