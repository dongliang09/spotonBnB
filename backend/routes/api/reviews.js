const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {

    const currentUserId = req.user.id;
    const userReviewData = await Review.scope(['userPublic','spotReview',"imageNoTime"]).findAll({
        where: {
            userId: currentUserId
        },
        include: [
            {model: User}, {model: ReviewImage}, {model: Spot}
        ]
    })

    //add preview url to Spot
    let reivewList = [];

    userReviewData.forEach(review => {
        reivewList.push(review.toJSON());
    });

    for (let i = 0; i <reivewList.length; i++) {
        let currentReview = reivewList[i];
        let currSpotId = currentReview.Spot.id;
        let previewImg = await SpotImage.findOne({
            where: {
                [Op.and]: [{spotId: currSpotId}, {preview: true}]
            }
        })
        if (previewImg) currentReview.Spot.previewImage = previewImg.toJSON().url;
        else currentReview.Spot.previewImage = null;
    }

    res.json({
        "Reviews": reivewList
    })
});

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    // Require proper authorization: Review must belong to the current user
});

router.put('/:reviewId', requireAuth, async (req, res) => {
    // Require proper authorization: Review must belong to the current user
});

router.delete('/:reviewId', requireAuth, async (req, res) => {
    // Require proper authorization: Review must belong to the current user
});

module.exports = router;
