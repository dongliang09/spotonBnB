const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    // Require proper authorization: Review must belong to the current user
    const currentUserId = req.user.id;

    const imageFound = await ReviewImage.scope('excludeTime').findByPk(req.params.imageId);

    if (!imageFound) {
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    const reviewFound = await Review.findByPk(imageFound.reviewId);

    if (reviewFound.userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    await imageFound.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
