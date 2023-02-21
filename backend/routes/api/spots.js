const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize  } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    let spotsWithRating = [];
    for (const spot of spots) {
        let spotRatingArr = await Review.findAll({
            where:{
                spotId: spot.id
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
        spot.aveRating = spotRatingArr[0]["aveRating"];
        console.log(spotRatingArr[0].dataValues.aveRating)
        let previewImage = await SpotImage.findByPk(spot.id, {
            where: {
                preview: true
            }
        })
        spot.previewImage = previewImage.url;
        console.log(spot.previewImage)
        spotsWithRating.push(spot);
        // console.log(spot)
    }
    // console.log(spots)
    res.json(spotsWithRating)
});

router.get('/current', requireAuth, async (req, res) => {

    const currentId = req.user.id;
    const currentOwnerSpots = await Spot.findAll({
        where: {
            ownerId: currentId
        }
    });

    res.json(currentOwnerSpots)
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
