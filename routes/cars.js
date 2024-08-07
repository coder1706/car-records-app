const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

// View Cars
router.get('/', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    const cars = await Car.find();
    res.render('cars', { cars });
});

module.exports = router;
