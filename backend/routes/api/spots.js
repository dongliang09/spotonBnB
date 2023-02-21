const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize  } = require('../../db/models');

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

    let averageRating = await Review.findAll({
        where:{
            spotId: req.params.spotId
        },
        attributes: {
            include: [
                [
                  sequelize.fn("AVG", sequelize.col("stars")),
                  "avgRating"
                ]
            ]
        }
    });
    res.json(averageRating)
});

router.post('/', requireAuth, async (req, res) => {

});

router.post('/:spotId/images', requireAuth, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user


});

router.put('/:spotId', requireAuth, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user

});

router.delete('/:spotId', requireAuth, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user

});

module.exports = router;
