const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

// Dashboard
router.get('/', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    const cars = await Car.find();
    const totalCars = cars.length;

    res.render('dashboard', { cars, totalCars });
});

// Create Car
router.post('/add', async (req, res) => {
    const { name, year, price } = req.body;
    const newCar = new Car({ name, year, price });

    await newCar.save();
    res.redirect('/dashboard');
});

// Edit Car
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, year, price } = req.body;

    await Car.findByIdAndUpdate(id, { name, year, price });
    res.redirect('/dashboard');
});

// Delete Car
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);

    res.redirect('/dashboard');
});

module.exports = router;