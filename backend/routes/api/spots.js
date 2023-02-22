const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize  } = require('../../db/models');
const { Op } = require("sequelize");

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

    for (let i = 0; i < spotsList.length; i++) {

        let spot = spotsList[i];

        if (spot.Reviews.length === 0) spot.avgRating = null;
        else {
            let reviewData = await Review.findByPk(spot.id, {
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
                ]
            })
            spot.avgRating = reviewData.toJSON().avgRating;
        }
        delete spot.Reviews;

        if (spot.SpotImages.length === 0) spot.previewImage = null;
        else {
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url;
                }
            })
            if (!spot.previewImage) spot.previewImage = null
        }
        delete spot.SpotImages;
    }
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

    for (let i = 0; i < spotsList.length; i++) {

        let spot = spotsList[i];

        if (spot.Reviews.length === 0) spot.avgRating = null;
        else {
            let reviewData = await Review.findByPk(spot.id, {
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
                ]
            })
            spot.avgRating = reviewData.toJSON().avgRating;
        }
        delete spot.Reviews;

        if (spot.SpotImages.length === 0) spot.previewImage = null;
        else {

            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url;
                }
            })
            if (!spot.previewImage) spot.previewImage = null
        }
        delete spot.SpotImages;
    }
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
        ]
    })

    if (!spotFound) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    let spot = spotFound.toJSON();

    if (spot.Reviews.length === 0) {
        spot.avgRating = null;
        spot.numReviews = 0;
    } else {
        let reviewData = await Review.findByPk(spot.id, {
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
            ]
        })
        spot.avgRating = reviewData.toJSON().avgRating;
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
      .isNumeric()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .isNumeric()
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
      .isNumeric()
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

    if (!spotFound) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spotFound.ownerId !== currentId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    // If we already have preview true, set old preview to false
    if (preview) {

        const spotImagePreview = await SpotImage.findOne({
            where: {
                [Op.and]:[{spotId: spotFound.id},{preview: true}]
            }
        });
        if (spotImagePreview) {
            spotImagePreview.preview = false;
            await spotImagePreview.save();
        }
    }

    let newSpotImage = await SpotImage.create({
        url, preview,
        spotId: spotFound.id
    })

    let spotImageFound = await SpotImage.findByPk(newSpotImage.id);

    res.json(spotImageFound)

});

router.put('/:spotId', requireAuth, validateCreateSpot, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user
    const currentId = req.user.id;
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const spotFound = await Spot.findByPk(req.params.spotId);

    if (!spotFound) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spotFound.ownerId !== currentId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    if (address) spotFound.address = address;
    if (city) spotFound.city = city;
    if (state) spotFound.state = state;
    if (country) spotFound.country = country;
    if (lat) spotFound.lat = lat;
    if (lng) spotFound.lng = lng;
    if (name) spotFound.name = name;
    if (description) spotFound.description = description;
    if (price) spotFound.price = price;

    await spotFound.save();

    res.json(spotFound);

});

router.delete('/:spotId', requireAuth, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user
    const currentId = req.user.id;

    const spotFound = await Spot.findByPk(req.params.spotId);

    if (!spotFound) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spotFound.ownerId !== currentId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    await spotFound.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

});

module.exports = router;
