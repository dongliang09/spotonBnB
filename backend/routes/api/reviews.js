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
    const currentUserId = req.user.id;
    const { url } = req.body;

    if (!url) {
        return res.json(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "url": "url is required"
            }
          })
    }

    const reviewData = await Review.findByPk(req.params.reviewId, {
        include: {model: ReviewImage}
    });

    if (!reviewData) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewData.userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    let review = reviewData.toJSON();

    if (review.ReviewImages.length >= 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    const newReviewImg = await ReviewImage.create({
        url,
        reviewId: review.id
    });

    const reviewImgFound = await ReviewImage.scope("noTimeStamp").findByPk(newReviewImg.id);

    res.json(reviewImgFound)

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

router.put('/:reviewId', requireAuth, validateCreateReview, async (req, res) => {
    // Require proper authorization: Review must belong to the current user
    const currentUserId = req.user.id;
    const { review, stars } = req.body;

    const reviewFound = await Review.findByPk(req.params.reviewId);

    if (!reviewFound) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewFound.userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    if (review) reviewFound.review = review;
    if (stars) reviewFound.stars = stars;

    await reviewFound.save();

    res.json(reviewFound);
});

router.delete('/:reviewId', requireAuth, async (req, res) => {
    // Require proper authorization: Review must belong to the current user

    const currentUserId = req.user.id;

    const reviewFound = await Review.findByPk(req.params.reviewId);

    if (!reviewFound) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewFound.userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    await reviewFound.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

});

module.exports = router;
