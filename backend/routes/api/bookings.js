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

});

module.exports = router;
