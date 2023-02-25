const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    // Require proper authorization: Spot must belong to the current user
    const currentUserId = req.user.id;

    const imageFound = await SpotImage.scope('excludeTime').findByPk(req.params.imageId);

    if (!imageFound) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    const spotFound = await Spot.findByPk(imageFound.spotId);

    if (spotFound.ownerId !== currentUserId) {
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
