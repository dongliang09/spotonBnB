const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const {  Booking, Review, ReviewImage, Spot, SpotImage, User, sequelize  } = require('../../db/models');
const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateQuerySpots = [
    check('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be greater than or equal to 1'),
    check('size')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
      .optional()
      .isFloat({min: -90, max: 90})
      .withMessage('Maximum latitude is invalid'),
    check('minLat')
      .optional()
      .isFloat({min: -90, max: 90})
      .withMessage('Minimum latitude is invalid'),
    check('maxLng')
      .optional()
      .isFloat({min: -180, max: 180})
      .withMessage('Maximum longitude is invalid'),
    check('minLng')
      .optional()
      .isFloat({min: -180, max: 180})
      .withMessage('Minimum longitude is invalid'),
    check('maxPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Maximum price must be greater than or equal to 0'),
    check('minPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Minimum price must be greater than or equal to 0'),
    handleValidationErrors
];

router.get('/', validateQuerySpots, async (req, res) => {

    let {page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice} = req.query;

    let pagination = {};

    if (!page) page = 1;
    else if (page > 10) page = 1;

    if (!size) size = 20;
    else if (size > 10) size = 20;

    pagination.limit = size;
    pagination.offset = size * (page - 1);

    let where = {};
    if (maxLat && minLat) where.lat = {[Op.between]: [minLat,maxLat]}
    else if (maxLat) where.lat = {[Op.lte]: maxLat}
    else if (minLat) where.lat = {[Op.gte]: minLat}

    if (maxLng && minLng) where.lng = {[Op.between]: [minLng,maxLng]}
    else if (maxLng) where.lng = {[Op.lte]: maxLng}
    else if (minLng) where.lng = {[Op.gte]: minLng}

    if (maxPrice && minPrice) where.price = {[Op.between]: [minPrice,maxPrice]}
    else if (maxPrice) where.price = {[Op.lte]: maxPrice}
    else if (minPrice) where.price = {[Op.gte]: minPrice}

    const spots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ],
        where,
        ...pagination
    });
    let spotsList = [];

    spots.forEach(spot => {
        spotsList.push(spot.toJSON());
    });

    for (let i = 0; i < spotsList.length; i++) {

        let spot = spotsList[i];

        if (spot.Reviews.length === 0) spot.avgRating = null;
        else {
            let reviewData = await Review.findAll({
                where: {
                    spotId: spot.id,
                },
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
                ]
            })
            reviewData.forEach(review=> {
                spot.avgRating = review.toJSON().avgRating;
            })
            // spot.avgRating = reviewData.toJSON().avgRating;
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
    res.json({
        "Spots" : spotsList,
        "page": page,
        "size": size
    })
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
            let reviewData = await Review.findAll({
                where: {
                    spotId: spot.id,
                },
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
                ]
            })
            reviewData.forEach(review=> {
                spot.avgRating = review.toJSON().avgRating;
            })
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
    res.json({"Spots" : spotsList})
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
        spot.avgStarRating = null;
        spot.numReviews = 0;
    } else {
        let reviewData = await Review.findAll({
            where: {
                spotId: spot.id,
            },
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
            ]
        })
        reviewData.forEach(review=> {
            spot.avgStarRating = review.toJSON().avgRating;
        })
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
      .isFloat({min: -90, max: 90})
      .withMessage('Latitude is not valid'),
    check('lng')
      .isFloat({min: -180, max: 180})
      .withMessage('Longitude is not valid'),
    check('name')
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a name'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .isFloat({ min: 0.01 })
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

router.get('/:spotId/reviews', async (req, res) => {

    const spotFound = await Spot.findByPk(req.params.spotId)

    if (!spotFound) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const reviews = await Review.scope(['userPublic',"imageNoTime"]).findAll({
        where: {
            spotId: spotFound.id
        },
        include: [
            {model: User}, {model: ReviewImage}
        ]
    })

    res.json({
        "Reviews": reviews
    })
});

const validateCreateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .isNumeric()
      .isInt({min: 1, max:5})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

router.post('/:spotId/reviews', requireAuth, validateCreateReview, async (req, res) => {

    const { review, stars } = req.body;
    const currentUserId = req.user.id;

    const spotFound = await Spot.findByPk(req.params.spotId)

    if (!spotFound) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    //check if user already post a review
    const reviewFromUser = await Review.findOne({
        where:{
            [Op.and]:[{spotId: spotFound.id},{userId: currentUserId}]
        }
    })

    if (reviewFromUser) {
        return res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    //create new review
    let newReview = await Review.create({
        review, stars,
        spotId: spotFound.id,
        userId: currentUserId
    })

    const reviewFound = await Review.findByPk(newReview.id);

    res.status(201).json(reviewFound);
});

router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const currentUserId = req.user.id;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const spotOwnerId = spot.ownerId;
    let bookings;

    if (currentUserId === spotOwnerId) {
        bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            include: {model: User}
        })
    } else {
        bookings = await Booking.scope("nonOwnerBooking").findAll({
            where: {
                spotId: spot.id
            }
        })
    }

    res.json({
        "Bookings": bookings
    })
});

const validateCreateBooking = [
    check('startDate')
      .exists({ checkFalsy: true })
      .isDate()
      .withMessage('startDate must be a date'),
    check('endDate')
      .exists({ checkFalsy: true })
      .isDate()
      .withMessage('endDate must be a date'),
    handleValidationErrors
];

router.post('/:spotId/bookings', requireAuth, validateCreateBooking, async (req, res) => {
    // Require proper authorization: Spot must NOT belong to the current user
    let validateErrorArr = {};

    const currentUserId = req.user.id;
    const { startDate, endDate } = req.body;

    const startDateInMS = new Date(startDate).getTime();
    const endDateInMS = new Date(endDate).getTime();

    const currentDateInMS = new Date().getTime();

    if (startDateInMS - endDateInMS >= 0) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    if (currentDateInMS - startDateInMS >= 0 ) {
        validateErrorArr.startDate = "Cannot set startDate in the past";
    }
    if (currentDateInMS - endDateInMS >= 0) {
        validateErrorArr.endDate = "Cannot set endDate in the past";
    }

    if (Object.entries(validateErrorArr).length !== 0) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": validateErrorArr
        })
    }

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spot.ownerId === currentUserId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    //check if new booking conflicts with any old bookings
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    let checkBookingArr = [];
    let bookingErrArr = {};

    bookings.forEach(booking => {
        checkBookingArr.push(booking.toJSON());
    })

    for (let i = 0; i < checkBookingArr.length; i++) {
        let currentBooking = checkBookingArr[i];
        let bookingStartDate = new Date(currentBooking.startDate).getTime();
        let bookingEndDate = new Date(currentBooking.endDate).getTime();

        if (startDateInMS >= bookingStartDate && startDateInMS <= bookingEndDate) {
            bookingErrArr.startDate = "Start date conflicts with an existing booking";
        }
        if (endDateInMS >= bookingStartDate && endDateInMS <= bookingEndDate) {
            bookingErrArr.endDate = "End date conflicts with an existing booking";
        }
        if (startDateInMS <= bookingStartDate && endDateInMS >= bookingEndDate) {
            bookingErrArr.startDate = "Start date conflicts with an existing booking";
            bookingErrArr.endDate = "End date conflicts with an existing booking";
        }

    }

    if (Object.entries(bookingErrArr).length !== 0) {
        return res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": bookingErrArr
        })
    }

    //create new booking
    const newBooking = await Booking.create({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        // startDate, endDate,
        spotId: req.params.spotId,
        userId: currentUserId
    })

    const bookingFound = await Booking.findByPk(newBooking.id);

    res.json(bookingFound)

});

module.exports = router;
