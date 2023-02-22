const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {

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
