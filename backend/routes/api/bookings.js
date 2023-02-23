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

router.put('/:bookingId', requireAuth, validateCreateBooking, async (req, res) => {
    // Require proper authorization: Booking must belong to the current user
    const currentUserId = req.user.id;
    const { startDate, endDate } = req.body;

    //validate input
    const startDateInMS = new Date(startDate).getTime();
    const endDateInMS = new Date(endDate).getTime();

    const currentDateInMS = new Date().getTime();

    if (startDateInMS - endDateInMS >= 0) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    //check current booking
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

    // check timeline of booking
    // if (currentDateInMS > bookingEndDateInMS) {
    //     return res.status(403).json({
    //         "message": "Past bookings can't be modified",
    //         "statusCode": 403
    //     })
    // }

    //check if new edit conflicts with any old bookings
    // let editBookingStartDate = new Date(bookingFound.startDate).getTime();
    // let editBookingEndDateInMS = new Date(bookingFound.endDate).getTime();
    let bookingSpotId = bookingFound.spotId;

    const bookings = await Booking.findAll({
        where: {
            spotId: bookingSpotId
        }
    })

    let checkBookingArr = [];

    bookings.forEach(booking => {
        checkBookingArr.push(booking.toJSON());
        console.log(booking.toJSON())
    })

    for (let i = 0; i < checkBookingArr.length; i++) {
        let currentBooking = checkBookingArr[i];
        let bookingStartDate = new Date(currentBooking.startDate).getTime();
        let bookingEndDate = new Date(currentBooking.endDate).getTime();

        if (
            (startDateInMS >= bookingStartDate && startDateInMS <= bookingEndDate) ||
            (endDateInMS >= bookingStartDate && endDateInMS <= bookingEndDate)
        ) {
            // console.log(i, currentBooking.id)
            // console.log("current booking",bookingStartDate, bookingEndDate)
            // console.log("edit booking",bookingStartDate, bookingEndDate)
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                  "startDate": "Start date conflicts with an existing booking",
                  "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    }

    bookingFound.startDate = startDate;
    bookingFound.endDate = endDate;
    await bookingFound.save();

    res.json(bookingFound)

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
