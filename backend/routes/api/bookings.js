const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot } = require('../../db/models');
const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {

    const currentUserId = req.user.id;

    const bookings = await Booking.findAll({
        where: {
            userId: currentUserId
        }
    })

    res.json({
        "Bookings": bookings
    })
});

router.put('/:bookingId', requireAuth, async (req, res) => {
    // Require proper authorization: Booking must belong to the current user

});

router.delete('/:bookingId', requireAuth, async (req, res) => {
    // Require proper authorization: Booking must belong to the current user

    const currentUserId = req.user.id;
    const bookingFound = await Booking.findByPk(req.params.bookingId);

    if (!bookingFound) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    if (bookingFound.userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    await bookingFound.destroy()

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

});

module.exports = router;
